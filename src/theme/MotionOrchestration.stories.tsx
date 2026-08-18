import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../components/Button';
import { Collapsible } from '../components/Collapsible';
import { FileList } from '../components/FileList';
import { Menu } from '../components/Menu';
import { Popover } from '../components/Popover';
import { ProgressBar } from '../components/ProgressBar';
import { SelectField } from '../components/Select';
import { Spinner } from '../components/Spinner';
import { Tooltip } from '../components/Tooltip';
import { H2, H3, Subtext, Text } from '../components/Typography';
import { staggerProps } from '../utils/staggerProps';
import { MOTION_DURATION_MS, MOTION_STAGGER_MAX } from './motion';

/**
 * # Motion — 상태 · 반복 · 순서
 *
 * `Theme/Motion`이 "한 요소가 한 번 움직일 때"를 다룬다면, 이 페이지는 나머지
 * 셋입니다.
 *
 * - **presence** — 열리고 닫히는 것. 들어올 때와 나갈 때가 같은 시간일 이유가
 *   없습니다.
 * - **loop** — 끝을 모르는 동안 계속 도는 것. 동작 줄이기가 `0ms`가 아닌
 *   유일한 자리입니다.
 * - **stagger** — 목록이 한 덩어리가 아니라 차례로 도착하는 것.
 */
const meta = {
  title: 'Theme/Motion Orchestration',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/* ------------------------------------------------------------------ shared */

const Section = ({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
}) => (
  <Box borderTop="1px solid" borderColor="border.subtle" py={7}>
    <H3 mb={1}>{title}</H3>
    <Subtext color="fg.muted" mb={4}>
      {lead}
    </Subtext>
    {children}
  </Box>
);

/* --------------------------------------------------------------- Part A */

/**
 * 같은 거리를 대칭(300/300)과 비대칭(300/150)으로 나란히 재생합니다.
 *
 * 한쪽만 보면 둘 다 멀쩡해 보이고, 같이 보면 대칭 쪽이 "안 사라진다"고
 * 느껴집니다 — 리뷰에서 판단해야 하는 건 그 차이 하나입니다.
 */
const RatioDemo = () => {
  const [open, setOpen] = useState(true);

  return (
    <Stack gap={4} maxW="440px">
      <Button size="xs" variant="outline" onClick={() => setOpen((v) => !v)}>
        {open ? '닫기' : '열기'}
      </Button>
      {[
        { label: '대칭 300 / 300', enter: 300, exit: 300 },
        { label: '비대칭 300 / 150 (presence)', enter: 300, exit: 150 },
      ].map((row) => (
        <Grid
          key={row.label}
          templateColumns="180px 1fr"
          gap={4}
          alignItems="center"
        >
          <Subtext color="fg.muted" mb={0}>
            {row.label}
          </Subtext>
          <Box h="44px" position="relative">
            <Box
              position="absolute"
              inset="0"
              borderRadius="md"
              bg="bg.subtle"
              border="1px solid"
              borderColor="border.subtle"
              opacity={open ? 1 : 0}
              translate={open ? '0 0' : '0 -6px'}
              transitionProperty="opacity, translate"
              transitionDuration={`${open ? row.enter : row.exit}ms`}
              transitionTimingFunction={
                open
                  ? 'var(--chakra-easings-emphasized)'
                  : 'var(--chakra-easings-standard)'
              }
            />
          </Box>
        </Grid>
      ))}
    </Stack>
  );
};

const SELECT_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: 'active' },
  { label: '검토 대기', value: 'review' },
  { label: '완료', value: 'done' },
];

/**
 * 정책이 붙은 파트들을 실물로.
 *
 * 숫자는 리뷰어가 눈으로 확인할 수 없으므로 각 파트가 **어디서 왔는지**를 함께
 * 적어 둡니다 — 전부 Chakra 기본값보다 진입이 길고 퇴장이 짧아졌습니다.
 */
