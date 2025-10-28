import { useState } from 'react';
import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import RadialProgress from './RadialProgress';

const meta = {
  title: 'Components/RadialProgress',
  component: RadialProgress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable radial progress component that displays multiple segments with colors, values, and optional units.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 100, max: 400, step: 10 },
      description: 'Size of the radial progress component in pixels',
    },
    total: {
      control: { type: 'number' },
      description: 'Total value displayed in the center',
    },
    unit: {
      control: { type: 'text' },
      description: 'Unit label displayed next to the total value',
    },
    segments: {
      control: { type: 'object' },
      description: 'Array of segments with color and value properties',
    },
  },
  decorators: [
    (Story) => (
      <Box p={8} bg="white" borderRadius="md">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof RadialProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with the user's example
export const Default: Story = {
  args: {
    segments: [
      { color: '#4ECDC4', value: 15 },
      { color: '#FF6B6B', value: 20 },
      { color: '#FF8E53', value: 30 },
      { color: '#FFD93D', value: 75 },
    ],
    total: 150,
    unit: 'GB',
    size: 200,
  },
};

// Storage usage example
export const StorageUsage: Story = {
  args: {
    segments: [
      { color: '#4ECDC4', value: 15 },
      { color: '#FF6B6B', value: 20 },
      { color: '#FF8E53', value: 30 },
      { color: '#FFD93D', value: 75 },
    ],
    total: 150,
    unit: 'GB',
    size: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing storage usage with different file types.',
      },
    },
  },
};

// Memory usage example
export const MemoryUsage: Story = {
  args: {
    segments: [
      { color: '#667EEA', value: 2.5 },
      { color: '#F093FB', value: 1.8 },
      { color: '#4ECDC4', value: 3.2 },
      { color: '#FFE66D', value: 0.5 },
    ],
    total: 8,
    unit: 'GB',
    size: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Memory usage breakdown showing RAM allocation.',
      },
    },
  },
};

// Budget tracking example
export const BudgetTracking: Story = {
  args: {
    segments: [
      { color: '#48BB78', value: 1200 },
      { color: '#ED8936', value: 800 },
      { color: '#E53E3E', value: 600 },
      { color: '#805AD5', value: 400 },
    ],
    total: 5000,
    unit: '$',
    size: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Budget allocation showing different expense categories.',
      },
    },
  },
};

// Small size variant
export const SmallSize: Story = {
  args: {
    segments: [
      { color: '#4ECDC4', value: 25 },
      { color: '#FF6B6B', value: 35 },
      { color: '#FF8E53', value: 40 },
    ],
    total: 100,
    unit: '%',
    size: 120,
  },
  parameters: {
    docs: {
      description: {
        story: 'Smaller version of the component for compact layouts.',
      },
    },
  },
};

// Large size variant
export const LargeSize: Story = {
  args: {
    segments: [
      { color: '#4ECDC4', value: 150 },
      { color: '#FF6B6B', value: 200 },
      { color: '#FF8E53', value: 300 },
      { color: '#FFD93D', value: 350 },
    ],
    total: 1000,
    unit: 'MB',
    size: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Larger version of the component for prominent display.',
      },
    },
  },
};

// Single segment
export const SingleSegment: Story = {
  args: {
    segments: [{ color: '#4ECDC4', value: 75 }],
    total: 100,
    unit: '%',
    size: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple progress indicator with a single segment.',
      },
    },
  },
};

// Many segments
export const ManySegments: Story = {
  args: {
    segments: [
      { color: '#FF6B6B', value: 10 },
      { color: '#4ECDC4', value: 15 },
      { color: '#45B7D1', value: 20 },
      { color: '#96CEB4', value: 12 },
      { color: '#FFEAA7', value: 8 },
      { color: '#DDA0DD', value: 18 },
      { color: '#98D8C8', value: 7 },
      { color: '#F7DC6F', value: 10 },
    ],
    total: 100,
    unit: 'pts',
    size: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with many small segments showing detailed breakdown.',
      },
    },
  },
};

