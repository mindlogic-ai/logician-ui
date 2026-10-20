import { Box, Separator, Flex, Grid, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { readableColor } from 'polished';
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
 * E.g., '{colors.ink.11}' -> '#252525'
 */
const resolveTokenReference = (reference: string | undefined): string => {
  if (!reference) return '';
  // Scale reference, e.g. '{colors.blue.500}' or '{colors.gray.1500}'.
  const scaleMatch = reference.match(/^\{colors\.(\w+)\.(\w+)\}$/);
  if (scaleMatch) {
    const [, colorName, shade] = scaleMatch;
    const colorScale = (colors as any)[colorName];
    if (colorScale && colorScale[shade]) {
      return colorScale[shade].value;
    }
    return reference;
  }
  // Flat reference with no shade, e.g. '{colors.white}' / '{colors.black}'.
  const flatMatch = reference.match(/^\{colors\.(\w+)\}$/);
  if (flatMatch) {
    const entry = (colors as any)[flatMatch[1]];
    if (entry && typeof entry.value === 'string') {
      return entry.value;
    }
  }
  // Already a hex value or unknown format.
  return reference;
};

/**
 * A semantic token `value` is either a plain reference string (legacy) or a
 * mode-conditional object with any of `base` / `_light` / `_dark`. Resolve it to
 * concrete light/dark hex codes so the palette can show both modes side by side.
 */
type TokenValue = string | { base?: string; _light?: string; _dark?: string };

const resolveTokenValue = (
  value: TokenValue | undefined
): { light: string; dark: string } => {
  if (!value) return { light: '', dark: '' };
  if (typeof value === 'string') {
    const hex = resolveTokenReference(value);
    return { light: hex, dark: hex };
  }
  // A `_light` / `_dark` condition wins over `base` in its mode; fall back to
  // `base` (then the other mode) when a token omits one, so tokens declared with
  // only `_light`/`_dark` (e.g. `*.DEFAULT`, `border.subtle`) resolve too.
  return {
    light: resolveTokenReference(value._light ?? value.base ?? value._dark),
    dark: resolveTokenReference(value._dark ?? value.base ?? value._light),
  };
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

// Safe readableColor that falls back to black
const safeReadableColor = (color: string) => {
  try {
    return readableColor(color);
  } catch {
    return '#000000';
  }
};

const SwatchHalf = ({ label, hex }: { label: string; hex: string }) => {
  const [wasCopied, setWasCopied] = useState<boolean>();
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(hex);
    setWasCopied(true);
    setTimeout(() => setWasCopied(false), 2000);
  };
  return (
    <Tooltip content="Copy hex code" placement="top">
      <Flex
        flex="1"
        h="72px"
        direction="column"
        justify="space-between"
        bg={hex}
        p={2}
        as="button"
        transition="transform 0.1s ease-in-out"
        // @ts-expect-error as prop
        onClick={handleClick}
        _hover={{ transform: 'scale(1.03)' }}
      >
        <Text color={safeReadableColor(hex)} fontSize="10px" textAlign="left">
          {label}
        </Text>
        <Text
          color={safeReadableColor(hex)}
          fontSize="10px"
          fontFamily="mono"
          textAlign="left"
        >
          {wasCopied ? 'Copied!' : hex}
        </Text>
      </Flex>
    </Tooltip>
  );
};

const ColorCard = ({
  color,
  shade,
  shadeValue,
}: {
  color: string;
  shade: string;
  shadeValue: TokenValue;
}) => {
  // Resolve to concrete light/dark hex so both modes are visible at once.
  const { light, dark } = resolveTokenValue(shadeValue);
  const hasDark = dark !== light;

  return (
    <Flex flexDir="column" align="stretch" key={shade} p={2}>
      <Flex
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
        border="1px solid"
        borderColor="border.subtle"
      >
        <SwatchHalf label={hasDark ? 'Light' : ''} hex={light} />
        {hasDark && <SwatchHalf label="Dark" hex={dark} />}
      </Flex>
      <Text
        color="fg.muted"
        mt={2}
        textStyle="subtext"
        textAlign="center"
        wordBreak="break-word"
      >
        {color}.{shade}
      </Text>
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
      <Tooltip content="Copy hex code" placement="top">
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
            <Text color={readableColor(hex)} textStyle="subtext">
              Copied!
            </Text>
          ) : (
            <Text color={readableColor(hex)} fontSize="10px" fontFamily="mono">
              {hex}
            </Text>
          )}
        </Flex>
      </Tooltip>
      <Text color="fg.default" mt={1} textStyle="subtext">
        {name}.{shade}
      </Text>
    </Flex>
  );
};

