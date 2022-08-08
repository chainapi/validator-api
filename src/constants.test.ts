import * as constants from './constants';

describe('SUPPORTED_VERSIONS', () => {
  it('returns the list of supported versions', () => {
    expect(constants.SUPPORTED_VERSIONS).toEqual(['0.7']);
  });
});
