import { Box, Flex, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Chip, colorSchemes, variants } from '.';

/**
 * A chip component for displaying tags, labels, or status indicators.
 *
 * Uses a two-dimensional variant system:
 * - `colorScheme`: What semantic color (primary, secondary, danger, etc.)
 * - `variant`: How it looks visually (solid, soft, outline)
 */
const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    children: 'Chip',
    colorScheme: 'primary',
    variant: 'soft',
  },
  argTypes: {
    colorScheme: {
      control: 'select',
      options: colorSchemes,
      description: 'The semantic color of the chip',
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'The visual style of the chip',
    },
    children: {
      control: 'text',
      description: 'The content of the chip',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default chip with primary color and soft variant.
 */
export const Default: Story = {};

/**
 * Primary color chips in different variants.
 */
export const Primary: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Chip colorScheme="primary" variant="solid">
        Solid
      </Chip>
      <Chip colorScheme="primary" variant="soft">
        Soft
      </Chip>
      <Chip colorScheme="primary" variant="outline">
        Outline
      </Chip>
    </Flex>
  ),
};

/**
 * Secondary color chips in different variants.
 */
export const Secondary: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Chip colorScheme="secondary" variant="solid">
        Solid
      </Chip>
      <Chip colorScheme="secondary" variant="soft">
        Soft
      </Chip>
      <Chip colorScheme="secondary" variant="outline">
        Outline
      </Chip>
    </Flex>
  ),
};

/**
 * Danger color chips for error states.
 */
export const Danger: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Chip colorScheme="danger" variant="solid">
        Error
      </Chip>
      <Chip colorScheme="danger" variant="soft">
        Error
      </Chip>
      <Chip colorScheme="danger" variant="outline">
        Error
      </Chip>
    </Flex>
  ),
};

/**
 * Success color chips for completed states.
 */
export const Success: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Chip colorScheme="success" variant="solid">
        Completed
      </Chip>
      <Chip colorScheme="success" variant="soft">
        Completed
      </Chip>
      <Chip colorScheme="success" variant="outline">
        Completed
      </Chip>
    </Flex>
  ),
};

/**
 * Warning color chips for pending states.
 */
export const Warning: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Chip colorScheme="warning" variant="solid">
        Pending
      </Chip>
      <Chip colorScheme="warning" variant="soft">
        Pending
      </Chip>
      <Chip colorScheme="warning" variant="outline">
        Pending
      </Chip>
    </Flex>
  ),
};

/**
 * Neutral color chips for default states.
 */
export const Neutral: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Chip colorScheme="neutral" variant="solid">
        Draft
      </Chip>
      <Chip colorScheme="neutral" variant="soft">
        Draft
      </Chip>
      <Chip colorScheme="neutral" variant="outline">
        Draft
      </Chip>
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
        {variants.map((variant) => (
          <Box key={variant} w="100px" textAlign="center">
            <Text fontWeight="bold" textStyle="subtext">
              {variant}
            </Text>
          </Box>
        ))}
      </Flex>

      {/* Color scheme rows */}
      {colorSchemes.map((colorScheme) => (
        <Flex key={colorScheme} mb={4} gap={4} align="center">
          <Box w="100px">
            <Text fontWeight="medium" textStyle="subtext">
              {colorScheme}
            </Text>
          </Box>
          {variants.map((variant) => (
            <Box key={`${colorScheme}-${variant}`} w="100px" textAlign="center">
              <Chip colorScheme={colorScheme} variant={variant}>
                Chip
              </Chip>
            </Box>
          ))}
        </Flex>
      ))}
    </Box>
  ),
};

/**
 * Chips in use cases with labels.
 */
export const UseCases: Story = {
  render: () => (
    <Flex direction="column" gap={6}>
      <Box>
        <Text mb={2} fontWeight="bold">
          Status indicators:
        </Text>
        <Flex gap={2} wrap="wrap">
          <Chip colorScheme="success" variant="soft">
            Active
          </Chip>
          <Chip colorScheme="warning" variant="soft">
            Pending
          </Chip>
          <Chip colorScheme="danger" variant="soft">
            Inactive
          </Chip>
          <Chip colorScheme="neutral" variant="soft">
            Draft
          </Chip>
        </Flex>
      </Box>

      <Box>
        <Text mb={2} fontWeight="bold">
          Category tags:
        </Text>
        <Flex gap={2} wrap="wrap">
          <Chip colorScheme="primary" variant="outline">
            React
          </Chip>
          <Chip colorScheme="secondary" variant="outline">
            TypeScript
          </Chip>
          <Chip colorScheme="success" variant="outline">
            Chakra UI
          </Chip>
        </Flex>
      </Box>

      <Box>
        <Text mb={2} fontWeight="bold">
          Priority levels:
        </Text>
        <Flex gap={2} wrap="wrap">
          <Chip colorScheme="danger" variant="solid">
            High
          </Chip>
          <Chip colorScheme="warning" variant="solid">
            Medium
          </Chip>
          <Chip colorScheme="neutral" variant="solid">
            Low
          </Chip>
        </Flex>
      </Box>
    </Flex>
  ),
};
