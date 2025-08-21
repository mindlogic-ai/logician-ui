import React from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import { PageLoader } from './PageLoader';

const meta: Meta<typeof PageLoader> = {
  title: 'Components/PageLoader',
  component: PageLoader,
  argTypes: {
    isLoading: {
      type: 'boolean',
    },
  },
};

export default meta;
type Story = StoryFn<typeof PageLoader>;

export const Basic: Story = (args) => {
  return (
    <Box position="relative" p="128px" bg="red">
      <PageLoader {...args} />
    </Box>
  );
};
Basic.args = {
  isLoading: true,
};
