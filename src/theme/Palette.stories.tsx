import {
  Box,
  Separator,
  Flex,
  Grid,
  VStack,
} from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { lighten, readableColor } from 'polished';
import { MouseEventHandler, useState } from 'react';

import { Tooltip } from '../components/Tooltip';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Subtext,
  Subtitle,
  Text,
} from '../components/Typography';
import { colors, semanticTokens } from './colors';

/**
 * Helper function to resolve a semantic token reference to its actual hex value.
 * E.g., '{colors.blue.500}' -> '#1751D0'
 */
const resolveTokenReference = (reference: string): string => {
  // Check if it's a reference string like '{colors.blue.500}'
  const match = reference.match(/^\{colors\.(\w+)\.(\d+)\}$/);
  if (!match) {
    // Already a hex value or unknown format
    return reference;
  }
  const [, colorName, shade] = match;
  const colorScale = (colors as any)[colorName];
  if (colorScale && colorScale[shade]) {
    return colorScale[shade].value;
  }
  return reference;
};

const meta = {
  title: 'Setup/Theme',
  parameters: {
    docs: {
      description: {
        component: `
## Golden Ratio Color System

A mathematically harmonious color palette designed using the golden ratio (φ ≈ 1.618)
to create visually balanced color relationships.

### Design Principles

1. **Accessibility First**: All semantic color combinations meet WCAG 2.1 AA standards
2. **Cool Gray Foundation**: Slate-based grays with blue undertone for modern feel
3. **Consistent Scale**: Each color has 50/100/200/300/500/600/700/800/900 steps

### Semantic Tokens

- **Primary** (Blue): Main brand interactions
- **Secondary** (Violet): Supporting accent elements
- **Success** (Green): Positive feedback
- **Warning** (Gold): Cautionary feedback
- **Danger** (Rose): Error/destructive feedback

### Primitive Palettes

- **Blue**: Primary brand color
- **Rose**: Danger/error states
- **Green**: Success states
- **Violet**: Secondary/accent
- **Gold**: Warning states
- **Gray**: Neutral tones (slate-based with cool blue undertone)
        `,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const ColorCard = ({
  color,
  shade,
  shadeValue,
}: {
  color: string;
  shade: string;
  shadeValue: string;
}) => {
  const [wasCopied, setWasCopied] = useState<boolean>();
  // Resolve the token reference to actual hex value
  const hexCode = resolveTokenReference(shadeValue);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(hexCode);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 2000);
  };

  // Safe lighten that falls back to the original color
  const safeLighten = (amount: number, color: string) => {
    try {
      return lighten(amount, color);
    } catch {
      return color;
    }
  };

  // Safe readableColor that falls back to black
  const safeReadableColor = (color: string) => {
    try {
      return readableColor(color);
    } catch {
      return '#000000';
    }
  };

  return (
    <Flex flexDir="column" align="center" key={shade} p={2}>
      <Tooltip label="Copy hex code" placement="top">
        <Flex
          w="100px"
          h="100px"
          align="flex-end"
          bg={hexCode}
          borderRadius="md"
          boxShadow="md"
          as="button"
          transition="transform 0.1s ease-in-out"
          // @ts-expect-error as prop
          onClick={handleClick}
          _hover={{
            transform: 'scale(1.05)',
          }}
        >
          {wasCopied ? (
            <Flex
              color={safeReadableColor(hexCode)}
              w="100%"
              h="100%"
              justify="center"
              align="center"
            >
              Copied!
            </Flex>
          ) : (
            <Box
              textAlign="center"
              mt={4}
              color={safeReadableColor(safeLighten(0.2, hexCode))}
              bgColor={safeLighten(0.2, hexCode)}
              m={2}
              p={1}
              w="100%"
              borderRadius="md"
            >
              <Text color="inherit" fontSize="subtext">
                {hexCode}
              </Text>
            </Box>
          )}
        </Flex>
      </Tooltip>
      <Text color="gray.1200" mt={2} fontSize="subtext">
        {color}.{shade}
      </Text>
      <Subtext color="gray.700">{shadeValue !== hexCode && shadeValue}</Subtext>
    </Flex>
  );
};

const PrimitiveColorCard = ({
  name,
  shade,
  hex,
}: {
  name: string;
  shade: string;
  hex: string;
}) => {
  const [wasCopied, setWasCopied] = useState<boolean>();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(hex);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 2000);
  };

  return (
    <Flex flexDir="column" align="center" p={1}>
      <Tooltip label="Copy hex code" placement="top">
        <Flex
          w="72px"
          h="56px"
          align="center"
          justify="center"
          bg={hex}
          borderRadius="md"
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.200"
          as="button"
          transition="transform 0.1s ease-in-out"
          // @ts-expect-error as prop
          onClick={handleClick}
          _hover={{
            transform: 'scale(1.05)',
          }}
        >
          {wasCopied ? (
            <Text color={readableColor(hex)} fontSize="subtext">
              Copied!
            </Text>
          ) : (
            <Text color={readableColor(hex)} fontSize="10px" fontFamily="mono">
              {hex}
            </Text>
          )}
        </Flex>
      </Tooltip>
      <Text color="gray.1200" mt={1} fontSize="subtext">
        {name}.{shade}
      </Text>
    </Flex>
  );
};

