import { Meta, StoryObj } from '@storybook/react';

import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react';
import { FaUniversity } from '../Icon';
import { IconButton, iconButtonColorPalettes, iconButtonVariants } from '.';
import { IconButtonColorPalette, IconButtonVariant } from './IconButton.types';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    children: <FaUniversity />,
    'aria-label': 'University',
  },
  argTypes: {
    colorPalette: {
      control: 'select',
      options: iconButtonColorPalettes,
      description: 'Semantic color family (overrides Chakra colorPalette)',
    },
    variant: {
      control: 'select',
      options: iconButtonVariants,
      description: 'Visual appearance (overrides Chakra variant)',
    },
    children: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    colorPalette: 'primary',
    variant: 'solid',
  },
};

/**
 * Different sizes of icon buttons.
 */
export const Sizes: Story = {
  render: (args) => (
    <HStack gap={4} align="center">
      <VStack gap={1}>
        <Text fontSize="sm" color="gray.600">xs</Text>
        <IconButton {...args} size="xs" colorPalette="primary" variant="solid" />
      </VStack>
      <VStack gap={1}>
        <Text fontSize="sm" color="gray.600">sm</Text>
        <IconButton {...args} size="sm" colorPalette="primary" variant="solid" />
      </VStack>
      <VStack gap={1}>
        <Text fontSize="sm" color="gray.600">md</Text>
        <IconButton {...args} size="md" colorPalette="primary" variant="solid" />
      </VStack>
      <VStack gap={1}>
        <Text fontSize="sm" color="gray.600">lg</Text>
        <IconButton {...args} size="lg" colorPalette="primary" variant="solid" />
      </VStack>
      <VStack gap={1}>
        <Text fontSize="sm" color="gray.600">xl</Text>
        <IconButton {...args} size="xl" colorPalette="primary" variant="solid" />
      </VStack>
      <VStack gap={1}>
        <Text fontSize="sm" color="gray.600">2xl</Text>
        <IconButton {...args} size="2xl" colorPalette="primary" variant="solid" />
      </VStack>
    </HStack>
  ),
};

/**
 * Complete icon button matrix showing all colorPalette × variant combinations.
 */
export const AllCombinations: Story = {
  render: (args) => (
    <VStack gap={6} align="stretch">
      {/* Header row */}
      <HStack gap={4}>
        <Box w="100px" />
        {iconButtonVariants.map((variant) => (
          <Box key={variant} w="80px" textAlign="center">
            <Text fontWeight="bold" color="gray.600">
              {variant}
            </Text>
          </Box>
        ))}
      </HStack>

      {/* Color scheme rows */}
      {iconButtonColorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap={4}>
          <Box w="100px">
            <Text fontWeight="bold" color="gray.600">
              {colorPalette}
            </Text>
          </Box>
          {iconButtonVariants.map((variant) => (
            <Box key={`${colorPalette}-${variant}`} w="80px" textAlign="center">
              <IconButton
                {...args}
                colorPalette={colorPalette}
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
 * Primary color scheme in all variants.
 */
export const Primary: Story = {
  render: (args) => (
    <Flex gap={4} wrap="wrap">
      {iconButtonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <IconButton {...args} colorPalette="primary" variant={variant} />
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
      {iconButtonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <IconButton {...args} colorPalette="secondary" variant={variant} />
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
      {iconButtonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <IconButton {...args} colorPalette="danger" variant={variant} />
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
      {iconButtonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <IconButton {...args} colorPalette="success" variant={variant} />
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
      {iconButtonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <IconButton {...args} colorPalette="warning" variant={variant} />
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
      {iconButtonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <IconButton {...args} colorPalette="neutral" variant={variant} />
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
      {iconButtonColorPalettes.map((colorPalette) => (
        <VStack key={colorPalette} gap={1}>
          <Text color="gray.600">{colorPalette}</Text>
          <IconButton {...args} colorPalette={colorPalette} variant="solid" />
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
      {iconButtonColorPalettes.map((colorPalette) => (
        <VStack key={colorPalette} gap={1}>
          <Text color="gray.600">{colorPalette}</Text>
          <IconButton {...args} colorPalette={colorPalette} variant="soft" />
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
      {iconButtonColorPalettes.map((colorPalette) => (
        <VStack key={colorPalette} gap={1}>
          <Text color="gray.600">{colorPalette}</Text>
          <IconButton {...args} colorPalette={colorPalette} variant="outline" />
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
      {iconButtonColorPalettes.map((colorPalette) => (
        <VStack key={colorPalette} gap={1}>
          <Text color="gray.600">{colorPalette}</Text>
          <IconButton {...args} colorPalette={colorPalette} variant="ghost" />
        </VStack>
      ))}
    </Flex>
  ),
};
