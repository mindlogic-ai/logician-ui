import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { SegmentedControl } from '../components/SegmentedControl';
import { Switch } from '../components/Switch';
import { H2, H3, Subtext, Text } from '../components/Typography';
import { MOTION_EASE_CSS } from './motion';

/**
 * # Motion
 *
 * The timing layer, laid out like the type layer: a primitive scale plus a
 * named composition on top of it, both registered in the theme.
 *
 * - **Presets** — the vocabulary you write. Start here.
 * - **Scales** — the durations and curves the presets are built from.
 */
const meta = {
  title: 'Theme/Motion',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ shared */

const Code = ({ children }: { children: string }) => (
  <Box
    fontFamily="mono"
    fontSize="xs"
    bg="bg.subtle"
    color="fg.default"
    px={3}
    py={2}
    borderRadius="sm"
    overflowX="auto"
    whiteSpace="pre"
  >
    {children}
  </Box>
);

const Label = ({ children }: { children: string }) => (
  <Text
    fontFamily="mono"
    fontSize="2xs"
    color="fg.muted"
    letterSpacing="0.08em"
    mb={0}
  >
    {children}
  </Text>
);

/* ----------------------------------------------------------------- Presets */

interface PresetProps {
  name: string;
  timing: string;
  when: string;
  usedBy: string;
  demo: React.ReactNode;
}

const Preset = ({ name, timing, when, usedBy, demo }: PresetProps) => (
  <Grid
    templateColumns={{ base: '1fr', lg: '170px 1fr 260px' }}
    gap={{ base: 4, lg: 7 }}
    alignItems="start"
    borderTop="1px solid"
    borderColor="border.subtle"
    py={6}
  >
    <Box>
      <Text fontFamily="mono" fontWeight="700" mb={1}>
        {name}
      </Text>
      <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mb={0}>
        {timing}
      </Subtext>
    </Box>

    <Box minH="44px" display="flex" alignItems="center">
      {demo}
    </Box>

    <Box>
      <Subtext mb={1}>{when}</Subtext>
      <Subtext color="fg.muted" fontSize="2xs" mb={0}>
        {usedBy}
      </Subtext>
    </Box>
  </Grid>
);

/** A track with a dot that runs end to end, so a curve is visible as travel. */
const Runner = ({ style, at }: { style: string; at: boolean }) => (
  <Box
    position="relative"
    h="14px"
    w="100%"
    maxW="240px"
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
);

const SEGMENTS = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: 'active' },
  { label: '완료', value: 'done' },
];

/**
 * The motion vocabulary.
 *
 * Four intents cover everything in the library; the two below them exist for
 * cases a single preset cannot express. Pick by intent and the timing comes
 * with it — the same trade `textStyle="h3"` makes for typography.
 */
