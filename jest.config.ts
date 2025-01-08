/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.spec.ts', '<rootDir>/tests/**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

export default config;
