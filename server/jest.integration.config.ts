const config = {
    globalSetup: "./test/global-setup.ts",
    globalTeardown: "./test/global-teardown.ts",
    clearMocks: true,
    testTimeout: 1500,
    testEnvironment: 'node',
    preset: 'ts-jest',
  };
  
export default config;
  