// Colour stories moved to `BazePalette.stories.tsx` (Setup/Theme/BAZE Palette) in 5.0.

export const FontSizes: Story = {
  name: 'Font Sizes',
  render: () => {
    const typographyItems = [
      {
        component: <H1 color="fg.default">H1 - Page titles</H1>,
        name: 'H1',
        token: 'h1',
        base: '2.4rem',
        md: '3rem',
      },
      {
        component: <H2 color="fg.default">H2 - Section headers</H2>,
        name: 'H2',
        token: 'h2',
        base: '2rem',
        md: '2.5rem',
      },
      {
        component: <H3 color="fg.default">H3 - Subsection headers</H3>,
        name: 'H3',
        token: 'h3',
        base: '1.5rem',
        md: '1.75rem',
      },
      {
        component: <H4 color="fg.default">H4 - Card titles</H4>,
        name: 'H4',
        token: 'h4',
        base: '1.25rem',
        md: '1.44rem',
      },
      {
        component: <H5 color="fg.default">H5 - Small headings</H5>,
        name: 'H5',
        token: 'h5',
        base: '1.1rem',
        md: '1.2rem',
      },
      {
        component: <Text color="fg.default">Text - Body text</Text>,
        name: 'Text',
        token: 'p',
        base: '0.875rem',
        md: '1rem',
      },
      {
        component: (
          <Subtitle color="fg.default">Subtitle - Subtitle text</Subtitle>
        ),
        name: 'Subtitle',
        token: 'subtitle',
        base: '0.875rem',
        md: '1rem',
      },
      {
        component: (
          <Subtext color="gray.800">Subtext - Helper text, captions</Subtext>
        ),
        name: 'Subtext',
        token: 'subtext',
        base: '0.805rem',
        md: '0.875rem',
      },
    ];

    return (
      <VStack gap={6} align="flex-start" w="full">
        <Box>
          <H4 color="gray.1300" mb={2}>
            Typography Components
          </H4>
          <Subtext color="gray.700">
            Responsive typography using em units. Use the token with fontSize
            prop on any component.
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
                  bg="primary.extralight"
                  borderRadius="md"
                  fontFamily="mono"
                  textStyle="subtext"
                  color="primary.dark"
                  textAlign="center"
                >
                  {item.token}
                </Box>
                <Text
                  w="120px"
                  fontFamily="mono"
                  textStyle="subtext"
                  color="gray.600"
                  textAlign="right"
                >
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
            bg="bg.inverse"
            color="fg.inverse"
            borderRadius="md"
            textStyle="subtext"
            overflow="auto"
          >
            {`// Using Typography components (recommended)
import { H1, Text, Subtext } from '@mindlogic-ai/logician-ui';

<H1>Page Title</H1>
<Text>Body content</Text>

// Using tokens on any Chakra component
<Box textStyle="h1">Large text</Box>
<ChakraText textStyle="subtext">Small helper</ChakraText>`}
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
      <VStack gap={4} align="flex-start" w="full">
        {Object.entries(semanticTokens.colors)
          .filter(([color]) => !color.startsWith('chakra'))
          .map(([color, shades]) => (
            <Flex key={color} gap={4} align="flex-start" w="full">
              <H4
                mt={2}
                w="120px"
                flexShrink={0}
                textTransform="capitalize"
                color="fg.default"
              >
                {color}
              </H4>
              <Grid
                templateColumns="repeat(auto-fill, minmax(132px, 1fr))"
                gap={2}
                flex="1"
                minW="0"
              >
                {Object.entries(shades).flatMap(([shade, shadeValue]) => {
                  const node = shadeValue as any;
                  // Leaf token: render its value directly.
                  if (node && node.value !== undefined) {
                    return [
                      <ColorCard
                        key={shade}
                        color={color}
                        shade={shade}
                        shadeValue={node.value as TokenValue}
                      />,
                    ];
                  }
                  // Nested group (e.g. bg.invalid → bg.invalid.subtle): render
                  // each leaf beneath it as `<shade>.<sub>`.
                  if (node && typeof node === 'object') {
                    return Object.entries(node)
                      .filter(([, sub]) => (sub as any)?.value !== undefined)
                      .map(([subShade, sub]) => (
                        <ColorCard
                          key={`${shade}.${subShade}`}
                          color={color}
                          shade={`${shade}.${subShade}`}
                          shadeValue={(sub as any).value as TokenValue}
                        />
                      ));
                  }
                  return [];
                })}
              </Grid>
            </Flex>
          ))}
      </VStack>
    );
  },
};
