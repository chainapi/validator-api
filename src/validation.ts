import { match } from 'ts-pattern';
import * as validator07 from 'validator-0.7';
import { Semver } from './types';
import { parseSemver } from './utils';

export const validate = (config: any) => {
  const semver = extractVersionFromConfig(config);
  const validate = getVersionValidator(semver);

  const result = validate(config);
  if (!result.success) {
    return { valid: false, errors: (result.error as any).issues };
  }
  return { valid: true, errors: [] };
};

const getVersionValidator = (semver: Semver) => {
  return match(semver)
    .with({ major: 0, minor: 7 }, () => validator07.parseConfig)
    .otherwise(() => {
      throw new Error(`Unsupported version: v${semver.major}.${semver.minor}.${semver.patch}`);
    });
};

export const extractVersionFromConfig = (config: any): Semver => {
  // Let this throw if the config is malformed
  return parseSemver(config.nodeSettings.nodeVersion);
};
