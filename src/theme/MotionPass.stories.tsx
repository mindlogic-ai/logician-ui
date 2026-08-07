import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { ColorModeToggle } from '../components/ColorMode';
import { CopyableCode } from '../components/CopyableCode';
import { ProgressBar } from '../components/ProgressBar';
import { SegmentedControl } from '../components/SegmentedControl';
import { Switch } from '../components/Switch';
import { H3, H4, Subtext, Text } from '../components/Typography';

/**
 * # Motion pass — what changed, component by component
 *
 * One page to eyeball before upgrading. Every control below is the **real
 * component**, so what you see here is what your app gets.
 *
 * Eight components changed. Four proposals were dropped after reading Chakra's
 * recipes — they were already handled upstream, and the "before" they described
 * did not exist. Those are listed at the bottom so the same proposal doesn't
 * come back around.
 */
const meta = {
  title: 'Theme/Motion pass',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj;

interface RowProps {
  id: string;
  name: string;
  before: string;
  after: string;
  why: string;
  children: React.ReactNode;
}

const Row = ({ id, name, before, after, why, children }: RowProps) => (
  <Box borderTop="1px solid" borderColor="border.subtle" py={7}>
    <Grid templateColumns={{ base: '1fr', lg: '260px 1fr 300px' }} gap={7}>
      <Box>
        <HStack gap={2} mb={1}>
          <Text fontFamily="mono" fontSize="xs" color="fg.muted" mb={0}>
            {id}
          </Text>
          <Text fontWeight="700" mb={0}>
            {name}
          </Text>
        </HStack>
        <Subtext color="fg.muted" mb={0}>
          {why}
        </Subtext>
      </Box>

      <Box>{children}</Box>

      <Stack gap={2}>
        <Box>
          <Subtext color="fg.muted" mb={0} fontFamily="mono" fontSize="2xs">
            BEFORE
          </Subtext>
          <Subtext color="fg.muted" mb={0}>
            {before}
          </Subtext>
        </Box>
        <Box>
          <Subtext color="fg.muted" mb={0} fontFamily="mono" fontSize="2xs">
            AFTER
          </Subtext>
          <Subtext mb={0}>{after}</Subtext>
        </Box>
      </Stack>
    </Grid>
  </Box>
);

const SEGMENTS = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: 'active' },
  { label: '완료', value: 'done' },
];

/**
 * Interact with each control — the change is in the movement, not the pixels at
 * rest, so a screenshot cannot show it.
 */
