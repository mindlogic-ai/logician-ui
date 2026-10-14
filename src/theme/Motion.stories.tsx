import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Appear } from '../components/Appear';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Collapsible } from '../components/Collapsible';
import { CountUp } from '../components/CountUp';
import { FileList } from '../components/FileList';
import { Menu } from '../components/Menu';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '../components/Modal';
import { Popover } from '../components/Popover';
import { Pulse } from '../components/Pulse';
import { Reveal } from '../components/Reveal';
import { SelectField } from '../components/Select';
import { Shake } from '../components/Shake';
import { Switch } from '../components/Switch';
import { Tooltip } from '../components/Tooltip';
import { H2, H3, Subtext, Text } from '../components/Typography';
import { staggerProps } from '../utils/staggerProps';
import {
  MOTION_DURATION_MS,
  MOTION_EASE_CSS,
  MOTION_STAGGER_MAX,
} from './motion';

/**
 * # Motion
 *
 * Three stories, in the order you need them:
 *
 * 1. **고르기** — building a component. Which name to type. Nearly always this one.
 * 2. **스케일** — the raw durations and curves. Only for framer-motion, a
 *    keyframe string, or defining a new preset.
 * 3. **규칙** — adding to or removing from the vocabulary.
 *
 * They were two pages until the loops moved out to their own components; what
 * was left of the second page was three preset rows, which belong next to the
 * other four.
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

/**
 * A closed-by-default block of reasoning.
 *
 * The "why" is what makes a decision defensible in review and what makes this
 * page unreadable if it is inline. Native `<details>` rather than a component
 * so the browser handles the state, the keyboard and find-in-page.
 */
