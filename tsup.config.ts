import { defineConfig } from 'tsup';
import esbuildSvgr from 'esbuild-plugin-svgr';
import { globSync } from 'glob';
import path from 'path';

// Generate entry points for each component
const componentEntries = Object.fromEntries(
  globSync('src/components/*/index.{ts,tsx}').map((file) => {
    // Extract component name from path: src/components/Button/index.tsx -> button
    const componentName = path.basename(path.dirname(file)).toLowerCase();
    return [componentName, file];
  })
);

const sharedConfig = {
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
    'react-syntax-highlighter',
    'recharts',
    'react-markdown',
    'katex',
    // Other large deps
    'lodash',
    'date-fns',
  ],
  banner: {
    js: '"use client"',
  },
  treeshake: true,
  minify: false, // Keep readable for debugging, consumers can minify
};

export default defineConfig([
  // Main exports: ESM + CJS for backward compatibility with full type definitions
  {
    ...sharedConfig,
    entry: {
      index: 'src/index.ts',
      icons: 'src/icons.ts',
    },
    format: ['esm', 'cjs'],
    dts: true, // Generate type definitions for main exports
    sourcemap: true, // Enable sourcemaps for main exports
    splitting: false, // Disable splitting for main exports to avoid chunk conflicts
    onSuccess: 'echo "✅ Main exports built (ESM + CJS + DTS)"',
  },
  // Component exports: ESM-only for tree-shaking (no DTS to avoid memory issues)
  {
    ...sharedConfig,
    entry: componentEntries,
    format: ['esm'],
    dts: false, // Disabled: generating DTS for 63 components exhausts worker memory
    sourcemap: false, // Disabled to reduce build size
    splitting: true, // Enable splitting to create shared chunks
    onSuccess: 'echo "✅ Component exports built (ESM only, types from main export)"',
  },
]);
