import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '../components/Modal';
import { SegmentedControl } from '../components/SegmentedControl';
import { Swap } from '../components/Swap';
import { Switch } from '../components/Switch';
import { H2, H3, Subtext, Text } from '../components/Typography';
import { MOTION_EASE_CSS } from './motion';

/**
 * # Motion
 *
 * - **Presets (쓸 때)** — building a component. What to type. Nearly always this
 *   page.
 * - **Scales (만들 때)** — the raw durations and curves. Only for the three
 *   cases a preset cannot cover: framer-motion, a keyframe string, or defining
 *   a new preset.
 */
const meta = {
  title: 'Theme/Motion',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ shared */

/** Click-to-copy code, the same affordance the palette swatches have. */
const Code = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Box
      as="button"
      onClick={() => {
        navigator.clipboard?.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      position="relative"
      display="block"
      w="100%"
      textAlign="left"
      fontFamily="mono"
      fontSize="xs"
      lineHeight="1.7"
      bg="bg.subtle"
      color="fg.default"
      border="1px solid"
      borderColor="border.subtle"
      px={3}
      py={2}
      borderRadius="sm"
      overflowX="auto"
      whiteSpace="pre"
      cursor="pointer"
      animationStyle="feedback"
      transitionProperty="background-color, border-color"
      _hover={{ borderColor: 'border.default' }}
    >
      {children}
      <Box
        position="absolute"
        top={1}
        right={2}
        fontSize="2xs"
        color="fg.subtle"
        opacity={copied ? 1 : 0}
        animationStyle="feedback"
        transitionProperty="opacity"
      >
        복사됨
      </Box>
    </Box>
  );
};

/* ----------------------------------------------------------------- Presets */

/** 상황 → 그대로 붙여 넣을 줄. */
const RECIPES = [
  {
    task: 'hover하면 배경·테두리 색이 바뀐다',
    line: 'animationStyle="feedback" transitionProperty="background-color, border-color"',
  },
  {
    task: 'hover하면 무언가 흐려지거나 나타난다',
    line: 'animationStyle="feedback" transitionProperty="opacity"',
  },
  {
    task: '누르면 눌리는 느낌이 난다',
    line: 'animationStyle="press"',
  },
  {
    task: '인디케이터가 선택된 항목으로 미끄러진다',
    line: 'animationStyle="travel" transitionProperty="left, width"',
  },
  {
    task: '막대가 새 값까지 찬다',
    line: 'animationStyle="travel" transitionProperty="width"',
  },
  {
    task: '토글 썸이 반대쪽으로 넘어간다',
    line: 'animationStyle="spring" transitionProperty="translate"',
  },
  {
    task: '아이콘 두 개가 자리를 바꾼다',
    line: 'animationStyle="spring" transitionProperty="opacity, transform"',
  },
  {
    task: '버튼 라벨이 상태에 따라 바뀐다 (폭이 변하면 안 됨)',
    line: '<Swap value={done ? "done" : "idle"}> … </Swap>',
  },
];

interface PresetProps {
  name: string;
  timing: string;
  pick: string;
  code: string;
  demo: React.ReactNode;
}

const Preset = ({ name, timing, pick, code, demo }: PresetProps) => (
  <Box borderTop="1px solid" borderColor="border.subtle" py={6}>
    <HStack gap={3} align="baseline" mb={3}>
      <Text fontFamily="mono" fontWeight="700" mb={0}>
        {name}
      </Text>
      <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mb={0}>
        {timing}
      </Subtext>
    </HStack>

    <Grid
      templateColumns={{ base: '1fr', lg: '260px 1fr' }}
      gap={{ base: 4, lg: 8 }}
      alignItems="start"
    >
      <Box minH="44px" display="flex" alignItems="center">
        {demo}
      </Box>
      <Stack gap={2}>
        <Subtext mb={0}>{pick}</Subtext>
        <Code>{code}</Code>
      </Stack>
    </Grid>
  </Box>
);

/**
 * A track with a dot that runs end to end, so a curve reads as travel.
 *
 * The button sits next to the track it moves, and both runners share one piece
 * of state — pressing either sends both dots at once, which is the only way to
 * see that `emphasized` and `overshoot` differ over this distance.
 */
const Runner = ({
  style,
  at,
  onPlay,
}: {
  style: string;
  at: boolean;
  onPlay: () => void;
}) => (
  <HStack gap={3} w="100%">
    <Box
      position="relative"
      h="14px"
      flex="1"
      maxW="190px"
      bg="bg.subtle"
      borderRadius="full"
    >
      <Box
        position="absolute"
        top="1px"
        left={at ? 'calc(100% - 13px)' : '1px'}
        w="12px"
        h="12px"
        borderRadius="full"
        bg="primary.main"
        animationStyle={style}
        transitionProperty="left"
      />
    </Box>
    <Button size="xs" variant="outline" onClick={onPlay} flexShrink={0}>
      재생
    </Button>
  </HStack>
);

const SEGMENTS = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: 'active' },
  { label: '완료', value: 'done' },
];

