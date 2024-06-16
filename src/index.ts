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

export type ColorInput = string | RGBA | HSLA;

export class FastColor {
  r: number;
  g: number;
  b: number;
  a: number;

  // HSL values are initialized on demand and they are read only.
  private _h?: number;
  private _s?: number;
  private _l?: number;

  // intermedia variables to calculate HSL
  private _max?: number;
  private _min?: number;

  private brightness?: number;

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
    } else if ('l' in input) {
      this.fromHSLA(input);
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

  get h() {
    return this.getHue();
  }

  get s() {
    return this.getSaturation();
  }

  get l() {
    return this.getLightness();
  }

  darken(amount = 10): FastColor {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() - amount / 100;
    if (l < 0) {
      l = 0;
    }
    return new FastColor({ h, s, l, a: this.a });
  }

  lighten(amount = 10): FastColor {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() + amount / 100;
    if (l > 1) {
      l = 1;
    }
    return new FastColor({ h, s, l, a: this.a });
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
    if (typeof this._h === 'undefined') {
      const max = this.getMax();
      const min = this.getMin();
      if (max === min) {
        this._h = 0;
      } else {
        const delta = max - min;
        this._h =
          60 *
          (this.r === max
            ? (this.g - this.b) / delta + (this.g < this.b ? 6 : 0)
            : this.g === max
              ? (this.b - this.r) / delta + 2
              : (this.r - this.g) / delta + 4);
      }
    }
    return this._h;
  }

  getSaturation() {
    if (typeof this._s === 'undefined') {
      const max = this.getMax();
      const min = this.getMin();
      if (max === min) {
        this._s = 0;
      } else {
        const delta = max - min;
        this._s = this.getLightness() > 0.5 ? delta / (510 - max - min) : delta / (max + min);
      }
    }
    return this._s;
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
    if (typeof this.brightness === 'undefined') {
      this.brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
    }
    return this.brightness;
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

  toHsl(): HSLA {
    return {
      h: this.h,
      s: this.s,
      l: this.l,
    };
  }

  toRgb(): RGBA {
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

  private fromHSLA({ h, s, l, a }: HSLA) {
    this._h = h;
    this._s = s;
    this._l = l;
    this.a = typeof a === 'number' ? a : 1;

    if (s === 0) {
      const rgb = Math.round(l * 255);
      return new FastColor({ r: rgb, g: rgb, b: rgb, a });
    }

    const huePrime = h / 60;
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

    this.r = 0;
    this.g = 0;
    this.b = 0;

    if (huePrime >= 0 && huePrime < 1) {
      this.r = chroma;
      this.g = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      this.r = secondComponent;
      this.g = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      this.g = chroma;
      this.b = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      this.g = secondComponent;
      this.b = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      this.r = secondComponent;
      this.b = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      this.r = chroma;
      this.b = secondComponent;
    }

    const lightnessModification = l - chroma / 2;
    this.r = Math.round((this.r + lightnessModification) * 255);
    this.g = Math.round((this.g + lightnessModification) * 255);
    this.b = Math.round((this.b + lightnessModification) * 255);
  }
}

// to be compatible with tinycolor, tinycolor2, @ctrl/tinycolor
export { FastColor as TinyColor };
