import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { CopyableCode } from '../components/CopyableCode';
import { FaRegCopy, MoonIcon, SunIcon } from '../components/Icon';
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
  // CSF treats *every* named export in a `.stories` file as a story, so the
  // `BEFORE` overrides below — exported for the accompanying test — would
  // otherwise be indexed as a story with nothing to render.
  excludeStories: ['BEFORE'],
} satisfies Meta;

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ Changed */

/**
 * The pre-change values, put back on the **real** components.
 *
 * Every key here is emitted as a descendant of the wrapper's own class —
 * `.wrapper [data-part="thumb"]` is (0,2,0) — while a Chakra style prop lands on
 * the element's single class, (0,1,0). So the wrapper wins the cascade without
 * `!important`, and the left column is the same component your app renders,
 * running on the old numbers rather than a mock of them.
 *
 * The values are read off the commits before each change, not estimated.
 *
 * Two cases can't be rebuilt this way, because what changed was not CSS:
 * `CopyableCode` had no confirmation state to revert, and `ColorModeToggle`
 * swapped whole nodes with a ternary. Those use a labelled twin.
 */
export const BEFORE = {
  /**
   * A05 — Ark writes this part's `transition-*` **inline**, as
   * `var(--transition-duration, 150ms)` and `var(--transition-timing-function)`.
   * Its default is therefore 150ms on an unset curve (`ease`). Putting those two
   * custom properties back is exactly what `dev` renders — and is also why the
   * fix had to go through them: an inline declaration beats any class.
   */
  segmented: {
    '& [data-part="indicator"]': {
      '--transition-duration': '150ms',
      '--transition-timing-function': 'ease',
    },
  },
  /**
   * A01 — `transitionProperty="all"`, `"0.25s"`, `"ease-in-out"`, with the press
   * written as `transform: scale(0.97)`. `transform` is a single property, so
   * that value *replaces* whatever transform the call site set for positioning.
   */
  button: {
    '& button': { transition: 'all 0.25s ease-in-out' },
    '& button:active': { scale: '1', transform: 'scale(0.97)' },
  },
  /** A04 — Chakra's own thumb timing: `translate` over `fast` (150ms), curve unset. */
  switch: {
    '& [data-part="thumb"]': {
      transitionProperty: 'translate',
      transitionDuration: '150ms',
      transitionTimingFunction: 'ease',
    },
  },
  /**
   * A03 — the control carried no transition at all, and the tick was painted at
   * full length the instant it mounted.
   */
  checkbox: {
    '& [data-part="control"]': { transitionProperty: 'none' },
    '& [data-part="control"] svg polyline': {
      animation: 'none',
      strokeDasharray: 'none',
    },
  },
  /** A20 — a hardcoded `width 0.3s ease-in-out` that bypassed the token scale. */
  progress: {
    '& [data-part="range"]': { transition: 'width 0.3s ease-in-out' },
  },
  /**
   * Card — `transitionDuration="normal"` is a v2 token absent from v3. It fell
   * through as the literal `normal`, which is invalid, so the browser dropped
   * that one declaration and the duration stayed at its initial `0s`.
   */
  card: { '& .chakra-card__root': { transitionDuration: '0s' } },
};

const SEGMENTS = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: 'active' },
  { label: '완료', value: 'done' },
];

/** One column of a case: a label, the live demo, and the timing it runs on. */
const Pane = ({
  label,
  spec,
  twin,
  children,
}: {
  label: string;
  spec: string;
  twin?: boolean;
  children: React.ReactNode;
}) => (
  <Box>
    <HStack gap={2} mb={3}>
      <Text
        fontFamily="mono"
        fontSize="2xs"
        color="fg.muted"
        letterSpacing="0.08em"
        mb={0}
      >
        {label}
      </Text>
      {twin ? (
        <Badge size="sm" colorPalette="warning">
          재현
        </Badge>
      ) : null}
    </HStack>
    <Box minH="60px" display="flex" alignItems="center">
      {children}
    </Box>
    <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mt={3} mb={0}>
      {spec}
    </Subtext>
  </Box>
);