/** The real Modal, so the enter/exit timing is the shipped one. */
const ModalDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="xs" variant="outline" onClick={() => setOpen(true)}>
        모달 열기
      </Button>
      <Modal open={open} onOpenChange={(e) => setOpen(e.open)}>
        <ModalContent maxW="320px">
          <ModalHeader>진입과 퇴장</ModalHeader>
          <ModalBody>
            <Text mb={4}>
              바깥을 클릭해 닫아 보세요. 퇴장이 진입의 절반입니다.
            </Text>
            <Button size="xs" onClick={() => setOpen(false)}>
              닫기
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

/**
 * What to type.
 *
 * Two props, always: the preset names the timing, and `transitionProperty`
 * names what moves. Find the row that matches what you are building and copy
 * the line.
 */
export const Presets: Story = {
  name: 'Presets (쓸 때)',
  render: () => {
    const [at, setAt] = useState(false);
    const [checked, setChecked] = useState(false);
    const [on, setOn] = useState(false);

    // Send it back to the start, then off again on the next frame, so "재생"
    // always runs the same direction however many times it is pressed.
    const play = () => {
      setAt(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setAt(true)));
    };

    return (
      <Box p={10} maxW="1000px">
        <H2 mb={2}>Motion</H2>
        <Text color="fg.muted" mb={8}>
          움직임은 <b>prop 두 개</b>로 씁니다. 프리셋이 타이밍을, {}
          <code>transitionProperty</code>가 무엇이 움직이는지를 정합니다. 직접
          숫자를 적을 일은 없습니다. (<code>press</code>와 아래 예외들은 prop이
          하나입니다.)
        </Text>

        <Code>{`<Box animationStyle="feedback" transitionProperty="opacity" />`}</Code>
        <Stack gap={1} mt={3}>
          {[
            ['animationStyle', '얼마나 빠르게, 어떤 곡선으로'],
            ['transitionProperty', '무엇이 움직이는지'],
          ].map(([prop, means]) => (
            <HStack key={prop} gap={3} align="baseline">
              <Text
                fontFamily="mono"
                fontSize="xs"
                minW="150px"
                color="fg.default"
                mb={0}
              >
                {prop}
              </Text>
              <Subtext color="fg.muted" mb={0}>
                {means}
              </Subtext>
            </HStack>
          ))}
        </Stack>

        <H3 mt={10} mb={1}>
          만들려는 것부터 찾으세요
        </H3>
        <Subtext color="fg.muted" mb={4}>
          줄을 눌러 복사한 뒤 그대로 붙여 넣으면 됩니다.
        </Subtext>

        <Stack gap={2} mb={10}>
          {RECIPES.map((r) => (
            <Grid
              key={r.task}
              templateColumns={{ base: '1fr', md: '260px 1fr' }}
              gap={{ base: 1, md: 5 }}
              alignItems="center"
            >
              <Subtext color="fg.muted" mb={0}>
                {r.task}
              </Subtext>
              <Code>{r.line}</Code>
            </Grid>
          ))}
        </Stack>

        <H3 mb={2}>어떤 프리셋인지 헷갈리면</H3>
        <Stack gap={1} mb={2}>
          {[
            ['색 · 불투명도 · 그림자가 바뀐다', 'feedback'],
            ['위치 · 크기가 새 값으로 간다', 'travel'],
            ['물리적으로 넘어가거나, 두 개가 교차한다', 'spring'],
            ['손가락이 닿는다', 'press'],
          ].map(([cond, name]) => (
            <HStack key={name} gap={3} align="baseline">
              <Text
                fontFamily="mono"
                fontSize="sm"
                fontWeight="600"
                minW="80px"
                mb={0}
              >
                {name}
              </Text>
              <Subtext color="fg.muted" mb={0}>
                {cond}
              </Subtext>
            </HStack>
          ))}
        </Stack>
        <Subtext color="fg.muted" mb={10}>
          더 고민되면 <code>feedback</code>을 쓰세요. 넷 중 가장 눈에 띄지 않고,
          틀려도 손해가 가장 작습니다.
        </Subtext>

        <H3 mb={2}>넷을 직접 비교</H3>

        <Preset
          name="press"
          timing="120ms · standard"
          pick="포인터가 눌리는 순간의 접촉감. 넷 중 유일하게 property를 안 적어도 됩니다 — 프레스는 언제나 scale이라 기본값이 들어 있습니다."
          code={`<Box
  scale="1"
  animationStyle="press"
  _active={{ scale: '0.94' }}
/>`}
          demo={
            <Box
              as="button"
              px={5}
              py={2}
              borderRadius="md"
              bg="primary.main"
              color="fg.inverse"
              fontSize="sm"
              fontWeight="600"
              cursor="pointer"
              scale="1"
              animationStyle="press"
              _active={{ scale: '0.94' }}
            >
              눌러보세요
            </Box>
          }
        />

        <Preset
          name="feedback"
          timing="150ms · standard"
          pick="hover와 상태 변화. 방금 한 행동에 답하고 바로 비켜야 하므로 가장 짧습니다."
          code={`<Box
  animationStyle="feedback"
  transitionProperty="background-color, border-color"
  _hover={{ bg: 'primary.lightest', borderColor: 'primary.main' }}
/>`}
          demo={
            <Box
              px={5}
              py={3}
              borderRadius="md"
              border="1px solid"
              borderColor="border.default"
              bg="bg.surface"
              fontSize="sm"
              animationStyle="feedback"
              transitionProperty="background-color, border-color"
              _hover={{ bg: 'primary.lightest', borderColor: 'primary.main' }}
            >
              hover 해보세요
            </Box>
          }
        />

        <Preset
          name="travel"
          timing="300ms · emphasized"
          pick="새 위치나 크기로 이동. 거리 대부분을 먼저 덮고 마지막에 자리를 잡아서, 이미 바뀐 값을 따라잡는 것처럼 읽힙니다."
          code={`<Progress.Range animationStyle="travel" transitionProperty="width" />`}
          demo={<Runner style="travel" at={at} onPlay={play} />}
        />

        <Preset
          name="spring"
          timing="300ms · overshoot"
          pick="물리적인 전환, 또는 두 요소의 교차. 목표를 지나쳤다 돌아오므로 몇 px만 움직여도 눈에 보입니다 — 위 travel과 나란히 재생해 보세요."
          code={`<Switch.Thumb animationStyle="spring" transitionProperty="translate" />`}
          demo={
            <Stack gap={3} w="100%">
              <Runner style="spring" at={at} onPlay={play} />
              <Switch checked={on} onCheckedChange={(e) => setOn(!!e.checked)}>
                <Switch.Control />
                <Switch.Label>알림 받기</Switch.Label>
              </Switch>
            </Stack>
          }
        />

        <H3 mt={10} mb={2}>
          이렇게 쓰지 마세요
        </H3>
        <Stack gap={3} mb={10}>
          <Box>
            <Subtext color="danger.main" mb={1}>
              ❌ 숫자와 곡선을 직접 적기 — 파일마다 값이 갈라집니다
            </Subtext>
            <Code>{`<Box transitionDuration="300ms" transitionTimingFunction="ease-out" />`}</Code>
          </Box>
          <Box>
            <Subtext color="danger.main" mb={1}>
              ❌ property를 빠뜨리기 — 아무것도 움직이지 않습니다
            </Subtext>
            <Code>{`<Box animationStyle="feedback" />`}</Code>
          </Box>
          <Box>
            <Subtext color="success.main" mb={1}>
              ✅ 프리셋 + 무엇이 움직이는지
            </Subtext>
            <Code>{`<Box animationStyle="feedback" transitionProperty="opacity" />`}</Code>
          </Box>
        </Stack>

        <H3 mb={2}>따로 챙기지 않아도 되는 것</H3>
        <Text color="fg.muted" mb={3}>
          <b>동작 줄이기</b>는 프리셋 안에 들어 있습니다. OS에서{' '}
          <code>prefers-reduced-motion</code>을 켠 사람에게는 duration이
          자동으로 <code>0ms</code>가 됩니다 — 스위치는 여전히 켜지고 색도
          여전히 바뀌며, 이동만 사라집니다. 컴포넌트마다 적을 필요가 없습니다.
        </Text>

        <H3 mt={8} mb={2}>
          넷으로 안 되는 경우
        </H3>
        <Subtext color="fg.muted" mb={5}>
          만드는 컴포넌트가 아래에 해당하지 않으면 볼 필요 없습니다.
        </Subtext>

        <Preset
          name="modal"
          timing="진입 300ms · emphasized / 퇴장 150ms · standard"
          pick="한 요소가 _open과 _closed 두 상태를 모두 가질 때. 진입은 아래에서 작게 올라오고, 퇴장은 이동 없이 줄어들며 절반의 시간에 끝납니다 — 나가는 것에 시선을 끌 이유가 없기 때문입니다. Modal이 이미 쓰고 있어 직접 적을 일은 없습니다."
          code={`<Dialog.Content animationStyle="modal" />

// 동작 줄이기에서는 duration을 0으로 만들지 않고 이동만 뺍니다 —
// 아무 전환 없이 나타나는 모달은 페이지가 바뀐 것처럼 읽힙니다.`}
          demo={<ModalDemo />}
        />

        <Preset
          name="composite"
          timing="직접 구성 + 동작 줄이기 가드"
          pick="한 요소 안에서 속성마다 다른 속도가 필요할 때. Button은 프레스가 120ms인데 색은 150ms라 duration 하나로 표현이 안 됩니다. 이때만 transition 단축 속성을 직접 조립하고, composite가 주는 것은 동작 줄이기 가드(transition: none) 하나뿐입니다. 값은 반드시 토큰 var()로 적으세요 — 숫자를 적는 순간 스케일 밖으로 나갑니다."
          code={`// Button.styles.ts — 속성별로 다른 duration이 필요할 때만
export const buttonTransition = [
  'scale            var(--chakra-durations-motion-press) var(--chakra-easings-standard)',
  'background-color var(--chakra-durations-fast)         var(--chakra-easings-standard)',
  'border-color     var(--chakra-durations-fast)         var(--chakra-easings-standard)',
  'box-shadow       var(--chakra-durations-fast)         var(--chakra-easings-standard)',
].join(', ');

// Button.tsx
<ChakraButton transition={buttonTransition} animationStyle="composite" />`}
          demo={
            <HStack gap={3}>
              <Button colorPalette="primary" variant="solid">
                눌러보세요
              </Button>
              <Button colorPalette="neutral" variant="outline">
                Outline
              </Button>
            </HStack>
          }
        />

        <Preset
          name="arkTravel"
          timing="travel과 같은 타이밍 · prop 하나"
          pick="Ark가 이 파트의 transition-*을 인라인 style로 씁니다. 인라인은 클래스를 이기므로 여기서는 transitionProperty를 넘겨도 무시됩니다 — 무엇이 움직이는지(left, top, width, height)까지 Ark가 인라인으로 정해두기 때문입니다. Ark가 var()로 열어둔 건 duration과 곡선 둘뿐이고, arkTravel이 그 두 커스텀 속성을 채웁니다. 라이브러리에서 해당하는 건 SegmentedControl 인디케이터 하나뿐입니다."
          code={`// property는 넘기지 않습니다 — 넘겨도 인라인에 밀립니다
<SegmentGroup.Indicator animationStyle="arkTravel" />

// Ark가 이 요소에 직접 써두는 것
//   --transition-property: left, top, width, height;   ← 인라인, 못 바꿈
//   transition-property: var(--transition-property);   ← 인라인, 못 바꿈
//   transition-duration: var(--transition-duration, 150ms);   ← 이 var를 채움
//   transition-timing-function: var(--transition-timing-function);`}
          demo={<SegmentedControl options={SEGMENTS} />}
        />

        <Preset
          name="checkmarkDraw"
          timing="300ms · emphasized · 60ms 지연 · prop 하나"
          pick="체크마크를 왼쪽 짧은 획에서 오른쪽으로 그립니다. transition이 아니라 keyframe animation이라 별도로 있습니다. 다른 셋과 달리 범용이 아닙니다 — dash 길이 24가 Chakra 체크마크(약 22.6 단위) 하나에 맞춰져 있어서, 더 긴 path는 끝까지 그려지지 않고 fill 기반 아이콘은 그릴 stroke 자체가 없어 아무 일도 일어나지 않습니다. 다른 아이콘을 그리려면 그 path 길이를 재서 프리셋을 따로 만드세요."
          code={`<Checkbox.Indicator animationStyle="checkmarkDraw" />

// 쓸 수 있는 조건: stroke 기반 아이콘(fill: none) + path 길이 ≤ 24`}
          demo={
            <HStack gap={4}>
              <Checkbox
                checked={checked}
                onCheckedChange={(e) => setChecked(!!e.checked)}
              >
                <Checkbox.Control />
                <Checkbox.Label>약관에 동의합니다</Checkbox.Label>
              </Checkbox>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => setChecked((c) => !c)}
              >
                토글
              </Button>
            </HStack>
          }
        />
      </Box>
    );
  },
};

