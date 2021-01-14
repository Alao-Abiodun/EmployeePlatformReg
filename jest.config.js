/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  globalSetup: './__tests__/setup.js',
  globalTeardown: './__tests__/teardown.js',
  setupFilesAfterEnv: ['./__tests__/setupAfterEnv.js'],
  testEnvironment: './__tests__/environment.js',
  testMatch: ['**/__tests__/**/*.test.js'],
};
