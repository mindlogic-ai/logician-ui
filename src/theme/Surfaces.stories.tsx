import { Box, Grid, HStack, Stack, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { InlineCode } from '../components/InlineCode';
import { SegmentedControl } from '../components/SegmentedControl';
import {
  ProgressSegment,
  SegmentedProgressBar,
} from '../components/SegmentedProgressBar';
import {
  Slider,
  SliderControl,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '../components/Slider';
import { Spinner } from '../components/Spinner';
import { Switch } from '../components/Switch';
import { H4, Subtext, Text } from '../components/Typography';

/**
 * # Surfaces & contrast
 *
 * Page-like compositions for eyeballing whether components keep enough contrast
 * on each of the three main page-background tokens. Flip the **Color mode**
 * toolbar control to check both light and dark.
 *
 * The page tokens resolve to:
 * | token | light | role |
 * | --- | --- | --- |
 * | `bg.surface` | `white` | cards / elevated surfaces |
 * | `bg.sunken` | `gray.50` | primary page wash for list / overview pages |
 * | `bg.canvas` | `gray.0` | navigation chrome |
 *
 * The trap: several component fills also live in the lightest grays — `bg.subtle`
 * is `gray.50` (**identical to `bg.sunken`**) and `bg.muted` is `gray.100`
 * (~1.03:1 against `bg.sunken`). A component that paints a resting surface with
 * those tokens reads fine on a `bg.surface` card but loses its bounds on a
 * `bg.sunken` page. These stories exist to catch exactly that — a control should
 * still read as a bounded control on all three surfaces, in both modes.
 */
const meta = {
  title: 'Theme/Surfaces',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

const SEGMENT_OPTIONS = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

const PAGE_SURFACES = ['bg.surface', 'bg.sunken', 'bg.canvas'] as const;

/**
 * The full set of at-risk components rendered once per page-background token.
 * Scan each column top to bottom: every control should have a visible edge or
 * fill on every surface. Anything that melts into the background on `bg.sunken`
 * (the middle column in light mode) is the bug this story is here to surface.
 */
const SurfaceShowcase = () => {
  const [segment, setSegment] = useState('week');
  const [sliderValue, setSliderValue] = useState([40]);

  return (
    <Grid templateColumns={`repeat(${PAGE_SURFACES.length}, 1fr)`} gap={0}>
      {PAGE_SURFACES.map((surface) => (
        <VStack
          key={surface}
          bg={surface}
          p={8}
          gap={6}
          align="stretch"
          minH="100vh"
        >
          <Box>
            <H4>on {surface}</H4>
            <Subtext>
              {surface === 'bg.sunken'
                ? 'the page-wash case where bg.subtle / bg.muted fills collide'
                : surface === 'bg.surface'
                  ? 'the elevated-card baseline'
                  : 'navigation-chrome surface'}
            </Subtext>
          </Box>

          <VStack align="stretch" gap={2}>
            <Subtext>SegmentedControl (track: bg.subtle)</Subtext>
            <SegmentedControl
              options={SEGMENT_OPTIONS}
              value={segment}
              onSelect={setSegment}
              size="sm"
            />
          </VStack>

          <VStack align="stretch" gap={2}>
            <Subtext>InlineCode (bg: bg.subtle)</Subtext>
            <Text>
              Run <InlineCode>yarn build</InlineCode> to compile.
            </Text>
          </VStack>

          <VStack align="stretch" gap={2}>
            <Subtext>Switch — off-state control (track: bg.muted)</Subtext>
            <HStack gap={4}>
              <Switch size="md">
                <Switch.Control />
              </Switch>
              <Switch size="md" defaultChecked>
                <Switch.Control />
              </Switch>
            </HStack>
          </VStack>

          <VStack align="stretch" gap={2}>
            <Subtext>Slider — empty track (bg.muted)</Subtext>
            <Slider
              value={sliderValue}
              min={0}
              max={100}
              onValueChange={(details) => setSliderValue(details.value)}
            >
              <SliderControl>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb index={0} />
              </SliderControl>
            </Slider>
          </VStack>

          <VStack align="stretch" gap={2}>
            <Subtext>SegmentedProgressBar — empty portion (bg.muted)</Subtext>
            <SegmentedProgressBar max={100}>
              <ProgressSegment value={45} filledTrackColor="primary.main" />
            </SegmentedProgressBar>
          </VStack>

          <VStack align="start" gap={2}>
            <Subtext>Spinner — track (bg.muted)</Subtext>
            <Spinner />
          </VStack>
        </VStack>
      ))}
    </Grid>
  );
};

/**
 * Side-by-side reference: all at-risk components on `bg.surface`, `bg.sunken`,
 * and `bg.canvas` at once. In light mode, watch the middle (`bg.sunken`) column
 * — `SegmentedControl` should still show its ring, while `InlineCode` /
 * `Switch` / `Slider` / `SegmentedProgressBar` / `Spinner` are the fills that
 * currently lose contrast there.
 */
export const ContrastOnPageBackgrounds: Story = {
  render: () => <SurfaceShowcase />,
};

/**
 * A realistic `bg.sunken` overview page (the most common offender surface): a
 * filter bar of `SegmentedControl`s and inline-code chips sitting directly on
 * the page wash, with no intervening card. This is what an end user actually
 * sees on a list/index page.
 */
export const SunkenOverviewPage: Story = {
  render: () => {
    const [range, setRange] = useState('week');
    const [view, setView] = useState('list');
    return (
      <Box bg="bg.sunken" minH="100vh" p={8}>
        <Stack gap={6} maxW="720px">
          <H4>Usage overview</H4>
          <HStack gap={4} wrap="wrap">
            <SegmentedControl
              options={SEGMENT_OPTIONS}
              value={range}
              onSelect={setRange}
              size="sm"
            />
            <SegmentedControl
              options={[
                { label: 'List', value: 'list' },
                { label: 'Grid', value: 'grid' },
              ]}
              value={view}
              onSelect={setView}
              size="sm"
            />
          </HStack>
          <Text>
            Filtered by <InlineCode>status:active</InlineCode> over the selected
            range.
          </Text>
        </Stack>
      </Box>
    );
  },
};
