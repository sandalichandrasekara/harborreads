module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['jest-environment-jsdom'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  roots: ['<rootDir>/'],
};
