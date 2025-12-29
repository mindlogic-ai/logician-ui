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

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    icons: 'src/icons.ts',
    ...componentEntries, // Add all component entries (button.mjs, card.mjs, etc.)
  },
  format: ['esm'], // Only ESM to enable proper tree-shaking
  dts: false, // Disabled temporarily due to memory issues
  splitting: true, // Enable splitting to create shared chunks
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
  onSuccess: 'echo "✅ tsup build completed successfully!"',
});
