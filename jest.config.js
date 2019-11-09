module.exports = {
  testEnvironment: 'node',
  verbose: true,
  globalSetup: '<rootDir>/tests/setup-files/global-setup.js',
  coveragePathIgnorePatterns: ['/node_modules/']
};