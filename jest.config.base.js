module.exports = {
  modulePaths: ['<rootDir>/dist'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
  collectCoverage: true,

  coverageReporters: ['lcov', 'text', 'text-summary'],
  collectCoverageFrom: ['<rootDir>/src/**/*ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  testTimeout: 30000,
};