/**
 * Semantic tokens provide meaning-based color references for UI elements.
 * These are the recommended colors to use in components.
 */
export const SemanticTokens: Story = {
  name: 'Semantic Tokens',
  render: () => {
    return (
      <VStack gap={6} align="flex-start" w="full">
        <Box>
          <H4 color="gray.1300" mb={2}>
            Semantic Color Tokens
          </H4>
          <Subtext color="gray.700">
            Use these tokens in components for consistent theming. Click to copy
            hex value.
          </Subtext>
        </Box>

        <Separator />

        {Object.entries(semanticTokens.colors)
          .filter(([color]) => !color.startsWith('chakra'))
          .map(([color, shades]) => (
            <Flex key={color} gap={4} align="center" wrap="wrap">
              <H4
                mb={2}
                w="100px"
                textTransform="capitalize"
                color="gray.1200"
              >
                {color}
              </H4>
              <Flex gap={2} wrap="wrap">
                {Object.entries(shades).map(([shade, shadeValue]) => (
                  <ColorCard
                    key={shade}
                    color={color}
                    shade={shade}
                    shadeValue={(shadeValue as any).value as string}
                  />
                ))}
              </Flex>
            </Flex>
          ))}
      </VStack>
    );
  },
};

/**
 * Primitive colors are the raw color values organized by hue.
 * Use semantic tokens when possible, but these are available for edge cases.
 */
export const PrimitiveColors: Story = {
  name: 'Primitive Colors',
  render: () => {
    const primitiveColors = {
      blue: colors.blue,
      rose: colors.rose,
      green: colors.green,
      violet: colors.violet,
      gold: colors.gold,
    };

    return (
      <VStack gap={6} align="flex-start" w="full">
        <Box>
          <H4 color="gray.1300" mb={2}>
            Primitive Color Palettes
          </H4>
          <Subtext color="gray.700">
            Raw color values organized by hue. Prefer semantic tokens when
            possible.
          </Subtext>
        </Box>

        <Separator />

        {Object.entries(primitiveColors).map(([name, shades]) => (
          <Box key={name} w="full">
            <Subtitle
              color="gray.1100"
              textTransform="capitalize"
              mb={2}
              fontWeight="semibold"
            >
              {name}
            </Subtitle>
            <Flex gap={1} wrap="wrap">
              {Object.entries(shades).map(([shade, hex]) => {
                const hexValue = hex
                  ? (typeof hex === 'object' && 'value' in hex
                    ? (hex as any).value as string
                    : hex as string)
                  : '';
                return (
                  <PrimitiveColorCard
                    key={shade}
                    name={name}
                    shade={shade}
                    hex={hexValue}
                  />
                );
              })}
            </Flex>
          </Box>
        ))}
      </VStack>
    );
  },
};

/**
 * Extended gray scale with 16 shades (0-1500) for fine-grained control.
 * Based on a cool slate palette with subtle blue undertone.
 */
