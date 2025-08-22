import React from 'react';
import { Box, SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import { Masonry } from './Masonry';

const meta: Meta<typeof Masonry> = {
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
        'Whether to arrange items horizontally (true) or balance column heights (false)',
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
};

export default meta;
type Story = StoryFn<typeof Masonry>;

// Helper to generate items with varying heights
const generateItems = (count: number) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    height: 100 + Math.floor(Math.random() * 200), // Random heights between 100-300px
    color: index % 2 === 0 ? 'blue.50' : 'purple.50',
    title: `Item ${index + 1}`,
  }));
};

// Basic usage example
export const Basic: Story = (args) => {
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
          <Text fontSize="sm">Height: {item.height}px</Text>
        </Box>
      ))}
    </Masonry>
  );
};

// Example with realistic content
export const WithRealContent: Story = (args) => {
  const bgColor = 'gray.50'; // Light mode only
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
          <Text fontWeight="bold" fontSize="lg" mb={2} color="blue.500">
            {category.name}
          </Text>
          {category.items.map((item) => (
            <Box
              key={item}
              p={2}
              _hover={{ bg: 'gray.100' }}
              borderRadius="md"
              transition="background 0.2s"
              cursor="pointer"
              display="flex"
              alignItems="center"
            >
              <Box w="24px" h="24px" bg="blue.100" borderRadius="full" mr={2} />
              <Text>{item}</Text>
            </Box>
          ))}
        </Box>
      ))}
    </Masonry>
  );
};

// Responsive example
export const Responsive: Story = (args) => {
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
};

// Example with controls for column count
export const CustomizableColumns: Story = (args) => {
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
};
CustomizableColumns.args = {
  numCols: 3, // Set a single number to control in Storybook
};

// Horizontal arrangement example
export const HorizontalArrangement: Story = (args) => {
  const items = generateItems(12);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
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

      <Text fontSize="xl" fontWeight="bold" mt={8} mb={4}>
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
};

// Comparison with regular grid
export const ComparisonWithGrid: Story = (args) => {
  const items = generateItems(12);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
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

      <Text fontSize="xl" fontWeight="bold" mt={8} mb={4}>
        Regular Grid Layout
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
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
};
