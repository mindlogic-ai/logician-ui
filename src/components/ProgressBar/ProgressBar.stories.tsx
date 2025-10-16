import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { VStack, Box, Text } from '@chakra-ui/react';

import { ProgressBar } from '.';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    value: 60,
  },
  argTypes: {
    value: { control: 'number' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryFn<typeof ProgressBar>;

export const Basic: Story = (args) => <ProgressBar {...args} />;

// All sizes in one view
export const AllSizes: Story = () => (
  <VStack spacing={4} align="stretch">
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Extra Small (xs) - 4px
      </Text>
      <ProgressBar size="xs" value={60} />
    </Box>
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Small (sm) - 8px
      </Text>
      <ProgressBar size="sm" value={60} />
    </Box>
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Medium (md) - 16px (Default)
      </Text>
      <ProgressBar size="md" value={60} />
    </Box>
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Large (lg) - 24px
      </Text>
      <ProgressBar size="lg" value={60} />
    </Box>
    <Box>
      <Text mb={2} fontSize="sm" fontWeight="medium">
        Extra Large (xl) - 32px
      </Text>
      <ProgressBar size="xl" value={60} />
    </Box>
  </VStack>
);
