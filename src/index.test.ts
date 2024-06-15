import { FastColor } from '.';

describe('FastColor', () => {
  describe('constructor', async () => {
    describe('#rgb', async () => {
      const color = new FastColor('#6cf');
      expect(color.r).toBe(102);
    });

    describe('#rgba', async () => {
      const color = new FastColor('#6cfa');
      expect(color.a.toFixed(2)).toBe('0.67');
    });

    describe('#rrggbb', async () => {
      const color = new FastColor('#66ccff');
      expect(color.r).toBe(102);
    });

    describe('#rrggbbaa', async () => {
      const color = new FastColor('#66ccffaa');
      expect(color.a.toFixed(2)).toBe('0.67');
    });
  });

  describe('clone', async () => {
    const color1 = new FastColor('#66ccff');
    const color2 = color1.clone();
    expect(color2.r).toBe(102);
  });

  describe('getBrightness', async () => {
    const color = new FastColor('#66ccff');
    expect(color.getBrightness()).toBe(179.316);
  });

  describe('isDark', async () => {
    const color = new FastColor('#66ccff');
    expect(color.isDark()).toBe(false);
  });

  describe('isLight', async () => {
    const color = new FastColor('#66ccff');
    expect(color.isLight()).toBe(true);
  });

  describe('getLightness', async () => {
    const color = new FastColor('#66ccff');
    expect(color.getLightness().toFixed(2)).toBe('0.70');
  });

  describe('toRgbString', async () => {
    describe('with alpha', async () => {
      const color = new FastColor('#66ccffaa');
      expect(color.toRgbString()).toBe('rgba(102,204,255,0.67)');
    });
    describe('without alpha', async () => {
      const color = new FastColor('#66ccff');
      expect(color.toRgbString()).toBe('rgb(102,204,255)');
    });
  });
});
