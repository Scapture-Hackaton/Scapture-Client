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
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
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
    // React.FC 사용하지 않는게 좋기 때문에 함수형 컴포넌트의 리턴값 타입 지정을 막기
    "@typescript-eslint/explicit-function-return-type": "off",

    camelcase: ['error', { properties: 'always' }],

    // jsx 파일 확장자 .jx, .jsx, .ts, .tsx 허용
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],

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
    'linebreak-style': 'off', // 줄 끝 문자 스타일 무시

    //prettier eslint 통합 설정
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // Prettier의 endOfLine 옵션을 LF로 설정
      },
    ],
  },
};
