import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-support/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Its `main` is CommonJS, which requires the CJS build of
      // @chakra-ui/react: a second copy whose context the tests' (ESM)
      // ChakraProvider never fills. Use its ESM build, as the bundlers do.
      'chakra-dayzed-datepicker': path.resolve(
        __dirname,
        './node_modules/chakra-dayzed-datepicker/dist/chakra-dayzed-datepicker.esm.js'
      ),
    },
  },
});
