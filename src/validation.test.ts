import * as validation from './validation';
import { SUPPORTED_VERSIONS } from './constants';

describe.each(SUPPORTED_VERSIONS)('validates v%s configs', (version) => {
  const config = require(`../test/fixtures/${version}/config.json`);

  it('validates a valid config', () => {
    expect(validation.validate(version, config)).toEqual({ valid: true, errors: [] });
  });

  it('validates an invalid config', () => {
    const invalid = JSON.parse(JSON.stringify(config));
    delete invalid.ois;
    expect(validation.validate(version, invalid)).toEqual({
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
