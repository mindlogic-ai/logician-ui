import { Box, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from '.';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    value: 60,
  },
  argTypes: {
    value: { control: 'number' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Basic: Story = {};

// All sizes in one view
export const AllSizes: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      <Box>
        <Text mb={2} fontSize="subtext" fontWeight="medium">
          Extra Small (xs) - 4px
        </Text>
        <ProgressBar size="xs" value={60} />
      </Box>
      <Box>
        <Text mb={2} fontSize="subtext" fontWeight="medium">
          Small (sm) - 8px
        </Text>
        <ProgressBar size="sm" value={60} />
      </Box>
      <Box>
        <Text mb={2} fontSize="subtext" fontWeight="medium">
          Medium (md) - 16px (Default)
        </Text>
        <ProgressBar size="md" value={60} />
      </Box>
      <Box>
        <Text mb={2} fontSize="subtext" fontWeight="medium">
          Large (lg) - 24px
        </Text>
        <ProgressBar size="lg" value={60} />
      </Box>
      <Box>
        <Text mb={2} fontSize="subtext" fontWeight="medium">
          Extra Large (xl) - 32px
        </Text>
        <ProgressBar size="xl" value={60} />
      </Box>
    </VStack>
  ),
};
