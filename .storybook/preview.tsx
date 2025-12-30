import React from 'react';
import type { Preview } from '@storybook/react';
import { LogicianProvider } from '../src/components/LogicianProvider/LogicianProvider';

const preview: Preview = {
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

      if (disableProvider) {
        return <Story />;
      }

      return (
        <LogicianProvider>
          <Story />
        </LogicianProvider>
      );
    },
  ],
};

export default preview;
