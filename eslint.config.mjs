import nextConfig from 'eslint-config-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { fixupConfigRules } from '@eslint/compat';

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      '.husky/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },
  // Next.js flat config — wrapped to fix legacy eslint-plugin-react context APIs
  ...fixupConfigRules(nextConfig),
  // @typescript-eslint recommended rules (plugin already registered by nextConfig)
  ...tsPlugin.configs['flat/recommended'].map(({ plugins: _p, ...config }) => config),
  // Disable formatting rules that conflict with Prettier
  prettierConfig,
  // Custom rules + prettier plugin
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
