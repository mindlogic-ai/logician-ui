import { Box, Flex, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Chip, colorSchemes, variants } from '.';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    children: 'Chip',
  },
  argTypes: {
    colorScheme: {
      control: 'select',
      options: colorSchemes,
    },
    variant: {
      control: 'select',
      options: variants,
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Primary: Story = {
  args: {
    colorScheme: 'primary',
    variant: 'solid',
  },
};

export const Secondary: Story = {
  args: {
    colorScheme: 'secondary',
    variant: 'solid',
  },
};

export const Danger: Story = {
  args: {
    colorScheme: 'danger',
    variant: 'solid',
  },
};

export const Success: Story = {
  args: {
    colorScheme: 'success',
    variant: 'solid',
  },
};

export const Warning: Story = {
  args: {
    colorScheme: 'warning',
    variant: 'solid',
  },
};

export const Neutral: Story = {
  args: {
    colorScheme: 'neutral',
    variant: 'solid',
  },
};

export const Solid: Story = {
  args: {
    colorScheme: 'primary',
    variant: 'solid',
  },
};

export const Soft: Story = {
  args: {
    colorScheme: 'primary',
    variant: 'soft',
  },
};

export const Outline: Story = {
  args: {
    colorScheme: 'primary',
    variant: 'outline',
  },
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
            <Text fontWeight="bold" fontSize="subtext">
              {variant}
            </Text>
          </Box>
        ))}
      </Flex>

      {/* Color scheme rows */}
      {colorSchemes.map((colorScheme) => (
        <Flex key={colorScheme} mb={4} gap={4} align="center">
          <Box w="100px">
            <Text fontWeight="medium" fontSize="subtext">
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
