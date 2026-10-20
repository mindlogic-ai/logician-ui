import { Box, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Card } from '../Card';
import { Subtext, Text } from '../Typography';
import { SwapTransition } from '.';

/**
 * Swaps one piece of content for another with a directional slide — moving
 * between steps of a sequence, or between records in the same frame.
 *
 * The only primitive here that keeps React state: the outgoing subtree has to
 * stay on screen long enough to leave, and React has already been told to
 * render the new one.
 */
const meta = {
  title: 'Components/Motion/SwapTransition',
  component: SwapTransition,
  args: { transitionKey: 0 },
} satisfies Meta<typeof SwapTransition>;

export default meta;

type Story = StoryObj<typeof meta>;

const STEPS = [
  { title: '주장 확인', body: '검증할 문장을 고릅니다.' },
  { title: '출처 대조', body: '세 곳 이상의 출처와 맞춰 봅니다.' },
  { title: '판정', body: '사실 · 허위 · 부분으로 나눕니다.' },
];

export const Default: Story = {
  render: () => {
    const [step, setStep] = useState(0);

    return (
      <Stack gap={4} align="flex-start" maxW="420px">
        <HStack gap={2}>
          <Button
            size="xs"
            variant="outline"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            이전
          </Button>
          <Button
            size="xs"
            disabled={step === STEPS.length - 1}
            onClick={() => setStep((s) => s + 1)}
          >
            다음
          </Button>
        </HStack>

        <SwapTransition
          transitionKey={step}
          w="100%"
          minH="96px"
          overflow="hidden"
        >
          <Card p={4}>
            <Text fontWeight="700" mb={1}>
              {step + 1}. {STEPS[step].title}
            </Text>
            <Subtext color="fg.muted" mb={0}>
              {STEPS[step].body}
            </Subtext>
          </Card>
        </SwapTransition>

        <Subtext color="fg.muted" mb={0}>
          퇴장(150ms)이 끝난 뒤 진입(200ms)이 시작합니다. 직렬이라 합이 곧 체감
          지연이고, 그래서 presence(300/150)보다 짧게 잡았습니다.
        </Subtext>
      </Stack>
    );
  },
};

/** Negative `distance` runs the swap backwards — for going back a step. */
export const Direction: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const [back, setBack] = useState(false);

    return (
      <Stack gap={4} align="flex-start" maxW="420px">
        <HStack gap={2}>
          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              setBack(true);
              setStep((s) => (s + STEPS.length - 1) % STEPS.length);
            }}
          >
            ← 뒤로
          </Button>
          <Button
            size="xs"
            onClick={() => {
              setBack(false);
              setStep((s) => (s + 1) % STEPS.length);
            }}
          >
            앞으로 →
          </Button>
        </HStack>

        <SwapTransition
          transitionKey={step}
          distance={back ? -24 : 24}
          w="100%"
          minH="64px"
          overflow="hidden"
        >
          <Card p={3} variant="default">
            <Text fontWeight="600" mb={0}>
              {STEPS[step].title}
            </Text>
          </Card>
        </SwapTransition>

        <Subtext color="fg.muted" mb={0}>
          나가는 쪽은 이동 방향의 <b>반대로</b> 빠집니다 — 그래야 둘이 스쳐
          지나가는 게 아니라 하나의 움직임으로 읽힙니다.
        </Subtext>
      </Stack>
    );
  },
};

/**
 * The two shapes that broke in the product, side by side — click both.
 *
 * Neither was reachable from the demos above, which is why they shipped. Those
 * change the key on every click and sit in ordinary flow; the app did neither.
 * A story is the author's idea of how a component is used, and these two are
 * what the call sites actually did.
 *
 * **Left — content that changes without a new key.** `transitionKey` is fixed,
 * and picking an option only re-renders. The first version rendered a *copy* of
 * `children` held in state and refreshed it from an effect keyed on
 * `transitionKey`, so a render like this never reached the screen: the option
 * stayed unpicked and the panel read as dead.
 *
 * **Right — a full-height pane with a bar pinned under it.** The wrapper is told
 * to fill (`display="flex" flex={1} minH={0}`) so the bar sits on the bottom
 * edge. The first version put the content one element further in than those
 * props, so the fill stopped short, the pane sized to its content, and the bar
 * rode up with dead space beneath it.
 *
 * Both should now behave: the option fills in, and the bar stays at the bottom
 * through a swap.
 */
export const CallSiteShapes: Story = {
  render: () => {
    const [picked, setPicked] = useState<string | null>(null);
    const [step, setStep] = useState(0);

    return (
      <HStack align="stretch" gap={8} p={4} h="360px">
        <Stack flex={1} gap={3} minW={0}>
          <Subtext color="fg.muted" mb={0}>
            키 고정 · 내용만 변경
          </Subtext>
          <SwapTransition transitionKey="fixed">
            <Card p={4} variant="default">
              <Text fontWeight="600" mb={3}>
                딥러닝 기반 AI의 특징은?
              </Text>
              <Stack gap={2}>
                {['많은 데이터를 학습한다', '인터넷 없이 작동한다'].map((o) => (
                  <Button
                    key={o}
                    size="sm"
                    variant={picked === o ? 'solid' : 'outline'}
                    colorPalette={picked === o ? 'primary' : 'neutral'}
                    onClick={() => setPicked(o)}
                  >
                    {o}
                  </Button>
                ))}
              </Stack>
            </Card>
          </SwapTransition>
        </Stack>

        <Stack
          flex={1}
          minW={0}
          gap={0}
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="md"
          overflow="hidden"
        >
          <Box p={3} borderBottomWidth="1px" borderColor="border.subtle">
            <Subtext mb={0}>전체 높이 페인 · 바닥에 붙은 액션 바</Subtext>
          </Box>
          <SwapTransition
            transitionKey={step}
            display="flex"
            flexDirection="column"
            flex={1}
            minH={0}
          >
            <Box p={4} flex={1} minH={0}>
              <Text fontWeight="600" mb={1}>
                {STEPS[step % STEPS.length].title}
              </Text>
              <Subtext color="fg.muted" mb={0}>
                {STEPS[step % STEPS.length].body}
              </Subtext>
            </Box>
          </SwapTransition>
          <Box p={3} borderTopWidth="1px" borderColor="border.subtle">
            <Button size="sm" w="100%" onClick={() => setStep((s) => s + 1)}>
              다음 단계
            </Button>
          </Box>
        </Stack>
      </HStack>
    );
  },
};
