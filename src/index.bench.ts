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