export const Presence: Story = {
  name: 'A. presence (열림 · 닫힘)',
  render: () => (
    <Box p={10} maxW="1000px">
      <H2 mb={2}>presence</H2>
      <Text color="fg.muted" mb={6}>
        진입은 <b>읽혀야</b> 하고, 퇴장은 <b>이미 결정된 일</b>입니다. 그래서
        진입 300ms · <code>emphasized</code>, 퇴장 150ms · <code>standard</code>
        — 컴포넌트마다 정하는 취향이 아니라 하나의 정책이고, 테스트가 이걸
        강제합니다.
      </Text>

      <Section
        title="비율만 따로 보기"
        lead="같은 요소를 대칭과 비대칭으로 동시에 재생합니다."
      >
        <RatioDemo />
      </Section>

      <Section
        title="적용된 파트"
        lead="움직임(무엇이 움직이는지)은 각 recipe의 것이고, 이 프리셋은 시계만 바꿉니다 — 그래서 Collapsible의 높이 애니메이션이 페이드로 납작해지지 않습니다."
      >
        <Stack gap={5} maxW="620px">
          {[
            ['Menu', '150 / 100 → 300 / 150'],
            ['Popover', '150 / 100 → 300 / 150'],
            ['Tooltip', '150 / 150 → 300 / 150'],
            ['Select', '150 / 50 → 300 / 150'],
            ['Collapsible', '200 / 200 → 300 / 150'],
          ].map(([name, change]) => (
            <HStack key={name} gap={3} align="baseline">
              <Text fontFamily="mono" fontSize="sm" minW="110px" mb={0}>
                {name}
              </Text>
              <Subtext color="fg.muted" mb={0}>
                {change}
              </Subtext>
            </HStack>
          ))}

          <HStack gap={4} pt={2} wrap="wrap">
            <Menu>
              <Menu.Trigger asChild>
                <Button size="xs" variant="outline">
                  Menu
                </Button>
              </Menu.Trigger>
              <Menu.List>
                <Menu.Item value="a">이름 바꾸기</Menu.Item>
                <Menu.Item value="b">복제</Menu.Item>
                <Menu.Item value="c">삭제</Menu.Item>
              </Menu.List>
            </Menu>

            <Popover>
              <Popover.Trigger asChild>
                <Button size="xs" variant="outline">
                  Popover
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <Popover.Body>
                  <Subtext mb={0}>바깥을 클릭해 닫아 보세요.</Subtext>
                </Popover.Body>
              </Popover.Content>
            </Popover>

            <Tooltip content="가장 짧게 머무는 파트라 퇴장 시간이 가장 크게 체감됩니다">
              <Button size="xs" variant="outline">
                Tooltip
              </Button>
            </Tooltip>

            <Box minW="180px">
              <SelectField options={SELECT_OPTIONS} placeholder="Select" />
            </Box>
          </HStack>

          <Collapsible.Root>
            <Collapsible.Trigger>Collapsible</Collapsible.Trigger>
            <Collapsible.Content>
              <Subtext mb={0}>
                이 패널만 페이드가 아니라 높이가 늘어납니다. presence가
                animation-name을 정하지 않기 때문에 recipe의{' '}
                <code>expand-height</code>가 그대로 남습니다.
              </Subtext>
            </Collapsible.Content>
          </Collapsible.Root>
        </Stack>
      </Section>

      <Section
        title="빠진 것: Toast"
        lead="Chakra의 Toast는 keyframe이 아니라 transition 단축 속성으로 움직입니다. animation-* 시계를 얹으면 아무 일도 일어나지 않으므로, 조용히 적용된 척하는 대신 빼 두었습니다 — 다시 쓰려면 composite 쪽 결정입니다."
      >
        <Box />
      </Section>
    </Box>
  ),
};

/* --------------------------------------------------------------- Part B */

