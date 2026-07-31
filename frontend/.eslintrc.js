// .eslintrc.js
module.exports = {
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true, // Define Jest environment
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react', 'jest'], // Include Jest plugin
    rules: {
      // Your custom ESLint rules
    },
  };
  