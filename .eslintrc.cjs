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

    // 'react-hooks/exhaustive-deps': [
    //   'warn',
    //   {
    //     additionalHooks: '(useMyCustomHook|set.*)', // set으로 시작하는 훅 무시
    //   },
    // ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^set[A-Z].*$', // set으로 시작하는 변수 무시
      },
    ],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useMyCustomHook|set.*)', // set으로 시작하는 훅 무시
      },
    ],

    // catch 문에서 any 타입을 사용할 수 있도록 설정
    '@typescript-eslint/no-explicit-any': 'off',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    // React.FC 사용하지 않는게 좋기 때문에 함수형 컴포넌트의 리턴값 타입 지정을 막기
    '@typescript-eslint/explicit-function-return-type': 'off',

    // camelcase: ['error', { properties: 'always' }],

    // jsx 파일 확장자 .jx, .jsx, .ts, .tsx 허용
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
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

    // 비활성화된 'no-unused-vars' 규칙
    // 'no-unused-vars': 'off',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^(is|set)[A-Z].*$', // 여기에서 변수 이름 패턴을 지정
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