interface CaseProps {
  id: string;
  name: string;
  /** Shared control that drives both columns at once, so they animate together. */
  control?: React.ReactNode;
  beforeSpec: string;
  afterSpec: string;
  /** Set when the "before" column is a twin rather than the real component. */
  beforeTwin?: boolean;
  afterTwin?: boolean;
  diff: React.ReactNode;
  note?: React.ReactNode;
  before: React.ReactNode;
  after: React.ReactNode;
}

const Case = ({
  id,
  name,
  control,
  beforeSpec,
  afterSpec,
  beforeTwin,
  afterTwin,
  diff,
  note,
  before,
  after,
}: CaseProps) => (
  <Box
    border="1px solid"
    borderColor="border.default"
    borderRadius="lg"
    overflow="hidden"
    mb={5}
  >
    <HStack
      justify="space-between"
      align="center"
      gap={4}
      px={6}
      py={3}
      bg="bg.subtle"
      borderBottom="1px solid"
      borderColor="border.default"
    >
      <HStack gap={2}>
        <Text fontFamily="mono" fontSize="xs" color="fg.muted" mb={0}>
          {id}
        </Text>
        <Text fontWeight="700" mb={0}>
          {name}
        </Text>
      </HStack>
      {control}
    </HStack>

    <Grid
      templateColumns={{ base: '1fr', xl: '1fr 1fr 300px' }}
      gap={{ base: 6, xl: 8 }}
      px={6}
      py={6}
    >
      <Pane label="기존 — dev" spec={beforeSpec} twin={beforeTwin}>
        {before}
      </Pane>
      <Pane label="현재 — 이 브랜치" spec={afterSpec} twin={afterTwin}>
        {after}
      </Pane>
      <Box>
        <Text
          fontFamily="mono"
          fontSize="2xs"
          color="fg.muted"
          letterSpacing="0.08em"
          mb={3}
        >
          차이
        </Text>
        <Subtext mb={note ? 2 : 0}>{diff}</Subtext>
        {note ? (
          <Subtext color="fg.muted" mb={0}>
            {note}
          </Subtext>
        ) : null}
      </Box>
    </Grid>
  </Box>
);

/** Small header button that drives both columns of a case at once. */
const Drive = (props: React.ComponentProps<typeof Button>) => (
  <Button size="xs" variant="outline" {...props} />
);

/**
 * The two icons of `ColorModeToggle`, driven by local state.
 *
 * The real control can't be demonstrated in Storybook: the preview wraps every
 * story in `<LogicianProvider forcedColorMode={...}>` so the toolbar owns the
 * mode, and `toggleColorMode` writes only the *user preference*, which a forced
 * mode overrides. Pressing the real button here does nothing, by design. This
 * twin renders the same markup so the motion itself is inspectable.
 */