export const GrayScale: Story = {
  name: 'Gray Scale (Slate)',
  render: () => {
    return (
      <VStack gap={6} align="flex-start" w="full">
        <Box>
          <H4 color="gray.1300" mb={2}>
            Gray Scale (Slate-based)
          </H4>
          <Subtext color="gray.700">
            Extended 16-shade gray scale with cool blue undertone. Optimized for
            WCAG contrast ratios.
          </Subtext>
        </Box>

        <Separator />

        <Grid templateColumns="repeat(auto-fill, minmax(80px, 1fr))" gap={2}>
          {Object.entries(colors.gray).map(([shade, hex]) => {
            const hexValue = hex
              ? (typeof hex === 'object' && 'value' in hex
                ? (hex as any).value as string
                : hex as string)
              : '';
            return (
              <PrimitiveColorCard
                key={shade}
                name="gray"
                shade={shade}
                hex={hexValue}
              />
            );
          })}
        </Grid>

        <Box mt={4} p={4} bg="gray.50" borderRadius="md" w="full">
          <Subtitle color="gray.1100" mb={2} fontWeight="semibold">
            Recommended Usage
          </Subtitle>
          <VStack align="flex-start" gap={1}>
            <Subtext color="gray.800">
              • <strong>gray.0-200</strong>: Backgrounds, subtle borders
            </Subtext>
            <Subtext color="gray.800">
              • <strong>gray.300-500</strong>: Borders, disabled states,
              placeholders
            </Subtext>
            <Subtext color="gray.800">
              • <strong>gray.600-800</strong>: Secondary text, icons
            </Subtext>
            <Subtext color="gray.800">
              • <strong>gray.900-1200</strong>: Primary text, headings
            </Subtext>
            <Subtext color="gray.800">
              • <strong>gray.1300-1500</strong>: High-contrast text, dark
              backgrounds
            </Subtext>
          </VStack>
        </Box>
      </VStack>
    );
  },
};

/**
 * Contrast ratio reference for accessibility compliance.
 */
