module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    indent: ['off', 'tab'],
    'no-plusplus': 'off',
    'prefer-const': 'off',
    'import/named': 'off',
    'import/prefer-default-export': 'off',
    quotes: 'off',
    'max-len': ['error', 150],
  },
  plugins: ['jest'],
};
