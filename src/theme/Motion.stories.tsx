import { Box, Flex, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { H3, H4, Subtext, Text } from '../components/Typography';
import { MOTION_EASE_CSS } from './motion';

/**
 * # Motion
 *
 * The timing layer: durations and easing curves as tokens, so animated surfaces
 * share one vocabulary instead of each hardcoding its own `0.25s`.
 *
 * ## Two scales live side by side
 *
 * Our durations are namespaced under `motion.` because Chakra already ships a
 * duration scale, and three names collide with **different values**:
 *
 * | name | Chakra | ours |
 * | --- | --- | --- |
 * | `fast` | 150ms | 150ms |
 * | `slow` | 300ms | **500ms** |
 * | `slower` | 400ms | **700ms** |
 *
 * Redefining `slow`/`slower` would silently retime every Chakra component that
 * reads them — `dialog`, `drawer` and `progress` all do — so a Modal backdrop
 * would fade over 500ms because a reward flight wanted that duration. A shared
 * library must not change the meaning of a token it did not define.
 *
 * **`transitionDuration="slow"` is Chakra's 300ms. Ours is `"motion.slow"`.**
 *
 * 150ms and 200ms deliberately have no `motion.*` token — Chakra's `fast` and
 * `moderate` already cover them exactly.
 *
 * Easings need no prefix: Chakra's are `ease-in` / `ease-out` / `ease-in-out` /
 * `ease-in-smooth`, so `standard` / `emphasized` / `overshoot` collide with
 * nothing.
 *
 * ## Three shapes, one source
 *
 * ```tsx
 * <Box transitionDuration="motion.base" transitionTimingFunction="emphasized" />
 * css={{ animation: `pop var(--chakra-durations-motion-slow) var(--chakra-easings-emphasized)` }}
 * <motion.div transition={{ duration: MOTION_DURATION_S.base, ease: MOTION_EASE.emphasized }} />
 * ```
 *
 * framer-motion cannot read a CSS variable, so the raw values are exported too
 * (`MOTION_DURATION_MS` / `_S`, `MOTION_EASE`, `MOTION_EASE_CSS`).
 */
const meta = {
  title: 'Theme/Motion',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj;

const OURS = [
  { name: 'motion.instant', ms: 0, use: 'no transition — the "off" value' },
  { name: 'motion.press', ms: 120, use: 'pointer-down: a sink, a colour flip' },
  { name: 'motion.base', ms: 300, use: 'the default — enter / leave / reveal' },
  { name: 'motion.slow', ms: 500, use: 'a move that carries the eye across UI' },
  { name: 'motion.slower', ms: 700, use: 'a count-up that should feel earned' },
];

const CHAKRAS = [
  { name: 'fastest', ms: 50 },
  { name: 'faster', ms: 100 },
  { name: 'fast', ms: 150 },
  { name: 'moderate', ms: 200 },
  { name: 'slow', ms: 300 },
  { name: 'slower', ms: 400 },
  { name: 'slowest', ms: 500 },
];

const Track = ({ ms, run }: { ms: number; run: boolean }) => (
  <Box
    position="relative"
    h="14px"
    flex="1"
    bg="bg.subtle"
    borderRadius="full"
    minW="120px"
  >
    <Box
      position="absolute"
      top="1px"
      left={run ? 'calc(100% - 13px)' : '1px'}
      w="12px"
      h="12px"
      borderRadius="full"
      bg="primary.main"
      transitionProperty="left"
      transitionTimingFunction="linear"
      style={{ transitionDuration: `${ms}ms` }}
    />
  </Box>
);

/**
 * Every duration token, played at its real speed. Press **Play** and watch the
 * two scales move — `slow` (Chakra, 300ms) arrives well before `motion.slow`
 * (ours, 500ms), which is exactly why they cannot share a name.
 */
export const Durations: Story = {
  render: () => {
    const [run, setRun] = useState(false);
    const play = () => {
      setRun(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setRun(true)));
    };
    return (
      <Box p={10} maxW="920px">
        <HStack justify="space-between" align="baseline" mb={6}>
          <H3>Duration scale</H3>
          <Button size="sm" onClick={play}>
            Play
          </Button>
        </HStack>

        <H4 mb={3}>Ours — reach for these</H4>
        <Stack gap={2} mb={8}>
          {OURS.map(d => (
            <Grid
              key={d.name}
              templateColumns={{
                base: '150px 60px 1fr',
                md: '150px 60px 1fr 280px',
              }}
              gap={4}
              alignItems="center"
            >
              <Text fontFamily="mono" fontSize="sm" mb={0}>
                {d.name}
              </Text>
              <Text
                fontFamily="mono"
                fontSize="sm"
                color="fg.muted"
                textAlign="right"
                mb={0}
              >
                {d.ms}ms
              </Text>
              <Track ms={d.ms} run={run} />
              <Subtext color="fg.muted" mb={0} display={{ base: 'none', md: 'block' }}>
                {d.use}
              </Subtext>
            </Grid>
          ))}
        </Stack>

        <H4 mb={1}>Chakra&rsquo;s — still there, unchanged</H4>
        <Subtext color="fg.muted" mb={3}>
          Use <code>fast</code> for 150ms and <code>moderate</code> for 200ms;
          those two have no <code>motion.*</code> twin on purpose.
        </Subtext>
        <Stack gap={2}>
          {CHAKRAS.map(d => {
            const clash = d.name === 'slow' || d.name === 'slower';
            return (
              <Grid
                key={d.name}
                templateColumns="150px 60px 1fr"
                gap={4}
                alignItems="center"
              >
                <HStack gap={2}>
                  <Text fontFamily="mono" fontSize="sm" mb={0} color="fg.muted">
                    {d.name}
                  </Text>
                  {clash && (
                    <Badge colorPalette="warning" size="sm">
                      name clash
                    </Badge>
                  )}
                </HStack>
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  color="fg.muted"
                  textAlign="right"
                  mb={0}
                >
                  {d.ms}ms
                </Text>
                <Track ms={d.ms} run={run} />
              </Grid>
            );
          })}
        </Stack>
      </Box>
    );
  },
};

const CURVES = [
  {
    name: 'standard',
    d: 'M0,100 C40,100 20,0 100,0',
    half: '50%',
    use: 'utilitarian transitions — symmetric, unremarkable',
  },
  {
    name: 'emphasized',
    d: 'M0,100 C22,0 36,0 100,0',
    half: '96%',
    use: 'the house curve for enters and reveals',
  },
  {
    name: 'overshoot',
    d: 'M0,100 C34,-56 64,0 100,0',
    half: '109%',
    use: 'celebratory pops and physical toggles',
  },
];

/**
 * The three curves, plotted and raced.
 *
 * **Distance decides whether a curve is worth changing.** `standard` and
 * `emphasized` differ enormously in the plot — at the halfway point one has
 * covered 50% of the distance and the other 96% — but over a 60px indicator or
 * an 8px message bubble the eye cannot separate them. Set the duration to 2s to
 * see the difference, then drop back to 300ms and watch it vanish.
 *
 * `overshoot` is the exception: it reverses direction, so it stays legible at
 * any distance. That is why it suits a switch thumb or a stamp landing.
 */
export const Easings: Story = {
  render: () => {
    const [run, setRun] = useState(false);
    const [ms, setMs] = useState(500);
    const play = () => {
      setRun(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setRun(true)));
    };
    return (
      <Box p={10} maxW="920px">
        <HStack justify="space-between" align="baseline" mb={6}>
          <H3>Easing curves</H3>
          <HStack gap={2}>
            {[300, 500, 2000].map(v => (
              <Button
                key={v}
                size="xs"
                variant={ms === v ? 'solid' : 'outline'}
                onClick={() => setMs(v)}
              >
                {v}ms
              </Button>
            ))}
            <Button size="sm" onClick={play}>
              Play
            </Button>
          </HStack>
        </HStack>

        <Grid templateColumns="repeat(auto-fit, minmax(220px, 1fr))" gap={6} mb={8}>
          {CURVES.map(c => (
            <Box key={c.name}>
              <Box maxW="150px" mb={3}>
                <svg
                  viewBox="-6 -24 112 130"
                  width="100%"
                  height="auto"
                  role="img"
                  aria-label={`${c.name} curve`}
                >
                  <rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="none"
                    stroke="var(--chakra-colors-border-default)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M0,100 L100,0"
                    fill="none"
                    stroke="var(--chakra-colors-border-subtle)"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                  />
                  <path
                    d={c.d}
                    fill="none"
                    stroke="var(--chakra-colors-primary-main)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Box>
              <Text fontFamily="mono" fontSize="sm" fontWeight="600" mb={1}>
                {c.name}
              </Text>
              <Subtext color="fg.muted" mb={1}>
                at half the duration: <b>{c.half}</b> travelled
              </Subtext>
              <Subtext color="fg.muted" mb={0}>
                {c.use}
              </Subtext>
            </Box>
          ))}
        </Grid>

        <Stack gap={3}>
          {CURVES.map(c => (
            <Grid key={c.name} templateColumns="120px 1fr" gap={4} alignItems="center">
              <Text fontFamily="mono" fontSize="sm" color="fg.muted" mb={0}>
                {c.name}
              </Text>
              <Box position="relative" h="14px" bg="bg.subtle" borderRadius="full">
                <Box
                  position="absolute"
                  top="1px"
                  left={run ? 'calc(100% - 13px)' : '1px'}
                  w="12px"
                  h="12px"
                  borderRadius="full"
                  bg="primary.main"
                  transitionProperty="left"
                  style={{
                    transitionDuration: `${ms}ms`,
                    transitionTimingFunction:
                      MOTION_EASE_CSS[c.name as keyof typeof MOTION_EASE_CSS],
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Stack>
      </Box>
    );
  },
};

const HoverBox = ({
  label,
  durationMs,
}: {
  label: string;
  durationMs: number;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      h="110px"
      borderRadius="lg"
      border="1px solid"
      borderColor="border.default"
      bg="bg.surface"
      display="grid"
      placeItems="center"
      cursor="pointer"
    >
      <Box
        w="100%"
        h="100%"
        display="grid"
        placeItems="center"
        bg="bg.subtle"
        borderRadius="lg"
        opacity={hover ? 1 : 0}
        transitionProperty="opacity"
        transitionTimingFunction="ease-in"
        style={{ transitionDuration: `${durationMs}ms` }}
      >
        <Subtext mb={0}>{label}</Subtext>
      </Box>
    </Box>
  );
};

/**
 * # What changed in existing components
 *
 * Adding the tokens changes nothing on its own — no component consumed them
 * before. But the same release fixed three transitions that were **declared and
 * never played**, because invalid CSS is dropped silently and the code still
 * read as if it animated. Two of those are visible.
 *
 * Hover the pairs below: the left column is the old behaviour, the right is the
 * new one.
 */
export const WhatChanged: Story = {
  render: () => (
    <Box p={10} maxW="920px">
      <H3 mb={2}>What changed</H3>
      <Text color="fg.muted" mb={8}>
        Every <code>Card</code> in every product is affected — this is the one to
        eyeball before upgrading.
      </Text>

      <H4 mb={1}>
        Card <Badge colorPalette="danger" size="sm">was broken</Badge>
      </H4>
      <Subtext color="fg.muted" mb={4}>
        <code>transitionDuration=&quot;normal&quot;</code> was a Chakra v2 token
        absent from v3. It fell through as a literal, and{' '}
        <code>transition-duration: normal</code> is invalid CSS, so the whole
        declaration was dropped. Now <code>motion.base</code> — and because{' '}
        <code>transitionProperty=&quot;common&quot;</code> covers box-shadow,
        transform, colours and opacity, <b>any</b> hover a consumer passes now
        eases instead of snapping.
      </Subtext>
      <Grid templateColumns="repeat(auto-fit, minmax(260px, 1fr))" gap={5} mb={10}>
        <Box>
          <Subtext color="fg.muted" mb={2}>
            before — instant
          </Subtext>
          <Card clickable transitionDuration="motion.instant">
            <Text mb={0}>Hover me</Text>
            <Subtext color="fg.muted" mb={0}>
              shadow appears in one frame
            </Subtext>
          </Card>
        </Box>
        <Box>
          <Subtext color="fg.muted" mb={2}>
            after — motion.base (300ms)
          </Subtext>
          <Card clickable>
            <Text mb={0}>Hover me</Text>
            <Subtext color="fg.muted" mb={0}>
              shadow eases in
            </Subtext>
          </Card>
        </Box>
      </Grid>

      <H4 mb={1}>
        FileInput <Badge colorPalette="danger" size="sm">was broken</Badge>
      </H4>
      <Subtext color="fg.muted" mb={4}>
        <code>transition=&quot;ease-in&quot;</code> — a shorthand with a timing
        function but no duration resolves to <code>0s</code>, so the overlay
        fade snapped. Now an explicit <code>opacity</code> /{' '}
        <code>moderate</code> / <code>ease-in</code> triple. (Simulated below;
        the real one reveals the upload prompt over a thumbnail.)
      </Subtext>
      <Grid templateColumns="repeat(auto-fit, minmax(260px, 1fr))" gap={5} mb={10}>
        <Box>
          <Subtext color="fg.muted" mb={2}>
            before — 0s
          </Subtext>
          <HoverBox label="Drop a file" durationMs={0} />
        </Box>
        <Box>
          <Subtext color="fg.muted" mb={2}>
            after — moderate (200ms)
          </Subtext>
          <HoverBox label="Drop a file" durationMs={200} />
        </Box>
      </Grid>

      <H4 mb={1}>
        SectionLoader <Badge size="sm">no visible change</Badge>
      </H4>
      <Subtext color="fg.muted" mb={2}>
        <code>transition=&quot;0.3 opacity ease&quot;</code> was unparseable (the{' '}
        <code>s</code> is missing) and the declaration was dropped; it now reads{' '}
        <code>0.3s</code>, matching its sibling <code>PageLoader</code>.
      </Subtext>
      <Subtext color="fg.muted" mb={8}>
        The fade still will not play: the component returns <code>null</code>{' '}
        when <code>isLoading</code> goes false, so it unmounts rather than fading
        out. Making it actually fade means keeping it mounted at{' '}
        <code>opacity: 0</code>, which needs <code>pointer-events</code> handling
        so a full-cover overlay does not swallow clicks — left as follow-up.
      </Subtext>

      <Box
        borderLeft="3px solid"
        borderColor="primary.main"
        pl={5}
        py={1}
        bg="bg.subtle"
        borderRadius="sm"
        p={5}
      >
        <H4 mb={2}>Reduced motion</H4>
        <Subtext color="fg.muted" mb={0}>
          <code>Card</code> and <code>FileInput</code> gained{' '}
          <code>_motionReduce</code> because they now actually animate. Anything
          that starts animating needs the same — flip the OS setting and
          re-check.
        </Subtext>
      </Box>
    </Box>
  ),
};

/**
 * Reference for the whole token set, including the raw JS exports that
 * framer-motion and timer-driven sequences need.
 */
export const Reference: Story = {
  render: () => (
    <Box p={10} maxW="920px">
      <H3 mb={6}>Reference</H3>
      <Stack gap={8}>
        <Box>
          <H4 mb={3}>Chakra props</H4>
          <Flex gap={3} wrap="wrap">
            {[
              'transitionDuration="motion.base"',
              'transitionTimingFunction="emphasized"',
              '_motionReduce={{ transitionDuration: "motion.instant" }}',
            ].map(s => (
              <Box
                key={s}
                fontFamily="mono"
                fontSize="sm"
                bg="bg.subtle"
                px={3}
                py={2}
                borderRadius="sm"
              >
                {s}
              </Box>
            ))}
          </Flex>
        </Box>
        <Box>
          <H4 mb={3}>CSS variables</H4>
          <Flex gap={3} wrap="wrap">
            {[
              'var(--chakra-durations-motion-base)',
              'var(--chakra-easings-emphasized)',
            ].map(s => (
              <Box
                key={s}
                fontFamily="mono"
                fontSize="sm"
                bg="bg.subtle"
                px={3}
                py={2}
                borderRadius="sm"
              >
                {s}
              </Box>
            ))}
          </Flex>
        </Box>
        <Box>
          <H4 mb={1}>Raw values — for framer-motion</H4>
          <Subtext color="fg.muted" mb={3}>
            framer-motion cannot resolve a CSS variable, so it needs numbers and
            bezier tuples.
          </Subtext>
          <Flex gap={3} wrap="wrap">
            {[
              'MOTION_DURATION_MS',
              'MOTION_DURATION_S',
              'MOTION_EASE',
              'MOTION_EASE_CSS',
            ].map(s => (
              <Box
                key={s}
                fontFamily="mono"
                fontSize="sm"
                bg="bg.subtle"
                px={3}
                py={2}
                borderRadius="sm"
              >
                {s}
              </Box>
            ))}
          </Flex>
        </Box>
      </Stack>
    </Box>
  ),
};
