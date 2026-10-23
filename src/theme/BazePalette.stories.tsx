import { Box, Flex, Grid, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { H4, Subtext, Text } from '../components/Typography';
import {
  DEPRECATED_COLOR_TOKENS,
  ROLE_TOKEN_PATHS,
  SYSTEM_HUE_NAMES,
} from './colors';
import {
  CORAL,
  DATAVIZ,
  RAMPS,
  SCHEMES,
  SYSTEM_HUES,
} from './palette.generated';

/**
 * logician-ui 5.0 BAZE palette — the three token layers.
 *
 * Every value here is read from `palette.generated.ts` (the generator output
 * that `contrast.test.ts` audits), so this page cannot drift from the theme.
 * Role tokens are shown for light / dark / high-contrast light / high-contrast
 * dark; high contrast applies under `prefers-contrast: more`.
 */
const meta: Meta = {
  title: 'Setup/Theme/BAZE Palette',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const lum = (h: string) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const ink = (hex: string) =>
  hex.startsWith('#') && lum(hex) < 0.18 ? '#F5EDE0' : '#252525';

const Chip = ({ hex, label }: { hex: string; label?: string }) => (
  <Box
    bg={hex}
    color={hex.startsWith('#') ? ink(hex) : 'fg.default'}
    borderRadius="sm"
    px={2}
    py={1.5}
    fontSize="11px"
    fontFamily="mono"
    borderWidth="1px"
    borderColor="blackAlpha.100"
  >
    {label && <b>{label} </b>}
    {hex.replace('#', '')}
  </Box>
);

const Ramp = ({
  name,
  steps,
  canvas,
}: {
  name: string;
  steps: Record<string, string>;
  canvas: string;
}) => (
  <Stack gap={1}>
    <Subtext>
      {name} (vs {canvas})
    </Subtext>
    <Grid templateColumns="repeat(12, 1fr)" gap={1}>
      {Object.entries(steps).map(([step, hex]) => (
        <Box key={step}>
          <Chip hex={hex} label={step} />
          <Subtext fontSize="10px">{ratio(hex, canvas).toFixed(2)}</Subtext>
        </Box>
      ))}
    </Grid>
  </Stack>
);

/** Raw scales — colour names. Components never read these directly. */
export const RawScales: Story = {
  render: () => (
    <Stack gap={6} maxW="1100px">
      <Text>
        Step number = job: 1–3 backgrounds, 4–6 dividers/borders, 7 control
        border (3:1), 8 icon/placeholder (4.5:1), 9–11 text, 12 maximum. ink 11
        is the brand black anchor #252525.
      </Text>
      {(['ink', 'sand', 'slate'] as const).map((n) => (
        <Stack key={n} gap={2}>
          <H4>{n}</H4>
          <Ramp name={`${n}.1–12`} steps={RAMPS[n].light} canvas="#FFFFFF" />
          <Ramp
            name={`${n}Dark.1–12`}
            steps={RAMPS[n].dark}
            canvas={RAMPS[n].canvasDark}
          />
        </Stack>
      ))}
      <H4>coral</H4>
      <Flex gap={2} wrap="wrap">
        {Object.entries(CORAL).map(([k, hex]) => (
          <Chip key={k} hex={hex} label={k} />
        ))}
      </Flex>
      <H4>dataviz</H4>
      <Flex gap={2} wrap="wrap">
        {Object.entries(DATAVIZ).map(([k, hex]) => (
          <Chip key={k} hex={hex} label={k} />
        ))}
      </Flex>
      <H4>system hues</H4>
      <Grid templateColumns="120px repeat(8, 1fr)" gap={1} fontSize="11px">
        <span />
        {Object.keys(SYSTEM_HUES.red).map((k) => (
          <Subtext key={k}>{k}</Subtext>
        ))}
        {SYSTEM_HUE_NAMES.map((hue) => (
          <Box key={hue} display="contents">
            <Text>{hue}</Text>
            {Object.entries(SYSTEM_HUES[hue]).map(([k, hex]) => (
              <Chip key={k} hex={hex} />
            ))}
          </Box>
        ))}
      </Grid>
    </Stack>
  ),
};

/** Role tokens in all four modes (BAZE scheme: neutral = ink, secondary = sand). */
export const RoleTokens: Story = {
  render: () => (
    <Grid
      templateColumns="220px repeat(4, 1fr)"
      gap={1}
      maxW="1100px"
      alignItems="center"
    >
      {['token', 'light', 'dark', 'hc light', 'hc dark'].map((h) => (
        <Subtext key={h} fontWeight="bold">
          {h}
        </Subtext>
      ))}
      {Object.entries(ROLE_TOKEN_PATHS).map(([flat, path]) => (
        <Box key={flat} display="contents">
          <Text fontFamily="mono" fontSize="12px">
            {path.replace(/\.DEFAULT$/, '')}
          </Text>
          {(['light', 'dark', 'hcLight', 'hcDark'] as const).map((m) => (
            <Chip
              key={m}
              hex={
                (SCHEMES.ink[m] as Record<string, string>)[flat] ??
                'transparent'
              }
            />
          ))}
        </Box>
      ))}
    </Grid>
  ),
};

const DATA_STEPS = ['data-1', 'data-2', 'data-3', 'data-4'];
const DIVERGING_STEPS = [
  'diverging-neg-3',
  'diverging-neg-2',
  'diverging-neg-1',
  'diverging-mid',
  'diverging-pos-1',
  'diverging-pos-2',
  'diverging-pos-3',
];
const LABEL_INK = '#252525';
const LABEL_WHITE = '#FFFFFF';

/** The in-cell label a step takes: ink or white by measured contrast (≥ 4.5:1), or none. */
const DataCell = ({ flat, hex }: { flat: string; hex: string }) => {
  const label = [LABEL_INK, LABEL_WHITE]
    .map((c) => ({ c, r: ratio(hex, c) }))
    .sort((a, b) => b.r - a.r)[0];
  const ok = label.r >= 4.5;
  return (
    <Stack gap={1}>
      <Flex
        bg={hex}
        color={label.c}
        h="56px"
        align="center"
        justify="center"
        fontSize="13px"
        fontWeight="bold"
        borderRadius="sm"
      >
        {ok && '42%'}
      </Flex>
      {/* Plain boxes: the panel paints its own mode, so text inherits its colour. */}
      <Box fontFamily="mono" fontSize="11px">
        {ROLE_TOKEN_PATHS[flat as keyof typeof ROLE_TOKEN_PATHS]}
      </Box>
      <Box fontSize="10px">
        {hex} ·{' '}
        {ok
          ? `${label.c === LABEL_INK ? 'ink' : 'white'} label ${label.r.toFixed(2)}`
          : 'no in-cell label'}
      </Box>
    </Stack>
  );
};

/**
 * Data-visualisation fills — `data.1–4` (single measure, 4 = largest) and
 * `diverging.*` (blue above the baseline, orange below, `diverging.mid` at it)
 * — in light and dark, each with the in-cell label it can carry.
 */
export const DataViz: Story = {
  render: () => (
    <Stack gap={6} maxW="1100px">
      {(['light', 'dark'] as const).map((mode) => {
        const table = SCHEMES.ink[mode] as Record<string, string>;
        return (
          <Stack
            key={mode}
            gap={4}
            p={4}
            borderRadius="md"
            bg={table['bg-canvas']}
            color={table['fg-default']}
          >
            <Box fontWeight="bold">{mode}</Box>
            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
              {DATA_STEPS.map((k) => (
                <DataCell key={k} flat={k} hex={table[k]} />
              ))}
            </Grid>
            <Grid templateColumns="repeat(7, 1fr)" gap={2}>
              {DIVERGING_STEPS.map((k) => (
                <DataCell key={k} flat={k} hex={table[k]} />
              ))}
            </Grid>
          </Stack>
        );
      })}
    </Stack>
  ),
};

/** Live tokens on this page's colour mode — flip the toolbar to check dark. */
export const Category: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      {SYSTEM_HUE_NAMES.map((hue) => (
        <Box
          key={hue}
          bg={`category.${hue}.surface`}
          color="fg.default"
          borderRadius="full"
          px={3}
          py={1}
        >
          <Box as="span" color={`category.${hue}.fg`} fontWeight="bold">
            Aa
          </Box>{' '}
          {hue}
        </Box>
      ))}
    </Flex>
  ),
};

/** 4.x names kept as deprecated aliases in 5.0 (removed in 6.0). */
export const DeprecatedAliases: Story = {
  render: () => (
    <Grid
      templateColumns="220px 220px"
      gap={1}
      fontFamily="mono"
      fontSize="12px"
    >
      <Subtext fontWeight="bold">4.x</Subtext>
      <Subtext fontWeight="bold">5.0</Subtext>
      {Object.entries(DEPRECATED_COLOR_TOKENS).map(([o, n]) => (
        <Box key={o} display="contents">
          <span>{o}</span>
          <span>{n}</span>
        </Box>
      ))}
    </Grid>
  ),
};