const LOOP_POLICY = [
  ['spin', '느려지되 계속 돈다', '작업이 살아 있다는 유일한 신호라서'],
  ['pulse', '멈춘다', '자리표시자라는 사실은 모양이 말한다'],
  [
    'shimmer',
    '멈추고 그라디언트도 걷는다',
    '멈춘 하이라이트는 얼룩으로 보인다',
  ],
  [
    'indeterminate',
    '막대가 선다',
    '가로로 계속 지나가는 것이 가장 위험한 움직임',
  ],
];

export const Loops: Story = {
  name: 'B. loop (계속 도는 것)',
  render: () => {
    const [animation, setAnimation] = useState<'shimmer' | 'pulse' | 'none'>(
      'shimmer'
    );

    return (
      <Box p={10} maxW="1000px">
        <H2 mb={2}>loop</H2>
        <Text color="fg.muted" mb={6}>
          끝나는 시점을 모르는 동안 계속 도는 움직임입니다.{' '}
          <code>animationIterationCount: infinite</code>가 붙고,{' '}
          <b>동작 줄이기가 duration 0이 아닌</b> 유일한 부류입니다 — 루프를
          0으로 만들면 요소가 주기 한가운데서 얼어붙거나(멈춘 스피너 = 죽은
          요청) 신호 자체가 사라집니다.
        </Text>

        <Section
          title="줄일 때 무엇이 남는가"
          lead="넷의 답이 서로 다릅니다. 각 프리셋의 _motionReduce 안에 들어 있고, 테스트가 넷 모두 분기를 가지고 있는지 확인합니다."
        >
          <Stack gap={2} maxW="720px">
            {LOOP_POLICY.map(([name, what, why]) => (
              <Grid
                key={name}
                templateColumns={{ base: '1fr', md: '130px 200px 1fr' }}
                gap={{ base: 1, md: 4 }}
                alignItems="baseline"
              >
                <Text fontFamily="mono" fontSize="sm" mb={0}>
                  {name}
                </Text>
                <Subtext mb={0}>{what}</Subtext>
                <Subtext color="fg.muted" mb={0}>
                  {why}
                </Subtext>
              </Grid>
            ))}
          </Stack>
          <Subtext color="fg.muted" mt={4} mb={0}>
            WCAG 2.2.2(일시정지 · 정지 · 숨기기)는 자동으로 시작해 5초 넘게 돌고
            다른 내용과 함께 놓이는 움직임을 다룹니다 — 느린 요청 동안의
            스켈레톤이 정확히 그것이고, 자리표시자에는 정지 버튼을 달 수 없으니
            <code>prefers-reduced-motion</code>에서 실제로 멈추는 것이 그 자리를
            지키는 방법입니다.
          </Subtext>
        </Section>

        <Section
          title="spin"
          lead={`0.65s 그대로, 다만 이제 토큰(motion.loop.turn)입니다. linear인 이유는 취향이 아닙니다 — 360°와 0°는 같은 위치라, 감속·가속이 붙으면 한 바퀴에 한 번 걸립니다.`}
        >
          <HStack gap={6}>
            <Spinner />
            <Spinner size="lg" />
          </HStack>
        </Section>

        <Section
          title="루프는 전역 어휘가 아닙니다"
          lead="쓰는 컴포넌트가 하나뿐인 모션은 그 컴포넌트 옆에 삽니다 — 고를 일이 없는 것을 고르는 목록에 두면 목록이 무거워지기만 합니다."
        >
          <Subtext color="fg.muted" mb={0}>
            <code>spin</code>은 <code>Spinner.styles.ts</code>,{' '}
            <code>indeterminate</code>는 <code>ProgressBar.styles.ts</code>에
            있습니다. 읽는 토큰(<code>motion.loop.*</code>)은 여전히 전역
            스케일이고, 지역인 것은 <b>조합</b>입니다. 두 번째 호출부가 생기는
            날이 전역으로 올릴 때입니다.
          </Subtext>
        </Section>

        <Section
          title="indeterminate — ProgressBar"
          lead="분모가 없을 때만. 0 → 60 → 100으로 튀는 막대도 얼마나 남았는지는 말해 주지만, 이건 '뭔가 되고 있다'만 말합니다."
        >
          <Stack gap={4} maxW="440px">
            <ProgressBar indeterminate />
            <ProgressBar value={62} />
            <Subtext color="fg.muted" mb={0}>
              위가 indeterminate, 아래가 값이 있는 막대입니다. 위쪽은{' '}
              <code>translate</code>로 움직여 레이아웃을 다시 계산하지 않습니다
              — 느린 요청 내내 도는 루프라 그 차이가 쌓입니다.
            </Subtext>
          </Stack>
        </Section>
      </Box>
    );
  },
};

