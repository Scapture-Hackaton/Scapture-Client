module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'prettier',
    'react-hooks',
    'prefer-arrow',
    'import',
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    camelcase: ['error', { properties: 'always' }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/button-has-type': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-console': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^(is|set)[A-Z].*$',
      },
    ],
  },
};