export const Changed: Story = {
  render: () => {
    const [progress, setProgress] = useState(18);
    const [checked, setChecked] = useState(false);

    return (
      <Box p={10} maxW="1120px">
        <H3 mb={2}>Motion pass — 8 components changed</H3>
        <Text color="fg.muted" mb={8}>
          Every control here is the real component. Click, hover and toggle them.
        </Text>

        <Row
          id="A05"
          name="SegmentedControl"
          why="The biggest one. Chakra's recipe positions the indicator through --left/--width but never declared a transition, so it teleported between segments."
          before="no transition — the thumb jumped"
          after="left/width over motion.base, emphasized"
        >
          <SegmentedControl options={SEGMENTS} />
        </Row>

        <Row
          id="A01"
          name="Button"
          why="transitionProperty=&quot;all&quot; put the scale(0.97) press on the same 250ms clock as a colour change, so the button was still sinking after the finger left."
          before="all · 0.25s · ease-in-out"
          after="transform 120ms (motion.press); colour/shadow 150ms"
        >
          <HStack gap={3}>
            <Button colorPalette="primary" variant="solid">
              누르고 있어 보세요
            </Button>
            <Button colorPalette="neutral" variant="outline">
              Outline
            </Button>
          </HStack>
        </Row>

        <Row
          id="A04"
          name="Switch"
          why="A toggle is a physical switch. overshoot is the one curve that survives 16px of travel, because it reverses direction — standard vs emphasized would not."
          before="translate · fast (150ms)"
          after="translate · motion.base · overshoot"
        >
          <HStack gap={5}>
            <Switch>
              <Switch.Control />
              <Switch.Label>알림 받기</Switch.Label>
            </Switch>
          </HStack>
        </Row>

        <Row
          id="A03"
          name="Checkbox"
          why="Chakra's checkmark is already stroke-based, so a dash offset draws it on. The 60ms gap makes it two beats — pressed, then confirmed — instead of one flash."
          before="box and tick both appeared instantly"
          after="fill 150ms, then the tick strokes on over motion.base"
        >
          <HStack gap={5}>
            <Checkbox
              checked={checked}
              onCheckedChange={e => setChecked(!!e.checked)}
            >
              <Checkbox.Control />
              <Checkbox.Label>약관에 동의합니다</Checkbox.Label>
            </Checkbox>
            <Button size="xs" variant="ghost" onClick={() => setChecked(c => !c)}>
              토글
            </Button>
          </HStack>
        </Row>

        <Row
          id="A07"
          name="CopyableCode"
          why="Copying had no reply at all — onCopy fired and nothing on screen changed, so members click again. The control that was pressed now answers for itself."
          before="no confirmation of any kind"
          after="icon crosses to a check, label flips, reverts after 1.6s"
        >
          <CopyableCode onCopy={() => {}}>
            {`npm i @mindlogic-ai/logician-ui`}
          </CopyableCode>
        </Row>

        <Row
          id="A20"
          name="ProgressBar"
          why="ease-in-out made the bar start slowly on every update, as if accelerating from rest — but progress only moves one way and arrives in jumps."
          before="width 0.3s ease-in-out (hardcoded, bypassing tokens)"
          after="width · motion.base · emphasized"
        >
          <Stack gap={3} maxW="320px">
            <ProgressBar value={progress} />
            <HStack gap={2}>
              <Button
                size="xs"
                variant="outline"
                onClick={() => setProgress(p => Math.min(100, p + 27))}
              >
                진행
              </Button>
              <Button size="xs" variant="ghost" onClick={() => setProgress(18)}>
                초기화
              </Button>
            </HStack>
          </Stack>
        </Row>

        <Row
          id="A35"
          name="ColorModeToggle"
          why="The icons were swapped by a ternary — two different nodes, no transition possible. They now share a cell and rotate through each other."
          before="instant icon swap"
          after="rotate + scale cross over motion.slow, overshoot"
        >
          <HStack gap={3}>
            <ColorModeToggle />
            <Subtext color="fg.muted" mb={0}>
              눌러보세요 (페이지 색 전환은 의도적으로 즉시입니다)
            </Subtext>
          </HStack>
        </Row>

        <Row
          id="—"
          name="Card"
          why="Shipped in the same release as a bug fix: transitionDuration=&quot;normal&quot; was a Chakra v2 token absent from v3, so the declaration was invalid and dropped."
          before="no transition at all — hover snapped"
          after="motion.base over transitionProperty=&quot;common&quot;"
        >
          <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4} maxW="420px">
            <Card clickable>
              <Text mb={0}>Hover me</Text>
            </Card>
            <Card clickable variant="elevated">
              <Text mb={0}>elevated</Text>
            </Card>
          </Grid>
        </Row>
      </Box>
    );
  },
};

interface DroppedProps {
  id: string;
  name: string;
  proposal: string;
  finding: string;
  evidence: string;
}

