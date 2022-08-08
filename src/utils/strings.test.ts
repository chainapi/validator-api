import * as strings from './strings';

describe('parseSemver', () => {
  it('splits the given string into an object', () => {
    expect(strings.parseSemver('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3 });
    expect(strings.parseSemver('0.0.1')).toEqual({ major: 0, minor: 0, patch: 1 });
  });
});
