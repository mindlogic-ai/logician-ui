import React from 'react';
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
  },
  initialGlobals: {
    language: 'en',
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
    darkMode: {
      stylePreview: true,
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

      if (disableProvider) {
        return <Story />;
      }

      return (
        <LogicianProvider language={language}>
          <Story />
        </LogicianProvider>
      );
    },
  ],
};

export default preview;