export const ContrastReference: Story = {
  name: 'Contrast Reference',
  render: () => {
    const contrastPairs = [
      {
        bg: 'primary.lightest',
        text: 'primary.dark',
        label: 'primary.lightest + dark',
        ratio: '7.2:1',
        badge: 'AAA',
      },
      {
        bg: 'primary.main',
        text: 'white',
        label: 'primary.main + white',
        ratio: '5.9:1',
        badge: 'AA',
      },
      {
        bg: 'danger.lightest',
        text: 'danger.dark',
        label: 'danger.lightest + dark',
        ratio: '7.4:1',
        badge: 'AAA',
      },
      {
        bg: 'danger.main',
        text: 'white',
        label: 'danger.main + white',
        ratio: '5.2:1',
        badge: 'AA',
      },
      {
        bg: 'success.lightest',
        text: 'success.dark',
        label: 'success.lightest + dark',
        ratio: '6.1:1',
        badge: 'AA',
      },
      {
        bg: 'warning.lightest',
        text: 'warning.dark',
        label: 'warning.lightest + dark',
        ratio: '5.8:1',
        badge: 'AA',
      },
      {
        bg: 'gray.0',
        text: 'gray.1300',
        label: 'gray.0 + gray.1300',
        ratio: '11.2:1',
        badge: 'AAA',
      },
      {
        bg: 'gray.50',
        text: 'gray.900',
        label: 'gray.50 + gray.900',
        ratio: '6.2:1',
        badge: 'AA',
      },
    ];

    return (
      <VStack gap={6} align="flex-start" w="full">
        <Box>
          <H4 color="gray.1300" mb={2}>
            WCAG Contrast Reference
          </H4>
          <Subtext color="gray.700">
            All semantic color combinations meet WCAG 2.1 AA standards (4.5:1
            minimum).
          </Subtext>
        </Box>

        <Separator />

        <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={4}>
          {contrastPairs.map((pair) => (
            <Box
              key={pair.label}
              borderRadius="lg"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
            >
              <Flex
                bg={pair.bg}
                p={6}
                justify="center"
                align="center"
                minH="80px"
              >
                <Text color={pair.text} fontWeight="semibold">
                  Sample Text
                </Text>
              </Flex>
              <Flex
                p={3}
                bg="gray.50"
                justify="space-between"
                align="center"
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Subtext color="gray.800">{pair.label}</Subtext>
                <Flex align="center" gap={2}>
                  <Text fontFamily="mono" fontSize="subtext" color="gray.700">
                    {pair.ratio}
                  </Text>
                  <Box
                    px={2}
                    py={0.5}
                    borderRadius="sm"
                    bg={pair.badge === 'AAA' ? 'success.lightest' : 'gold.100'}
                    color={pair.badge === 'AAA' ? 'success.dark' : 'gold.700'}
                  >
                    <Text fontSize="10px" fontWeight="bold">
                      {pair.badge}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Grid>
      </VStack>
    );
  },
};

/**
 * Typography components showcasing the font size scale.
 * Each component uses responsive em units for scalability.
 */
export const FontSizes: Story = {
  name: 'Font Sizes',
  render: () => {
    const typographyItems = [
      {
        component: <H1 color="gray.1200">H1 - Page titles</H1>,
        name: 'H1',
        token: 'h1',
        base: '2.4em',
        md: '3em',
      },
      {
        component: <H2 color="gray.1200">H2 - Section headers</H2>,
        name: 'H2',
        token: 'h2',
        base: '2em',
        md: '2.5em',
      },
      {
        component: <H3 color="gray.1200">H3 - Subsection headers</H3>,
        name: 'H3',
        token: 'h3',
        base: '1.5em',
        md: '1.75em',
      },
      {
        component: <H4 color="gray.1200">H4 - Card titles</H4>,
        name: 'H4',
        token: 'h4',
        base: '1.25em',
        md: '1.44em',
      },
      {
        component: <H5 color="gray.1200">H5 - Small headings</H5>,
        name: 'H5',
        token: 'h5',
        base: '1.1em',
        md: '1.2em',
      },
      {
        component: <Text color="gray.1200">Text - Body text</Text>,
        name: 'Text',
        token: 'p',
        base: '1em',
        md: '1em',
      },
      {
        component: <Subtitle color="gray.1200">Subtitle - Subtitle text</Subtitle>,
        name: 'Subtitle',
        token: 'subtitle',
        base: '0.92em',
        md: '1em',
      },
      {
        component: <Subtext color="gray.800">Subtext - Helper text, captions</Subtext>,
        name: 'Subtext',
        token: 'subtext',
        base: '0.92em',
        md: '1em',
      },
    ];

    return (
      <VStack gap={6} align="flex-start" w="full">
        <Box>
          <H4 color="gray.1300" mb={2}>
            Typography Components
          </H4>
          <Subtext color="gray.700">
            Responsive typography using em units. Use the token with fontSize prop on any component.
          </Subtext>
        </Box>

        <Separator />

        {/* Header row */}
        <Flex w="full" px={4} gap={4} display={{ base: 'none', md: 'flex' }}>
          <Box flex="1" minW="300px">
            <Subtext color="gray.600" fontWeight="semibold">
              Component
            </Subtext>
          </Box>
          <Box w="80px" textAlign="center">
            <Subtext color="gray.600" fontWeight="semibold">
              Token
            </Subtext>
          </Box>
          <Box w="120px" textAlign="right">
            <Subtext color="gray.600" fontWeight="semibold">
              Size (mobile → desktop)
            </Subtext>
          </Box>
        </Flex>

        <VStack gap={0} align="stretch" w="full">
          {typographyItems.map((item) => (
            <Flex
              key={item.name}
              py={4}
              px={4}
              borderBottom="1px solid"
              borderColor="gray.100"
              align="center"
              justify="space-between"
              wrap="wrap"
              gap={4}
            >
              <Box flex="1" minW="300px">
                {item.component}
              </Box>
              <Flex gap={4} align="center">
                <Box
                  w="80px"
                  px={2}
                  py={1}
                  bg="primary.lightest"
                  borderRadius="md"
                  fontFamily="mono"
                  fontSize="subtext"
                  color="primary.dark"
                  textAlign="center"
                >
                  {item.token}
                </Box>
                <Text w="120px" fontFamily="mono" fontSize="subtext" color="gray.600" textAlign="right">
                  {item.base} → {item.md}
                </Text>
              </Flex>
            </Flex>
          ))}
        </VStack>

        <Box mt={4} p={4} bg="gray.50" borderRadius="md" w="full">
          <Subtitle color="gray.1100" mb={2} fontWeight="semibold">
            Usage
          </Subtitle>
          <Box
            as="pre"
            p={3}
            bg="gray.800"
            color="gray.100"
            borderRadius="md"
            fontSize="subtext"
            overflow="auto"
          >
            {`// Using Typography components (recommended)
import { H1, Text, Subtext } from '@mindlogic-ai/logician-ui';

<H1>Page Title</H1>
<Text>Body content</Text>

// Using tokens on any Chakra component
<Box fontSize="h1">Large text</Box>
<ChakraText fontSize="subtext">Small helper</ChakraText>`}
          </Box>
        </Box>
      </VStack>
    );
  },
};

// Keep the original Default story for backwards compatibility
export const Default: Story = {
  render: () => {
    return (
      <VStack gap={4} align="flex-start">
        {Object.entries(semanticTokens.colors)
          .filter(([color]) => !color.startsWith('chakra'))
          .map(([color, shades]) => (
            <Flex key={color} gap={4} align="center">
              <H4 mb={2} w="100px" textTransform="capitalize" color="gray.1200">
                {color}
              </H4>
              <Flex gap={2}>
                {Object.entries(shades).map(([shade, shadeValue]) => (
                  <ColorCard
                    key={shade}
                    color={color}
                    shade={shade}
                    shadeValue={(shadeValue as any).value as string}
                  />
                ))}
              </Flex>
            </Flex>
          ))}
      </VStack>
    );
  },
};
