import { useState } from 'react';
import { Box, Flex, Text, VStack, Button, HStack } from '@chakra-ui/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { ProgressSegment, SegmentedProgressBar } from './';

const meta: Meta<typeof SegmentedProgressBar> = {
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
};

export default meta;

type Story = StoryFn<typeof SegmentedProgressBar>;

const Template: Story = (args) => (
  <Box width="400px">
    <SegmentedProgressBar {...args}>
      <ProgressSegment value={30} filledTrackColor="primary.main" />
      <ProgressSegment value={20} filledTrackColor="success.main" />
    </SegmentedProgressBar>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  max: 100,
  height: '12px',
};

export const BasicUsage: Story = () => (
  <VStack spacing={6} align="stretch" width="400px">
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
);

export const MultipleSegments: Story = () => (
  <VStack spacing={6} align="stretch" width="400px">
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
);

export const WithStripes: Story = () => (
  <VStack spacing={6} align="stretch" width="400px">
    <Box>
      <Text mb={2} fontWeight="semibold">
        Progress Segments with Stripes
      </Text>
      <SegmentedProgressBar max={100} height="16px">
        <ProgressSegment value={45} filledTrackColor="primary.main" hasStripe />
        <ProgressSegment value={30} filledTrackColor="success.main" hasStripe />
        <ProgressSegment value={15} filledTrackColor="danger.main" hasStripe />
      </SegmentedProgressBar>
      <Flex justify="space-between" mt={2} fontSize="sm" color="gray.600">
        <Text>Completed: 45</Text>
        <Text>In Progress: 30</Text>
        <Text>Failed: 15</Text>
      </Flex>
    </Box>
  </VStack>
);

export const DifferentSizes: Story = () => (
  <VStack spacing={6} align="stretch" width="400px">
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
);

export const RealWorldExample: Story = () => (
  <VStack spacing={6} align="stretch" width="500px">
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
        <ProgressSegment value={150} filledTrackColor="danger.main" hasStripe />
      </SegmentedProgressBar>

      <Flex justify="space-between" mt={2} fontSize="sm" color="gray.600">
        <Text color="success.600">✓ 1,200 successful</Text>
        <Text color="danger.600">✗ 150 failed</Text>
        <Text>90% complete</Text>
      </Flex>
    </Box>
  </VStack>
);

export const EmptyState: Story = () => (
  <VStack spacing={6} align="stretch" width="400px">
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
);

export const SingleSegment: Story = () => (
  <VStack spacing={6} align="stretch" width="400px">
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
);

export const CustomColors: Story = () => (
  <VStack spacing={6} align="stretch" width="400px">
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
);

/**
 * Component Test: SegmentedProgressBar 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 여러 세그먼트가 올바르게 표시되는지
 * - 현재 활성 세그먼트가 강조되는지
 *
 * Bad Path:
 * - 빈 세그먼트 배열일 때 처리되는지
 */
