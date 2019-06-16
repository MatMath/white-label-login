module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'mocha',
    'chai-expect',
  ],
  rules: {
    "mocha/no-exclusive-tests": "error",
    "max-len": ["error", {
        "code": 200,
        "ignoreComments": true,
        "ignoreTrailingComments": true
      }]
  },
};
