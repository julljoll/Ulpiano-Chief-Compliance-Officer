import globals from 'globals';

export default [
  {
    files: ['src/scripts/**/*.js', 'src/modules/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      'no-alert': 'off',
      'prefer-template': 'error',
      'object-shorthand': 'error',
    },
  },
];
