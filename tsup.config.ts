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
  dts: false, // Disabled temporarily due to memory issues
  sourcemap: false, // Disabled to reduce memory usage during build
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
  // Main exports: ESM + CJS for backward compatibility
  {
    ...sharedConfig,
    entry: {
      index: 'src/index.ts',
      icons: 'src/icons.ts',
    },
    format: ['esm', 'cjs'],
    splitting: false, // Disable splitting for main exports to avoid chunk conflicts
    onSuccess: 'echo "✅ Main exports built (ESM + CJS)"',
  },
  // Component exports: ESM-only for tree-shaking
  {
    ...sharedConfig,
    entry: componentEntries,
    format: ['esm'],
    splitting: true, // Enable splitting to create shared chunks
    onSuccess: 'echo "✅ Component exports built (ESM only)"',
  },
]);
