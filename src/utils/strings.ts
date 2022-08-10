import { Semver } from '../types';

export const parseSemver = (semverStr: string): Semver => {
  const split = semverStr.split('.');
  if (split.length !== 3) {
    throw new Error(`Invalid version: ${semverStr}`);
  }

  return {
    major: Number(split[0]!),
    minor: Number(split[1]!),
    patch: Number(split[2]!),
  };
};
