import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { PageLoader } from './PageLoader';

const meta = {
  title: 'Components/PageLoader',
  component: PageLoader,
  argTypes: {
    isLoading: {
      type: 'boolean',
    },
  },
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof PageLoader>;

export const Basic: Story = {
  args: {
    isLoading: true,
  },
  render: (args) => {
    return (
      <Box position="relative" p="128px" bg="danger.bg">
        <PageLoader {...args} />
      </Box>
    );
  },
};

export const Thinking: Story = {
  args: {
    isLoading: true,
    variant: 'thinking',
  },
  render: (args) => {
    return (
      <Box position="relative" p="128px" bg="danger.bg">
        <PageLoader {...args} />
      </Box>
    );
  },
};
