import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Sparkles } from '../Icon';
import { Button, buttonColorPalettes, buttonVariants } from '.';
import { ButtonColorPalette, ButtonVariant } from './Button.types';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    colorPalette: {
      control: 'select',
      options: buttonColorPalettes,
      description: 'Semantic color family (Chakra v3 colorPalette)',
    },
    variant: {
      control: 'select',
      options: buttonVariants,
      description: 'Visual appearance (overrides Chakra variant)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'Button',
    colorPalette: 'primary',
    variant: 'solid',
  },
};

/**
 * All available button sizes.
 *
 * ## Sizes:
 * - `2xs`: Extra extra small (h: 24px)
 * - `xs`: Extra small (h: 32px) - fontSize bumped to 'sm' (14px) for readability
 * - `sm`: Small (h: 36px)
 * - `md`: Medium (h: 40px) - Default
 * - `lg`: Large (h: 44px)
 * - `xl`: Extra large (h: 48px)
 * - `2xl`: Extra extra large (h: 64px)
 *
 * Note: xs size has a smaller height but uses the same fontSize as sm for better readability.
 */
export const Sizes: Story = {
  render: () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    return (
      <VStack gap={8} align="stretch">
        {/* Solid variant sizes */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
            Solid Variant
          </Text>
          <Flex gap={4} wrap="wrap" align="center">
            {sizes.map((size) => (
              <VStack key={size} gap={2} align="center">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {size}
                </Text>
                <Button colorPalette="primary" variant="solid" size={size}>
                  Button
                </Button>
              </VStack>
            ))}
          </Flex>
        </Box>

        {/* Outline variant sizes */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
            Outline Variant
          </Text>
          <Flex gap={4} wrap="wrap" align="center">
            {sizes.map((size) => (
              <VStack key={size} gap={2} align="center">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {size}
                </Text>
                <Button colorPalette="primary" variant="outline" size={size}>
                  Button
                </Button>
              </VStack>
            ))}
          </Flex>
        </Box>

        {/* With icons */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
            With Icons
          </Text>
          <Flex gap={4} wrap="wrap" align="center">
            {sizes.map((size) => (
              <VStack key={size} gap={2} align="center">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {size}
                </Text>
                <Button colorPalette="primary" variant="soft" size={size}>
                  <Sparkles /> Button
                </Button>
              </VStack>
            ))}
          </Flex>
        </Box>
      </VStack>
    );
  },
};

/**
 * Complete button matrix showing all colorPalette × variant combinations.
 *
 * ## Color Palettes (rows):
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
    <VStack gap={6} align="stretch">
      {/* Header row */}
      <HStack gap={4}>
        <Box w="100px" />
        {buttonVariants.map((variant) => (
          <Box key={variant} w="120px" textAlign="center">
            <Text fontWeight="bold" color="gray.600">
              {variant}
            </Text>
          </Box>
        ))}
      </HStack>

      {/* Color palette rows */}
      {buttonColorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap={4}>
          <Box w="100px">
            <Text fontWeight="bold" color="gray.600">
              {colorPalette}
            </Text>
          </Box>
          {buttonVariants.map((variant) => (
            <Box key={`${colorPalette}-${variant}`} w="120px">
              <Button colorPalette={colorPalette} variant={variant}>
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
    <VStack gap={6} align="stretch">
      <HStack gap={4}>
        <Box w="100px" />
        {buttonVariants.map((variant) => (
          <Box key={variant} w="140px" textAlign="center">
            <Text fontWeight="bold" color="gray.600">
              {variant}
            </Text>
          </Box>
        ))}
      </HStack>

      {buttonColorPalettes.map((colorPalette) => (
        <HStack key={colorPalette} gap={4}>
          <Box w="100px">
            <Text fontWeight="bold" color="gray.600">
              {colorPalette}
            </Text>
          </Box>
          {buttonVariants.map((variant) => (
            <Box key={`${colorPalette}-${variant}`} w="140px">
              <Button colorPalette={colorPalette} variant={variant}>
                <Sparkles /> Button
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
      {buttonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <Button colorPalette="primary" variant={variant}>
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
      {buttonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <Button colorPalette="secondary" variant={variant}>
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
      {buttonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <Button colorPalette="danger" variant={variant}>
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
      {buttonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <Button colorPalette="success" variant={variant}>
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
      {buttonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <Button colorPalette="warning" variant={variant}>
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
      {buttonVariants.map((variant) => (
        <VStack key={variant} gap={1}>
          <Text color="gray.600">{variant}</Text>
          <Button colorPalette="neutral" variant={variant}>
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
      {buttonColorPalettes.map((colorPalette) => (
        <VStack key={colorPalette} gap={1}>
          <Text color="gray.600">{colorPalette}</Text>
          <Button colorPalette={colorPalette} variant="solid">
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
      {buttonColorPalettes.map((colorPalette) => (
        <VStack key={colorPalette} gap={1}>
          <Text color="gray.600">{colorPalette}</Text>
          <Button colorPalette={colorPalette} variant="soft">
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
      {buttonColorPalettes.map((colorPalette) => (
        <VStack key={colorPalette} gap={1}>
          <Text color="gray.600">{colorPalette}</Text>
          <Button colorPalette={colorPalette} variant="outline">
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
      {buttonColorPalettes.map((colorPalette) => (
        <VStack key={colorPalette} gap={1}>
          <Text color="gray.600">{colorPalette}</Text>
          <Button colorPalette={colorPalette} variant="ghost">
            Ghost
          </Button>
        </VStack>
      ))}
    </Flex>
  ),
};

/**
 * `lift` raises the button 1px toward the pointer on hover and puts a shadow
 * under it; pressing sets it back down under the existing `scale`.
 *
 * Off by default on purpose. A lift is emphasis, and a row of six lifting
 * buttons is noise — use it where one button is the point of the screen.
 *
 * The shadow is a `filter: drop-shadow`, not a `box-shadow`: the keyboard focus
 * ring is a box-shadow and Chakra emits `:hover` after `:focus-visible`, so a
 * box-shadow here would eat the ring on a button that is both focused and
 * hovered. Tab to these and then hover them to check.
 */
export const Lift: Story = {
  render: () => (
    <VStack align="flex-start" gap={6} p={4}>
      <HStack gap={4}>
        <Button colorPalette="primary" variant="solid" lift>
          시작하기
        </Button>
        <Button colorPalette="primary" variant="solid">
          기본 (lift 없음)
        </Button>
      </HStack>
      <HStack gap={4}>
        <Button colorPalette="neutral" variant="outline" lift>
          Outline
        </Button>
        <Button colorPalette="primary" variant="soft" lift>
          Soft
        </Button>
        <Button colorPalette="primary" variant="solid" lift disabled>
          Disabled
        </Button>
      </HStack>
    </VStack>
  ),
};

/**
 * `as` swaps the rendered element **and** the props it accepts.
 *
 * A link-shaped button is a real pattern — a call to action that navigates
 * rather than acts. Rendering it as an `<a>` is also the accessible choice:
 * it lands in the tab order as a link, announces as one, and keeps
 * middle-click, "open in new tab" and "copy link address" working.
 *
 * `href`, `target` and `rel` below are `<a>` props, and they type-check
 * because `as="a"` carried them in. The same works for a router link —
 * `<Button as={NextLink} href="/admin" prefetch={false}>`.
 */
export const AsLink: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap" align="center">
      <Button as="a" href="#" colorPalette="primary" variant="solid">
        같은 탭에서 열기
      </Button>
      <Button
        as="a"
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
        colorPalette="secondary"
        variant="outline"
      >
        새 탭에서 열기
      </Button>
    </Flex>

  ),
};