const Detail = ({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) => (
  <Box
    as="details"
    borderTop="1px solid"
    borderColor="border.subtle"
    pt={3}
    mt={3}
  >
    <Box
      as="summary"
      cursor="pointer"
      fontSize="xs"
      color="fg.muted"
      _hover={{ color: 'fg.default' }}
      animationStyle="feedback"
      transitionProperty="color"
    >
      {summary}
    </Box>
    <Box pt={3}>{children}</Box>
  </Box>
);

/* ------------------------------------------------------ story 1: 고르기 */

/**
 * The whole vocabulary, in the order you would meet it.
 *
 * One row is one decision: the situation on the left is what a person actually
 * has in front of them, and everything to its right follows from picking that
 * row. There is no branch below the table — if a row matches, the line beside it
 * is the answer.
 */
const VOCAB = [
  {
    when: '색 · 그림자 · 투명도가 바뀐다',
    name: 'feedback',
    line: 'animationStyle="feedback" transitionProperty="background-color"',
  },
  {
    when: '손가락이 닿는다 (누르는 느낌)',
    name: 'press',
    line: 'animationStyle="press" _active={{ scale: \'0.94\' }}',
  },
  {
    when: '위치 · 크기가 새 값으로 간다',
    name: 'travel',
    line: 'animationStyle="travel" transitionProperty="width"',
  },
  {
    when: '물리적으로 넘어가거나, 둘이 교차한다',
    name: 'spring',
    line: 'animationStyle="spring" transitionProperty="translate"',
  },
  {
    when: '열리고 닫힌다',
    name: 'presence',
    line: 'animationStyle="presence"',
  },
  {
    when: '목록이 차례로 도착한다',
    name: 'stagger',
    line: '{...staggerProps(index)}',
  },
  {
    when: '한 요소 안에서 속성마다 속도가 다르다',
    name: 'composite',
    line: 'transition={직접조립} animationStyle="composite"',
  },
];

/**
 * A track with a dot that runs end to end, so a curve reads as travel.
 *
 * Both runners share one piece of state — pressing either sends both dots at
 * once, which is the only way to see that `emphasized` and `overshoot` differ
 * over this distance.
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
 * The same element played symmetric and asymmetric at once.
 *
 * One at a time they both look fine; side by side the symmetric one reads as
 * "not leaving". That difference is the entire argument for the ratio.
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

const FILES = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  name: `첨부파일-${i + 1}.pdf`,
  size: 1024 * (i + 1) * 37,
}));

/** Item count against the cap, so "no cap" reads as a queue rather than rhythm. */
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

interface PresetProps {
  name: string;
  timing: string;
  lead: string;
  code: string;
  demo: React.ReactNode;
  children?: React.ReactNode;
}

/** One preset: name, timing, a one-line reason, the line to copy, and a demo. */
const Preset = ({ name, timing, lead, code, demo, children }: PresetProps) => (
  <Box borderTop="1px solid" borderColor="border.subtle" py={6}>
    <HStack gap={3} align="baseline" mb={3}>
      <Text fontFamily="mono" fontWeight="700" fontSize="lg" mb={0}>
        {name}
      </Text>
      <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mb={0}>
        {timing}
      </Subtext>
    </HStack>

    <Grid
      templateColumns={{ base: '1fr', lg: '280px 1fr' }}
      gap={{ base: 4, lg: 8 }}
      alignItems="start"
    >
      <Box minH="44px" display="flex" alignItems="center">
        {demo}
      </Box>
      <Stack gap={2}>
        <Subtext mb={0}>{lead}</Subtext>
        <Code>{code}</Code>
        {children}
      </Stack>
    </Grid>
  </Box>
);

/**
 * The eight primitives, named and findable.
 *
 * This page used to close by pointing at "여덟 개" in prose, without naming one
 * of them — so someone who needed `Pulse` could read the whole page, agree with
 * it, and still hand-roll the thing with `composite`. A name you cannot grep for
 * is not a pointer.
 *
 * Four of them replay live here because they fit on one line. The other four are
 * not stubs to fill in later: `Reveal` needs a block to open into, `FlyTo` needs
 * two measured rects, `Confetti` needs a stage, and `SwapTransition` needs a
 * sequence. Each has its own story with room for that — repeating those demos
 * here would make this page longer without making it more useful.
 */
const PRIMITIVES: [string, string, boolean][] = [
  ['Pulse', '값이 방금 올랐다 — 한 번 튀기고 만다', true],
  ['Shake', '거절. Pulse와 짝이고, 절대 바꿔 쓰지 않습니다', true],
  ['Appear', '요소 하나가 마운트되며 등장 (페이드 · 스탬프 · 도착)', true],
  ['CountUp', '숫자가 올라감. 텍스트라 CSS로는 불가능한 유일한 것', true],
  ['Reveal', '읽던 것 아래로 블록이 펼쳐짐 — 레이아웃 점프 방지', false],
  ['FlyTo', '이게 저기로 갔다. 잰 rect 두 개 사이를 나는 고스트', false],
  ['Confetti', '축하 한 번. 유일하게 팔레트 밖 색을 씁니다', false],
  ['SwapTransition', '내용이 교체됨 — 단계 이동, 같은 자리의 다른 레코드', false],
];

const PrimitiveIndex = () => {
  const [play, setPlay] = useState(0);
  const [shown, setShown] = useState(false);

  return (
    <Box borderTop="1px solid" borderColor="border.subtle" pt={5}>
      <HStack gap={3} mb={5} align="center">
        <Button size="xs" variant="outline" onClick={() => setPlay((n) => n + 1)}>
          재생
        </Button>
        <Pulse trigger={play}>
          <Badge variant="success">Pulse</Badge>
        </Pulse>
        <Shake trigger={play}>
          <Chip colorScheme="danger" variant="soft">
            Shake
          </Chip>
        </Shake>
        {/* Keyed so it remounts — Appear plays on mount, which is the point. */}
        <Appear key={play} scaleFrom={0.6}>
          <Chip colorScheme="primary" variant="soft">
            Appear
          </Chip>
        </Appear>
        {/* No `format` — the default `groupDigits` rounds and groups. Passing a
            bare `${n}` here rendered mid-flight values like `1180.00698…`. */}
        <CountUp key={`c${play}`} from={0} to={1250} />
      </HStack>

      <Stack gap={2}>
        {PRIMITIVES.map(([name, use, live]) => (
          <Grid
            key={name}
            templateColumns={{ base: '1fr', md: '150px 1fr' }}
            gap={{ base: 0, md: 4 }}
            alignItems="baseline"
          >
            <Text
              fontFamily="mono"
              fontSize="xs"
              fontWeight="600"
              color={live ? 'fg.default' : 'fg.muted'}
              mb={0}
            >
              {name}
            </Text>
            <Subtext color="fg.muted" mb={0}>
              {use}
            </Subtext>
          </Grid>
        ))}
      </Stack>

      <Box mt={5}>
        <Button
          size="xs"
          variant="outline"
          onClick={() => setShown((v) => !v)}
          mb={shown ? 2 : 0}
        >
          {shown ? 'Reveal 닫기' : 'Reveal 열어보기'}
        </Button>
        {shown && (
          <Reveal>
            <Subtext color="fg.muted" mb={0}>
              여덟 개 전부 <code>Components / Motion</code> 아래에 각자 스토리가
              있습니다. 어느 것을 쓸지는 <code>Appear</code>의 TSDoc에 있는 세
              가지 등장(<code>presence</code> · <code>stagger</code> ·{' '}
              <code>Appear</code>) 구분이 출발점입니다.
            </Subtext>
          </Reveal>
        )}
      </Box>
    </Box>
  );
};

/**
 * What to type.
 *
 * The table comes before the explanation on purpose: the reader arrives holding
 * a component, not a question about motion theory. Everything below the table is
 * for the second visit.
 */
export const Choose: Story = {
  name: '1. 고르기',
  render: () => {
    const [at, setAt] = useState(false);
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
        <Text color="fg.muted" mb={6}>
          숫자를 직접 적을 일은 없습니다. <b>이름 하나를 고르는 것</b>이
          전부이고, 그 이름이 시간과 곡선과 동작 줄이기를 함께 가져옵니다.
        </Text>

        {/* The three roles, kept as one visual unit so they can be recalled as
            one. Everything else on this page is an instance of this.

            Three rather than two because the two-prop version keeps producing
            the same misreading — that the preset is "applied to hover". It is
            not: a transition never sees the hover. It sees a property changing
            and decides how long that takes. Naming the cause as its own row is
            what separates those. */}
        <Box
          border="1px solid"
          borderColor="border.default"
          borderRadius="md"
          p={5}
          mb={10}
        >
          <Stack gap={4} mb={5}>
            {[
              {
                role: '무엇이',
                prop: 'transitionProperty="background-color"',
                means: 'background-color가',
                accent: false,
              },
              {
                role: '어떻게',
                prop: 'animationStyle="feedback"',
                means: '150ms · standard 곡선으로 부드럽게',
                accent: true,
              },
              {
                role: '언제',
                prop: "_hover={{ bg: 'primary.lightest' }}",
                means: 'hover하면 값이 바뀐다',
                accent: false,
              },
            ].map(({ role, prop, means, accent }) => (
              <Grid
                key={role}
                templateColumns={{ base: '1fr', md: '58px 1fr' }}
                gap={{ base: 1, md: 4 }}
                alignItems="baseline"
              >
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="fg.muted"
                  mb={0}
                  flexShrink={0}
                >
                  {role}
                </Text>
                <Box>
                  <Text
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="600"
                    color={accent ? 'primary.main' : 'fg.default'}
                    mb={0}
                  >
                    {prop}
                  </Text>
                  <Subtext color="fg.muted" mb={0}>
                    {means}
                  </Subtext>
                </Box>
              </Grid>
            ))}
          </Stack>

          <Code>{`<Box
  transitionProperty="background-color"
  animationStyle="feedback"
  _hover={{ bg: 'primary.lightest' }}
/>`}</Code>

          <Subtext color="fg.muted" mt={4} mb={2}>
            <b>프리셋은 hover에 붙는 게 아니라 background-color에 붙습니다.</b>{' '}
            transition은 hover를 모릅니다 — &quot;background-color가 바뀌면
            150ms에 걸쳐 바꿔라&quot;가 전부고, 값을 바꾼 게 hover든{' '}
            <code>_focus</code>든 prop이든 상관하지 않습니다.{' '}
            <code>_hover</code>를 <code>_focus</code>로 바꿔도 똑같이 돕니다.
          </Subtext>
          <Subtext color="fg.muted" mb={0}>
            <b>&quot;무엇이&quot;를 빠뜨리면 아무것도 움직이지 않습니다</b> —
            프리셋은 시간만 정하고, 무엇이 움직이는지는 요소마다 다르기
            때문입니다. (<code>press</code>와 <code>presence</code>는 예외 —
            각각 언제나 scale, 언제나 열림·닫힘이라 기본값이 들어 있습니다.)
          </Subtext>
        </Box>

        <H3 mb={1}>무엇이 바뀌나요?</H3>
        <Subtext color="fg.muted" mb={4}>
          왼쪽에서 지금 만드는 것을 찾고, 오른쪽 줄을 눌러 복사하세요. 어휘는 이
          일곱 개가 전부입니다.
        </Subtext>

        <Stack gap={3} mb={4}>
          {VOCAB.map((v) => (
            <Grid
              key={v.name}
              templateColumns={{ base: '1fr', md: '230px 108px 1fr' }}
              gap={{ base: 1, md: 4 }}
              alignItems="center"
            >
              <Subtext color="fg.muted" mb={0}>
                {v.when}
              </Subtext>
              <Text
                fontFamily="mono"
                fontSize="sm"
                fontWeight="700"
                color="primary.main"
                mb={0}
              >
                {v.name}
              </Text>
              <Code>{v.line}</Code>
            </Grid>
          ))}
        </Stack>

        <Subtext color="fg.muted" mb={10}>
          <b>고민되면 feedback을 쓰세요.</b> 가장 눈에 띄지 않아서 틀렸을 때
          손해가 가장 작습니다.
        </Subtext>

        <H3 mb={2}>직접 만져보기</H3>
        <Subtext color="fg.muted" mb={0}>
          위 표의 순서 그대로입니다. 각 항목의 &quot;왜&quot;는 접어 두었습니다
          — 리뷰에서 근거가 필요할 때만 펴면 됩니다.
        </Subtext>

        <Preset
          name="feedback"
          timing="150ms · standard"
          lead="hover와 상태 변화. 방금 한 행동에 답하고 바로 비켜야 하므로 넷 중 가장 짧습니다."
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
        >
          <Detail summary="왜 150ms인가 — 그리고 왜 우리 토큰이 아닌가">
            <Subtext color="fg.muted" mb={0}>
              Chakra의 <code>fast</code>가 이미 150ms입니다. 같은 값에 이름을 둘
              만들지 않으려고 우리 스케일에는 150ms·200ms가 아예 없습니다.{' '}
              <code>motion.</code> 접두어가 붙은 것만 우리 것입니다.
            </Subtext>
          </Detail>
        </Preset>

        <Preset
          name="press"
          timing="120ms · standard"
          lead="포인터가 눌리는 순간의 접촉감. 유일하게 property를 안 적어도 되는 프리셋입니다 — 프레스는 언제나 scale이라 기본값이 들어 있습니다."
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
        >
          <Detail summary="왜 transform이 아니라 scale인가">
            <Subtext color="fg.muted" mb={0}>
              <code>scale</code>은 개별 transform 속성이라 호출부의{' '}
              <code>transform</code>과 겹쳐 씁니다.{' '}
              <code>transform: scale()</code>로 적었다면 버튼을 2px 내리는
              코드가 프레스를 통째로 지웠을 겁니다.
            </Subtext>
          </Detail>
        </Preset>

        <Preset
          name="travel"
          timing="300ms · emphasized"
          lead="새 위치나 크기로 이동. 거리 대부분을 먼저 덮고 마지막에 자리를 잡아서, 이미 바뀐 값을 따라잡는 것처럼 읽힙니다."
          code={`<Progress.Range animationStyle="travel" transitionProperty="width" />`}
          demo={<Runner style="travel" at={at} onPlay={play} />}
        />

        <Preset
          name="spring"
          timing="300ms · overshoot"
          lead="물리적인 전환, 또는 두 요소의 교차. 목표를 지나쳤다 돌아오므로 몇 px만 움직여도 눈에 보입니다 — 위 travel과 나란히 재생해 보세요."
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
        >
          <Detail summary="travel과 spring을 어떻게 구분하나">
            <Subtext color="fg.muted" mb={0}>
              같은 300ms이고 곡선만 다릅니다. 짧은 거리에서는{' '}
              <code>standard</code>와 <code>emphasized</code>가 눈으로 구분되지
              않지만 <code>overshoot</code>는 거리와 무관하게 보입니다 — 그래서
              &quot;움직인 게 보여야 하는가&quot;가 실질적인 기준입니다.
            </Subtext>
          </Detail>
        </Preset>

        <Preset
          name="presence"
          timing="진입 300ms · emphasized / 퇴장 150ms · standard"
          lead="열리고 닫히는 모든 것. 진입은 읽혀야 하고 퇴장은 이미 결정된 일이라 절반입니다. Menu · Popover · Tooltip · Select · Collapsible · Modal 여섯이 이 하나를 나눠 씁니다."
          code={`<Menu.List animationStyle="presence" />

// 무엇이 움직이는지는 각 recipe의 것이고, presence는 시계만 바꿉니다 —
// 그래서 Collapsible은 페이드가 아니라 여전히 높이가 늘어납니다.`}
          demo={<ModalDemo />}
        >
          <Detail summary="비대칭을 눈으로 확인하기 (대칭과 나란히 재생)">
            <RatioDemo />
          </Detail>
          <Detail summary="적용된 여섯 부품 — 만져보기">
            <Stack gap={4}>
              <Stack gap={1}>
                {[
                  ['Menu', '150 / 100 → 300 / 150'],
                  ['Popover', '150 / 100 → 300 / 150'],
                  ['Tooltip', '150 / 150 → 300 / 150'],
                  ['Select', '150 / 50 → 300 / 150'],
                  ['Collapsible', '200 / 200 → 300 / 150'],
                  ['Modal', '자체 keyframe + presence 시계'],
                ].map(([name, change]) => (
                  <HStack key={name} gap={3} align="baseline">
                    <Text fontFamily="mono" fontSize="xs" minW="100px" mb={0}>
                      {name}
                    </Text>
                    <Subtext color="fg.muted" fontSize="2xs" mb={0}>
                      {change}
                    </Subtext>
                  </HStack>
                ))}
              </Stack>

              <HStack gap={4} wrap="wrap">
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
          </Detail>
          <Detail summary="Toast는 왜 빠졌나">
            <Subtext color="fg.muted" mb={0}>
              Chakra의 Toast는 keyframe이 아니라 transition 단축 속성으로
              움직입니다. <code>animation-*</code> 시계를 얹어도 아무 일이
              일어나지 않으므로, 적용된 척하는 대신 빼 두었습니다.
            </Subtext>
          </Detail>
        </Preset>

        <Preset
          name="stagger"
          timing="항목당 35ms · 최대 6칸 · 진입에만"
          lead="목록이 한 덩어리 대신 차례로 도착합니다. JS 타이머도 framer-motion도 없습니다 — 항목마다 꽂는 인덱스 하나와 프리셋 안의 calc() 하나가 전부입니다."
          code={`{options.map((option, i) => (
  <Select.Item key={option.value} item={option} {...staggerProps(i)} />
))}`}
          demo={
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
          }
        >
          <Detail summary="상한이 왜 필요한가 (항목 수를 바꿔가며)">
            <StaggerLab />
            <Subtext color="fg.muted" mt={4} mb={0}>
              오른쪽이 상한을 뺀 쪽입니다. 30개에서 마지막 항목이 1초 넘게 늦게
              도착하고, 그건 리듬이 아니라 그냥 느린 화면입니다.
            </Subtext>
          </Detail>
          <Detail summary="왜 transition-delay가 아니라 animation인가">
            <Subtext mb={3}>
              <code>transition-delay</code>는 그 요소의 <b>이후 모든</b> 속성
              변화에 걸립니다 — hover 한 번에도 인덱스만큼 기다리고, 필터 한
              글자마다 목록 전체가 다시 지연됩니다. <code>animation</code>은
              마운트될 때 한 번 돌고 끝나며, 그게 정확히 진입입니다.
            </Subtext>
            <Subtext color="fg.muted" mb={0}>
              <code>Masonry</code> · <code>Table</code> · <code>Combobox</code>{' '}
              · <code>Toast</code>에는 붙이지 않습니다. 길거나, 가상 스크롤
              후보이거나(인덱스가 &quot;스크롤 창 안의 위치&quot;가 됩니다),
              필터·정렬로 매번 다시 마운트되는 목록이기 때문입니다.
            </Subtext>
          </Detail>
          <Detail summary="실제 호출부 — FileList">
            <FileList files={FILES} visibleCount={3} stagger />
            <Subtext color="fg.muted" mt={3} mb={0}>
              전부 opt-in입니다. &quot;더 보기&quot;로 드러나는 줄도 각자의
              인덱스로 도착합니다.
            </Subtext>
          </Detail>
        </Preset>

        <Preset
          name="composite"
          timing="직접 조립 + 동작 줄이기 가드"
          lead="한 요소 안에서 속성마다 다른 속도가 필요할 때만. Button은 프레스가 120ms인데 색은 150ms라 duration 하나로 표현이 안 됩니다. composite가 주는 것은 동작 줄이기 가드 하나뿐이고, 값은 반드시 토큰 var()로 적으세요."
          code={`// Button.styles.ts
export const buttonTransition = [
  'scale            var(--chakra-durations-motion-press) var(--chakra-easings-standard)',
  'background-color var(--chakra-durations-fast)         var(--chakra-easings-standard)',
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
        >
          <Detail summary="여기 오기 전에 확인할 것">
            <Subtext color="fg.muted" mb={0}>
              속도가 정말 <b>속성마다</b> 달라야 하는지 먼저 보세요. 하나면 위
              여섯 중 하나입니다. composite는 어휘의 탈출구이지 일곱 번째
              선택지가 아닙니다.
            </Subtext>
          </Detail>
        </Preset>

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
              ❌ property를 빠뜨리기 — 아무것도 움직이지 않습니다{' '}
              <b>(lint가 잡습니다)</b>
            </Subtext>
            <Code>{`<Box animationStyle="feedback" />`}</Code>
          </Box>
          <Box>
            <Subtext color="danger.main" mb={1}>
              ❌ 이름을 두 개 주기 — 겹치는 게 아니라 반응형 브레이크포인트로
              읽힙니다 (모바일은 travel, 데스크톱은 spring){' '}
              <b>(lint가 잡습니다)</b>
            </Subtext>
            <Code>{`<Box animationStyle={['travel', 'spring']} />`}</Code>
          </Box>
          <Box>
            <Subtext color="success.main" mb={1}>
              ✅ 이름 하나 + 무엇이 움직이는지
            </Subtext>
            <Code>{`<Box animationStyle="feedback" transitionProperty="opacity" />`}</Code>
          </Box>
        </Stack>

        <Subtext color="fg.muted" mb={10}>
          <b>타입은 이 셋 중 아무것도 못 잡습니다.</b> Chakra가{' '}
          <code>animationStyle</code>을 <code>AnyString</code>으로 열어 두었고,{' '}
          <code>transitionProperty</code>는 별개의 optional prop이라 하나가 다른
          하나를 요구하게 만들려면 Chakra 컴포넌트 타입을 전부 포크해야 합니다.
          그래서 lint 규칙 셋(오타 · 이름 두 개 · property 누락)이 있고,{' '}
          <code>motionGuards.test.ts</code>가 그 규칙들이 아직 살아 있는지
          확인합니다. 다만 lint는 <b>JSX만</b> 봅니다 — <code>.styles.ts</code>{' '}
          안의 스타일 객체는 사각지대입니다.
        </Subtext>

        <H3 mb={2}>따로 챙기지 않아도 되는 것</H3>
        <Text color="fg.muted" mb={10}>
          <b>동작 줄이기</b>는 프리셋 안에 들어 있습니다. OS에서{' '}
          <code>prefers-reduced-motion</code>을 켠 사람에게는 duration이
          자동으로 <code>0ms</code>가 됩니다 — 스위치는 여전히 켜지고 색도
          여전히 바뀌며, 이동만 사라집니다. 컴포넌트마다 적을 필요가 없습니다.
        </Text>

        <H3 mb={2}>여기 없는 것</H3>
        <Text color="fg.muted" mb={0}>
          <b>계속 도는 것</b>(스피너 회전, indeterminate 막대)은 프리셋이
          아닙니다 — 쓰는 컴포넌트가 하나뿐이라 그 컴포넌트 옆에 삽니다(
          <code>Spinner.styles.ts</code> · <code>ProgressBar.styles.ts</code>).
          체크마크 그리기, 라디오 점, 세그먼트 인디케이터도 마찬가지입니다.
          기준과 그 이유는 <b>3. 규칙</b>에 있습니다.
        </Text>
        <Text color="fg.muted" mb={4}>
          한 번 튀기·흔들기·등장·펼치기처럼 <b>컴포넌트로 감싸야 하는 모션</b>도
          프리셋이 아닙니다. 프리셋은 <b>이미 있는 요소</b>에 시계를 얹는
          것이고, 아래 여덟 개는 요소를 <b>만들어 내거나 붙잡아 두는</b> 것이라
          컴포넌트여야 합니다 — <code>animationStyle</code>로는 표현할 자리가
          없습니다.
        </Text>
        <PrimitiveIndex />
      </Box>
    );
  },
};

/* ------------------------------------------------------ story 2: 스케일 */

const OURS = [
  {
    name: 'motion.instant',
    ms: 0,
    use: '동작 줄이기가 넣는 값. 직접 쓸 일은 없습니다',
  },
  {
    name: 'motion.beat',
    ms: 60,
    use: '한 동작을 두 박자로 나누는 간격 (체크마크 · 라디오 점)',
  },
  { name: 'motion.press', ms: 120, use: 'press 프리셋이 씁니다' },
  { name: 'motion.base', ms: 300, use: 'travel · spring · presence 진입' },
  { name: 'motion.slow', ms: 500, use: '화면을 가로지르는 이동 (프리셋 없음)' },
  { name: 'motion.slower', ms: 700, use: '카운트업 (프리셋 없음)' },
  {
    name: 'motion.stagger.step',
    ms: 35,
    use: '목록 항목 사이 간격 (stagger 프리셋)',
  },
  { name: 'motion.loop.turn', ms: 650, use: '스피너 한 바퀴 (Spinner)' },
  {
    name: 'motion.loop.sweep',
    ms: 1800,
    use: '컨테이너를 가로지르는 한 번 (ProgressBar indeterminate)',
  },
];

const CHAKRAS = [
  { name: 'fast', ms: 150, use: 'feedback 프리셋 · presence 퇴장' },
  { name: 'moderate', ms: 200, use: '200ms가 필요하면 이걸 쓰세요' },
  { name: 'slow', ms: 300, use: '⚠️ 우리 motion.slow(500ms)와 다른 값' },
  { name: 'slower', ms: 400, use: '⚠️ 우리 motion.slower(700ms)와 다른 값' },
];

const CURVES = [
  {
    name: 'standard',
    d: 'M0,100 C40,100 20,0 100,0',
    half: '50%',
    use: 'press · feedback · presence 퇴장',
  },
  {
    name: 'emphasized',
    d: 'M0,100 C22,0 36,0 100,0',
    half: '96%',
    use: 'travel · presence 진입',
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
    templateColumns={{ base: '150px 56px 1fr', md: '150px 56px 1fr 300px' }}
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

/** One of the three situations that land you on this page. */
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
 * need — go back to 고르기.
 */
export const Scales: Story = {
  name: '2. 스케일',
  render: () => {
    const [at, setAt] = useState(false);
    const [ms, setMs] = useState(500);
    const play = () => {
      setAt(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setAt(true)));
    };

    return (
      <Box p={10} maxW="960px">
        <H2 mb={2}>스케일</H2>
        <Text color="fg.muted" mb={7}>
          여기는 <b>재료</b> 페이지입니다. 컴포넌트에 움직임을 넣는 중이라면{' '}
          <b>1. 고르기</b>로 가세요. 아래 세 상황에서만 필요합니다.
        </Text>

        <Stack gap={7} mb={12}>
          <WhenCase
            n="1"
            title="framer-motion을 쓸 때"
            when="요소가 마운트·언마운트되며 등장하거나 사라질 때, 레이아웃 변화를 따라갈 때, 드래그·제스처 — CSS transition으로는 표현이 안 되는 것들입니다."
            why="framer-motion은 CSS 변수를 읽지 못하므로 숫자가 필요합니다. 프리셋을 못 쓸 뿐 타이밍 스케일은 그대로 씁니다 — 아래 표의 값을 그대로 가져가세요."
            code={`import { MOTION_DURATION_S, MOTION_EASE } from '@mindlogic-ai/logician-ui';

<motion.div transition={{ duration: MOTION_DURATION_S.base, ease: MOTION_EASE.emphasized }} />`}
          />
          <WhenCase
            n="2"
            title="keyframe animation을 쓸 때"
            when="상태가 A에서 B로 바뀌는 게 아니라 스스로 도는 것 — 무한 반복(스피너), 중간 경유점이 필요한 동작(셰이크), 마운트하자마자 한 번 재생(체크마크 그리기)."
            why="프리셋의 대안이 아닙니다. 프리셋은 transition-*만, keyframe은 animation-*만 건드리므로 한 요소에 둘 다 붙어도 충돌하지 않습니다. 여기서 가져가는 건 duration과 곡선 값뿐입니다."
            code={`// Spinner.styles.ts — 이 컴포넌트만 쓰는 모션이라 여기 삽니다
export const spinAnimation = {
  animationName: 'spin',
  animationDuration: 'motion.loop.turn',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  _motionReduce: { animationDuration: 'motion.loop.sweep' },
};`}
          />
          <WhenCase
            n="3"
            title="새 프리셋을 정의할 때"
            when="일곱 중 어디에도 맞지 않는 의도가 여러 컴포넌트에서 반복될 때. 호출부가 하나뿐이면 만들지 마세요 — 기준은 3. 규칙에 있습니다."
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
                {c.use}
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

/* -------------------------------------------------------- story 3: 규칙 */

/** The five questions a new preset has to answer, and what a "no" means. */
const CHECKLIST = [
  [
    '호출부가 둘 이상인가',
    'Spinner 하나만 쓰는 회전이면 Spinner 안에 두세요 — 실제로 그렇게 내려갔습니다. presence가 프리셋인 건 여섯 부품이 같은 시계를 나눠 갖기 때문입니다.',
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
    'lint 정규식 두 곳을 고쳤는가',
    '.eslintrc.js의 animationStyle 목록에 없으면 새 이름이 오타로 잡힙니다. 그리고 transition 계열 프리셋이면 scope 가드의 (feedback|travel|spring) 목록에도 넣어야, 호출부가 transitionProperty를 빠뜨렸을 때 잡힙니다. 타입이 못 가는 자리라 둘 다 수동입니다.',
  ],
];

/** Where each motion actually lives, so "왜 여기 없지"가 한 번에 끝나도록. */
const MAP = [
  ['press · feedback · travel · spring', 'theme/motion.ts', '전역 어휘'],
  ['presence · stagger · composite', 'theme/motion.ts', '전역 어휘'],
  ['스피너 회전', 'Spinner.styles.ts', '호출부 하나'],
  ['indeterminate 막대', 'ProgressBar.styles.ts', '호출부 하나'],
  ['체크마크 그리기', 'Checkbox.styles.ts', '호출부 하나'],
  ['라디오 점', 'Radio.styles.ts', '호출부 하나'],
  ['세그먼트 인디케이터', 'SegmentedControl.styles.ts', '호출부 하나'],
  [
    '모달 진입·퇴장 keyframe',
    'Modal.styles.ts',
    '이름만 지역 · 시계는 presence',
  ],
  [
    'Pulse · Shake · Appear · Reveal',
    'components/*',
    '요소를 만들거나 붙잡아야 해서 컴포넌트',
  ],
  ['FlyTo · Confetti · CountUp · SwapTransition', 'components/*', '위와 같음'],
];

/**
 * How the vocabulary grows and shrinks.
 *
 * A separate story rather than a footnote on 고르기: it is read once, by whoever
 * is about to add a name, and it should not be in the way of everyone else.
 */
export const Rules: Story = {
  name: '3. 규칙',
  render: () => (
    <Box p={10} maxW="820px">
      <H2 mb={2}>규칙</H2>
      <Text color="fg.muted" mb={8}>
        <b>
          새 프리셋에는, 기존 어휘로 표현할 수 없는 실제 호출부가 둘 필요합니다.
        </b>{' '}
        하나뿐이라면 그건 프리셋이 아니라 그 컴포넌트의 사정입니다. 프리셋이
        스무 개가 되면 프리셋이 없는 것과 같습니다 — 고르는 비용이 직접 적는
        비용을 넘어서는 순간부터 아무도 고르지 않기 때문입니다.
      </Text>

      <H3 mb={3}>추가하기 전 다섯 가지</H3>
      <Stack gap={3} mb={10}>
        {CHECKLIST.map(([q, a]) => (
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

      <H3 mb={1}>지금 어디에 무엇이 있나</H3>
      <Subtext color="fg.muted" mb={4}>
        전역 어휘는 일곱 개뿐이고, 나머지는 쓰는 컴포넌트 옆에 삽니다.
      </Subtext>
      <Stack gap={2} mb={10}>
        {MAP.map(([what, where, why]) => (
          <Grid
            key={where + what}
            templateColumns={{ base: '1fr', md: '250px 230px 1fr' }}
            gap={{ base: 0, md: 4 }}
            alignItems="baseline"
          >
            <Subtext mb={0}>{what}</Subtext>
            <Text fontFamily="mono" fontSize="xs" color="fg.muted" mb={0}>
              {where}
            </Text>
            <Subtext color="fg.muted" fontSize="2xs" mb={0}>
              {why}
            </Subtext>
          </Grid>
        ))}
      </Stack>
      <Subtext color="fg.muted" mb={10}>
        빼는 것도 같은 규칙입니다. 호출부가 하나로 줄어든 프리셋은 그 컴포넌트로
        돌려보내세요. 읽는 토큰(<code>motion.loop.*</code> 등)은 내려가도 여전히
        전역 스케일이고, 지역인 것은 <b>조합</b>뿐입니다.
      </Subtext>

      <H3 mb={2}>루프는 duration 0으로 끄지 않습니다</H3>
      <Text color="fg.muted" mb={3}>
        끝나는 시점을 모르는 동안 계속 도는 움직임은 동작 줄이기의 답이
        다릅니다. 유한한 전환은 0으로 만들어도 <b>끝 상태가 남지만</b>, 루프는
        끝 상태가 없어서 0을 주면 주기 한가운데서 얼어붙습니다 — 멈춘 스피너는
        작동 중이라는 신호가 아니라 죽은 요청으로 읽힙니다.
      </Text>
      <Stack gap={2} mb={3} maxW="720px">
        {[
          [
            '스피너 회전',
            '느려지되 계속 돈다 (650ms → 1800ms)',
            '작업이 살아 있다는 유일한 신호라서',
          ],
          [
            'indeterminate 막대',
            '멈춘다',
            '진행 중이라는 사실은 주변 UI가 말한다',
          ],
        ].map(([name, what, why]) => (
          <Grid
            key={name}
            templateColumns={{ base: '1fr', md: '160px 250px 1fr' }}
            gap={{ base: 1, md: 4 }}
            alignItems="baseline"
          >
            <Subtext mb={0}>{name}</Subtext>
            <Subtext color="fg.muted" mb={0}>
              {what}
            </Subtext>
            <Subtext color="fg.muted" fontSize="2xs" mb={0}>
              {why}
            </Subtext>
          </Grid>
        ))}
      </Stack>
      <Subtext color="fg.muted" mb={10}>
        WCAG 2.2.2(일시정지 · 정지 · 숨기기)는 자동으로 시작해 5초 넘게 돌고
        다른 내용과 함께 놓이는 움직임을 다룹니다. 자리표시자에 정지 버튼을 달
        수 없으니 <code>prefers-reduced-motion</code>에서 실제로 멈추는 것이 그
        자리를 지키는 방법입니다.
      </Subtext>

      <H3 mb={2}>둘을 같이 써야 한다면</H3>
      <Text color="fg.muted" mb={4}>
        <code>animationStyle</code> 슬롯은 하나뿐이라 이름은 한 번에 하나입니다.
        그렇다고 요소가 한 가지만 할 수 있는 건 아닙니다 —{' '}
        <b>transition과 animation은 서로 다른 CSS 속성</b>이라 겹치지 않고 같이
        돕니다. 프리셋으로 하나를 고르고, 나머지는 그냥 적으세요.
      </Text>

      <Code>{`<Box
  animationStyle="presence"          // 열림·닫힘 시계 (animation-*)
  transitionProperty="opacity"       // 그와 별개로 도는 전환 (transition-*)
  transitionDuration="fast"
/>`}</Code>

      <Subtext color="fg.muted" mt={4} mb={0}>
        Chakra 자신이 이렇게 씁니다: 메뉴 레시피가 <code>animationStyle</code>로
        움직임 <b>이름</b>을 고르고 <code>animationDuration</code>으로{' '}
        <b>시계</b>를 따로 붙입니다. 우리 <code>presence</code>는 그 반대로
        시계만 주기 때문에, 레시피가 정한 이름을 덮지 않고 여섯 부품에 동시에
        앉을 수 있습니다.
      </Subtext>
    </Box>
  ),
};
