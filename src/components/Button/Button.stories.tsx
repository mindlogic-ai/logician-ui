import { Box, Flex, VStack, HStack, Text, Grid, GridItem } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Sparkles } from '../Icon';
import { Button, colorSchemes, variants } from '.';
import { ButtonColorScheme, ButtonVariant } from './Button.types';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    colorScheme: {
      control: 'select',
      options: colorSchemes,
      description: 'Semantic color family (overrides Chakra colorScheme)',
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual appearance (overrides Chakra variant)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'Button',
    colorScheme: 'primary',
    variant: 'solid',
  },
};

/**
 * Complete button matrix showing all colorScheme × variant combinations.
 *
 * ## Color Schemes (rows):
 * - `primary`: Blue - main brand actions
 * - `secondary`: Violet - accent actions
 * - `danger`: Rose - destructive actions
 * - `success`: Green - positive actions
 * - `warning`: Gold - caution actions
 * - `neutral`: Gray - low-emphasis actions
 *
 * ## Variants (columns):
 * - `solid`: Filled background (most prominent)
 * - `soft`: Light tinted background (subtle)
 * - `outline`: Border only (medium emphasis)
 * - `ghost`: No background or border (lowest emphasis)
 */
export const AllCombinations: Story = {
  render: () => (
    <VStack spacing={6} align="stretch">
      {/* Header row */}
      <HStack spacing={4}>
        <Box w="100px" />
        {variants.map((variant) => (
          <Box key={variant} w="120px" textAlign="center">
            <Text fontSize="subtext" fontWeight="bold" color="gray.600">
              {variant}
            </Text>
          </Box>
        ))}
      </HStack>

      {/* Color scheme rows */}
      {colorSchemes.map((colorScheme) => (
        <HStack key={colorScheme} spacing={4}>
          <Box w="100px">
            <Text fontSize="subtext" fontWeight="bold" color="gray.600">
              {colorScheme}
            </Text>
          </Box>
          {variants.map((variant) => (
            <Box key={`${colorScheme}-${variant}`} w="120px">
              <Button colorScheme={colorScheme} variant={variant}>
                Button
              </Button>
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
};

/**
 * All buttons with icons showing the complete matrix.
 */
export const AllWithIcons: Story = {
  render: () => (
    <VStack spacing={6} align="stretch">
      <HStack spacing={4}>
        <Box w="100px" />
        {variants.map((variant) => (
          <Box key={variant} w="140px" textAlign="center">
            <Text fontSize="subtext" fontWeight="bold" color="gray.600">
              {variant}
            </Text>
          </Box>
        ))}
      </HStack>

      {colorSchemes.map((colorScheme) => (
        <HStack key={colorScheme} spacing={4}>
          <Box w="100px">
            <Text fontSize="subtext" fontWeight="bold" color="gray.600">
              {colorScheme}
            </Text>
          </Box>
          {variants.map((variant) => (
            <Box key={`${colorScheme}-${variant}`} w="140px">
              <Button
                colorScheme={colorScheme}
                variant={variant}
                leftIcon={<Sparkles />}
              >
                Button
              </Button>
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
};

/**
 * Primary color scheme in all variants.
 */
export const Primary: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{variant}</Text>
          <Button colorScheme="primary" variant={variant}>
            Primary
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Secondary color scheme in all variants.
 */
export const Secondary: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{variant}</Text>
          <Button colorScheme="secondary" variant={variant}>
            Secondary
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Danger color scheme in all variants.
 */
export const Danger: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{variant}</Text>
          <Button colorScheme="danger" variant={variant}>
            Danger
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Success color scheme in all variants.
 */
export const Success: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{variant}</Text>
          <Button colorScheme="success" variant={variant}>
            Success
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Warning color scheme in all variants.
 */
export const Warning: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{variant}</Text>
          <Button colorScheme="warning" variant={variant}>
            Warning
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Neutral color scheme in all variants.
 */
export const Neutral: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{variant}</Text>
          <Button colorScheme="neutral" variant={variant}>
            Neutral
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Solid variant across all color schemes.
 */
export const SolidVariant: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {colorSchemes.map((colorScheme) => (
        <VStack key={colorScheme} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{colorScheme}</Text>
          <Button colorScheme={colorScheme} variant="solid">
            Solid
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Soft variant across all color schemes.
 */
export const SoftVariant: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {colorSchemes.map((colorScheme) => (
        <VStack key={colorScheme} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{colorScheme}</Text>
          <Button colorScheme={colorScheme} variant="soft">
            Soft
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Outline variant across all color schemes.
 */
export const OutlineVariant: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {colorSchemes.map((colorScheme) => (
        <VStack key={colorScheme} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{colorScheme}</Text>
          <Button colorScheme={colorScheme} variant="outline">
            Outline
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Ghost variant across all color schemes.
 */
export const GhostVariant: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {colorSchemes.map((colorScheme) => (
        <VStack key={colorScheme} spacing={1}>
          <Text fontSize="subtext" color="gray.600">{colorScheme}</Text>
          <Button colorScheme={colorScheme} variant="ghost">
            Ghost
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};
