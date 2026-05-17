/**
 * ESLint flat config (ESLint 9 + Next.js 16).
 *
 * Built directly on typescript-eslint + the Next.js plugin to avoid the
 * FlatCompat / eslint-config-next circular reference bug.
 */
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: [
      '.next/**',
      '.claude/**',
      'node_modules/**',
      'public/**',
      'patches/**',
      'src/types/database.ts',
    ],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
