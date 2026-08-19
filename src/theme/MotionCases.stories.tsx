import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../components/Button';
import { Confetti } from '../components/Confetti';
import { CountUp } from '../components/CountUp';
import { FlyTo } from '../components/FlyTo';
import { Pulse } from '../components/Pulse';
import { H2, H3, Subtext, Text } from '../components/Typography';

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
          <CountUp key={run} from={1250} to={1250 + 500 * run} /> 크레딧
        </Text>
      </Box>
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
              '스케일의 천장이 slower(700ms)였고, 그 위는 루프뿐이었습니다. 컨페티가 갈 자리가 없어서 motion.celebrate(900ms)를 이번에 추가했습니다.',
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
        after={`// key가 바뀌면 새 요소 = 애니메이션 재생.
// stagger 프리셋이 재열림을 처리하는 방법과 같습니다
key={plays.current}

// Pulse.styles.ts
animationName: 'pulse-pop',
animationDuration: 'motion.slow',      // 500ms
animationTimingFunction: 'overshoot',`}
        verdict="값 동일. 「명령형으로 다시 재생」이 애니메이션 라이브러리를 부르는 대표적인 이유인데, CSS에는 이미 방법이 있습니다 — key가 바뀐 요소는 새 요소고, 새 요소는 애니메이션을 처음부터 돌립니다."
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
celebrate: { value: '900ms' },

// Confetti.styles.ts
animationName: 'confetti-fall',
animationDuration: 'motion.celebrate',
animationTimingFunction: 'linear',`}
        verdict="900ms는 그대로 두되 이름을 줬습니다 — 스케일의 천장이 slower(700)였고 그 위는 루프뿐이라, 축하가 갈 자리가 없었습니다. 곡선은 linear로 바꿨습니다: 낙하는 중력이라 감속하면 「떨어진다」가 아니라 「내려놓는다」로 읽힙니다. 팩트챗 주석도 자기 곡선이 어디에도 안 맞는다고 말하고 있었습니다."
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
        after={`// 랜덤은 배치에만, 시간에는 안 씁니다
left:  \`\${next() * 100}%\`      // 랜덤
drift: \`\${…}px\`                // 랜덤
spin:  \`\${…}deg\`               // 랜덤

animationDuration: 'motion.celebrate'  // 전부 900ms
animationDelay: i * 35ms (상한 있음)   // stagger.step`}
        verdict="가장 크게 바뀐 곳입니다. 2~3초 랜덤 → 900ms 고정 + 스태거. 조각마다 시간이 다르면 버스트 전체 길이가 재생마다 달라서, 뒤에 무엇도 이어 붙일 수 없습니다 — 정작 축하하려던 카운트업조차요. 랜덤은 「50개가 50개로 보이게」 하는 데 필요한 것이고, 그건 위치·회전·색이 이미 해줍니다."
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
        after={`<CountUp from={previousBalance} to={balance} />

// 기본값 motion.slower (700ms), delay 0
// rAF + cubicBezier('emphasized')
// — CSS가 썼을 곡선을 그대로 평가합니다`}
        verdict="2.5초 → 0.7초. 이건 실제로 보이는 변화이고, 판단이 필요한 유일한 항목입니다. 모달 헤딩이 이미 「결제가 완료되었습니다」라고 말한 뒤라 숫자는 이미 알려진 정보고, 700ms를 넘기면 「벌었다」가 아니라 「기다린다」로 읽힙니다. 위 데모에서 직접 보고 판단하세요."
        demo={
          <Subtext color="fg.muted" mb={0}>
            위 ② 데모의 크레딧 숫자
          </Subtext>
        }
      />

      <H3 mt={12} mb={2}>
        이 작업이 스케일에 남긴 것
      </H3>
      <Stack gap={3} mb={8}>
        {[
          [
            '토큰 1개 추가',
            'motion.celebrate = 900ms. 축하는 응답이 아니라 보여지는 것이라 응답 스케일의 천장(slower 700) 위에 있습니다. 랜덤 대신 고정값인 이유는 뒤에 무언가를 이어 붙일 수 있어야 하기 때문입니다.',
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
