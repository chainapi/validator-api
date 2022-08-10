import * as strings from './strings';

describe('parseSemver', () => {
  it('splits the given string into an object', () => {
    expect(strings.parseSemver('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3 });
    expect(strings.parseSemver('0.0.1')).toEqual({ major: 0, minor: 0, patch: 1 });
  });

  it('throws an error when the version is not 3 numbers', () => {
    expect(() => strings.parseSemver('1')).toThrowError('Invalid version: 1');
    expect(() => strings.parseSemver('1.2')).toThrowError('Invalid version: 1.2');
    expect(() => strings.parseSemver('1.2.3.4')).toThrowError('Invalid version: 1.2.3.4');
  });
});
