module.exports = {
  ...require('@ankr.com/eslint-config'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
    project: ['./tsconfig.json'],
  },
  rules: {
    ...require('@ankr.com/eslint-config').rules,
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-curly-newline': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-unused-vars': 'error',
    'react/jsx-newline': [
      'error',
      {
        prevent: false,
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
  },
};