const IconMorph = ({ dark, crossed }: { dark: boolean; crossed: boolean }) => {
  const face = (active: boolean, rotate: string) => ({
    gridArea: '1 / 1',
    display: 'grid',
    placeItems: 'center',
    opacity: active ? 1 : 0,
    transform: active ? undefined : `rotate(${rotate}) scale(0.5)`,
    transitionProperty: 'opacity, transform',
    transitionDuration: 'motion.base',
    transitionTimingFunction: 'overshoot',
    _motionReduce: { transitionDuration: 'motion.instant' },
  });

  if (!crossed) {
    // What `dev` does: one icon or the other, chosen by a ternary. They are
    // different nodes, so there is nothing for a transition to interpolate.
    return (
      <IconButton aria-label="색 모드 토글 (기존)" pointerEvents="none">
        {dark ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    );
  }

  return (
    <IconButton aria-label="색 모드 토글 (현재)" pointerEvents="none">
      <Box display="grid" placeItems="center">
        <Box {...face(dark, '-90deg')}>
          <SunIcon />
        </Box>
        <Box {...face(!dark, '90deg')}>
          <MoonIcon />
        </Box>
      </Box>
    </IconButton>
  );
};

/**
 * `CopyableCode` exactly as `dev` renders it: `onCopy` fires and nothing on
 * screen changes, so there is no way to tell the copy worked.
 */
const CopyableCodeBefore = ({ children }: { children: string }) => (
  <Box position="relative" width="100%">
    <Card overflow="hidden" maxW="100%" p={0} width="100%">
      <Box as="pre" whiteSpace="nowrap" overflowX="auto" p={4} pr={20}>
        {children}
      </Box>
      <Box
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        w={24}
        bg="linear-gradient(to right, transparent, var(--chakra-colors-bg-surface) 15%)"
        pointerEvents="none"
      />
    </Card>
    <Button
      colorPalette="primary"
      variant="solid"
      size="xs"
      position="absolute"
      right={4}
      top="50%"
      transform="translateY(-50%)"
      zIndex={1}
    >
      <FaRegCopy boxSize="xs" /> 복사
    </Button>
  </Box>
);

/**
 * Same layout as the comparison document: for each component, what `dev` does,
 * what this branch does, and what the difference buys.
 *
 * The left column is the real component with its old values restored by a
 * wrapper rule that outranks them on specificity — not a mock — except for the
 * two marked **재현**, where the change was state rather than CSS.
 *
 * Where a case has a shared control in its header, it drives both columns at
 * once, so the two run side by side off a single click.
 */
export const Changed: Story = {
  render: () => {
    const [seg, setSeg] = useState('all');
    const [on, setOn] = useState(false);
    const [checked, setChecked] = useState(false);
    const [progress, setProgress] = useState(18);
    const [dark, setDark] = useState(false);

    const nextSeg = () =>
      setSeg(
        (v) =>
          SEGMENTS[(SEGMENTS.findIndex((s) => s.value === v) + 1) % 3].value
      );

    return (
      <Box p={10} maxW="1400px">
        <H3 mb={2}>여덟 개가 달라졌습니다</H3>
        <Text color="fg.muted" mb={2}>
          왼쪽은 <b>dev의 값을 되돌린 실제 컴포넌트</b>입니다. 목업이 아니라,
          같은 컴포넌트에 변경 전 수치를 다시 얹은 것 — 래퍼 선택자가 특이도에서
          이기기 때문에 가능합니다. 수치는 각 변경 직전 커밋에서 그대로
          읽어왔습니다.
        </Text>
        <Text color="fg.muted" mb={8}>
          <Badge size="sm" colorPalette="warning">
            재현
          </Badge>{' '}
          배지가 붙은 칸만 예외입니다. 바뀐 것이 CSS가 아니라 상태라서 되돌릴 수
          없고, 같은 마크업으로 다시 만든 데모입니다.
        </Text>

        <Case
          id="A05"
          name="SegmentedControl"
          control={<Drive onClick={nextSeg}>다음 항목으로</Drive>}
          beforeSpec="150ms · ease  (Ark 기본값)"
          afterSpec="300ms · emphasized  (--transition-duration 경유)"
          diff="같은 거리를 두 배 시간에, 앞쪽에 속도를 몰아서 갑니다. 인디케이터가 손가락 밑에 먼저 도착한 뒤 자리를 잡는 느낌이 되고, 기존은 짧아서 미끄러지듯 스쳐 지나갑니다."
          note={
            <>
              이 파트만 <code>transitionDuration</code> prop이 통하지 않습니다.
              Ark가 <code>transition-*</code>를 인라인으로 쓰고 인라인은
              클래스를 이기기 때문에, <code>transitions.arkTiming()</code>으로
              Ark가 읽는 커스텀 속성을 바꿔야 합니다.
            </>
          }
          before={
            <Box css={BEFORE.segmented}>
              <SegmentedControl
                options={SEGMENTS}
                value={seg}
                onSelect={setSeg}
              />
            </Box>
          }
          after={
            <SegmentedControl
              options={SEGMENTS}
              value={seg}
              onSelect={setSeg}
            />
          }
        />

        <Case
          id="A01"
          name="Button"
          beforeSpec="all · 0.25s · ease-in-out  (프레스 = transform: scale)"
          afterSpec="scale 120ms(motion.press) · 색·테두리·그림자 150ms"
          diff="프레스가 색 변화와 같은 시계에 묶여 있었습니다. 250ms면 손가락이 떠난 뒤에도 버튼이 가라앉는 중이라 접촉감이 아니라 지연으로 읽힙니다."
          note={
            <>
              오른쪽 버튼을 눌러 비교해 보세요. 기존은 프레스가{' '}
              <code>transform: scale()</code>이라 정렬용{' '}
              <code>translateY(-3px)</code>를 <b>덮어써서</b> 버튼이 아래로
              튑니다. 현재는 <code>scale</code>을 개별 속성으로 써서 두 값이
              합성됩니다.
            </>
          }
          before={
            <Box css={BEFORE.button}>
              <HStack gap={3}>
                <Button colorPalette="primary" variant="solid">
                  눌러보세요
                </Button>
                <Button
                  colorPalette="neutral"
                  variant="outline"
                  transform="translateY(-3px)"
                >
                  transform 사용
                </Button>
              </HStack>
            </Box>
          }
          after={
            <HStack gap={3}>
              <Button colorPalette="primary" variant="solid">
                눌러보세요
              </Button>
              <Button
                colorPalette="neutral"
                variant="outline"
                transform="translateY(-3px)"
              >
                transform 사용
              </Button>
            </HStack>
          }
        />

        <Case
          id="A04"
          name="Switch"
          control={<Drive onClick={() => setOn((v) => !v)}>양쪽 토글</Drive>}
          beforeSpec="translate · 150ms(fast) · ease"
          afterSpec="translate · 300ms(motion.base) · overshoot"
          diff="토글은 물리 스위치의 은유라 썸이 멈추는 자리를 살짝 지나쳤다가 되돌아옵니다."
          note="overshoot는 방향이 바뀌므로 썸의 16px 이동에서도 눈에 보이는 유일한 곡선입니다 — standard와 emphasized는 이 거리에서 서로 구분되지 않습니다."
          before={
            <Box css={BEFORE.switch}>
              <Switch checked={on} onCheckedChange={(e) => setOn(!!e.checked)}>
                <Switch.Control />
                <Switch.Label>알림 받기</Switch.Label>
              </Switch>
            </Box>
          }
          after={
            <Switch checked={on} onCheckedChange={(e) => setOn(!!e.checked)}>
              <Switch.Control />
              <Switch.Label>알림 받기</Switch.Label>
            </Switch>
          }
        />

        <Case
          id="A03"
          name="Checkbox"
          control={
            <Drive onClick={() => setChecked((v) => !v)}>양쪽 토글</Drive>
          }
          beforeSpec="전환 없음 · 체크는 즉시 전체 표시"
          afterSpec="채움 150ms → 60ms 뒤 체크가 그려짐 (motion.base · emphasized)"
          diff="한 번의 불분명한 반짝임이 '눌림 → 확인' 두 박자가 됩니다. 60ms 간격이 그 두 박자를 만듭니다."
          note="Chakra 체크마크가 이미 stroke 기반(fill: none, polyline)이라 아이콘을 갈아끼우지 않고 dash offset만으로 그려집니다."
          before={
            <Box css={BEFORE.checkbox}>
              <Checkbox
                checked={checked}
                onCheckedChange={(e) => setChecked(!!e.checked)}
              >
                <Checkbox.Control />
                <Checkbox.Label>약관에 동의합니다</Checkbox.Label>
              </Checkbox>
            </Box>
          }
          after={
            <Checkbox
              checked={checked}
              onCheckedChange={(e) => setChecked(!!e.checked)}
            >
              <Checkbox.Control />
              <Checkbox.Label>약관에 동의합니다</Checkbox.Label>
            </Checkbox>
          }
        />

        <Case
          id="A20"
          name="ProgressBar"
          control={
            <HStack gap={2}>
              <Drive onClick={() => setProgress((p) => Math.min(100, p + 27))}>
                진행
              </Drive>
              <Drive variant="ghost" onClick={() => setProgress(18)}>
                초기화
              </Drive>
            </HStack>
          }
          beforeSpec="width 0.3s ease-in-out  (토큰을 우회한 하드코딩)"
          afterSpec="width · 300ms(motion.base) · emphasized"
          diff="같은 300ms인데도 기존은 매 업데이트마다 정지 상태에서 가속하는 것처럼 보입니다. 진행률은 한 방향으로만 가고 불연속으로 도착하는 값이라, 들어갈 때 천천히 시작하는 건 사실이 아닌 연출입니다."
          note="현재는 거리 대부분을 즉시 덮고 마지막에 자리를 잡아서, 이미 바뀐 값을 막대가 따라잡는 것처럼 읽힙니다."
          before={
            <Box css={BEFORE.progress} w="100%" maxW="320px">
              <ProgressBar value={progress} />
            </Box>
          }
          after={
            <Box w="100%" maxW="320px">
              <ProgressBar value={progress} />
            </Box>
          }
        />

        <Case
          id="A07"
          name="CopyableCode"
          beforeTwin
          beforeSpec="복사 확인 표시가 전혀 없음"
          afterSpec="아이콘 교차(spring) + 라벨·색 전환, 1.6초 뒤 복귀"
          diff="기존은 onCopy만 호출하고 화면은 그대로였습니다. 응답이 없으니 사용자는 복사가 됐는지 알 수 없고 다시 누릅니다."
          note="눌린 컨트롤 자체가 답합니다 — 이 정도 크기의 동작에 전역 토스트는 과합니다. 두 아이콘이 같은 칸을 공유해서 교차하는 동안 버튼 폭이 유지됩니다."
          before={
            <CopyableCodeBefore>
              npm i @mindlogic-ai/logician-ui
            </CopyableCodeBefore>
          }
          after={
            <CopyableCode onCopy={() => {}}>
              {`npm i @mindlogic-ai/logician-ui`}
            </CopyableCode>
          }
        />

        <Case
          id="A35"
          name="ColorModeToggle"
          control={<Drive onClick={() => setDark((v) => !v)}>양쪽 토글</Drive>}
          beforeTwin
          afterTwin
          beforeSpec="즉시 아이콘 교체 (전환 불가)"
          afterSpec="rotate + scale 교차 · 300ms(motion.base) · overshoot"
          diff="삼항으로 노드를 갈아끼우면 서로 다른 요소라 브라우저가 보간할 대상이 없습니다. 이제 두 아이콘이 한 칸을 공유하며 회전해 교차합니다."
          note="페이지 전체의 색 반전은 의도적으로 즉시입니다 — ColorModeProvider가 disableTransitionOnChange를 켜둡니다. 이 변경은 버튼만 움직입니다."
          before={<IconMorph dark={dark} crossed={false} />}
          after={<IconMorph dark={dark} crossed />}
        />

        <Case
          id="—"
          name="Card"
          beforeSpec="transition-duration: normal → 무효 → 0s"
          afterSpec="common · 150ms(fast) · standard"
          diff="hover가 툭 바뀌던 것이 이제 이어집니다. 앞 커밋의 버그 수정이라 R1에 이미 들어가 있습니다."
          note={
            <>
              <code>normal</code>은 Chakra v2 토큰이라 v3에 없습니다. 리터럴로
              통과해 <code>transition-duration: normal</code>이 되고, 유효하지
              않은 선언은 브라우저가 버리므로 duration이 초기값 <code>0s</code>
              로 남았습니다.
            </>
          }
          before={
            <Box css={BEFORE.card} w="100%">
              <Grid templateColumns="1fr 1fr" gap={4} maxW="380px">
                <Card clickable>
                  <Text mb={0}>Hover me</Text>
                </Card>
                <Card clickable variant="elevated">
                  <Text mb={0}>elevated</Text>
                </Card>
              </Grid>
            </Box>
          }
          after={
            <Grid templateColumns="1fr 1fr" gap={4} maxW="380px" w="100%">
              <Card clickable>
                <Text mb={0}>Hover me</Text>
              </Card>
              <Card clickable variant="elevated">
                <Text mb={0}>elevated</Text>
              </Card>
            </Grid>
          }
        />
      </Box>
    );
  },
};

/* ------------------------------------------------------------------- Tokens */

const PRESETS = [
  {
    name: 'press',
    t: 'motion.press · standard',
    use: '포인터 다운 — 접촉감',
    who: 'Button',
  },
  {
    name: 'feedback',
    t: 'fast · standard',
    use: 'hover·상태 색/불투명도 변화',
    who: 'Card · Checkbox · Switch 트랙 · FileInput · Tree · CopyableCode(나가는 아이콘)',
  },
  {
    name: 'travel',
    t: 'motion.base · emphasized',
    use: '위치·크기가 새 값으로 이동',
    who: 'SegmentedControl · ProgressBar',
  },
  {
    name: 'spring',
    t: 'motion.base · overshoot',
    use: '물리적 전환, 두 요소의 교차',
    who: 'Switch 썸 · ColorModeToggle · CopyableCode(들어오는 아이콘)',
  },
  {
    name: 'composite',
    t: '(직접 구성)',
    use: '한 요소에 두 시계가 필요할 때',
    who: 'Button — 프레스 120ms + 색 150ms',
  },
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
    use: '등장·리빌의 하우스 곡선',
  },
  {
    name: 'overshoot',
    d: 'M0,100 C34,-56 64,0 100,0',
    half: '109%',
    use: '축하 팝, 물리적 토글',
  },
];

