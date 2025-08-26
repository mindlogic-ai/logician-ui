import React from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import { SectionLoader } from './SectionLoader';

const meta: Meta<typeof SectionLoader> = {
  title: 'Components/SectionLoader',
  component: SectionLoader,
  argTypes: {
    isLoading: {
      type: 'boolean',
    },
  },
};

export default meta;
type Story = StoryFn<typeof SectionLoader>;

export const Basic: Story = (args) => {
  return (
    <Box position="relative" p="128px" bg="red">
      <SectionLoader {...args} />
    </Box>
  );
};
