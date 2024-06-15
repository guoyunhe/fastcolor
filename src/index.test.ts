import { nanocolor } from '.';

describe('nanocolor', () => {
  describe('normal', async () => {
    expect(nanocolor('Foo', 'Bar')).toBe('Foo Bar');
  });

  describe('lastName upper case', async () => {
    expect(nanocolor('Foo', 'Bar', { lastNameUpperCase: true })).toBe('Foo BAR');
  });
});
