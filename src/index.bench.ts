import { TinyColor } from '@ctrl/tinycolor';
import { bench } from 'vitest';
import NanoColor from '.';

describe('constructor', () => {
  describe('hex #6cf', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('#6cf');
    });

    bench('nanocolor', () => {
      new NanoColor('#6cf');
    });
  });

  describe('hex #6cfa', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('#6cfa');
    });

    bench('nanocolor', () => {
      new NanoColor('#6cfa');
    });
  });

  describe('hex #66ccff', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('#66ccff');
    });

    bench('nanocolor', () => {
      new NanoColor('#66ccff');
    });
  });

  describe('hex #66ccffaa', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('#66ccffaa');
    });

    bench('nanocolor', () => {
      new NanoColor('#66ccffaa');
    });
  });

  describe('rgb(11, 22, 33)', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('rgb(11, 22, 33)');
    });

    bench('nanocolor', () => {
      new NanoColor('rgb(11, 22, 33)');
    });
  });

  describe('rgba(11, 22, 33, .5)', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor('rgba(11, 22, 33, .5)');
    });

    bench('nanocolor', () => {
      new NanoColor('rgba(11, 22, 33, .5)');
    });
  });

  describe('object { r: 11, g: 22, b: 33 }', () => {
    bench('@ctrl/tinycolor', () => {
      new TinyColor({ r: 11, g: 22, b: 33 });
    });

    bench('nanocolor', () => {
      new NanoColor({ r: 11, g: 22, b: 33 });
    });
  });
});