// Partial usage (segments don't fill total)
export const PartialUsage: Story = {
  args: {
    segments: [
      { color: '#4ECDC4', value: 30 },
      { color: '#FF6B6B', value: 20 },
    ],
    total: 100,
    unit: 'GB',
    size: 200,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows remaining capacity when segments don't fill the total value.",
      },
    },
  },
};

// No unit label
export const NoUnit: Story = {
  args: {
    segments: [
      { color: '#4ECDC4', value: 45 },
      { color: '#FF6B6B', value: 30 },
      { color: '#FF8E53', value: 25 },
    ],
    total: 100,
    size: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress indicator without a unit label.',
      },
    },
  },
};

// Empty segments (edge case)
export const EmptySegments: Story = {
  args: {
    segments: [],
    total: 100,
    unit: 'GB',
    size: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case showing the component with no segments.',
      },
    },
  },
};

/**
 * Component Test: RadialProgress 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - value에 따라 원형 진행 바가 올바르게 표시되는지
 * - label이 중앙에 표시되는지
 *
 * Bad Path:
 * - value 범위 초과 시 처리되는지
 */
export const InteractionTest: Story = {
  render: () => {
    const [total, setTotal] = useState(100);
    const segments = [
      { color: '#4ECDC4', value: 25 },
      { color: '#FF6B6B', value: 35 },
    ];

    const updateSegments = (newTotal: number) => {
      setTotal(newTotal);
      // segments 값은 고정, total만 변경하여 범위 초과 테스트
    };

    return (
      <VStack spacing={8} p={8}>
        <Box>
          <Box fontWeight="600" mb={4}>Dynamic Total Control</Box>
          <HStack spacing={3} mb={4}>
            <Button onClick={() => updateSegments(100)} data-testid="set-total-100" size="sm">
              Total: 100
            </Button>
            <Button onClick={() => updateSegments(50)} data-testid="set-total-50" size="sm">
              Total: 50 (segments exceed)
            </Button>
            <Button onClick={() => updateSegments(200)} data-testid="set-total-200" size="sm">
              Total: 200
            </Button>
            <Button onClick={() => updateSegments(0)} data-testid="set-total-0" size="sm" colorScheme="red">
              Total: 0 (edge case)
            </Button>
          </HStack>
        </Box>

        <Box data-testid="radial-progress-container">
          <Box fontWeight="600" mb={2}>Current Total: {total}</Box>
          <RadialProgress
            segments={segments}
            total={total}
            unit="GB"
            size={200}
            data-testid="radial-progress"
          />
        </Box>

        <Box>
          <Box fontWeight="600" mb={4}>Test Cases:</Box>
          <VStack spacing={6} align="stretch">
            <Box>
              <Box fontSize="sm" mb={2} fontWeight="500">정상: total 100, segments 60 (25 + 35)</Box>
              <RadialProgress
                segments={[
                  { color: '#4ECDC4', value: 25 },
                  { color: '#FF6B6B', value: 35 },
                ]}
                total={100}
                unit="GB"
                size={160}
                data-testid="radial-normal"
              />
            </Box>

            <Box>
              <Box fontSize="sm" mb={2} fontWeight="500">범위 초과: segments 합(150) &gt; total(100)</Box>
              <RadialProgress
                segments={[
                  { color: '#4ECDC4', value: 75 },
                  { color: '#FF6B6B', value: 75 },
                ]}
                total={100}
                unit="GB"
                size={160}
                data-testid="radial-exceed"
              />
            </Box>

            <Box>
              <Box fontSize="sm" mb={2} fontWeight="500">Label 표시: 중앙에 total과 unit 표시</Box>
              <RadialProgress
                segments={[
                  { color: '#4ECDC4', value: 40 },
                  { color: '#FF6B6B', value: 30 },
                ]}
                total={100}
                unit="%"
                size={160}
                data-testid="radial-label"
              />
            </Box>

            <Box>
              <Box fontSize="sm" mb={2} fontWeight="500">Custom formatter</Box>
              <RadialProgress
                segments={[
                  { color: '#4ECDC4', value: 1500 },
                  { color: '#FF6B6B', value: 2500 },
                ]}
                total={5000}
                unit="MB"
                formatTotal={(val) => `${(val / 1000).toFixed(1)}G`}
                size={160}
                data-testid="radial-formatted"
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('value에 따라 원형 진행 바가 올바르게 표시되는지 확인', async () => {
      // 정상 케이스 확인
      const normalProgress = canvas.getByTestId('radial-normal');
      await expect(normalProgress).toBeInTheDocument();

      // SVG가 렌더링되었는지 확인
      const svg = normalProgress.querySelector('svg');
      await expect(svg).not.toBeNull();

      // SVG 내부에 path 요소들이 있는지 확인 (segments)
      const paths = normalProgress.querySelectorAll('svg path');
      await expect(paths.length).toBeGreaterThan(0);

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('label이 중앙에 표시되는지 확인', async () => {
      const labelProgress = canvas.getByTestId('radial-label');
      await expect(labelProgress).toBeInTheDocument();

      // 중앙 텍스트에 total 값이 표시되는지 확인 (텍스트 콘텐츠로 직접 확인)
      const centerDiv = labelProgress.querySelector('.css-vm63cb');
      await expect(centerDiv).not.toBeNull();
      await expect(centerDiv?.textContent).toContain('100');
      await expect(centerDiv?.textContent).toContain('%');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('value 범위 초과 시 처리되는지 확인', async () => {
      // segments 합이 total을 초과하는 경우
      const exceedProgress = canvas.getByTestId('radial-exceed');
      await expect(exceedProgress).toBeInTheDocument();

      // 컴포넌트가 여전히 렌더링되는지 확인 (에러 없이)
      const svg = exceedProgress.querySelector('svg');
      await expect(svg).not.toBeNull();

      // total 값(100)이 표시되는지 확인
      const centerDiv = exceedProgress.querySelector('.css-vm63cb');
      await expect(centerDiv).not.toBeNull();
      await expect(centerDiv?.textContent).toContain('100');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('formatTotal이 올바르게 적용되는지 확인', async () => {
      const formattedProgress = canvas.getByTestId('radial-formatted');
      await expect(formattedProgress).toBeInTheDocument();

      // formatTotal로 변환된 값이 표시되는지 확인 (5000 -> 5.0G)
      const centerDiv = formattedProgress.querySelector('.css-vm63cb');
      await expect(centerDiv).not.toBeNull();
      await expect(centerDiv?.textContent).toContain('5.0G');

      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step('동적으로 total 변경 테스트 - 100', async () => {
      const btn100 = canvas.getByTestId('set-total-100');
      await userEvent.click(btn100);
      await new Promise(resolve => setTimeout(resolve, 500));

      // total이 100으로 변경되었는지 확인
      const container = canvas.getByTestId('radial-progress-container');
      const totalText = within(container).getByText('Current Total: 100');
      await expect(totalText).toBeInTheDocument();

      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step('동적으로 total 변경 테스트 - 50 (segments exceed)', async () => {
      const btn50 = canvas.getByTestId('set-total-50');
      await userEvent.click(btn50);
      await new Promise(resolve => setTimeout(resolve, 500));

      // total이 50으로 변경되었는지 확인 (segments 합 60이 total 50을 초과)
      const container = canvas.getByTestId('radial-progress-container');
      const totalText = within(container).getByText('Current Total: 50');
      await expect(totalText).toBeInTheDocument();

      // 컴포넌트가 여전히 정상적으로 렌더링되는지 확인
      const progressContainer = canvas.getByTestId('radial-progress-container');
      const svg = progressContainer.querySelector('svg');
      await expect(svg).toBeTruthy();

      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step('동적으로 total 변경 테스트 - 0 (edge case)', async () => {
      const btn0 = canvas.getByTestId('set-total-0');
      await userEvent.click(btn0);
      await new Promise(resolve => setTimeout(resolve, 500));

      // total이 0일 때는 컴포넌트가 렌더링되지 않음 (early return)
      const container = canvas.getByTestId('radial-progress-container');
      const totalText = within(container).getByText('Current Total: 0');
      await expect(totalText).toBeInTheDocument();

      // RadialProgress는 null을 반환하므로 렌더링되지 않음
      await new Promise(resolve => setTimeout(resolve, 800));
    });
  },
};
