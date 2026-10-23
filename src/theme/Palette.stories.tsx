import { Box, Separator, Flex, Grid, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { readableColor } from 'polished';
import { Fragment, MouseEventHandler, useState } from 'react';

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
import {
  DEPRECATED_ALIASES,
  getSwatchGroups,
  type Swatch,
} from './paletteSwatches';

const meta = {
  title: 'Setup/Theme',
  parameters: {
    docs: {
      description: {
        component: `
## BAZE colour system (5.0)

Three layers; components read only the last one.

1. **Raw scales** — \`ink\` / \`inkDark\`, \`sand\` / \`sandDark\`, \`slate\` / \`slateDark\` (1–12), \`coral\`, 12 system hues, and \`dataviz\`. Values come from \`scripts/palette/generate.mjs\`.
2. **Semantic steps** — \`neutral.1–12\` and \`secondary.1–12\`, filled by the theme option: \`createLogicianTheme({ neutral: 'ink' | 'slate', secondary: 'sand' })\` (or \`<LogicianProvider theme={…}>\`).
3. **Role tokens** — \`bg.*\`, \`layer.*\`, \`fg.*\`, \`border.*\`, \`primary.*\`, \`action.*\`, status \`{bg,border,fg,solid,onSolid}\`, \`category.*\`, data-viz fills \`data.*\` / \`diverging.*\` …

Every value below is shown in light and dark. Contrast is audited in CI (\`contrast.test.ts\`) in light, dark and both high-contrast modes. The 4.x names still resolve as aliases until 6.0 and are listed at the bottom, not in the grid. Setup/Theme/BAZE Palette shows the raw scales and every role in all four modes.
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

const ColorCard = ({ swatch }: { swatch: Swatch }) => {
  const { light, dark } = swatch;
  const hasDark = dark !== light;

  return (
    <Flex flexDir="column" align="stretch" p={2}>
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
        {swatch.path}
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
          borderColor="border.subtle"
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
          <Subtext color="fg.muted">Subtext - Helper text, captions</Subtext>
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
          <H4 color="fg.default" mb={2}>
            Typography Components
          </H4>
          <Subtext color="fg.muted">
            Responsive typography using em units. Use the token with fontSize
            prop on any component.
          </Subtext>
        </Box>

        <Separator />

        {/* Header row */}
        <Flex w="full" px={4} gap={4} display={{ base: 'none', md: 'flex' }}>
          <Box flex="1" minW="300px">
            <Subtext color="fg.subtle" fontWeight="semibold">
              Component
            </Subtext>
          </Box>
          <Box w="80px" textAlign="center">
            <Subtext color="fg.subtle" fontWeight="semibold">
              Token
            </Subtext>
          </Box>
          <Box w="120px" textAlign="right">
            <Subtext color="fg.subtle" fontWeight="semibold">
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
              borderColor="border.subtle"
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
                  color="fg.subtle"
                  textAlign="right"
                >
                  {item.base} → {item.md}
                </Text>
              </Flex>
            </Flex>
          ))}
        </VStack>

        <Box mt={4} p={4} bg="bg.subtle" borderRadius="md" w="full">
          <Subtitle color="fg.default" mb={2} fontWeight="semibold">
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

const AliasTable = () => (
  <Box w="full" mt={6}>
    <H4 color="fg.default" mb={2}>
      4.x aliases (removed in 6.0)
    </H4>
    <Grid templateColumns="max-content max-content" columnGap={6} rowGap={1}>
      {Object.entries(DEPRECATED_ALIASES).map(([alias, target]) => (
        <Fragment key={alias}>
          <Text fontFamily="mono" color="fg.muted">
            {alias}
          </Text>
          <Text fontFamily="mono" color="fg.default">
            → {target}
          </Text>
        </Fragment>
      ))}
    </Grid>
  </Box>
);

/** Every 5.0 semantic colour, resolved to hex in light and dark. */
export const Default: Story = {
  render: () => (
    <VStack gap={4} align="flex-start" w="full">
      {getSwatchGroups().map(([group, swatches]: [string, Swatch[]]) => (
        <Flex key={group} gap={4} align="flex-start" w="full">
          <H4
            mt={2}
            w="120px"
            flexShrink={0}
            textTransform="capitalize"
            color="fg.default"
          >
            {group}
          </H4>
          <Grid
            templateColumns="repeat(auto-fill, minmax(132px, 1fr))"
            gap={2}
            flex="1"
            minW="0"
          >
            {swatches.map((s) => (
              <ColorCard key={s.path} swatch={s} />
            ))}
          </Grid>
        </Flex>
      ))}
      <AliasTable />
    </VStack>
  ),
};