const DROPPED: DroppedProps[] = [
  {
    id: 'A22',
    name: 'Modal',
    proposal: 'Make the exit half the enter.',
    finding: 'Chakra already does exactly that.',
    evidence:
      'dialog recipe — content: _open moderate (200ms) / _closed faster (100ms); backdrop: _open slow (300ms) / _closed moderate (200ms).',
  },
  {
    id: 'A09',
    name: 'Menu',
    proposal: 'Add a 300ms hover-intent delay before opening.',
    finding:
      'Chakra v3 menus open on click, so there is no hover to debounce — and the open/close pair is already asymmetric.',
    evidence: 'menu recipe — _open fast (150ms) / _closed faster (100ms).',
  },
  {
    id: 'A12',
    name: 'Button loading',
    proposal:
      'Add a loading prop, and stop the button resizing when its label changes.',
    finding:
      'The prop already exists and already preserves width. ButtonProps inherits Chakra\'s type without omitting it.',
    evidence:
      'Chakra Loader — without loadingText it renders the spinner in an AbsoluteCenter and keeps children at visibility:hidden, so the width is held exactly.',
  },
  {
    id: 'A21',
    name: 'Accordion',
    proposal:
      'Replace the height animation with grid-template-rows 0fr→1fr so no JS measurement is needed.',
    finding:
      'It already animates height, and the no-measurement premise was wrong — Chakra measures too.',
    evidence:
      'accordion recipe — animationName: expand-height at moderate (200ms); the keyframe interpolates from var(--collapsed-height, 0) to var(--height), which Ark sets after measuring.',
  },
];

/**
 * # Proposals that were dropped
 *
 * Each of these described a "before" that turned out not to exist. They are
 * recorded with the evidence so the same suggestion doesn't come back around in
 * six months.
 *
 * The lesson is uniform: **the component file being silent about motion did not
 * mean there was no motion.** These behaviours live in Chakra's recipes, which a
 * grep over `src/components` never sees — the same blind spot that made the
 * original audit miss SegmentedControl entirely.
 */
export const Dropped: Story = {
  render: () => (
    <Box p={10} maxW="900px">
      <H3 mb={2}>Dropped after reading the recipes</H3>
      <Text color="fg.muted" mb={7}>
        Four of the twelve proposals described a problem that Chakra had already
        solved. Recorded here with evidence rather than silently removed.
      </Text>

      <Stack gap={5}>
        {DROPPED.map(d => (
          <Box
            key={d.id}
            borderLeft="3px solid"
            borderColor="border.default"
            pl={5}
            py={1}
          >
            <HStack gap={2} mb={2}>
              <Text fontFamily="mono" fontSize="xs" color="fg.muted" mb={0}>
                {d.id}
              </Text>
              <Text fontWeight="700" mb={0}>
                {d.name}
              </Text>
              <Badge size="sm">no change needed</Badge>
            </HStack>
            <Subtext color="fg.muted" mb={1}>
              <b>Proposed:</b> {d.proposal}
            </Subtext>
            <Subtext mb={1}>
              <b>Found:</b> {d.finding}
            </Subtext>
            <Subtext color="fg.muted" mb={0} fontFamily="mono" fontSize="2xs">
              {d.evidence}
            </Subtext>
          </Box>
        ))}
      </Stack>

      <H4 mt={10} mb={2}>
        Deferred, not dropped
      </H4>
      <Box borderLeft="3px solid" borderColor="warning.main" pl={5} py={1}>
        <HStack gap={2} mb={2}>
          <Text fontFamily="mono" fontSize="xs" color="fg.muted" mb={0}>
            A23
          </Text>
          <Text fontWeight="700" mb={0}>
            ExpandableText
          </Text>
          <Badge colorPalette="warning" size="sm">
            needs restructuring
          </Badge>
        </HStack>
        <Subtext color="fg.muted" mb={1}>
          It really does swap text with no transition, so the fix is real — but
          it cannot be bolted on. <code>useExpandableText</code> truncates by
          character count and replaces the node wholesale; animating that needs a
          measured height, which is why Chakra&rsquo;s own{' '}
          <code>expand-height</code> keyframe interpolates to{' '}
          <code>var(--height)</code> that Ark measures and sets.
        </Subtext>
        <Subtext mb={0}>
          The right move is to rebuild it on the <code>Collapsible</code>{' '}
          primitive this library already ships, which is a behaviour change to
          the truncation strategy and deserves its own change with visual
          verification — not a line tacked onto a motion pass.
        </Subtext>
      </Box>
    </Box>
  ),
};
