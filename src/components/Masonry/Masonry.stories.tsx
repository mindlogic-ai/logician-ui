import { Box, SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Card } from '../Card';
import { Subtext } from '../Typography';
import { Masonry } from './Masonry';

const meta = {
  title: 'Components/Masonry',
  component: Masonry,
  args: {
    numCols: 3,
    gap: 4,
    horizontalArrangement: false,
  },
  argTypes: {
    numCols: {
      control: 'number',
      description: 'Number of columns in the masonry layout',
      defaultValue: 3,
    },
    gap: {
      control: 'number',
      description: 'Gap between items',
      defaultValue: 4,
    },
    horizontalArrangement: {
      control: 'boolean',
      description:
        'Deal items round-robin across columns (true) or balance column heights (false)',
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A responsive masonry layout component that arranges items in optimal position based on available vertical space.',
      },
    },
  },
} satisfies Meta<typeof Masonry>;

export default meta;

type Story = StoryObj<typeof Masonry>;

// Helper to generate items with varying heights
const generateItems = (count: number) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    height: 100 + Math.floor(Math.random() * 200), // Random heights between 100-300px
    color:
      index % 2 === 0 ? 'category.blue.surface' : 'category.purple.surface',
    title: `Item ${index + 1}`,
  }));
};

// Basic usage example
export const Basic: Story = {
  render: (args) => {
    const items = generateItems(12);

    return (
      <Masonry {...args}>
        {items.map((item) => (
          <Box
            key={item.id}
            bg={item.color}
            height={`${item.height}px`}
            p={4}
            borderRadius="md"
            shadow="sm"
          >
            <Text fontWeight="bold">{item.title}</Text>
            <Text textStyle="subtext">Height: {item.height}px</Text>
          </Box>
        ))}
      </Masonry>
    );
  },
};

