import path from 'path';
import { defineConfig } from 'vitest/config';

/**
 * Codemod and ESLint-rule tests only. The root vitest.config.ts covers
 * `src/**` with jsdom and React; the codemods (run by jscodeshift) and the
 * eslint/ rules are Node-only CommonJS, so they get their own small config:
 *
 *   npx vitest run --config codemods/vitest.config.ts
 */
export default defineConfig({
  root: path.resolve(__dirname, '..'),
  test: {
    environment: 'node',
    globals: false,
    include: ['codemods/**/*.test.ts', 'eslint/**/*.test.ts'],
    exclude: ['node_modules', 'dist', 'codemods/**/__testfixtures__/**'],
    testTimeout: 30000,
  },
  // The parity tests import the runtime legacy mappers from src/.
  resolve: { alias: { '@': path.resolve(__dirname, '../src') } },
});
