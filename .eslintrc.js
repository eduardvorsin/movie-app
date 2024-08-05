module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'jest': true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:jest/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:testing-library/react',
    'next/core-web-vitals'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [
    'jest',
    'import',
    '@typescript-eslint',
    'jest-dom',
    'jsx-a11y',
    'testing-library'
  ],
  ignorePatterns: [
    'node_modules/**'
  ],
  rules: {
    'linebreak-style': [
      'warn',
      process.platform === 'win32' ? 'windows' : 'unix',
    ],
    'import/extensions': [
      'error',
      {
        'js': 'never',
        'ts': 'never',
        'jsx': 'never',
        'tsx': 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*{.,_}{test,spec}.{js,jsx,ts,tsx}',
          '**/tests/**.{js,jsx,ts,tsx}',
          '**/jest.config.{ts,js}',
          '**/jest.setup.{ts,js}',
          '**/*.stories.*',
          '**/jest.polyfills.js',
          '**/.storybook/**/*.*',
          '**/msw/**/*.{js,jsx,ts,tsx}',
        ],
        optionalDependencies: false
      }
    ]
  },

  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
};