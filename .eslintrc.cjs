module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error',
    'no-duplicate-imports': 'error',
    'react-hooks/exhaustive-deps': 'ignore',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ["@myHooks", "./src/hooks"],
          ["@myComponents", "./src/components"],
          ["@myUtils", "./src/utils"],
          ["@myStore", "./src/store"],
          ["@myTypes", "./src/types"],
          ["@myPages", "./src/pages"],
          ["@myAssets", "./src/assets"],
          ["@myContants", "./src/constants"],
        ]
      }
    }
  }
}
