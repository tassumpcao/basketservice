const filenameKebabRegex =
  '^([a-z0-9]+((-[a-z0-9]+){1,})?)*(.)?([a-z0-9]+((-[a-z0-9]+){1,})?)$';
module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    'jest/globals': true,
  },
  plugins: ['no-loops', 'filenames', 'jest'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:node/recommended-script',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    semi: [2, "always"],
    indent: 2,
    'no-underscore-dangle': 0,
    'no-loops/no-loops': 2,
    'filenames/match-regex': [2, filenameKebabRegex, true],
    "space-infix-ops": ["error", { "int32Hint": true }],
    complexity: [1, 4],
    "max-statements": [1, 10],
    "max-statements-per-line": [1, {
    max: 2
    }],
    "max-nested-callbacks": [1, 4],
    "keyword-spacing": "error",
    "arrow-spacing": "error",
    "comma-spacing": "error",
    "key-spacing": "error",
    "func-call-spacing": "error",
    "object-curly-spacing": "error",
    "semi-spacing":"error",
    "block-spacing": "error"
  },
};