type InteractionStory = StoryObj<typeof SegmentedProgressBar>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [activeSegment, setActiveSegment] = useState(0);
    const segments = [
      { value: 30, color: 'primary.main', label: 'Primary' },
      { value: 25, color: 'success.main', label: 'Success' },
      { value: 20, color: 'warning.main', label: 'Warning' },
      { value: 15, color: 'danger.main', label: 'Danger' },
    ];

    return (
      <VStack spacing={8} p={8} align="stretch" width="600px">
        <Box>
          <Text fontWeight="600" mb={4}>Segment Controls</Text>
          <HStack spacing={3} mb={4}>
            {segments.map((seg, index) => (
              <Button
                key={index}
                onClick={() => setActiveSegment(index)}
                data-testid={`activate-segment-${index}`}
                size="sm"
                colorScheme={activeSegment === index ? 'blue' : 'gray'}
              >
                {seg.label}
              </Button>
            ))}
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Active Segment: {segments[activeSegment].label} ({segments[activeSegment].value})
          </Text>
        </Box>

        <Box>
          <Text fontWeight="600" mb={2}>Multiple Segments (4 segments)</Text>
          <SegmentedProgressBar max={100} height="16px" data-testid="multi-segment-bar">
            {segments.map((seg, index) => (
              <ProgressSegment
                key={index}
                value={seg.value}
                filledTrackColor={seg.color}
                opacity={activeSegment === index ? 1 : 0.6}
                data-testid={`segment-${index}`}
              />
            ))}
          </SegmentedProgressBar>
          <Flex justify="space-between" mt={2} fontSize="sm" color="gray.600">
            {segments.map((seg, index) => (
              <Text key={index}>{seg.label}: {seg.value}</Text>
            ))}
          </Flex>
        </Box>

        <Box>
          <Text fontWeight="600" mb={2}>Two Segments</Text>
          <SegmentedProgressBar max={100} height="14px" data-testid="two-segment-bar">
            <ProgressSegment value={60} filledTrackColor="primary.main" data-testid="two-seg-0" />
            <ProgressSegment value={25} filledTrackColor="success.main" data-testid="two-seg-1" />
          </SegmentedProgressBar>
          <Flex justify="space-between" mt={2} fontSize="sm" color="gray.600">
            <Text>Primary: 60</Text>
            <Text>Success: 25</Text>
            <Text>Remaining: 15</Text>
          </Flex>
        </Box>

        <Box>
          <Text fontWeight="600" mb={2}>Single Segment</Text>
          <SegmentedProgressBar max={100} height="14px" data-testid="single-segment-bar">
            <ProgressSegment value={75} filledTrackColor="primary.main" data-testid="single-seg" />
          </SegmentedProgressBar>
          <Text mt={2} fontSize="sm" color="gray.600">
            75% complete
          </Text>
        </Box>

        <Box>
          <Text fontWeight="600" mb={2}>Empty Segments (No children)</Text>
          <SegmentedProgressBar max={100} height="14px" data-testid="empty-segment-bar">
            {/* No segments */}
          </SegmentedProgressBar>
          <Text mt={2} fontSize="sm" color="gray.600">
            0% - No progress yet
          </Text>
        </Box>
      </VStack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('여러 세그먼트가 올바르게 표시되는지 확인', async () => {
      // Multiple segments bar 확인
      const multiSegmentBar = canvas.getByTestId('multi-segment-bar');
      await expect(multiSegmentBar).toBeInTheDocument();

      // 4개의 세그먼트가 렌더링되었는지 확인
      const segment0 = canvas.getByTestId('segment-0');
      const segment1 = canvas.getByTestId('segment-1');
      const segment2 = canvas.getByTestId('segment-2');
      const segment3 = canvas.getByTestId('segment-3');

      await expect(segment0).toBeInTheDocument();
      await expect(segment1).toBeInTheDocument();
      await expect(segment2).toBeInTheDocument();
      await expect(segment3).toBeInTheDocument();

      // Two segments bar 확인
      const twoSegmentBar = canvas.getByTestId('two-segment-bar');
      await expect(twoSegmentBar).toBeInTheDocument();

      const twoSeg0 = canvas.getByTestId('two-seg-0');
      const twoSeg1 = canvas.getByTestId('two-seg-1');
      await expect(twoSeg0).toBeInTheDocument();
      await expect(twoSeg1).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('현재 활성 세그먼트가 강조되는지 확인', async () => {
      // 기본 활성 세그먼트 (index 0) 확인
      const activateBtn0 = canvas.getByTestId('activate-segment-0');
      await expect(activateBtn0).toBeInTheDocument();

      // Success 세그먼트 활성화 (index 1)
      const activateBtn1 = canvas.getByTestId('activate-segment-1');
      await userEvent.click(activateBtn1);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Active Segment 텍스트가 변경되었는지 확인
      const activeText = canvas.getByText(/Active Segment: Success/);
      await expect(activeText).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 800));

      // Warning 세그먼트 활성화 (index 2)
      const activateBtn2 = canvas.getByTestId('activate-segment-2');
      await userEvent.click(activateBtn2);
      await new Promise(resolve => setTimeout(resolve, 500));

      const activeText2 = canvas.getByText(/Active Segment: Warning/);
      await expect(activeText2).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 800));

      // Danger 세그먼트 활성화 (index 3)
      const activateBtn3 = canvas.getByTestId('activate-segment-3');
      await userEvent.click(activateBtn3);
      await new Promise(resolve => setTimeout(resolve, 500));

      const activeText3 = canvas.getByText(/Active Segment: Danger/);
      await expect(activeText3).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step('Single segment가 올바르게 표시되는지 확인', async () => {
      const singleSegmentBar = canvas.getByTestId('single-segment-bar');
      await expect(singleSegmentBar).toBeInTheDocument();

      const singleSeg = canvas.getByTestId('single-seg');
      await expect(singleSeg).toBeInTheDocument();

      // 75% 텍스트 확인
      const percentText = canvas.getByText('75% complete');
      await expect(percentText).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('빈 세그먼트 배열일 때 처리되는지 확인', async () => {
      const emptySegmentBar = canvas.getByTestId('empty-segment-bar');
      await expect(emptySegmentBar).toBeInTheDocument();

      // 컴포넌트가 렌더링되었는지 확인
      // SegmentedProgressBar는 빈 상태에서도 컨테이너를 렌더링함
      await expect(emptySegmentBar).toBeInTheDocument();

      // "No progress yet" 텍스트 확인
      const noProgressText = canvas.getByText('0% - No progress yet');
      await expect(noProgressText).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 1000));
    });
  },
};