/* ------------------------------------------------------------------ Scales */

const OURS = [
  {
    name: 'motion.instant',
    ms: 0,
    use: '동작 줄이기가 넣는 값. 직접 쓸 일은 없습니다',
  },
  { name: 'motion.press', ms: 120, use: 'press 프리셋이 씁니다' },
  { name: 'motion.base', ms: 300, use: 'travel · spring 프리셋이 씁니다' },
  { name: 'motion.slow', ms: 500, use: '화면을 가로지르는 이동 (프리셋 없음)' },
  { name: 'motion.slower', ms: 700, use: '카운트업 (프리셋 없음)' },
];

const CHAKRAS = [
  { name: 'fast', ms: 150, use: 'feedback 프리셋이 씁니다' },
  { name: 'moderate', ms: 200, use: '200ms가 필요하면 이걸 쓰세요' },
  { name: 'slow', ms: 300, use: '⚠️ 우리 motion.slow(500ms)와 다른 값' },
  { name: 'slower', ms: 400, use: '⚠️ 우리 motion.slower(700ms)와 다른 값' },
];

const CURVES = [
  {
    name: 'standard',
    d: 'M0,100 C40,100 20,0 100,0',
    half: '50%',
    use: 'press · feedback',
  },
  {
    name: 'emphasized',
    d: 'M0,100 C22,0 36,0 100,0',
    half: '96%',
    use: 'travel',
  },
  {
    name: 'overshoot',
    d: 'M0,100 C34,-56 64,0 100,0',
    half: '109%',
    use: 'spring',
  },
];

