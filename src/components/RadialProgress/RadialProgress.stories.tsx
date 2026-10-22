import { Box, Flex, HStack, Stack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Subtext, Text } from '../Typography';
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
      <Box p={8} bg="bg.surface" borderRadius="md">
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

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `RadialProgress.usage.mdx` with <Canvas of={…} />. Hidden from
// the sidebar (`!dev`); `tags` is written on each story because the indexer
// reads CSF statically.

const STORAGE = [
  { label: '문서', color: 'category.blue.fg', value: 42 },
  { label: '이미지', color: 'category.purple.fg', value: 28 },
  { label: '오디오', color: 'category.orange.fg', value: 12 },
];

export const DoTokensAndLegend: Story = {
  tags: ['!dev'],
  name: 'Usage / Do: category tokens and a text legend',
  render: () => (
    <Flex gap={6} align="center" wrap="wrap">
      <RadialProgress
        size={160}
        total={100}
        unit="GB"
        segments={STORAGE.map(({ color, value }) => ({ color, value }))}
        aria-hidden
        width="auto"
      />
      <Stack gap={1}>
        <Text fontWeight="bold">저장 공간 100GB 중 82GB 사용</Text>
        {STORAGE.map(({ label, color, value }) => (
          <HStack key={label} gap={2}>
            <Box boxSize="10px" borderRadius="full" bg={color} />
            <Subtext>
              {label} {value}GB
            </Subtext>
          </HStack>
        ))}
      </Stack>
    </Flex>
  ),
};

export const DontHexNoLegend: Story = {
  tags: ['!dev'],
  name: "Usage / Don't: hex colours and no legend",
  args: {
    size: 160,
    total: 100,
    unit: 'GB',
    segments: [
      { color: '#4ECDC4', value: 42 },
      { color: '#FF6B6B', value: 28 },
      { color: '#FFD93D', value: 12 },
    ],
  },
};

/** Tokens the chart reads besides its segments, from `RadialProgress.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.track', use: <T en="remaining arc" ko="남은 부분의 호" /> },
        { token: 'bg.surface', use: <T en="background" ko="배경" /> },
        { token: 'fg.subtle', use: <T en="centre number" ko="가운데 숫자" /> },
        { token: 'bg.muted', use: <T en="shadow under the ring" ko="고리 아래 그림자" /> },
      ]}
    />
  ),
};
