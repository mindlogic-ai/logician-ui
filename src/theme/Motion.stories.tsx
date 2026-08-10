import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { CopyableCode } from '../components/CopyableCode';
import { MoonIcon, SunIcon } from '../components/Icon';
import { IconButton } from '../components/IconButton';
import { ProgressBar } from '../components/ProgressBar';
import { SegmentedControl } from '../components/SegmentedControl';
import { Switch } from '../components/Switch';
import { H3, H4, Subtext, Text } from '../components/Typography';
import { MOTION_EASE_CSS } from './motion';

/**
 * # Motion
 *
 * The timing layer, and what it changed.
 *
 * - **Changed** — the eight components that move differently now. Start here.
 * - **Tokens** — the duration and easing scales, played at real speed.
 * - **Dropped** — four proposals that turned out to be unnecessary, with the
 *   evidence, so they don't come back around.
 */
const meta = {
  title: 'Theme/Motion',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ Changed */

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
    <Grid templateColumns={{ base: '1fr', lg: '250px 1fr 290px' }} gap={7}>
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
 * The icon morph from `ColorModeToggle`, driven by local state.
 *
 * The real control cannot be demonstrated here: Storybook's preview wraps every
 * story in `<LogicianProvider forcedColorMode={...}>` so the toolbar owns the
 * mode, and `toggleColorMode` only writes the *user preference* — which a forced
 * mode overrides. Pressing the real button in Storybook does nothing by design.
 * This twin renders the same markup so the motion itself is inspectable.
 */
const IconMorphDemo = () => {
  const [dark, setDark] = useState(false);
  const face = (active: boolean, rotate: string) => ({
    gridArea: '1 / 1',
    display: 'grid',
    placeItems: 'center',
    opacity: active ? 1 : 0,
    transform: active ? undefined : `rotate(${rotate}) scale(0.5)`,
    transitionProperty: 'opacity, transform',
    transitionDuration: 'motion.slow',
    transitionTimingFunction: 'overshoot',
    _motionReduce: { transitionDuration: 'motion.instant' },
  });
  return (
    <HStack gap={3}>
      <IconButton aria-label="Toggle demo" onClick={() => setDark(d => !d)}>
        <Box display="grid" placeItems="center">
          <Box {...face(dark, '-90deg')}>
            <SunIcon />
          </Box>
          <Box {...face(!dark, '90deg')}>
            <MoonIcon />
          </Box>
        </Box>
      </IconButton>
      <Subtext color="fg.muted" mb={0}>
        로컬 상태 데모 — Storybook은 색 모드를 강제하므로 실제 토글은 여기서
        동작하지 않습니다
      </Subtext>
    </HStack>
  );
};

/**
 * Every control here is the real component, so what you see is what your app
 * gets. The change is in the movement, not the pixels at rest — click, hover
 * and toggle them.
 */
export const Changed: Story = {
  render: () => {
    const [progress, setProgress] = useState(18);
    const [checked, setChecked] = useState(false);

    return (
      <Box p={10} maxW="1120px">
        <H3 mb={2}>여덟 개가 달라졌습니다</H3>
        <Text color="fg.muted" mb={8}>
          업그레이드 전 확인용. 각 행은 실제 컴포넌트입니다.
        </Text>

        <Row
          id="A05"
          name="SegmentedControl"
          why="가장 큰 변화. Chakra 레시피가 --left/--width로 위치만 잡고 transition을 선언하지 않아, 인디케이터가 미끄러지지 않고 순간이동했습니다."
          before="transition 없음 — 썸이 튐"
          after="left/width · motion.base · emphasized"
        >
          <SegmentedControl options={SEGMENTS} />
        </Row>

        <Row
          id="A01"
          name="Button"
          why='프레스가 색 변화와 같은 250ms에 묶여 있었고, transform: scale()이라 호출부의 transform(예: 가운데 정렬)을 덮어써 버튼이 눌릴 때 움직였습니다.'
          before="all · 0.25s · ease-in-out"
          after="scale 120ms (motion.press) · 색·그림자 150ms"
        >
          <HStack gap={3}>
            <Button colorPalette="primary" variant="solid">
              눌러보세요
            </Button>
            <Button colorPalette="neutral" variant="outline">
              Outline
            </Button>
          </HStack>
        </Row>

        <Row
          id="A04"
          name="Switch"
          why="토글은 물리 스위치의 은유입니다. overshoot는 방향이 바뀌므로 썸의 16px 이동에서도 보이는 유일한 곡선입니다."
          before="translate · fast (150ms)"
          after="translate · motion.base · overshoot"
        >
          <Switch>
            <Switch.Control />
            <Switch.Label>알림 받기</Switch.Label>
          </Switch>
        </Row>

        <Row
          id="A03"
          name="Checkbox"
          why="Chakra 체크마크가 이미 stroke 기반이라 dash offset으로 그려집니다. 60ms 간격이 '눌림 → 확인' 두 박자를 만듭니다."
          before="박스와 체크가 동시에 즉시 표시"
          after="채움 150ms → 60ms 뒤 체크가 그려짐"
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
          why="복사에 아무 응답이 없었습니다. onCopy만 호출하고 화면은 그대로라 사용자가 다시 누르게 됩니다."
          before="복사 확인 표시가 전혀 없음"
          after="아이콘이 체크로 교차, 라벨 전환, 1.6초 뒤 복귀"
        >
          <CopyableCode onCopy={() => {}}>
            {`npm i @mindlogic-ai/logician-ui`}
          </CopyableCode>
        </Row>

        <Row
          id="A20"
          name="ProgressBar"
          why="ease-in-out은 매 업데이트마다 정지 상태에서 가속하는 것처럼 보입니다. 진행률은 한 방향으로만 가고 불연속으로 도착하는 값입니다."
          before="width 0.3s ease-in-out (토큰 우회한 하드코딩)"
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
          why="아이콘을 삼항으로 갈아끼워서 서로 다른 노드였고, 그래서 전환 자체가 불가능했습니다. 이제 한 칸을 공유하며 회전해 교차합니다."
          before="즉시 아이콘 교체"
          after="rotate + scale 교차 · motion.slow · overshoot"
        >
          <IconMorphDemo />
        </Row>

        <Row
          id="—"
          name="Card"
          why='앞 커밋의 버그 수정으로 이미 바뀐 것. transitionDuration="normal"은 v3에 없는 v2 토큰이라 선언이 무효 처리돼 버려졌습니다.'
          before="전환 자체가 없었음 — hover가 툭 바뀜"
          after='motion.base · transitionProperty="common"'
        >
          <Grid
            templateColumns="repeat(auto-fit, minmax(170px, 1fr))"
            gap={4}
            maxW="400px"
          >
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

/* ------------------------------------------------------------------- Tokens */


const PRESETS = [
  { name: 'press', t: 'motion.press · standard', use: '포인터 다운 — 접촉감', who: 'Button' },
  { name: 'feedback', t: 'fast · standard', use: 'hover·상태 색/불투명도 변화', who: 'Card · Checkbox · Switch 트랙 · FileInput · Tree · CopyableCode(나가는 아이콘)' },
  { name: 'travel', t: 'motion.base · emphasized', use: '위치·크기가 새 값으로 이동', who: 'SegmentedControl · ProgressBar' },
  { name: 'spring', t: 'motion.base · overshoot', use: '물리적 전환, 두 요소의 교차', who: 'Switch 썸 · ColorModeToggle · CopyableCode(들어오는 아이콘)' },
  { name: 'composite', t: '(직접 구성)', use: '한 요소에 두 시계가 필요할 때', who: 'Button — 프레스 120ms + 색 150ms' },
];

const OURS = [
  { name: 'motion.instant', ms: 0, use: '전환 없음 — 토큰 슬롯의 "끄기" 값' },
  { name: 'motion.press', ms: 120, use: '포인터 다운 — 접촉감' },
  { name: 'motion.base', ms: 300, use: '기본 — 등장 / 퇴장 / 리빌' },
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
  { name: 'standard', d: 'M0,100 C40,100 20,0 100,0', half: '50%', use: '평범한 전환' },
  { name: 'emphasized', d: 'M0,100 C22,0 36,0 100,0', half: '96%', use: '등장·리빌의 하우스 곡선' },
  { name: 'overshoot', d: 'M0,100 C34,-56 64,0 100,0', half: '109%', use: '축하 팝, 물리적 토글' },
];

const Track = ({ ms, run, ease }: { ms: number; run: boolean; ease?: string }) => (
  <Box position="relative" h="13px" flex="1" bg="bg.subtle" borderRadius="full" minW="110px">
    <Box
      position="absolute"
      top="1px"
      left={run ? 'calc(100% - 12px)' : '1px'}
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

/**
 * The scales, played at real speed.
 *
 * Our durations are namespaced under `motion.` because Chakra already ships
 * `slow` (300ms) and `slower` (400ms) with **different values** than ours, and
 * its `dialog`, `drawer` and `progress` recipes read them — redefining those
 * would retime components we do not own.
 *
 * On the curves: `standard` and `emphasized` differ enormously on the plot, but
 * over a short distance the eye cannot separate them — set 2s to see it, then
 * drop to 300ms and watch it vanish. `overshoot` reverses direction, so it stays
 * legible at any distance.
 */
export const Tokens: Story = {
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
          <H3>토큰</H3>
          <Button size="sm" onClick={play}>
            재생
          </Button>
        </HStack>

        <H4 mb={1}>프리셋 — 컴포넌트가 실제로 쓰는 것</H4>
        <Subtext color="fg.muted" mb={4}>
          의도로 고르면 타이밍이 따라옵니다. duration·easing을 직접 적을 일은
          거의 없습니다 — 아래 스케일은 프리셋을 만들 때 보는 재료입니다.
        </Subtext>
        <Stack gap={3} mb={9}>
          {PRESETS.map(p => (
            <Grid
              key={p.name}
              templateColumns={{ base: '1fr', md: '150px 210px 1fr' }}
              gap={4}
              alignItems="baseline"
              borderTop="1px solid"
              borderColor="border.subtle"
              pt={3}
            >
              <Text fontFamily="mono" fontSize="sm" fontWeight="600" mb={0}>
                {p.name}
              </Text>
              <Text fontFamily="mono" fontSize="xs" color="fg.muted" mb={0}>
                {p.t}
              </Text>
              <Box>
                <Subtext mb={0}>{p.use}</Subtext>
                <Subtext color="fg.muted" mb={0} fontSize="2xs">
                  {p.who}
                </Subtext>
              </Box>
            </Grid>
          ))}
        </Stack>

        <H4 mb={3}>Duration — 우리 것</H4>
        <Stack gap={2} mb={7}>
          {OURS.map(d => (
            <Grid
              key={d.name}
              templateColumns={{ base: '140px 56px 1fr', md: '140px 56px 1fr 240px' }}
              gap={4}
              alignItems="center"
            >
              <Text fontFamily="mono" fontSize="sm" mb={0}>
                {d.name}
              </Text>
              <Text fontFamily="mono" fontSize="sm" color="fg.muted" textAlign="right" mb={0}>
                {d.ms}ms
              </Text>
              <Track ms={d.ms} run={run} />
              <Subtext color="fg.muted" mb={0} display={{ base: 'none', md: 'block' }}>
                {d.use}
              </Subtext>
            </Grid>
          ))}
        </Stack>

        <H4 mb={3}>Duration — Chakra 것 (그대로 둠)</H4>
        <Stack gap={2} mb={9}>
          {CHAKRAS.map(d => (
            <Grid
              key={d.name}
              templateColumns={{ base: '140px 56px 1fr', md: '140px 56px 1fr 240px' }}
              gap={4}
              alignItems="center"
            >
              <Text fontFamily="mono" fontSize="sm" color="fg.muted" mb={0}>
                {d.name}
              </Text>
              <Text fontFamily="mono" fontSize="sm" color="fg.muted" textAlign="right" mb={0}>
                {d.ms}ms
              </Text>
              <Track ms={d.ms} run={run} />
              <Subtext color="fg.muted" mb={0} display={{ base: 'none', md: 'block' }}>
                {d.note}
              </Subtext>
            </Grid>
          ))}
        </Stack>

        <HStack justify="space-between" align="baseline" mb={5}>
          <H4 mb={0}>Easing</H4>
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
          </HStack>
        </HStack>

        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6} mb={6}>
          {CURVES.map(c => (
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

        <Stack gap={3} mb={9}>
          {CURVES.map(c => (
            <Grid key={c.name} templateColumns="110px 1fr" gap={4} alignItems="center">
              <Text fontFamily="mono" fontSize="sm" color="fg.muted" mb={0}>
                {c.name}
              </Text>
              <Track
                ms={ms}
                run={run}
                ease={MOTION_EASE_CSS[c.name as keyof typeof MOTION_EASE_CSS]}
              />
            </Grid>
          ))}
        </Stack>

        <H4 mb={3}>쓰는 법</H4>
        <Stack gap={2}>
          {[
            "<SegmentGroup.Indicator {...transitions.travel('left, width')} />",
            "<Switch.Thumb {...transitions.spring('translate')} />",
            'css={{ animation: `x var(--chakra-durations-motion-slow) var(--chakra-easings-emphasized)` }}',
            '<motion.div transition={{ duration: MOTION_DURATION_S.base, ease: MOTION_EASE.emphasized }} />',
          ].map(s => (
            <Box
              key={s}
              fontFamily="mono"
              fontSize="xs"
              bg="bg.subtle"
              px={3}
              py={2}
              borderRadius="sm"
              overflowX="auto"
            >
              {s}
            </Box>
          ))}
        </Stack>
        <Subtext color="fg.muted" mt={2} mb={0}>
          framer-motion은 CSS 변수를 못 읽으므로 원시값(<code>MOTION_DURATION_MS</code>
          , <code>_S</code>, <code>MOTION_EASE</code>, <code>MOTION_EASE_CSS</code>)도
          함께 export 됩니다.
        </Subtext>
      </Box>
    );
  },
};

/* ------------------------------------------------------------------ Dropped */

const DROPPED = [
  {
    id: 'A22',
    name: 'Modal',
    proposal: '퇴장을 진입의 절반으로.',
    finding: 'Chakra가 이미 그렇게 합니다.',
    evidence:
      'dialog recipe — content: _open moderate(200ms) / _closed faster(100ms), backdrop: _open slow(300ms) / _closed moderate(200ms)',
  },
  {
    id: 'A09',
    name: 'Menu',
    proposal: '열 때만 300ms hover-intent 지연.',
    finding: 'Chakra v3 메뉴는 클릭으로 열립니다 — 지연시킬 hover가 없습니다.',
    evidence: 'menu recipe — _open fast(150ms) / _closed faster(100ms)',
  },
  {
    id: 'A12',
    name: 'Button loading',
    proposal: 'loading prop 신설 + 버튼 폭 고정.',
    finding: '이미 있고, 폭도 이미 유지됩니다.',
    evidence:
      'Chakra Loader — loadingText 없이 쓰면 스피너를 AbsoluteCenter에 띄우고 children을 visibility:hidden으로 남겨 폭을 그대로 유지',
  },
  {
    id: 'A21',
    name: 'Accordion',
    proposal: 'grid-template-rows 0fr→1fr로 바꿔 JS 측정 없애기.',
    finding: '이미 높이를 애니메이션하고, "측정 불필요" 전제가 틀렸습니다.',
    evidence:
      'accordion recipe — expand-height at moderate(200ms). 키프레임이 var(--collapsed-height,0) → var(--height)를 보간하고 그 값은 Ark가 측정해 넣습니다',
  },
];

/**
 * Four proposals described a "before" that did not exist. Recorded with the
 * evidence rather than silently deleted.
 *
 * The common thread: **a component file being silent about motion did not mean
 * it had none.** These behaviours live in Chakra's recipes, which a grep over
 * `src/components` never sees — the same blind spot that made the original audit
 * miss `SegmentedControl` entirely.
 */
export const Dropped: Story = {
  render: () => (
    <Box p={10} maxW="880px">
      <H3 mb={2}>제외한 제안</H3>
      <Text color="fg.muted" mb={7}>
        레시피를 읽어보니 Chakra가 이미 해결해둔 것들이었습니다. 반년 뒤 같은
        제안이 다시 올라오지 않도록 근거와 함께 남깁니다.
      </Text>

      <Stack gap={5}>
        {DROPPED.map(d => (
          <Box key={d.id} borderLeft="3px solid" borderColor="border.default" pl={5} py={1}>
            <HStack gap={2} mb={2}>
              <Text fontFamily="mono" fontSize="xs" color="fg.muted" mb={0}>
                {d.id}
              </Text>
              <Text fontWeight="700" mb={0}>
                {d.name}
              </Text>
              <Badge size="sm">변경 불필요</Badge>
            </HStack>
            <Subtext color="fg.muted" mb={1}>
              <b>제안:</b> {d.proposal}
            </Subtext>
            <Subtext mb={1}>
              <b>확인:</b> {d.finding}
            </Subtext>
            <Subtext color="fg.muted" mb={0} fontFamily="mono" fontSize="2xs">
              {d.evidence}
            </Subtext>
          </Box>
        ))}
      </Stack>

      <H4 mt={10} mb={2}>
        제외가 아니라 보류
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
            구조 변경 필요
          </Badge>
        </HStack>
        <Subtext color="fg.muted" mb={1}>
          전환 없이 텍스트를 갈아끼우는 건 사실이라 고칠 값어치가 있습니다. 다만{' '}
          <code>useExpandableText</code>가 글자 수로 자르고 노드를 통째로 교체해서,
          높이 애니메이션에는 측정이 필요합니다 — Chakra의{' '}
          <code>expand-height</code>도 Ark가 측정해 넣는 <code>var(--height)</code>
          로 보간합니다.
        </Subtext>
        <Subtext mb={0}>
          이미 있는 <code>Collapsible</code> 위에 다시 세우는 게 맞고, 자르기 방식이
          바뀌는 동작 변경이라 시각 검증을 동반한 별도 작업으로 두었습니다.
        </Subtext>
      </Box>
    </Box>
  ),
};
