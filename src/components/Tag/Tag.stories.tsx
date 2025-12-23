import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Tag, tagColorSchemes, tagVariants } from '.';
import { TagCloseButton } from './TagCloseButton';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Tag',
  },
  argTypes: {
    colorScheme: {
      control: 'select',
      options: tagColorSchemes,
      description: 'Semantic color of the tag',
    },
    variant: {
      control: 'select',
      options: tagVariants,
      description: 'Visual style of the tag',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Primary: Story = {
  args: {
    colorScheme: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    colorScheme: 'secondary',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    colorScheme: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    colorScheme: 'warning',
    children: 'Warning',
  },
};

export const Danger: Story = {
  args: {
    colorScheme: 'danger',
    children: 'Danger',
  },
};

export const Neutral: Story = {
  args: {
    colorScheme: 'neutral',
    children: 'Neutral',
  },
};

export const Soft: Story = {
  args: {
    colorScheme: 'primary',
    variant: 'soft',
    children: 'Soft',
  },
};

export const Solid: Story = {
  args: {
    colorScheme: 'primary',
    variant: 'solid',
    children: 'Solid',
  },
};

export const Outline: Story = {
  args: {
    colorScheme: 'primary',
    variant: 'outline',
    children: 'Outline',
  },
};

/**
 * Tags with close button for removable items.
 */
export const Closable: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      {tagColorSchemes.map((colorScheme) => (
        <Tag key={colorScheme} colorScheme={colorScheme} variant="soft">
          {colorScheme}
          <TagCloseButton />
        </Tag>
      ))}
    </Flex>
  ),
};

/**
 * Shows all combinations of colorScheme × variant in a matrix layout.
 */
export const AllCombinations: Story = {
  render: () => (
    <Box>
      {/* Header row */}
      <Flex mb={4} gap={4} align="center">
        <Box w="100px" />
        {tagVariants.map((variant) => (
          <Box key={variant} w="100px" textAlign="center">
            <Text fontWeight="bold" fontSize="subtext">
              {variant}
            </Text>
          </Box>
        ))}
      </Flex>

      {/* Color scheme rows */}
      {tagColorSchemes.map((colorScheme) => (
        <Flex key={colorScheme} mb={4} gap={4} align="center">
          <Box w="100px">
            <Text fontWeight="medium" fontSize="subtext">
              {colorScheme}
            </Text>
          </Box>
          {tagVariants.map((variant) => (
            <Box key={`${colorScheme}-${variant}`} w="100px" textAlign="center">
              <Tag colorScheme={colorScheme} variant={variant}>
                Tag
              </Tag>
            </Box>
          ))}
        </Flex>
      ))}
    </Box>
  ),
};

/**
 * Example use case: categorization tags
 */
export const Categories: Story = {
  render: () => (
    <VStack align="start" gap={4}>
      <Box>
        <Text fontWeight="bold" mb={2}>
          Article Categories
        </Text>
        <Flex gap={2} wrap="wrap">
          <Tag colorScheme="primary" variant="soft">Technology</Tag>
          <Tag colorScheme="secondary" variant="soft">Design</Tag>
          <Tag colorScheme="success" variant="soft">Business</Tag>
          <Tag colorScheme="warning" variant="soft">Opinion</Tag>
        </Flex>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          Task Status
        </Text>
        <Flex gap={2} wrap="wrap">
          <Tag colorScheme="neutral" variant="outline">Draft</Tag>
          <Tag colorScheme="primary" variant="solid">In Progress</Tag>
          <Tag colorScheme="warning" variant="soft">Review</Tag>
          <Tag colorScheme="success" variant="solid">Completed</Tag>
          <Tag colorScheme="danger" variant="soft">Blocked</Tag>
        </Flex>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          Priority Labels
        </Text>
        <Flex gap={2} wrap="wrap">
          <Tag colorScheme="danger" variant="solid">Critical</Tag>
          <Tag colorScheme="warning" variant="solid">High</Tag>
          <Tag colorScheme="primary" variant="soft">Medium</Tag>
          <Tag colorScheme="neutral" variant="soft">Low</Tag>
        </Flex>
      </Box>
    </VStack>
  ),
};

/**
 * Removable filter tags
 */
export const FilterTags: Story = {
  render: () => (
    <VStack align="start" gap={4}>
      <Text fontWeight="bold">Active Filters</Text>
      <Flex gap={2} wrap="wrap">
        <Tag colorScheme="primary" variant="soft">
          Category: Design
          <TagCloseButton />
        </Tag>
        <Tag colorScheme="primary" variant="soft">
          Status: Active
          <TagCloseButton />
        </Tag>
        <Tag colorScheme="primary" variant="soft">
          Date: Last 7 days
          <TagCloseButton />
        </Tag>
      </Flex>
    </VStack>
  ),
};
