import { Meta, StoryObj } from '@storybook/react';

import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react';
import { FaUniversity } from '../Icon';
import { IconButton, colorSchemes, variants } from '.';
import { IconButtonColorScheme, IconButtonVariant } from './IconButton.types';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: <FaUniversity />,
    'aria-label': 'University',
  },
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
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    colorScheme: 'primary',
    variant: 'solid',
  },
};

/**
 * Complete icon button matrix showing all colorScheme × variant combinations.
 */
export const AllCombinations: Story = {
  render: (args) => (
    <VStack spacing={6} align="stretch">
      {/* Header row */}
      <HStack spacing={4}>
        <Box w="100px" />
        {variants.map((variant) => (
          <Box key={variant} w="80px" textAlign="center">
            <Text fontSize="sm" fontWeight="bold" color="gray.600">
              {variant}
            </Text>
          </Box>
        ))}
      </HStack>

      {/* Color scheme rows */}
      {colorSchemes.map((colorScheme) => (
        <HStack key={colorScheme} spacing={4}>
          <Box w="100px">
            <Text fontSize="sm" fontWeight="bold" color="gray.600">
              {colorScheme}
            </Text>
          </Box>
          {variants.map((variant) => (
            <Box key={`${colorScheme}-${variant}`} w="80px" textAlign="center">
              <IconButton
                {...args}
                colorScheme={colorScheme}
                variant={variant}
              />
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
};

/**
 * Round icon buttons showing all combinations.
 */
export const RoundAllCombinations: Story = {
  render: (args) => (
    <VStack spacing={6} align="stretch">
      <HStack spacing={4}>
        <Box w="100px" />
        {variants.map((variant) => (
          <Box key={variant} w="80px" textAlign="center">
            <Text fontSize="sm" fontWeight="bold" color="gray.600">
              {variant}
            </Text>
          </Box>
        ))}
      </HStack>

      {colorSchemes.map((colorScheme) => (
        <HStack key={colorScheme} spacing={4}>
          <Box w="100px">
            <Text fontSize="sm" fontWeight="bold" color="gray.600">
              {colorScheme}
            </Text>
          </Box>
          {variants.map((variant) => (
            <Box key={`${colorScheme}-${variant}`} w="80px" textAlign="center">
              <IconButton
                {...args}
                colorScheme={colorScheme}
                variant={variant}
                isRound
              />
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
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="sm" color="gray.600">{variant}</Text>
          <IconButton {...args} colorScheme="primary" variant={variant} />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Secondary color scheme in all variants.
 */
export const Secondary: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="sm" color="gray.600">{variant}</Text>
          <IconButton {...args} colorScheme="secondary" variant={variant} />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Danger color scheme in all variants.
 */
export const Danger: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="sm" color="gray.600">{variant}</Text>
          <IconButton {...args} colorScheme="danger" variant={variant} />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Success color scheme in all variants.
 */
export const Success: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="sm" color="gray.600">{variant}</Text>
          <IconButton {...args} colorScheme="success" variant={variant} />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Warning color scheme in all variants.
 */
export const Warning: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="sm" color="gray.600">{variant}</Text>
          <IconButton {...args} colorScheme="warning" variant={variant} />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Neutral color scheme in all variants.
 */
export const Neutral: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {variants.map((variant) => (
        <VStack key={variant} spacing={1}>
          <Text fontSize="sm" color="gray.600">{variant}</Text>
          <IconButton {...args} colorScheme="neutral" variant={variant} />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Solid variant across all color schemes.
 */
export const SolidVariant: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {colorSchemes.map((colorScheme) => (
        <VStack key={colorScheme} spacing={1}>
          <Text fontSize="sm" color="gray.600">{colorScheme}</Text>
          <IconButton {...args} colorScheme={colorScheme} variant="solid" />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Soft variant across all color schemes.
 */
export const SoftVariant: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {colorSchemes.map((colorScheme) => (
        <VStack key={colorScheme} spacing={1}>
          <Text fontSize="sm" color="gray.600">{colorScheme}</Text>
          <IconButton {...args} colorScheme={colorScheme} variant="soft" />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Outline variant across all color schemes.
 */
export const OutlineVariant: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {colorSchemes.map((colorScheme) => (
        <VStack key={colorScheme} spacing={1}>
          <Text fontSize="sm" color="gray.600">{colorScheme}</Text>
          <IconButton {...args} colorScheme={colorScheme} variant="outline" />
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * Ghost variant across all color schemes.
 */
export const GhostVariant: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {colorSchemes.map((colorScheme) => (
        <VStack key={colorScheme} spacing={1}>
          <Text fontSize="sm" color="gray.600">{colorScheme}</Text>
          <IconButton {...args} colorScheme={colorScheme} variant="ghost" />
        </VStack>
      ))}
    </Flex>
  ),
};
