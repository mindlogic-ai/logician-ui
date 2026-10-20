import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { SectionLoader } from './SectionLoader';

const meta = {
  title: 'Components/SectionLoader',
  component: SectionLoader,
  args: {
    isLoading: true,
  },
  render: (args) => {
    return (
      <Box p="128px" bg="primary.washActive">
        <SectionLoader {...args} />
      </Box>
    );
  },
} satisfies Meta<typeof SectionLoader>;

export default meta;

type Story = StoryObj<typeof SectionLoader>;

export const Basic: Story = {};

export const Thinking: Story = {
  args: {
    isLoading: true,
    variant: 'thinking',
  },
};
