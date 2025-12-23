import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/theme/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-docs'],
  staticDirs: ['../public'],
  refs: () => ({}),
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  docs: {
    autodocs: false,
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const svgr = await import('vite-plugin-svgr');

    return mergeConfig(config, {
      plugins: [
        svgr.default({
          include: '**/*.svg',
        }),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
      optimizeDeps: {
        include: ['framer-motion'],
      },
    });
  },
};

export default config;
