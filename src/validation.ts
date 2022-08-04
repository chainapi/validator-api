import { match } from 'ts-pattern';
import validator06 from 'validator-0.6';
import validator07 from 'validator-0.7';
import { parseSemver } from './utils';

export const validate = (semverStr: string, config: any) => {
  const validate = getVersionValidator(semverStr);

  const result = validate(config);
  if (!result.success) {
    console.log('TODO: Validation failed');
    // TODO: handle and return errors;
    return { success: false, errors: [] };
  }
  return { success: true, errors: [] };
};

export const getVersionValidator = (semverStr: string) => {
  const semver = parseSemver(semverStr);

  return match(semver)
    .with({ major: 0, minor: 6 }, () => validator06.parseConfig)
    .with({ major: 0, minor: 7 }, () => validator07.parseConfig)
    .otherwise(() => {
      throw new Error('Unsupported version');
    });
};
