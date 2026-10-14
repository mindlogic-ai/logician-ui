import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';

import { LogicianProvider } from '../src/components/LogicianProvider/LogicianProvider';

const preview: Preview = {
  globalTypes: {
    language: {
      description: 'Language for internationalization',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ko', title: '한국어' },
          { value: 'ja', title: '日本語' },
          { value: 'zh', title: '中文' },
          { value: 'es', title: 'Español' },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Light / dark color mode',
      toolbar: {
        title: 'Color mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    language: 'en',
    colorMode: 'light',
  },
  parameters: {
    // Global parameters for all stories
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Setup', 'Theme', 'Components', 'Chat', '*'],
        locales: 'en-US',
        includeName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Check if the story has disabled the LogicianProvider
      // To disable for a specific story, add: parameters: { disableLogicianProvider: true }
      const disableProvider = context.parameters?.disableLogicianProvider;
      const language = context.globals?.language || 'en';
      const colorMode: 'light' | 'dark' =
        context.globals?.colorMode === 'dark' ? 'dark' : 'light';

      // Drive the same `.dark` class + `color-scheme` the runtime provider would,
      // so token `_dark` conditions resolve and the canvas reflects the mode. The
      // Storybook toolbar is the single source of truth for the preview here.
      useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', colorMode === 'dark');
        root.classList.toggle('light', colorMode === 'light');
        root.style.colorScheme = colorMode;
        // Paint the iframe body with the semantic canvas token.
        document.body.style.backgroundColor = 'var(--chakra-colors-bg-canvas)';
      }, [colorMode]);

      if (disableProvider) {
        return <Story />;
      }

      return (
        <LogicianProvider language={language} forcedColorMode={colorMode}>
          <Story />
        </LogicianProvider>
      );
    },
  ],
};

export default preview;
