import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { ProgressSegment, SegmentedProgressBar } from './';

const meta = {
  title: 'Components/SegmentedProgressBar',
  component: SegmentedProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          'A segmented progress bar that displays multiple progress segments within a single container. Useful for showing different categories of progress like success/error counts.',
      },
    },
  },
  args: {
    max: 100,
    height: '12px',
  },
  argTypes: {
    max: {
      control: 'number',
      description: 'Maximum value for the progress bar',
    },
    height: {
      control: 'text',
      description: 'Height of the progress bar',
    },
  },
  render: (args) => (
    <Box width="400px">
      <SegmentedProgressBar {...args}>
        <ProgressSegment value={30} filledTrackColor="primary.main" />
        <ProgressSegment value={20} filledTrackColor="success.main" />
      </SegmentedProgressBar>
    </Box>
  ),
} satisfies Meta<typeof SegmentedProgressBar>;

export default meta;

type Story = StoryObj<typeof SegmentedProgressBar>;

export const Default: Story = {
  args: {
    max: 100,
    height: '12px',
  },
};

export const BasicUsage: Story = {
  render: () => (
    <VStack gap={6} align="stretch" width="400px">
      <Box>
        <Text mb={2} fontWeight="semibold">
          Basic Two-Segment Progress
        </Text>
        <SegmentedProgressBar max={100} height="12px">
          <ProgressSegment value={60} filledTrackColor="primary.main" />
          <ProgressSegment value={25} filledTrackColor="success.main" />
        </SegmentedProgressBar>
        <Flex justify="space-between" mt={1} fontSize="sm" color="gray.600">
          <Text>Primary: 60</Text>
          <Text>Success: 25</Text>
          <Text>Remaining: 15</Text>
        </Flex>
      </Box>
    </VStack>
  ),
};

export const MultipleSegments: Story = {
  render: () => (
    <VStack gap={6} align="stretch" width="400px">
      <Box>
        <Text mb={2} fontWeight="semibold">
          Multiple Segments with Different Colors
        </Text>
        <SegmentedProgressBar max={200} height="16px">
          <ProgressSegment value={80} filledTrackColor="primary.main" />
          <ProgressSegment value={45} filledTrackColor="success.main" />
          <ProgressSegment value={30} filledTrackColor="warning.main" />
          <ProgressSegment value={25} filledTrackColor="danger.main" />
        </SegmentedProgressBar>
        <Flex justify="space-between" mt={2} fontSize="sm" color="gray.600">
          <Text>Primary: 80</Text>
          <Text>Success: 45</Text>
          <Text>Warning: 30</Text>
          <Text>Error: 25</Text>
        </Flex>
      </Box>
    </VStack>
  ),
};

export const WithStripes: Story = {
  render: () => (
    <VStack gap={6} align="stretch" width="400px">
      <Box>
        <Text mb={2} fontWeight="semibold">
          Progress Segments with Stripes
        </Text>
        <SegmentedProgressBar max={100} height="16px">
          <ProgressSegment
            value={45}
            filledTrackColor="primary.main"
            hasStripe
          />
          <ProgressSegment
            value={30}
            filledTrackColor="success.main"
            hasStripe
          />
          <ProgressSegment
            value={15}
            filledTrackColor="danger.main"
            hasStripe
          />
        </SegmentedProgressBar>
        <Flex justify="space-between" mt={2} fontSize="sm" color="gray.600">
          <Text>Completed: 45</Text>
          <Text>In Progress: 30</Text>
          <Text>Failed: 15</Text>
        </Flex>
      </Box>
    </VStack>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <VStack gap={6} align="stretch" width="400px">
      <Box>
        <Text mb={2} fontWeight="semibold">
          Small Progress Bar (8px)
        </Text>
        <SegmentedProgressBar max={100} height="8px">
          <ProgressSegment value={70} filledTrackColor="primary.main" />
          <ProgressSegment value={20} filledTrackColor="success.main" />
        </SegmentedProgressBar>
      </Box>

      <Box>
        <Text mb={2} fontWeight="semibold">
          Medium Progress Bar (12px)
        </Text>
        <SegmentedProgressBar max={100} height="12px">
          <ProgressSegment value={70} filledTrackColor="primary.main" />
          <ProgressSegment value={20} filledTrackColor="success.main" />
        </SegmentedProgressBar>
      </Box>

      <Box>
        <Text mb={2} fontWeight="semibold">
          Large Progress Bar (20px)
        </Text>
        <SegmentedProgressBar max={100} height="20px">
          <ProgressSegment value={70} filledTrackColor="primary.main" />
          <ProgressSegment value={20} filledTrackColor="success.main" />
        </SegmentedProgressBar>
      </Box>
    </VStack>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <VStack gap={6} align="stretch" width="500px">
      <Box>
        <Text mb={2} fontWeight="semibold">
          Member Invitation Progress
        </Text>
        <Text mb={4} fontSize="sm" color="gray.600">
          Inviting 1,500 members in batches of 100
        </Text>

        <SegmentedProgressBar max={1500} height="14px">
          <ProgressSegment
            value={1200}
            filledTrackColor="success.main"
            hasStripe
          />
          <ProgressSegment
            value={150}
            filledTrackColor="danger.main"
            hasStripe
          />
        </SegmentedProgressBar>

        <Flex justify="space-between" mt={2} fontSize="sm" color="gray.600">
          <Text color="success.600">✓ 1,200 successful</Text>
          <Text color="danger.600">✗ 150 failed</Text>
          <Text>90% complete</Text>
        </Flex>
      </Box>
    </VStack>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <VStack gap={6} align="stretch" width="400px">
      <Box>
        <Text mb={2} fontWeight="semibold">
          Empty Progress Bar
        </Text>
        <SegmentedProgressBar max={100} height="12px">
          {/* No segments - shows empty state */}
        </SegmentedProgressBar>
        <Text mt={2} fontSize="sm" color="gray.600">
          No progress yet
        </Text>
      </Box>
    </VStack>
  ),
};

export const SingleSegment: Story = {
  render: () => (
    <VStack gap={6} align="stretch" width="400px">
      <Box>
        <Text mb={2} fontWeight="semibold">
          Single Segment Progress
        </Text>
        <SegmentedProgressBar max={100} height="12px">
          <ProgressSegment value={75} filledTrackColor="primary.main" />
        </SegmentedProgressBar>
        <Text mt={2} fontSize="sm" color="gray.600">
          75% complete
        </Text>
      </Box>
    </VStack>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <VStack gap={6} align="stretch" width="400px">
      <Box>
        <Text mb={2} fontWeight="semibold">
          Custom Color Segments
        </Text>
        <SegmentedProgressBar max={100} height="16px">
          <ProgressSegment value={25} filledTrackColor="#FF6B6B" />
          <ProgressSegment value={25} filledTrackColor="#4ECDC4" />
          <ProgressSegment value={25} filledTrackColor="#45B7D1" />
          <ProgressSegment value={20} filledTrackColor="#96CEB4" />
        </SegmentedProgressBar>
        <Flex justify="space-between" mt={2} fontSize="sm" color="gray.600">
          <Text>Red: 25</Text>
          <Text>Teal: 25</Text>
          <Text>Blue: 25</Text>
          <Text>Green: 20</Text>
        </Flex>
      </Box>
    </VStack>
  ),
};
