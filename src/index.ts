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

export class Color {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(input: ColorInput) {
    if (typeof input === 'string') {
      const trimed = input.trim();
      if (trimed[0] === '#') {
        if (trimed.length < 6) {
          this.r = Number('0x' + trimed[1]);
          this.g = Number('0x' + trimed[2]);
          this.b = Number('0x' + trimed[3]);
          this.a = trimed[4] ? Number('0x' + trimed[4]) : 1;
        } else {
          this.r = Number('0x' + trimed[1] + trimed[2]);
          this.g = Number('0x' + trimed[3] + trimed[4]);
          this.b = Number('0x' + trimed[5] + trimed[6]);
          this.a = trimed[8] ? Number('0x' + trimed[7] + trimed[8]) : 1;
        }
      } else if (trimed.startsWith('rgb(')) {
        const arr = trimed.substring(4).split(',');
        this.r = Number(arr[0]);
        this.g = Number(arr[1]);
        this.b = Number(arr[2]);
        this.a = 1;
      } else if (trimed.startsWith('rgba(')) {
        const arr = trimed.substring(5).split(',');
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
}

export default Color;

export { Color as TinyColor };
