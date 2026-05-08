import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import postcss from 'rollup-plugin-postcss';

// Create input object for all entries
const input = {
  index: 'src/index.ts',
  icons: 'src/icons.ts',
  tokens: 'src/tokens.ts',
};

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
      inject: (cssVariableName) =>
        `(function(){if(typeof document==='undefined')return;var s=document.createElement('style');s.textContent=${cssVariableName};document.head.appendChild(s);}());`,
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
