module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  globalSetup: '<rootDir>/test/helpers/setupEnv.js',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/test/helpers/fileTransformer.js'
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/test/__mocks__/styleMock.js'
  }
};