/* --------------------------------------------------------------- Part C */

const FILES = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  name: `첨부파일-${i + 1}.pdf`,
  size: 1024 * (i + 1) * 37,
}));

/** 항목 수를 바꿔 가며, 상한이 있을 때와 없을 때를 나란히 재생합니다. */
const StaggerLab = () => {
  const [count, setCount] = useState(10);
  const [run, setRun] = useState(0);

  return (
    <Stack gap={4}>
      <HStack gap={2}>
        {[4, 10, 30].map((n) => (
          <Button
            key={n}
            size="xs"
            variant={count === n ? 'solid' : 'outline'}
            onClick={() => {
              setCount(n);
              setRun((r) => r + 1);
            }}
          >
            {n}개
          </Button>
        ))}
        <Button
          size="xs"
          variant="outline"
          onClick={() => setRun((r) => r + 1)}
        >
          다시 재생
        </Button>
      </HStack>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
        {[
          { label: `상한 있음 (${MOTION_STAGGER_MAX})`, max: undefined },
          { label: '상한 없음', max: 999 },
        ].map((col) => (
          <Stack key={col.label} gap={2}>
            <Subtext color="fg.muted" mb={0}>
              {col.label} — 마지막 항목{' '}
              {Math.min(count - 1, col.max ?? MOTION_STAGGER_MAX) *
                MOTION_DURATION_MS.staggerStep}
              ms
            </Subtext>
            <Stack key={run} gap="1px">
              {Array.from({ length: count }).map((_, i) => {
                const props = staggerProps(i);
                return (
                  <Box
                    key={i}
                    px={3}
                    py={2}
                    bg="bg.subtle"
                    borderRadius="sm"
                    fontSize="xs"
                    {...props}
                    style={
                      col.max == null
                        ? props.style
                        : { ...props.style, '--stagger-max': col.max }
                    }
                  >
                    항목 {i + 1}
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
};

export const Stagger: Story = {
  name: 'C. stagger (차례로 도착)',
  render: () => (
    <Box p={10} maxW="1000px">
      <H2 mb={2}>stagger</H2>
      <Text color="fg.muted" mb={6}>
        목록이 한 덩어리로 나타나는 대신 항목마다 조금씩 늦게 도착합니다. JS
        타이머도, framer-motion도 없습니다 — 항목마다 인라인으로 꽂는{' '}
        <code>--stagger-index</code> 하나와, 프리셋 안의 <code>calc()</code>{' '}
        하나가 전부입니다.
      </Text>

      <Section
        title="상한이 없으면 리듬이 아니라 대기열"
        lead="오른쪽이 상한을 뺀 쪽입니다. 30개에서 마지막 항목이 1초 넘게 늦게 도착하고, 그건 스태거가 아니라 그냥 느린 화면입니다."
      >
        <StaggerLab />
      </Section>

      <Section
        title="진입에만 걸려야 한다"
        lead="이 프리미티브의 유일한 실패 방식입니다."
      >
        <Stack gap={3} maxW="720px">
          <Subtext mb={0}>
            <code>transition-delay</code>가 아니라 <code>animation</code>인
            이유가 여기 있습니다. transition-delay는 그 요소의 <b>이후 모든</b>{' '}
            속성 변화에 걸리므로, hover 한 번에도 인덱스만큼 기다리고 필터 한
            글자마다 목록 전체가 다시 지연됩니다. animation은 마운트될 때 한 번
            돌고 끝나며, 그게 정확히 진입입니다.
          </Subtext>
          <Subtext mb={0}>
            닫혀도 DOM에 남는 파트(Ark의 Menu · Select)를 위해{' '}
            <code>[data-state=&quot;closed&quot;]</code>에서{' '}
            <code>animation-name</code>을 <code>none</code>으로 되돌립니다. 다시
            열리면 이름이 바뀌므로 애니메이션이 다시 돕니다 — CSS에 &quot;한 번
            더&quot;를 말하는 방법은 이것뿐입니다.
          </Subtext>
          <Subtext color="fg.muted" mb={0}>
            <code>Masonry</code>와 <code>Table</code>에는 붙이지 않습니다. 길고,
            가상 스크롤 후보이며(그러면 인덱스가 &quot;스크롤 창 안의
            위치&quot;가 되어 스크롤할 때마다 다시 도착합니다), 정렬을 바꾸면
            헤더를 누를 때마다 전체를 다시 깝니다.
          </Subtext>
        </Stack>
      </Section>

      <Section
        title="실제 호출부"
        lead="전부 opt-in입니다 — 목록이 짧고, 한 번 도착하고, 통째로 읽히는 곳에서만 값을 합니다."
      >
        <Stack gap={6} maxW="620px">
          <HStack gap={4} align="flex-start">
            <Menu>
              <Menu.Trigger asChild>
                <Button size="xs" variant="outline">
                  Menu stagger
                </Button>
              </Menu.Trigger>
              <Menu.List stagger>
                <Menu.Item value="a">이름 바꾸기</Menu.Item>
                <Menu.Item value="b">복제</Menu.Item>
                <Menu.Item value="c">이동</Menu.Item>
                <Menu.Item value="d">내보내기</Menu.Item>
                <Menu.Item value="e">삭제</Menu.Item>
              </Menu.List>
            </Menu>

            <Box minW="200px">
              <SelectField
                options={SELECT_OPTIONS}
                placeholder="Select stagger"
                stagger
              />
            </Box>
          </HStack>

          <Box>
            <Subtext color="fg.muted" mb={2}>
              FileList — &quot;더 보기&quot;로 드러나는 줄도 각자의 인덱스로
              도착합니다.
            </Subtext>
            <FileList files={FILES} visibleCount={3} stagger />
          </Box>

          <Subtext color="fg.muted" mb={0}>
            <code>ComboboxField</code>는 뺐습니다. 같은 목록이지만 필터 뒤에
            있어서 한 글자 칠 때마다 항목이 다시 마운트되고, 읽는 중인 결과를
            매번 다시 깔게 됩니다. Toast도 뺐습니다 — 하나씩 도착하는 것이라
            인덱스가 의미를 갖지 않고, 스택 오프셋을 Ark가 인라인으로
            관리합니다. Tree는 자식 구성이 호출부의 것이라 라이브러리가 인덱스를
            알 수 없습니다.
          </Subtext>
        </Stack>
      </Section>
    </Box>
  ),
};

/* ------------------------------------------------------------ governance */

/**
 * 어휘가 늘어나는 방식에 대한 규칙. 프리셋이 스무 개가 되면 프리셋이 없는 것과
 * 같습니다 — 고르는 비용이 직접 적는 비용을 넘어서기 때문입니다.
 */
export const Governance: Story = {
  name: '새 프리셋을 추가하기 전에',
  render: () => (
    <Box p={10} maxW="760px">
      <H2 mb={2}>새 프리셋을 추가하기 전에</H2>
      <Text color="fg.muted" mb={6}>
        <b>
          새 프리셋에는, 기존 어휘로 표현할 수 없는 실제 호출부가 둘 필요합니다.
        </b>{' '}
        하나뿐이라면 그건 프리셋이 아니라 그 컴포넌트의 사정이고,{' '}
        <code>composite</code>가 그 자리를 위해 있습니다.
      </Text>

      <Stack gap={3} mb={8}>
        {[
          [
            '호출부가 둘 이상인가',
            'Spinner 하나만 쓰는 회전이면 Spinner 안에 두세요 — spin이 실제로 그렇게 내려갔습니다. presence가 프리셋인 건 메뉴·팝오버·툴팁·셀렉트·콜랩시블 다섯이 같은 시계를 나눠 갖기 때문입니다.',
          ],
          [
            '기존 어휘로 정말 안 되는가',
            'duration과 곡선만 다른 것이라면 새 프리셋이 아니라 기존 프리셋 + 호출부의 transitionProperty입니다.',
          ],
          [
            '동작 줄이기에서 무엇이 남는가',
            '답이 없으면 아직 프리셋이 아닙니다. 루프라면 특히 — duration 0은 답이 아닙니다.',
          ],
          [
            '테스트가 그 정책을 강제하는가',
            '_open이 있으면 _closed도 있어야 하고, 그 _closed가 더 짧아야 합니다. 컴포넌트로 내려간 모션도 동작 줄이기 분기를 갖고 있어야 합니다. 셋 다 이미 CI가 봅니다.',
          ],
          [
            '이름을 하나만 쓰고 있는가',
            'animationStyle은 한 번에 이름 하나입니다. 배열이나 객체를 주면 두 모션이 겹치는 게 아니라 반응형 브레이크포인트로 읽힙니다 — 모바일은 이것, 데스크톱은 저것. 타입이 못 잡아서(Chakra가 AnyString으로 열어둠) lint가 잡습니다.',
          ],
        ].map(([q, a]) => (
          <Box key={q}>
            <Text fontWeight="600" mb={1}>
              {q}
            </Text>
            <Subtext color="fg.muted" mb={0}>
              {a}
            </Subtext>
          </Box>
        ))}
      </Stack>

      <H2 mb={2} mt={4}>
        둘을 같이 써야 한다면
      </H2>
      <Text color="fg.muted" mb={4}>
        <code>animationStyle</code> 슬롯은 하나뿐이라 이름은 한 번에 하나입니다.
        그렇다고 요소가 한 가지만 할 수 있는 건 아닙니다 —{' '}
        <b>transition과 animation은 서로 다른 CSS 속성</b>이라 겹치지 않고 같이
        돕니다. 프리셋으로 하나를 고르고, 나머지는 그냥 적으세요.
      </Text>

      <Box
        as="pre"
        bg="bg.muted"
        p={4}
        borderRadius="md"
        fontSize="xs"
        overflowX="auto"
        mb={4}
      >
        {`<Box
  animationStyle="presence"          // 열림·닫힘 시계 (animation-*)
  transitionProperty="opacity"       // 그와 별개로 도는 전환 (transition-*)
  transitionDuration="fast"
/>`}
      </Box>

      <Subtext color="fg.muted" mb={6}>
        Chakra 자신이 이렇게 씁니다: 메뉴 레시피가 <code>animationStyle</code>로
        움직임 <b>이름</b>을 고르고 <code>animationDuration</code>으로{' '}
        <b>시계</b>를 따로 붙입니다. 우리 <code>presence</code>는 그 반대로
        시계만 주기 때문에, 레시피가 정한 이름을 덮지 않고 여섯 부품에 동시에
        앉을 수 있습니다.
      </Subtext>

      <Subtext color="fg.muted" mb={0}>
        빼는 것도 같은 규칙입니다. 호출부가 하나로 줄어든 프리셋은 그 컴포넌트로
        돌려보내세요.
      </Subtext>
    </Box>
  ),
};
