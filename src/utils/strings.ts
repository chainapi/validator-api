import { Semver } from '../types';

export const parseSemver = (semverStr: string): Semver => {
  const split = semverStr.split('.');
  return {
    major: Number(split[0]!),
    minor: Number(split[1]!),
    patch: Number(split[2]!),
  };
};