const Track = ({
  ms,
  at,
  ease,
}: {
  ms: number;
  at: boolean;
  ease?: string;
}) => (
  <Box
    position="relative"
    h="13px"
    flex="1"
    minW="110px"
    bg="bg.subtle"
    borderRadius="full"
  >
    <Box
      position="absolute"
      top="1px"
      left={at ? 'calc(100% - 12px)' : '1px'}
      w="11px"
      h="11px"
      borderRadius="full"
      bg="primary.main"
      transitionProperty="left"
      style={{
        transitionDuration: `${ms}ms`,
        transitionTimingFunction: ease ?? 'linear',
      }}
    />
  </Box>
);

const ScaleRow = ({
  name,
  ms,
  use,
  at,
  muted,
}: {
  name: string;
  ms: number;
  use: string;
  at: boolean;
  muted?: boolean;
}) => (
  <Grid
    templateColumns={{ base: '140px 56px 1fr', md: '140px 56px 1fr 280px' }}
    gap={4}
    alignItems="center"
  >
    <Text
      fontFamily="mono"
      fontSize="sm"
      color={muted ? 'fg.muted' : 'fg.default'}
      mb={0}
    >
      {name}
    </Text>
    <Text
      fontFamily="mono"
      fontSize="sm"
      color="fg.muted"
      textAlign="right"
      mb={0}
    >
      {ms}ms
    </Text>
    <Track ms={ms} at={at} />
    <Subtext color="fg.muted" mb={0} display={{ base: 'none', md: 'block' }}>
      {use}
    </Subtext>
  </Grid>
);

