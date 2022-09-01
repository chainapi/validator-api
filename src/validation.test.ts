import { readdirSync } from 'fs';
import * as validation from './validation';

const SUPPORTED_VERSIONS = readdirSync('./test/fixtures', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

describe.each(SUPPORTED_VERSIONS)('validate v% configs', (version) => {
  const config = require(`../test/fixtures/${version}/config.json`);

  it('validates a valid config', () => {
    expect(validation.validate(config)).toEqual({ valid: true, errors: [] });
  });

  it('throws an error if the version is not supported', () => {
    const invalid = JSON.parse(JSON.stringify(config));
    invalid.nodeSettings.nodeVersion = '0.6.5';
    expect(() => validation.validate(invalid)).toThrow('Unsupported version: v0.6.5');
  });

  it('validates an invalid config', () => {
    const invalid = JSON.parse(JSON.stringify(config));
    delete invalid.ois;
    expect(validation.validate(invalid)).toEqual({
      valid: false,
      errors: [
        {
          code: 'invalid_type',
          expected: 'array',
          message: 'Required',
          path: ['ois'],
          received: 'undefined',
        },
      ],
    });
  });
});

describe('extractVersionFromConfig', () => {
  const config = require(`../test/fixtures/0.7/config.json`);

  it('extracts and parses the version from the config', () => {
    const res = validation.extractVersionFromConfig(config);
    expect(res).toEqual({ major: 0, minor: 7, patch: 2 });
  });
});