const Track = ({
  ms,
  run,
  ease,
}: {
  ms: number;
  run: boolean;
  ease?: string;
}) => (
  <Box
    position="relative"
    h="13px"
    flex="1"
    bg="bg.subtle"
    borderRadius="full"
    minW="110px"
  >
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
          {PRESETS.map((p) => (
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
          {OURS.map((d) => (
            <Grid
              key={d.name}
              templateColumns={{
                base: '140px 56px 1fr',
                md: '140px 56px 1fr 240px',
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
              <Subtext
                color="fg.muted"
                mb={0}
                display={{ base: 'none', md: 'block' }}
              >
                {d.use}
              </Subtext>
            </Grid>
          ))}
        </Stack>

        <H4 mb={3}>Duration — Chakra 것 (그대로 둠)</H4>
        <Stack gap={2} mb={9}>
          {CHAKRAS.map((d) => (
            <Grid
              key={d.name}
              templateColumns={{
                base: '140px 56px 1fr',
                md: '140px 56px 1fr 240px',
              }}
              gap={4}
              alignItems="center"
            >
              <Text fontFamily="mono" fontSize="sm" color="fg.muted" mb={0}>
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
              <Subtext
                color="fg.muted"
                mb={0}
                display={{ base: 'none', md: 'block' }}
              >
                {d.note}
              </Subtext>
            </Grid>
          ))}
        </Stack>

        <HStack justify="space-between" align="baseline" mb={5}>
          <H4 mb={0}>Easing</H4>
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

        <Stack gap={3} mb={9}>
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
          ].map((s) => (
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
          framer-motion은 CSS 변수를 못 읽으므로 원시값(
          <code>MOTION_DURATION_MS</code>, <code>_S</code>,{' '}
          <code>MOTION_EASE</code>, <code>MOTION_EASE_CSS</code>)도 함께 export
          됩니다.
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
        {DROPPED.map((d) => (
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
          <code>useExpandableText</code>가 글자 수로 자르고 노드를 통째로
          교체해서, 높이 애니메이션에는 측정이 필요합니다 — Chakra의{' '}
          <code>expand-height</code>도 Ark가 측정해 넣는{' '}
          <code>var(--height)</code>로 보간합니다.
        </Subtext>
        <Subtext mb={0}>
          이미 있는 <code>Collapsible</code> 위에 다시 세우는 게 맞고, 자르기
          방식이 바뀌는 동작 변경이라 시각 검증을 동반한 별도 작업으로
          두었습니다.
        </Subtext>
      </Box>
    </Box>
  ),
};