export const Presets: Story = {
  name: 'Presets',
  render: () => {
    const [at, setAt] = useState(false);
    const [checked, setChecked] = useState(false);
    const [on, setOn] = useState(false);

    return (
      <Box p={10} maxW="1080px">
        <H2 mb={2}>Motion</H2>
        <Text color="fg.muted" mb={6}>
          의도를 고르면 타이밍이 따라옵니다. 프리셋은{' '}
          <code>theme.animationStyles</code>에 등록되어 있어{' '}
          <code>textStyle</code>과 같은 방식으로 쓰고, 소비 앱이 자기 config에서
          다시 정의할 수 있습니다.
        </Text>

        <Stack gap={2} mb={9}>
          <Code>{`<Switch.Thumb  animationStyle="spring"  transitionProperty="translate" />
<Progress.Range animationStyle="travel"  transitionProperty="width" />`}</Code>
          <Subtext color="fg.muted" mb={0}>
            무엇이 움직이는지는 요소마다 다르므로{' '}
            <code>transitionProperty</code>는 항상 직접 적습니다. 프리셋의
            기본값은 <code>none</code>이라, 빠뜨리면 아무것도 움직이지 않습니다
            — CSS 기본값 <code>all</code>로 떨어져 전부 움직이는 것보다 눈에
            띕니다.
          </Subtext>
        </Stack>

        <HStack justify="space-between" align="baseline" mb={1}>
          <H3 mb={0}>의도 넷</H3>
          <Button size="xs" variant="outline" onClick={() => setAt((v) => !v)}>
            이동 재생
          </Button>
        </HStack>

        <Preset
          name="press"
          timing="motion.press · standard"
          when="포인터가 눌리는 순간의 접촉감."
          usedBy="유일하게 property 기본값이 있습니다 — 프레스는 언제나 scale."
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
          timing="fast · standard"
          when="hover와 상태 변화 — 채움, 테두리, 그림자, 불투명도."
          usedBy="Card · Checkbox · Switch 트랙 · FileInput · Tree · CopyableCode"
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
          timing="motion.base · emphasized"
          when="새 위치나 크기로 이동. 거리 대부분을 먼저 덮고 자리를 잡습니다."
          usedBy="SegmentedControl · ProgressBar"
          demo={<Runner style="travel" at={at} />}
        />

        <Preset
          name="spring"
          timing="motion.base · overshoot"
          when="물리적인 상태 전환, 또는 두 요소의 교차. 목표를 지나쳤다가 돌아옵니다."
          usedBy="Switch 썸 · ColorModeToggle · CopyableCode 확인 아이콘"
          demo={
            <Stack gap={3} w="100%">
              <Runner style="spring" at={at} />
              <Switch checked={on} onCheckedChange={(e) => setOn(!!e.checked)}>
                <Switch.Control />
                <Switch.Label>알림 받기</Switch.Label>
              </Switch>
            </Stack>
          }
        />

        <H3 mt={10} mb={1}>
          단일 프리셋으로 안 되는 둘
        </H3>
        <Subtext color="fg.muted" mb={0}>
          어휘를 우회하지 않고 예외를 담기 위한 것입니다. 새 컴포넌트라면 위
          넷에서 고르세요.
        </Subtext>

        <Preset
          name="composite"
          timing="(직접 구성) + 동작 줄이기 가드"
          when="한 요소에 시계가 둘 필요할 때. transition 단축 속성을 직접 쓰고 가드만 받습니다."
          usedBy="Button — 프레스는 motion.press, 색·그림자는 fast"
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
          timing="travel과 동일 · 커스텀 속성으로 전달"
          when="Ark가 transition을 인라인으로 쓰는 파트용. 인라인은 클래스를 이기므로 일반 프리셋이 닿지 않습니다."
          usedBy="SegmentedControl 인디케이터"
          demo={<SegmentedControl options={SEGMENTS} />}
        />

        <Preset
          name="checkmarkDraw"
          timing="motion.base · emphasized · 60ms 지연"
          when="체크마크를 그려서 표시. transition이 아니라 animation입니다."
          usedBy="Checkbox 인디케이터"
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

        <H3 mt={10} mb={2}>
          동작 줄이기
        </H3>
        <Text color="fg.muted" mb={3}>
          <code>prefers-reduced-motion</code>은 취향이 아니라 OS 접근성
          설정입니다 — 전정기관 질환이 있는 사람에게 화면의 움직임은 어지럼증을
          유발합니다. 모든 프리셋이 이 조건에서 duration을 <code>0ms</code>로
          내립니다. 결과(스위치는 여전히 켜지고 색은 여전히 바뀜)는 남고 이동만
          사라집니다.
        </Text>
        <Subtext color="fg.muted" mb={0}>
          프리셋 안에 들어 있는 이유: &ldquo;움직이는 것은 모두 이 설정을
          지킨다&rdquo;는 정책이지 컴포넌트가 매번 내릴 결정이 아니기
          때문입니다. 컴포넌트마다 적으면 열네 번째 컴포넌트가 빠뜨립니다.
        </Subtext>
      </Box>
    );
  },
};

/* ------------------------------------------------------------------ Scales */

const OURS = [
  { name: 'motion.instant', ms: 0, use: '전환 없음 — 동작 줄이기가 넣는 값' },
  { name: 'motion.press', ms: 120, use: '포인터 접촉' },
  { name: 'motion.base', ms: 300, use: '기본 — 등장·퇴장·리빌' },
  { name: 'motion.slow', ms: 500, use: '시선을 끌고 가는 이동' },
  { name: 'motion.slower', ms: 700, use: '공들여 오르는 카운트업' },
];

