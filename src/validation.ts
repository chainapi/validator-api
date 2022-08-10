import { match } from 'ts-pattern';
import * as validator07 from 'validator-0.7';
import { SUPPORTED_VERSIONS } from './constants';
import { parseSemver } from './utils';

export const validate = (semverStr: string, config: any) => {
  const validate = getVersionValidator(semverStr);

  const result = validate(config);
  if (!result.success) {
    return { valid: false, errors: (result.error as any).issues };
  }
  return { valid: true, errors: [] };
};

const getVersionValidator = (semverStr: string) => {
  const semver = parseSemver(semverStr);

  // Reconstruct with just the major and minor versions to check supported versions
  const majorMinor = `${semver.major}.${semver.minor}`;
  if (!SUPPORTED_VERSIONS.includes(majorMinor)) {
    throw new Error(`Unsupported version:${semverStr}`);
  }

  // TODO: investigate how/if this can be better done with types alone
  // and dynamic pattern matching
  return match(semver)
    .with({ major: 0, minor: 7 }, () => validator07.parseConfig)
    .otherwise(() => {
      throw new Error(`Unsupported version:${semverStr}`);
    });
};
