export interface NanocolorOptions {
  lastNameUpperCase?: boolean;
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface HSLA {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export type ColorInput = string | RGBA;

export class FastColor {
  r: number;
  g: number;
  b: number;
  a: number;

  private _max?: number;
  private _min?: number;
  private _hue?: number;
  private _saturation?: number;
  private _l?: number;
  private _brightness?: number;

  constructor(input: ColorInput) {
    if (typeof input === 'string') {
      const trimed = input.trim();
      if (trimed[0] === '#') {
        if (trimed.length < 6) {
          this.r = parseInt(trimed[1] + trimed[1], 16);
          this.g = parseInt(trimed[2] + trimed[2], 16);
          this.b = parseInt(trimed[3] + trimed[3], 16);
          this.a = trimed[4] ? parseInt(trimed[4] + trimed[4], 16) / 255 : 1;
        } else {
          this.r = parseInt(trimed[1] + trimed[2], 16);
          this.g = parseInt(trimed[3] + trimed[4], 16);
          this.b = parseInt(trimed[5] + trimed[6], 16);
          this.a = trimed[8] ? parseInt(trimed[7] + trimed[8], 16) / 255 : 1;
        }
      } else if (trimed.startsWith('rgb(')) {
        const arr = trimed.substring(4, trimed.length - 1).split(',');
        this.r = parseInt(arr[0]);
        this.g = parseInt(arr[1]);
        this.b = parseInt(arr[2]);
        this.a = 1;
      } else if (trimed.startsWith('rgba(')) {
        const arr = trimed.substring(5, trimed.length - 1).split(',');
        this.r = parseInt(arr[0]);
        this.g = parseInt(arr[1]);
        this.b = parseInt(arr[2]);
        this.a = parseFloat(arr[3]);
      }
    } else {
      this.r = input.r;
      this.g = input.g;
      this.b = input.b;
      this.a = typeof input.a === 'number' ? input.a : 1;
    }
  }

  clone() {
    return new FastColor(this);
  }

  static fromHSLA({ h, s, l, a }: HSLA) {
    if (s === 0) {
      const rgb = Math.round(l * 255);
      return new FastColor({ r: rgb, g: rgb, b: rgb, a });
    }

    const huePrime = (((h % 360) + 360) % 360) / 60;
    const chroma = (1 - Math.abs(2 * l - 1)) * (s / 100);
    const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

    let r = 0;
    let g = 0;
    let b = 0;

    if (huePrime >= 0 && huePrime < 1) {
      r = chroma;
      g = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      r = secondComponent;
      g = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      g = chroma;
      b = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      g = secondComponent;
      b = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      r = secondComponent;
      b = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      r = chroma;
      b = secondComponent;
    }

    const lightnessModification = l - chroma / 2;
    r = Math.round((r + lightnessModification) * 255);
    g = Math.round((g + lightnessModification) * 255);
    b = Math.round((b + lightnessModification) * 255);
    return new FastColor({ r, g, b, a });
  }

  darken(amount = 10): FastColor {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() - amount / 100;
    if (l < 0) {
      l = 0;
    }
    return FastColor.fromHSLA({ h, s, l, a: this.a });
  }

  lighten(amount = 10): FastColor {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() + amount / 100;
    if (l > 1) {
      l = 1;
    }
    return FastColor.fromHSLA({ h, s, l, a: this.a });
  }

  getMax() {
    if (typeof this._max === 'undefined') {
      this._max = Math.max(this.r, this.g, this.b);
    }
    return this._max;
  }

  getMin() {
    if (typeof this._min === 'undefined') {
      this._min = Math.min(this.r, this.g, this.b);
    }
    return this._min;
  }

  getHue() {
    if (typeof this._hue === 'undefined') {
      const max = this.getMax();
      const min = this.getMin();
      if (max === min) {
        this._hue = 0;
      } else {
        const delta = max - min;
        this._hue =
          60 *
          (this.r === max
            ? (this.g - this.b) / delta + (this.g < this.b ? 6 : 0)
            : this.g === max
              ? (this.b - this.r) / delta + 2
              : (this.r - this.g) / delta + 4);
      }
    }
    return this._hue;
  }

  getSaturation() {
    if (typeof this._saturation === 'undefined') {
      const max = this.getMax();
      const min = this.getMin();
      if (max === min) {
        this._saturation = 0;
      } else {
        const delta = max - min;
        this._saturation =
          this.getLightness() > 0.5 ? delta / (510 - max - min) : delta / (max + min);
      }
    }
    return this._saturation;
  }

  getLightness() {
    if (typeof this._l === 'undefined') {
      this._l = (this.getMax() + this.getMin()) / 510;
    }
    return this._l;
  }

  /**
   * Returns the perceived brightness of the color, from 0-255.
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness(): number {
    if (typeof this._brightness === 'undefined') {
      this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
    }
    return this._brightness;
  }

  isDark(): boolean {
    return this.getBrightness() < 128;
  }

  isLight(): boolean {
    return this.getBrightness() >= 128;
  }

  onBackground(bg: FastColor) {
    const alpha = this.a + bg.a * (1 - this.a);

    return new FastColor({
      r: (this.r * this.a + bg.r * bg.a * (1 - this.a)) / alpha,
      g: (this.g * this.a + bg.g * bg.a * (1 - this.a)) / alpha,
      b: (this.b * this.a + bg.b * bg.a * (1 - this.a)) / alpha,
      a: alpha,
    });
  }

  setAlpha(alpha: number) {
    this.a = alpha;
  }

  toHexString() {
    let hex = '#';
    const rHex = this.r.toString(16);
    hex += rHex.length === 2 ? rHex : '0' + rHex;
    const gHex = this.g.toString(16);
    hex += gHex.length === 2 ? gHex : '0' + gHex;
    const bHex = this.b.toString(16);
    hex += bHex.length === 2 ? bHex : '0' + bHex;
    if (this.a !== 1) {
      const aHex = Math.round(this.a * 255).toString(16);
      hex += aHex.length === 2 ? aHex : '0' + aHex;
    }
    return hex;
  }

  toRgb() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  toRgbString() {
    return this.a !== 1
      ? `rgba(${this.r},${this.g},${this.b},${this.a.toPrecision(2)})`
      : `rgb(${this.r},${this.g},${this.b})`;
  }
}

export default FastColor;

export { FastColor as TinyColor };
