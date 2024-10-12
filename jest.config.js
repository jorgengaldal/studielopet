/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    // Shoutout to mengxinssfd from https://github.com/kulshekhar/ts-jest/issues/4081
    "^.+.tsx?$": ["ts-jest",{tsconfig: "./tsconfig.test.json"}],
  },
};