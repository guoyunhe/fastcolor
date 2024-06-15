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

  describe('getLightness', async () => {
    const color = new FastColor('#66ccff');
    expect(color.getLightness().toFixed(2)).toBe('0.70');
  });

  describe('clone', async () => {
    const color1 = new FastColor('#66ccff');
    const color2 = color1.clone();
    expect(color2.r).toBe(102);
  });
});
