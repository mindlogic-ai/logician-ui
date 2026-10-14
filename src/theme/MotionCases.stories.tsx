import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../components/Button';
import { Confetti } from '../components/Confetti';
import { CountUp } from '../components/CountUp';
import { FlyTo } from '../components/FlyTo';
import { Pulse } from '../components/Pulse';
import { H2, H3, Subtext, Text } from '../components/Typography';
import { MOTION_DURATION_MS } from './motion';

/**
 * # Motion Cases — 팩트챗 보상·크레딧 연출
 *
 * FactChat's two celebration flows, rebuilt on this library's scale. The point
 * is not that they now look different — most of them deliberately do not — but
 * to see which parts of the design actually bind once real motion is put
 * through it, and where the scale had nothing to offer.
 *
 * Each case is: what FactChat ships, what it becomes here, and what changed.
 */
const meta = {
  title: 'Theme/Motion Cases',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ shared */

/** Before / after, with the verdict as its own row so it can be skimmed. */
const Case = ({
  n,
  title,
  before,
  after,
  verdict,
  tone = 'same',
  demo,
}: {
  n: string;
  title: string;
  before: string;
  after: string;
  verdict: string;
  tone?: 'same' | 'changed' | 'gap';
  demo: React.ReactNode;
}) => (
  <Box borderTop="1px solid" borderColor="border.subtle" py={7}>
    <HStack gap={3} align="baseline" mb={4}>
      <Text fontFamily="mono" fontSize="xs" color="fg.muted" mb={0}>
        {n}
      </Text>
      <Text fontWeight="700" fontSize="lg" mb={0}>
        {title}
      </Text>
      <Box
        fontSize="2xs"
        fontFamily="mono"
        px={2}
        py="1px"
        borderRadius="sm"
        color={
          tone === 'gap'
            ? 'warning.main'
            : tone === 'changed'
              ? 'primary.main'
              : 'fg.muted'
        }
        bg={
          tone === 'gap'
            ? 'warning.lightest'
            : tone === 'changed'
              ? 'primary.lightest'
              : 'bg.subtle'
        }
      >
        {tone === 'gap'
          ? '스케일 빈칸'
          : tone === 'changed'
            ? '값이 바뀜'
            : '그대로'}
      </Box>
    </HStack>

    <Grid
      templateColumns={{ base: '1fr', lg: '1fr 1fr 260px' }}
      gap={{ base: 4, lg: 6 }}
      alignItems="start"
    >
      <Box>
        <Subtext color="fg.muted" fontSize="2xs" mb={1}>
          팩트챗
        </Subtext>
        <Box
          as="pre"
          fontFamily="mono"
          fontSize="2xs"
          lineHeight="1.7"
          bg="bg.subtle"
          borderRadius="sm"
          p={3}
          overflowX="auto"
          whiteSpace="pre-wrap"
        >
          {before}
        </Box>
      </Box>
      <Box>
        <Subtext color="primary.main" fontSize="2xs" mb={1}>
          여기
        </Subtext>
        <Box
          as="pre"
          fontFamily="mono"
          fontSize="2xs"
          lineHeight="1.7"
          bg="primary.lightest"
          borderRadius="sm"
          p={3}
          overflowX="auto"
          whiteSpace="pre-wrap"
        >
          {after}
        </Box>
      </Box>
      <Box minH="60px">{demo}</Box>
    </Grid>

    <Subtext color="fg.muted" mt={3} mb={0}>
      {verdict}
    </Subtext>
  </Box>
);

/* ----------------------------------------------------------- demos: flight */

/** The reward chip, a stand-in for FactChat's `RewardChip`. */
const Chip = () => (
  <HStack
    gap={1}
    bg="primary.main"
    color="fg.inverse"
    px={3}
    py={1}
    borderRadius="full"
    fontSize="sm"
    fontWeight="700"
  >
    <Box>◆</Box>
    <Box>+50</Box>
  </HStack>
);

/**
 * The whole reward sequence, end to end: a chip leaves the mission, arcs to the
 * balance, the balance pops and counts up.
 *
 * Sequenced off `onDone` rather than off timers, which is the argument for a
 * fixed celebration clock — every step here knows when the one before it ended.
 */
const RewardFlight = () => {
  const source = useRef<HTMLButtonElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const [flight, setFlight] = useState<{ from: DOMRect; to: DOMRect } | null>(
    null
  );
  const [balance, setBalance] = useState(1250);
  const [landed, setLanded] = useState(0);

  const launch = () => {
    const from = source.current?.getBoundingClientRect();
    const to = target.current?.getBoundingClientRect();
    if (from && to) setFlight({ from, to });
  };

  return (
    <Stack gap={5}>
      <HStack gap={10} justify="space-between" align="center" maxW="520px">
        <Button ref={source} size="sm" onClick={launch}>
          미션 완료
        </Button>

        <Box ref={target} textAlign="right">
          <Subtext color="fg.muted" fontSize="2xs" mb={0}>
            잔액
          </Subtext>
          <Pulse trigger={landed} peak={1.3}>
            <Text fontSize="2xl" fontWeight="700" mb={0}>
              <CountUp to={balance} /> 크레딧
            </Text>
          </Pulse>
        </Box>
      </HStack>

      {flight && (
        <FlyTo
          from={flight.from}
          to={flight.to}
          onDone={() => {
            setFlight(null);
            setBalance((b) => b + 50);
            setLanded((n) => n + 1);
          }}
        >
          <Chip />
        </FlyTo>
      )}
    </Stack>
  );
};

/** The purchase modal's success moment: check pop, confetti, balance. */
const PurchaseCelebration = () => {
  const [run, setRun] = useState(0);

  return (
    <Stack gap={4} maxW="360px">
      <Button size="sm" onClick={() => setRun((r) => r + 1)}>
        구매 완료 재생
      </Button>

      <Box
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        border="1px solid"
        borderColor="border.subtle"
        bg="bg.surface"
        px={6}
        py={7}
        textAlign="center"
      >
        {run > 0 && <Confetti key={run} seed={run} pieceCount={40} />}

        <Pulse trigger={run} peak={1.15}>
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w="52px"
            h="52px"
            borderRadius="full"
            bg="success.main"
            color="fg.inverse"
            fontSize="2xl"
            fontWeight="700"
            mb={3}
          >
            ✓
          </Box>
        </Pulse>

        <Text fontWeight="700" mb={1}>
          결제가 완료되었습니다
        </Text>
        <Text fontSize="2xl" fontWeight="700" color="primary.main" mb={0}>
          <CountUp
            key={run}
            from={1250}
            to={1250 + 500 * run}
            // The celebration band, not the response band — see the A/B/C
            // comparison below. A balance rising under a confetti burst is
            // being watched, not being answered.
            durationMs={MOTION_DURATION_MS.celebrateFall}
            delayMs={MOTION_DURATION_MS.celebrateBurst}
          />{' '}
          크레딧
        </Text>
      </Box>
    </Stack>
  );
};

/**
 * The one judgement call this port leaves open, made comparable.
 *
 * 1500ms is not on the scale; 700 and 1800 are. So the question is not "how
 * long should it count" but "which band is a balance rising under a confetti
 * burst" — a response the interface owes, or a celebration it is staging.
 */
const COUNT_OPTIONS = [
  {
    key: 'A',
    label: '팩트챗 그대로',
    duration: 1500,
    delay: 1000,
    note: '1500 + 1000ms — 둘 다 스케일 밖',
    onScale: false,
  },
  {
    key: 'B',
    label: '축하 대역',
    duration: MOTION_DURATION_MS.celebrateFall,
    delay: MOTION_DURATION_MS.celebrateBurst,
    note: 'celebrate.fall + celebrate.burst — 둘 다 토큰',
    onScale: true,
  },
  {
    key: 'C',
    label: '응답 대역',
    duration: MOTION_DURATION_MS.slower,
    delay: 0,
    note: 'slower, 지연 없음 — 토큰이지만 대역이 다름',
    onScale: true,
  },
];

const CountUpLab = () => {
  const [run, setRun] = useState(0);

  return (
    <Stack gap={4}>
      <Button size="xs" variant="outline" onClick={() => setRun((r) => r + 1)}>
        셋 동시 재생
      </Button>

      <Stack gap={3}>
        {COUNT_OPTIONS.map((o) => (
          <Grid
            key={o.key}
            templateColumns={{ base: '1fr', md: '26px 110px 170px 1fr' }}
            gap={{ base: 1, md: 4 }}
            alignItems="baseline"
          >
            <Text
              fontFamily="mono"
              fontSize="sm"
              fontWeight="700"
              color={o.onScale ? 'primary.main' : 'fg.muted'}
              mb={0}
            >
              {o.key}
            </Text>
            <Text fontSize="sm" mb={0}>
              {o.label}
            </Text>
            <Text fontSize="xl" fontWeight="700" mb={0}>
              <CountUp
                key={`${o.key}-${run}`}
                from={1250}
                to={1750}
                durationMs={o.duration}
                delayMs={o.delay}
              />{' '}
              <Box as="span" fontSize="sm" fontWeight="400" color="fg.muted">
                크레딧
              </Box>
            </Text>
            <Subtext color="fg.muted" fontSize="2xs" mb={0}>
              {o.note}
            </Subtext>
          </Grid>
        ))}
      </Stack>
    </Stack>
  );
};

/* ------------------------------------------------------------------ story */

export const Cases: Story = {
  name: '보상 · 크레딧',
  render: () => (
    <Box p={10} maxW="1100px">
      <H2 mb={2}>팩트챗 보상·크레딧 연출</H2>
      <Text color="fg.muted" mb={4}>
        팩트챗의 축하 연출 두 개를 이 라이브러리의 스케일 위에 다시 올렸습니다.
        <b>대부분은 값이 그대로입니다</b> — 바뀐 건 기계장치이고, 그게 이 비교의
        요점입니다. 스케일이 실제로 무엇을 붙잡았고 어디가 비어 있었는지가
        아래에 나옵니다.
      </Text>

      <Box
        border="1px solid"
        borderColor="border.default"
        borderRadius="md"
        p={5}
        mb={8}
      >
        <Text fontWeight="700" mb={2}>
          세 줄 요약
        </Text>
        <Stack gap={2}>
          {[
            [
              'framer-motion이 필요한 건 하나도 없었습니다',
              '넷 다 CSS 키프레임 + 토큰으로 같은 동작이 납니다. 숫자 카운트업만 JS가 필요한데, 그건 애니메이션 라이브러리가 아니라 텍스트라서입니다.',
            ],
            [
              '값은 대부분 그대로입니다',
              '칩 비행 500ms, 팝 500ms + overshoot — 팩트챗이 쓰던 값이 이미 우리 토큰이었습니다. 우연이 아니라 두 스케일이 같은 뿌리라서입니다.',
            ],
            [
              '축하 대역이 비어 있었습니다',
              '스케일의 천장이 slower(700ms)였고 그 위는 루프뿐이었습니다. motion.celebrate를 추가했는데, loop처럼 두 값이 필요했습니다 — burst(900ms)는 제자리에서 튀는 것, fall(1800ms)은 컨테이너를 가로질러 떨어지는 것. 거리가 주기를 정하기 때문입니다.',
            ],
          ].map(([t, d]) => (
            <Box key={t}>
              <Text fontSize="sm" fontWeight="600" mb={0}>
                {t}
              </Text>
              <Subtext color="fg.muted" mb={0}>
                {d}
              </Subtext>
            </Box>
          ))}
        </Stack>
      </Box>

      <H3 mb={1}>① 코스 보상 — 칩이 잔액으로 날아간다</H3>
      <Subtext color="fg.muted" mb={2}>
        버튼을 누르면 비행 → 착지 → 팝 → 카운트업이 이어집니다. 각 단계는{' '}
        <code>onDone</code>으로 이어지지 손으로 잰 타이머가 아닙니다.
      </Subtext>
      <Box
        borderRadius="md"
        border="1px solid"
        borderColor="border.subtle"
        p={6}
        mb={2}
      >
        <RewardFlight />
      </Box>

      <Case
        n="1.1"
        title="FlyTo — 칩의 비행"
        tone="same"
        before={`<motion.div
  animate={{
    x: [0, dx * 0.5, dx],
    y: [0, dy * 0.5 - 46, dy],
    scale: [1, 0.92, 0.4],
    opacity: [1, 1, 0],
  }}
  transition={{
    duration: 500 / 1000,
    ease: MOTION_EASE.standard,
  }}
/>

// framer-motion + Portal`}
        after={`// keyframe이 세 지점을 갖고,
// 거리만 커스텀 속성으로 넘어갑니다
css={{
  '--fly-dx': '210px',
  '--fly-dy': '-64px',
  '--fly-lift': '46px',
}}

// FlyTo.styles.ts
animationName: 'fly-arc',
animationDuration: 'motion.slow',      // 500ms
animationTimingFunction: 'standard',`}
        verdict="타이밍·곡선·궤적 전부 동일합니다. 바뀐 건 JS가 매 프레임 좌표를 계산하던 걸 컴포지터가 하게 된 것뿐입니다. JS는 두 rect를 재는 데만 남습니다 — 그건 런타임에만 알 수 있으니까요."
        demo={
          <Subtext color="fg.muted" mb={0}>
            위 데모의 <b>미션 완료</b> 버튼
          </Subtext>
        }
      />

      <Case
        n="1.2"
        title="Pulse — 잔액이 튄다"
        tone="same"
        before={`useTriggerReplay(trigger, () =>
  controls.start({
    scale: [1, peak, 1],
    transition: {
      duration: MOTION_DURATION_S.slow,
      ease: MOTION_EASE.overshoot,
    },
  }),
);

// framer-motion useAnimationControls`}
        after={`// 이름이 바뀌면 애니메이션이 재시작합니다.
// 내용이 같은 keyframe 두 개를 번갈아 씁니다
animationName: play % 2 ? 'pulse-pop' : 'pulse-pop-alt',

// Pulse.styles.ts
animationDuration: 'motion.slow',      // 500ms
animationTimingFunction: 'overshoot',`}
        verdict="값 동일. 「명령형으로 다시 재생」이 애니메이션 라이브러리를 부르는 대표적인 이유인데, CSS에는 이미 방법이 있습니다 — animation-name이 바뀌면 재시작합니다. 처음에는 React key를 바꿔서 재생했고 그것도 재시작시키지만, subtree를 통째로 버리는 방식이라 안에 있던 포커스와 비제어 입력값을 함께 잃었습니다. 이름만 바꾸면 DOM은 그대로입니다."
        demo={
          <Pulse trigger={0} display="block">
            <Subtext color="fg.muted" mb={0}>
              위 데모의 잔액 숫자
            </Subtext>
          </Pulse>
        }
      />

      <Case
        n="1.3"
        title="ConfettiBurst — 코스 축하"
        tone="gap"
        before={`// courses/constants.ts
celebrate: 900,   // 스케일 밖 매직넘버

// ConfettiBurst.tsx
const CONFETTI_EASE =
  'cubic-bezier(0.2, 0.7, 0.3, 1)';
// "Local rather than a MOTION_EASE token:
//  confetti is the only thing in the app…"

animation: \`course-confetti 900ms
  \${CONFETTI_EASE} \${piece.delay}ms forwards\``}
        after={`// theme/motion.ts — 새 토큰
celebrate: {
  burst: { value: '900ms'  },   // 제자리 팝
  fall:  { value: '1800ms' },   // 컨테이너 횡단
},

// Confetti.styles.ts
animationName: 'confetti-fall',
animationDuration: 'calc(var(--…-celebrate-fall) * var(--confetti-rate))',
animationTimingFunction: 'linear',`}
        verdict="900ms에 이름을 줬습니다 — 스케일의 천장이 slower(700)였고 그 위는 루프뿐이라 축하가 갈 자리가 없었습니다. 다만 loop이 turn/sweep으로 갈리는 것과 같은 이유로 여기도 두 값이 필요했습니다: 코스 컨페티는 노드 근처에서 튀고(burst 900ms), 구매 컨페티는 모달 전체를 가로지릅니다(fall 1800ms) — 거리가 주기를 정합니다. 곡선은 linear: 낙하는 중력이라 감속하면 「떨어진다」가 아니라 「내려놓는다」로 읽힙니다. 팩트챗 주석도 자기 곡선이 어디에도 안 맞는다고 말하고 있었습니다."
        demo={
          <Subtext color="fg.muted" mb={0}>
            아래 ② 데모에 있음
          </Subtext>
        }
      />

      <H3 mt={12} mb={1}>
        ② 크레딧 구매 완료 — 체크 · 컨페티 · 잔액
      </H3>
      <Subtext color="fg.muted" mb={2}>
        여기가 ①보다 상태가 나빴습니다. ①은 최소한 값을 상수 파일에 모아뒀는데,
        이쪽은 JSX 안에 인라인 keyframes와 매직넘버였습니다.
      </Subtext>
      <Box
        borderRadius="md"
        border="1px solid"
        borderColor="border.subtle"
        p={6}
        mb={2}
      >
        <PurchaseCelebration />
      </Box>

      <Case
        n="2.1"
        title="성공 체크 팝"
        tone="changed"
        before={`css={{
  animation: \`\${keyframes({
    '0%':   { transform: 'scale(0)' },
    '50%':  { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  })} 0.6s ease-out\`,
}}

// JSX 안에 인라인 keyframes
// 600ms · ease-out — 둘 다 스케일 밖`}
        after={`<Pulse trigger={run} peak={1.15}>
  <Box …>✓</Box>
</Pulse>

// 500ms · overshoot`}
        verdict="600ms → 500ms, ease-out → overshoot. 100ms 차이는 눈에 안 보이고, 곡선은 오히려 나아집니다 — 1.1로 지나쳤다 돌아오는 건 overshoot이 하는 일 그 자체입니다. 그리고 이 연출은 ①의 잔액 팝과 같은 동작이었는데 서로 다른 코드였습니다. 이제 같은 컴포넌트입니다."
        demo={
          <Subtext color="fg.muted" mb={0}>
            위 ② 데모의 체크 원
          </Subtext>
        }
      />

      <Case
        n="2.2"
        title="Confetti — 구매 축하"
        tone="changed"
        before={`const newPieces = Array.from({ length: 50 }, () => ({
  left:     \`\${Math.random() * 100}%\`,
  delay:    \`\${Math.random() * 0.3}s\`,
  duration: \`\${2 + Math.random() * 1}s\`,   // 2~3초
  drift:    \`\${-50 + Math.random() * 100}px\`,
}));

// 시간이 조각마다 랜덤 →
// 같은 연출이 재생할 때마다 길이가 다름`}
        after={`// 배치도 랜덤, 속도도 랜덤 — 다만 토큰에 묶어서
left:  \`\${next() * 100}%\`
drift: \`\${…}px\`
spin:  '±720deg'                 // 방향만 랜덤, 크기는 고정
rate:  0.85 ~ 1.30               // ← 토큰의 배수
delay: 0 ~ motion.base(300ms)    // ← 랜덤, index 아님
size:  8~12 정사각 · 라운드 0     // 팔레트가 아닌 축제 6색

animationDuration:
  calc(motion.celebrate.fall * var(--confetti-rate))
// 1530~2340ms. 상한이 계산 가능합니다.`}
        verdict="여기를 세 번 망가뜨렸다가 고쳤습니다. ① 속도를 전부 같게 했더니 50개가 조각이 아니라 판때기로 읽혔습니다 — 실제 파편은 무게와 공기저항이 달라 속도가 절대 같지 않습니다. 지금은 토큰의 0.85~1.3배로, 다양하되 끝나는 시점은 계산됩니다. ② 지연을 index 순서로 줬는데 목록엔 맞아도 컨페티엔 순서가 없어서 웨이브로 읽혔습니다 — 지금은 motion.base 안에서 랜덤. ③ 색을 semantic 토큰(danger·warning·success)으로 골랐습니다. 「결제 완료」 화면에 에러 빨강이 쏟아지는 셈이었고, 팔레트 자체가 UI용이라 평균 명도 47%에 5색 중 3개가 파랑이라 차트 범례가 떨어지는 것처럼 보였습니다. 지금은 팩트챗의 축제 6색을 그대로 씁니다 — 이 라이브러리에서 유일하게 의도적으로 팔레트를 벗어난 자리입니다."
        demo={
          <Subtext color="fg.muted" mb={0}>
            위 ② 데모, 재생 버튼
          </Subtext>
        }
      />

      <Case
        n="2.3"
        title="CountUp — 잔액"
        tone="changed"
        before={`<CountUp
  from={previousBalance}
  to={currentBalance}
  durationMs={1500}
  delayMs={1000}
/>

// react-countup 의존성
// 1500 + 1000 = 2.5초`}
        after={`<CountUp
  from={previousBalance}
  to={balance}
  durationMs={MOTION_DURATION_MS.celebrateFall}   // 1800
  delayMs={MOTION_DURATION_MS.celebrateBurst}     // 900
/>

// 의존성 없음 — rAF + cubicBezier('emphasized')
// 기본값은 slower(700)이고, 축하 자리에서만 호출부가 올립니다.`}
        verdict="처음엔 700ms로 줄였는데, 그건 스케일이 강제한 게 아니라 제가 낸 의견이었습니다 — durationMs는 prop이라 1500도 그냥 됩니다. 진짜 질문은 「얼마나 오래」가 아니라 「어느 대역인가」였습니다. 1500은 스케일 위에 없고, 가까운 값은 slower(700)와 celebrate.fall(1800)입니다. 컨페티가 터지는 동안 올라가는 잔액은 인터페이스가 갚는 응답이 아니라 무대에 올린 축하이므로 축하 대역이 맞습니다 — 결과적으로 2.5초 → 2.7초로, 팩트챗 의도를 거의 그대로 두면서 두 값 다 토큰이 됐습니다. 컴포넌트 기본값은 slower(700)로 남깁니다: 관리자 KPI처럼 축하가 아닌 카운트업이 더 많습니다. 오른쪽에서 셋을 나란히 재생해 보세요."
        demo={<CountUpLab />}
      />

      <H3 mt={12} mb={2}>
        이 작업이 스케일에 남긴 것
      </H3>
      <Stack gap={3} mb={8}>
        {[
          [
            '토큰 2개 추가 · 팔레트 예외 1건',
            'motion.celebrate.burst(900ms) · fall(1800ms). 축하는 응답이 아니라 보여지는 것이라 응답 스케일의 천장(slower 700) 위에 있고, loop처럼 두 값인 이유는 거리가 주기를 정하기 때문입니다. 그리고 컨페티 색은 팔레트를 안 씁니다 — 시간 스케일에 축하 대역이 없었던 것처럼 색 스케일에도 「의미 없는 장식색」 칸이 없었고, semantic 토큰을 끌어다 쓰면 축하 화면에 에러 빨강이 내립니다.',
          ],
          [
            'keyframe 3개 추가',
            'pulse-pop · fly-arc · confetti-fall. 셋 다 중간 지점이 필요해서 transition으로는 표현이 안 됩니다 — 왕복, 궤적, 텀블링.',
          ],
          [
            'util 1개 추가',
            'cubicBezier(). JS가 값을 직접 보간해야 하는 것(숫자 카운트업, 캔버스)이 인터넷에서 easeOutCubic을 가져오지 않고 우리 곡선을 쓰게 합니다.',
          ],
          [
            'framer-motion 의존성 0',
            '넷 다 CSS로 났습니다. logician-ui에 framer-motion은 devDependency로만 있는데, 이 작업으로 peerDependency 승격이 필요 없어졌습니다.',
          ],
        ].map(([t, d]) => (
          <Box key={t}>
            <Text fontSize="sm" fontWeight="600" mb={0}>
              {t}
            </Text>
            <Subtext color="fg.muted" mb={0}>
              {d}
            </Subtext>
          </Box>
        ))}
      </Stack>

      <H3 mb={2}>아직 안 옮긴 것</H3>
      <Subtext color="fg.muted" mb={0}>
        코스 화면의 <code>COURSE_DURATION</code> 나머지 셋(
        <code>popover</code> 220 · <code>pathShift</code> 280 · <code>pop</code>{' '}
        520)은 여기 없습니다. 전부 우리 토큰의 10% 이내라 눈에 안 보이는 차이고,
        그건 <b>스케일 문제가 아니라 정리 작업</b>입니다 — 280→300 · 520→500 ·
        220→moderate로 바꾸면 끝입니다. 그리고 <code>PathPane</code>의 시퀀스
        간격 1200ms는 애니메이션이 아니라 <b>대기 시간</b>이라 모션 스케일에
        들어갈 값이 아닙니다.
      </Subtext>
    </Box>
  ),
};