const CHAKRAS = [
  { name: 'fast', ms: 150, note: '150ms는 이걸 쓰세요' },
  { name: 'moderate', ms: 200, note: '200ms는 이걸 쓰세요' },
  { name: 'slow', ms: 300, note: '우리 motion.slow(500)와 다름' },
  { name: 'slower', ms: 400, note: '우리 motion.slower(700)와 다름' },
];

const CURVES = [
  {
    name: 'standard',
    d: 'M0,100 C40,100 20,0 100,0',
    half: '50%',
    use: '평범한 전환',
  },
  {
    name: 'emphasized',
    d: 'M0,100 C22,0 36,0 100,0',
    half: '96%',
    use: '값에 도착하는 하우스 곡선',
  },
  {
    name: 'overshoot',
    d: 'M0,100 C34,-56 64,0 100,0',
    half: '109%',
    use: '물리적 토글, 두 요소의 교차',
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
  note,
  at,
  muted,
}: {
  name: string;
  ms: number;
  note: string;
  at: boolean;
  muted?: boolean;
}) => (
  <Grid
    templateColumns={{ base: '140px 56px 1fr', md: '140px 56px 1fr 240px' }}
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
      {note}
    </Subtext>
  </Grid>
);

/**
 * The raw material: the duration scale and the three curves.
 *
 * Reach for a preset first — these are what you look at when *defining* one, or
 * when driving an animation from JS where a preset cannot apply.
 */
export const Scales: Story = {
  name: 'Scales',
  render: () => {
    const [at, setAt] = useState(false);
    const [ms, setMs] = useState(500);
    const play = () => {
      setAt(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setAt(true)));
    };

    return (
      <Box p={10} maxW="920px">
        <HStack justify="space-between" align="baseline" mb={6}>
          <H2 mb={0}>스케일</H2>
          <Button size="sm" onClick={play}>
            재생
          </Button>
        </HStack>

        <H3 mb={1}>Duration — 우리 것</H3>
        <Subtext color="fg.muted" mb={4}>
          <code>motion.</code> 접두어가 붙는 이유: Chakra가 <code>slow</code>·
          <code>slower</code>를 다른 값으로 이미 쓰고 있고, 그 토큰을 Chakra의{' '}
          <code>dialog</code>·<code>drawer</code>·<code>progress</code> 레시피가
          읽습니다. 덮어쓰면 우리가 만들지 않은 컴포넌트의 타이밍이 바뀝니다.
        </Subtext>
        <Stack gap={2} mb={8}>
          {OURS.map((d) => (
            <ScaleRow key={d.name} {...d} note={d.use} at={at} />
          ))}
        </Stack>

        <H3 mb={1}>Duration — Chakra 것 (그대로 둠)</H3>
        <Subtext color="fg.muted" mb={4}>
          150ms와 200ms는 우리 스케일에 없습니다. 이미 정확히 이 값이라 이름만
          둘이 되는 셈입니다.
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
                {c.use}
              </Subtext>
            </Box>
          ))}
        </Grid>

        <Stack gap={3} mb={4}>
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
        <Subtext color="fg.muted" mb={10}>
          <code>standard</code>와 <code>emphasized</code>는 그래프로는 크게
          다르지만 짧은 거리에서는 눈으로 구분되지 않습니다 — 2000ms로 보고
          300ms로 내려보세요.
          <code>overshoot</code>는 방향이 바뀌므로 어떤 거리에서도 보입니다.
        </Subtext>

        <H3 mb={2}>JS에서</H3>
        <Subtext color="fg.muted" mb={3}>
          framer-motion은 CSS 변수를 읽지 못하므로 같은 값을 숫자로도
          내보냅니다.
        </Subtext>
        <Stack gap={2}>
          <Label>RAW VALUES</Label>
          <Code>{`<motion.div transition={{ duration: MOTION_DURATION_S.base, ease: MOTION_EASE.emphasized }} />`}</Code>
          <Code>{`MOTION_DURATION_MS  MOTION_DURATION_S  MOTION_EASE  MOTION_EASE_CSS`}</Code>
        </Stack>
      </Box>
    );
  },
};