// Example with realistic content
export const WithRealContent: Story = {
  render: (args) => {
    const bgColor = 'bg.subtle';
    const categories = [
      {
        name: 'Social Media',
        items: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok'],
      },
      { name: 'Messaging', items: ['WhatsApp', 'Telegram', 'Signal'] },
      { name: 'Video', items: ['YouTube', 'Vimeo', 'TikTok', 'Twitch'] },
      {
        name: 'Productivity',
        items: [
          'Notion',
          'Slack',
          'Microsoft Teams',
          'Asana',
          'Trello',
          'Monday',
        ],
      },
      { name: 'Design', items: ['Figma', 'Adobe XD', 'Sketch', 'Canva'] },
      {
        name: 'Development',
        items: ['GitHub', 'GitLab', 'Bitbucket', 'Stack Overflow'],
      },
    ];

    return (
      <Masonry {...args}>
        {categories.map((category) => (
          <Box
            key={category.name}
            bg={bgColor}
            p={4}
            borderRadius="md"
            shadow="sm"
            mb={4}
          >
            <Text
              fontWeight="bold"
              textStyle="h5"
              mb={2}
              color="category.blue.fg"
            >
              {category.name}
            </Text>
            {category.items.map((item) => (
              <Box
                key={item}
                p={2}
                _hover={{ bg: 'primary.wash' }}
                borderRadius="md"
                transition="background 0.2s"
                cursor="pointer"
                display="flex"
                alignItems="center"
              >
                <Box
                  w="24px"
                  h="24px"
                  bg="category.blue.surface"
                  borderRadius="full"
                  mr={2}
                />
                <Text>{item}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Masonry>
    );
  },
};

// Responsive example
export const Responsive: Story = {
  render: (args) => {
    // Use Chakra's breakpoint system for responsive columns
    const responsiveColumns =
      useBreakpointValue({
        base: 1, // Mobile
        sm: 2, // Tablet
        md: 3, // Medium screens
        lg: 4, // Large screens
        xl: 5, // Extra large screens
      }) || 3; // Default fallback

    return (
      <Box>
        <Text mb={4}>Resize the viewport to see the columns adjust:</Text>
        <Masonry {...args} numCols={responsiveColumns}>
          {generateItems(20).map((item) => (
            <Box
              key={item.id}
              bg={item.color}
              height={`${item.height}px`}
              p={4}
              borderRadius="md"
              shadow="sm"
            >
              <Text fontWeight="bold">{item.title}</Text>
            </Box>
          ))}
        </Masonry>
      </Box>
    );
  },
};

// Example with controls for column count
export const CustomizableColumns: Story = {
  args: {
    numCols: 3, // Set a single number to control in Storybook
  },
  render: (args) => {
    const items = generateItems(16);

    return (
      <Masonry {...args}>
        {items.map((item) => (
          <Box
            key={item.id}
            bg={item.color}
            height={`${item.height}px`}
            p={4}
            borderRadius="md"
            shadow="sm"
          >
            <Text fontWeight="bold">{item.title}</Text>
          </Box>
        ))}
      </Masonry>
    );
  },
};

// Horizontal arrangement example
export const HorizontalArrangement: Story = {
  render: (args) => {
    const items = generateItems(12);

    return (
      <Box>
        <Text textStyle="h4" fontWeight="bold" mb={4}>
          Horizontal Arrangement (row by row)
        </Text>
        <Masonry numCols={3} horizontalArrangement={true} gap={4}>
          {items.map((item) => (
            <Box
              key={item.id}
              bg={item.color}
              height={`${item.height}px`}
              p={4}
              borderRadius="md"
              shadow="sm"
            >
              <Text>{item.title}</Text>
            </Box>
          ))}
        </Masonry>

        <Text textStyle="h4" fontWeight="bold" mt={8} mb={4}>
          Height-Balanced Arrangement (default)
        </Text>
        <Masonry numCols={3} horizontalArrangement={false} gap={4}>
          {items.map((item) => (
            <Box
              key={item.id}
              bg={item.color}
              height={`${item.height}px`}
              p={4}
              borderRadius="md"
              shadow="sm"
            >
              <Text>{item.title}</Text>
            </Box>
          ))}
        </Masonry>
      </Box>
    );
  },
};

// Comparison with regular grid
export const ComparisonWithGrid: Story = {
  render: (args) => {
    const items = generateItems(12);

    return (
      <Box>
        <Text textStyle="h4" fontWeight="bold" mb={4}>
          Masonry Layout
        </Text>
        <Masonry {...args}>
          {items.map((item) => (
            <Box
              key={item.id}
              bg={item.color}
              height={`${item.height}px`}
              p={4}
              borderRadius="md"
              shadow="sm"
            >
              <Text>{item.title}</Text>
            </Box>
          ))}
        </Masonry>

        <Text textStyle="h4" fontWeight="bold" mt={8} mb={4}>
          Regular Grid Layout
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
          {items.map((item) => (
            <Box
              key={item.id}
              bg={item.color}
              height={`${item.height}px`}
              p={4}
              borderRadius="md"
              shadow="sm"
            >
              <Text>{item.title}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Masonry.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

const MODEL_GROUPS = [
  { title: '대화', items: ['GPT-4o', 'Claude', 'Gemini', 'Solar', 'Llama'] },
  { title: '이미지', items: ['Imagen', 'FLUX'] },
  { title: '음성', items: ['TTS', 'STT', '음성 복제'] },
  { title: '검색', items: ['웹 검색'] },
  { title: '영상', items: ['Veo', 'Kling', 'Runway', 'Pika'] },
  { title: '코드', items: ['Codex', 'Claude Code'] },
];

export const DoUnorderedGroups: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: unordered groups of different heights',
  args: { numCols: 3 },
  render: (args) => (
    <Masonry {...args}>
      {MODEL_GROUPS.map((group) => (
        <Card key={group.title} p={4}>
          <Text fontWeight="bold" mb={2}>
            {group.title}
          </Text>
          {group.items.map((item) => (
            <Subtext key={item}>{item}</Subtext>
          ))}
        </Card>
      ))}
    </Masonry>
  ),
};

const STEPS = [
  '1. 그룹을 만듭니다',
  '2. 멤버를 초대합니다 — 초대 메일은 7일 동안 유효합니다',
  '3. 크레딧 한도를 정합니다',
  '4. 챗봇을 공유합니다',
  '5. 사용량을 확인합니다 — 대시보드에서 날짜별로 볼 수 있습니다',
  '6. 결제 수단을 등록합니다',
];

export const DontOrderedContent: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: steps or a ranking",
  args: { numCols: 3 },
  render: (args) => (
    <Masonry {...args}>
      {STEPS.map((step) => (
        <Card key={step} p={4}>
          <Text>{step}</Text>
        </Card>
      ))}
    </Masonry>
  ),
};