/**
 * One of the three situations that land you on this page: when you are in it,
 * why the presets do not apply, and the line to write.
 */
const WhenCase = ({
  n,
  title,
  when,
  why,
  code,
}: {
  n: string;
  title: string;
  when: string;
  why: string;
  code: string;
}) => (
  <Box borderTop="1px solid" borderColor="border.subtle" pt={5}>
    <HStack gap={2} align="baseline" mb={2}>
      <Text fontFamily="mono" fontSize="sm" color="fg.muted" mb={0}>
        {n}
      </Text>
      <Text fontWeight="700" mb={0}>
        {title}
      </Text>
    </HStack>
    <Grid
      templateColumns={{ base: '1fr', lg: '86px 1fr' }}
      gap={{ base: 1, lg: 4 }}
      mb={2}
    >
      <Subtext color="fg.muted" fontSize="2xs" mb={0}>
        이런 상황
      </Subtext>
      <Subtext mb={0}>{when}</Subtext>
    </Grid>
    <Grid
      templateColumns={{ base: '1fr', lg: '86px 1fr' }}
      gap={{ base: 1, lg: 4 }}
      mb={3}
    >
      <Subtext color="fg.muted" fontSize="2xs" mb={0}>
        여기를 보는 이유
      </Subtext>
      <Subtext color="fg.muted" mb={0}>
        {why}
      </Subtext>
    </Grid>
    <Code>{code}</Code>
  </Box>
);

