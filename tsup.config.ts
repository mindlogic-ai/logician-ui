import esbuildSvgr from 'esbuild-plugin-svgr';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/icons.ts'],
  format: ['esm', 'cjs'],
  dts: true, // ✅ Re-enabled now that TS errors are fixed!
  splitting: true, // Enable code splitting for better memory usage
  sourcemap: process.env.NODE_ENV !== 'production', // Only in dev
  clean: true,
  esbuildPlugins: [esbuildSvgr()], // Handle SVG files as React components
  external: [
    // Core React
    'react',
    'react-dom',
    // Chakra UI ecosystem
    '@chakra-ui/react',
    '@emotion/react',
    '@emotion/styled',
    'framer-motion',
    // Heavy dependencies - let consumers bundle them
    '@mdxeditor/editor',
    /^react-syntax-highlighter/,
    /^react-icons/,
    /^recharts/,
    'react-markdown',
    'katex',
    'lodash',
    /^date-fns/,
  ],
  banner: {
    js: '"use client"',
  },
  treeshake: true,
  minify: false, // Keep readable for debugging, consumers can minify
  onSuccess: 'echo "✅ tsup build completed successfully!"',
});
