import { TinyColor } from '@ctrl/tinycolor';
import { bench } from 'vitest';
import FastColor from '.';

describe('constructor', () => {
  describe('hex #6cf', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('#6cf');
    });

    bench('fastcolor', () => {
      new FastColor('#6cf');
    });
  });

  describe('hex #6cfa', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('#6cfa');
    });

    bench('fastcolor', () => {
      new FastColor('#6cfa');
    });
  });

  describe('hex #66ccff', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('#66ccff');
    });

    bench('fastcolor', () => {
      new FastColor('#66ccff');
    });
  });

  describe('hex #66ccffaa', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('#66ccffaa');
    });

    bench('fastcolor', () => {
      new FastColor('#66ccffaa');
    });
  });

  describe('rgb(11, 22, 33)', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('rgb(11, 22, 33)');
    });

    bench('fastcolor', () => {
      new FastColor('rgb(11, 22, 33)');
    });
  });

  describe('rgba(11, 22, 33, .5)', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('rgba(11, 22, 33, .5)');
    });

    bench('fastcolor', () => {
      new FastColor('rgba(11, 22, 33, .5)');
    });
  });

  describe('object { r: 11, g: 22, b: 33 }', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor({ r: 11, g: 22, b: 33 });
    });

    bench('fastcolor', () => {
      new FastColor({ r: 11, g: 22, b: 33 });
    });
  });
});

describe('clone', () => {
  const color1 = new TinyColor({ r: 11, g: 22, b: 33 });
  bench('@ctrl/tinycolor', () => {
    color1.clone();
  });

  const color2 = new FastColor({ r: 11, g: 22, b: 33 });
  bench('fastcolor', () => {
    color2.clone();
  });
});

describe('darken', () => {
  const color1 = new TinyColor({ r: 11, g: 22, b: 33 });
  bench('@ctrl/tinycolor', () => {
    color1.darken();
  });

  const color2 = new FastColor({ r: 11, g: 22, b: 33 });
  bench('fastcolor', () => {
    color2.darken();
  });
});

describe('lighten', () => {
  const color1 = new TinyColor({ r: 11, g: 22, b: 33 });
  bench('@ctrl/tinycolor', () => {
    color1.lighten();
  });

  const color2 = new FastColor({ r: 11, g: 22, b: 33 });
  bench('fastcolor', () => {
    color2.lighten();
  });
});

describe('getBrightness', () => {
  const color1 = new TinyColor({ r: 11, g: 22, b: 33 });
  bench('@ctrl/tinycolor', () => {
    color1.getBrightness();
  });

  const color2 = new FastColor({ r: 11, g: 22, b: 33 });
  bench('fastcolor', () => {
    color2.getBrightness();
  });
});

describe('onBackground', () => {
  const color1 = new TinyColor({ r: 11, g: 22, b: 33, a: 0.5 });
  const background1 = new TinyColor({ r: 0, g: 0, b: 0 });
  bench('@ctrl/tinycolor', () => {
    color1.onBackground(background1);
  });

  const color2 = new FastColor({ r: 11, g: 22, b: 33, a: 0.5 });
  const background2 = new FastColor({ r: 0, g: 0, b: 0 });
  bench('fastcolor', () => {
    color2.onBackground(background2);
  });
});

describe('setAlpha', () => {
  const color1 = new TinyColor({ r: 11, g: 22, b: 33 });
  bench('@ctrl/tinycolor', () => {
    color1.setAlpha(0.67);
  });

  const color2 = new FastColor({ r: 11, g: 22, b: 33 });
  bench('fastcolor', () => {
    color2.setAlpha(0.67);
  });
});

describe('toHexString', () => {
  const color1 = new TinyColor({ r: 11, g: 22, b: 33 });
  bench('@ctrl/tinycolor', () => {
    color1.toHexString();
  });

  const color2 = new FastColor({ r: 11, g: 22, b: 33 });
  bench('fastcolor', () => {
    color2.toHexString();
  });
});

describe('toRgbString', () => {
  const color1 = new TinyColor({ r: 11, g: 22, b: 33 });
  bench('@ctrl/tinycolor', () => {
    color1.toRgbString();
  });

  const color2 = new FastColor({ r: 11, g: 22, b: 33 });
  bench('fastcolor', () => {
    color2.toRgbString();
  });
});
