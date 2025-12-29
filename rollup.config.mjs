import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import { glob } from 'glob';
import path from 'path';
import postcss from 'rollup-plugin-postcss';

// Get all component entries
const componentEntries = glob.sync('src/components/*/index.ts');

// Create input object for all entries
const input = {
  index: 'src/index.ts',
  icons: 'src/icons.ts',
};

// Add component entries
componentEntries.forEach((entry) => {
  const componentName = path.basename(path.dirname(entry));
  input[`components/${componentName}/index`] = entry;
});

// External dependencies - don't bundle these
const external = [
  // Core React
  'react',
  'react-dom',
  'react/jsx-runtime',
  // Chakra UI ecosystem
  '@chakra-ui/react',
  '@emotion/react',
  '@emotion/styled',
  'framer-motion',
  // Heavy dependencies
  '@mdxeditor/editor',
  /^react-syntax-highlighter/,
  /^react-icons/,
  /^recharts/,
  'react-markdown',
  'katex',
  'lodash',
  /^date-fns/,
  // Other deps that should be external
  'react-is',
  '@tanstack/react-virtual',
  'chakra-dayzed-datepicker',
  'libphonenumber-js',
  'polished',
  'react-pin-input',
  'react-select',
  'react-spinners',
  'react-textarea-autosize',
  /^rehype-/,
  /^remark-/,
];

// Check if a module ID matches external patterns
const isExternal = (id) => {
  return external.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(id);
    }
    return id === pattern || id.startsWith(pattern + '/');
  });
};

export default {
  input,
  output: [
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true, // Keep module structure, no chunks
      preserveModulesRoot: 'src',
      banner: '"use client";',
      sourcemap: true,
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].js',
      preserveModules: true,
      preserveModulesRoot: 'src',
      banner: '"use client";',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: isExternal,
  plugins: [
    svgr(),
    json(),
    postcss({
      modules: true,
      extract: false, // Inject CSS into JS
      minimize: true,
    }),
    resolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
    }),
  ],
  onwarn(warning, warn) {
    // Ignore "use client" directive warnings
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
    warn(warning);
  },
};
