import path from 'path';

import { defineConfig } from 'vitest/config';

/**
 * Codemod tests only. The root vitest.config.ts covers `src/**` with jsdom and
 * React; the codemods are Node-only CommonJS run by jscodeshift, so they get
 * their own small config:
 *
 *   npx vitest run --config codemods/vitest.config.ts
 */
export default defineConfig({
  root: path.resolve(__dirname, '..'),
  test: {
    environment: 'node',
    globals: false,
    include: ['codemods/**/*.test.ts'],
    exclude: ['node_modules', 'dist', 'codemods/**/__testfixtures__/**'],
    testTimeout: 30000,
  },
});
