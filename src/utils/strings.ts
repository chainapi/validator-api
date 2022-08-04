import { Semver } from '../types';

export const parseSemver = (semverStr: string): Semver => {
  const split = semverStr.split('.');

  // Let this throw if given an invalid semver string
  return {
    major: Number(split[0]!),
    minor: Number(split[1]!),
    patch: Number(split[2]!),
  };
};
