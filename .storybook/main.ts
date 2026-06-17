import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    // Standalone MDX docs pages (e.g. theme guides). In Storybook 8 docs MDX is
    // a plain `*.mdx` — `*.stories.mdx` (MDX-in-CSF) was removed.
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
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
    });
  },
};

export default config;
