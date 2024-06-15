export interface NanocolorOptions {
  lastNameUpperCase?: boolean;
}

export type ColorInput =
  | string
  | {
      r: number;
      g: number;
      b: number;
      a?: number;
    };

export class FastColor {
  r: number;
  g: number;
  b: number;
  a: number;

  private _l?: number;
  private _brightness?: number;

  constructor(input: ColorInput) {
    if (typeof input === 'string') {
      const trimed = input.trim();
      if (trimed[0] === '#') {
        if (trimed.length < 6) {
          this.r = Number('0x' + trimed[1] + trimed[1]);
          this.g = Number('0x' + trimed[2] + trimed[2]);
          this.b = Number('0x' + trimed[3] + trimed[3]);
          this.a = trimed[4] ? Number('0x' + trimed[4] + trimed[4]) / 255 : 1;
        } else {
          this.r = Number('0x' + trimed[1] + trimed[2]);
          this.g = Number('0x' + trimed[3] + trimed[4]);
          this.b = Number('0x' + trimed[5] + trimed[6]);
          this.a = trimed[8] ? Number('0x' + trimed[7] + trimed[8]) / 255 : 1;
        }
      } else if (trimed.startsWith('rgb(')) {
        const arr = trimed.substring(4, trimed.length - 1).split(',');
        this.r = Number(arr[0]);
        this.g = Number(arr[1]);
        this.b = Number(arr[2]);
        this.a = 1;
      } else if (trimed.startsWith('rgba(')) {
        const arr = trimed.substring(5, trimed.length - 1).split(',');
        this.r = Number(arr[0]);
        this.g = Number(arr[1]);
        this.b = Number(arr[2]);
        this.a = Number(arr[3]);
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

  getLightness() {
    if (typeof this._l === 'undefined') {
      const max = Math.max(this.r, this.g, this.b);
      const min = Math.min(this.r, this.g, this.b);
      this._l = (max + min) / 512;
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

  setAlpha(alpha: number) {
    this.a = alpha;
  }

  toRgbString() {
    return this.a !== 1
      ? `rgba(${this.r},${this.g},${this.b},${this.a.toPrecision(2)})`
      : `rgb(${this.r},${this.g},${this.b})`;
  }
}

export default FastColor;

export { FastColor as TinyColor };