/**
 * The raw scale, for the three cases a preset cannot cover.
 *
 * If none of those three is what you are doing, this page is not the one you
 * need — go back to Presets.
 */
export const Scales: Story = {
  name: 'Scales (만들 때)',
  render: () => {
    const [at, setAt] = useState(false);
    const [ms, setMs] = useState(500);
    const play = () => {
      setAt(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setAt(true)));
    };

    return (
      <Box p={10} maxW="920px">
        <H2 mb={2}>스케일</H2>
        <Text color="fg.muted" mb={7}>
          여기는 <b>재료</b> 페이지입니다. 컴포넌트에 움직임을 넣는 중이라면{' '}
          <b>Presets (쓸 때)</b>로 가세요. 아래 세 상황에서만 필요합니다.
        </Text>

        <Stack gap={7} mb={12}>
          <WhenCase
            n="1"
            title="framer-motion을 쓸 때"
            when="요소가 마운트·언마운트되며 등장하거나 사라질 때, 레이아웃 변화를 따라갈 때, 드래그·제스처, 리스트 순차 등장 — CSS transition으로는 표현이 안 되는 것들입니다. (transition은 사라지는 요소를 잡지 못합니다.)"
            why="framer-motion은 CSS 변수를 읽지 못하므로 숫자가 필요합니다. 프리셋을 못 쓸 뿐 타이밍 스케일은 그대로 씁니다 — 아래 표의 값을 그대로 가져가세요."
            code={`import { MOTION_DURATION_S, MOTION_EASE } from '@mindlogic-ai/logician-ui';

<motion.div transition={{ duration: MOTION_DURATION_S.base, ease: MOTION_EASE.emphasized }} />`}
          />
          <WhenCase
            n="2"
            title="keyframe animation을 쓸 때"
            when="상태가 A에서 B로 바뀌는 게 아니라 스스로 도는 것 — 무한 반복(스켈레톤 시머, 점멸), 중간 경유점이 필요한 동작(셰이크: 좌→우→좌→우), 마운트하자마자 한 번 재생(체크마크 그리기가 이 경우입니다)."
            why="프리셋의 대안이 아닙니다. 프리셋은 transition-*만, keyframe은 animation-*만 건드리므로 한 요소에 둘 다 붙어도 충돌하지 않습니다 — 예를 들어 hover 색은 feedback, 배경은 펄스. 여기서 가져가는 건 duration과 곡선 값뿐입니다."
            code={`css={{ animation: 'pop var(--chakra-durations-motion-slow) var(--chakra-easings-emphasized)' }}`}
          />
          <WhenCase
            n="3"
            title="새 프리셋을 정의할 때"
            when="넷 중 어디에도 맞지 않는 의도가 여러 컴포넌트에서 반복될 때. 한 번뿐이면 만들지 말고 가장 가까운 프리셋을 쓰세요 — 프리셋이 늘어날수록 고르기가 어려워집니다."
            why="src/theme/motion.ts에 추가합니다. 아래 스케일에서 duration과 곡선을 골라 조립하면 됩니다. 동작 줄이기 가드를 빠뜨리면 테스트가 잡습니다."
            code={`reveal: {
  value: {
    transitionProperty: 'none',
    transitionDuration: 'motion.slow',
    transitionTimingFunction: 'emphasized',
    _motionReduce: { transitionDuration: 'motion.instant' },
  },
},`}
          />
        </Stack>

        <HStack justify="space-between" align="baseline" mb={4}>
          <H3 mb={0}>Duration</H3>
          <Button size="sm" onClick={play}>
            재생
          </Button>
        </HStack>

        <Subtext color="fg.muted" mb={3}>
          우리 스케일. <code>motion.</code> 접두어가 붙는 이유는 아래 Chakra
          스케일과 이름이 겹치기 때문입니다.
        </Subtext>
        <Stack gap={2} mb={7}>
          {OURS.map((d) => (
            <ScaleRow key={d.name} {...d} at={at} />
          ))}
        </Stack>

        <Subtext color="fg.muted" mb={3}>
          Chakra 스케일. 그대로 두고 함께 씁니다 — 150ms·200ms는 여기 있으므로
          우리 쪽에 만들지 않았습니다. <code>slow</code>·<code>slower</code>는
          이름이 같고 값이 다르니 주의하세요.
        </Subtext>
        <Stack gap={2} mb={10}>
          {CHAKRAS.map((d) => (
            <ScaleRow key={d.name} {...d} at={at} muted />
          ))}
        </Stack>

        <HStack justify="space-between" align="baseline" mb={4}>
          <H3 mb={0}>Easing</H3>
          <HStack gap={2}>
            {[300, 500, 2000].map((v) => (
              <Button
                key={v}
                size="xs"
                variant={ms === v ? 'solid' : 'outline'}
                onClick={() => setMs(v)}
              >
                {v}ms
              </Button>
            ))}
          </HStack>
        </HStack>

        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={6}
          mb={6}
        >
          {CURVES.map((c) => (
            <Box key={c.name}>
              <Box maxW="130px" mb={3}>
                <svg
                  viewBox="-6 -24 112 130"
                  width="100%"
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
                절반 지점에 <b>{c.half}</b> 이동
              </Subtext>
              <Subtext color="fg.muted" mb={0}>
                {c.use} 프리셋이 씁니다
              </Subtext>
            </Box>
          ))}
        </Grid>

        <Stack gap={3} mb={3}>
          {CURVES.map((c) => (
            <Grid
              key={c.name}
              templateColumns="110px 1fr"
              gap={4}
              alignItems="center"
            >
              <Text fontFamily="mono" fontSize="sm" color="fg.muted" mb={0}>
                {c.name}
              </Text>
              <Track
                ms={ms}
                at={at}
                ease={MOTION_EASE_CSS[c.name as keyof typeof MOTION_EASE_CSS]}
              />
            </Grid>
          ))}
        </Stack>
        <Subtext color="fg.muted" mb={0}>
          <code>standard</code>와 <code>emphasized</code>는 그래프로는 크게
          다르지만 짧은 거리에서는 눈으로 구분되지 않습니다 — 2000ms로 본 뒤
          300ms로 내려보세요. <code>overshoot</code>만 거리와 무관하게 보입니다.
          새 프리셋에서 곡선을 고를 때 이게 기준입니다.
        </Subtext>
      </Box>
    );
  },
};
