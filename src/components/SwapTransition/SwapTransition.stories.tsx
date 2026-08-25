import { Box, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
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
          <Box
            px={4}
            py={4}
            borderRadius="md"
            border="1px solid"
            borderColor="border.subtle"
            bg="bg.surface"
          >
            <Text fontWeight="700" mb={1}>
              {step + 1}. {STEPS[step].title}
            </Text>
            <Subtext color="fg.muted" mb={0}>
              {STEPS[step].body}
            </Subtext>
          </Box>
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
          <Box px={4} py={3} borderRadius="md" bg="bg.subtle">
            <Text fontWeight="600" mb={0}>
              {STEPS[step].title}
            </Text>
          </Box>
        </SwapTransition>

        <Subtext color="fg.muted" mb={0}>
          나가는 쪽은 이동 방향의 <b>반대로</b> 빠집니다 — 그래야 둘이 스쳐
          지나가는 게 아니라 하나의 움직임으로 읽힙니다.
        </Subtext>
      </Stack>
    );
  },
};

/** `transitionKey` must identify the content, not merely change. */
export const KeyChoice: Story = {
  name: 'transitionKey 고르기',
  render: () => (
    <Stack gap={3} maxW="64ch">
      <Subtext color="fg.muted" mb={0}>
        스텝 인덱스나 레코드 id처럼 <b>내용을 실제로 식별하는 값</b>을 쓰세요.
        무관한 리렌더에도 바뀌는 값을 넣으면 내용이 자기 자신과 교체되면서 계속
        미끄러집니다.
      </Subtext>
      <Subtext color="fg.muted" mb={0}>
        같은 키로 리렌더되면 애니메이션 없이 제자리에서 갱신됩니다 — 스트리밍
        중인 텍스트가 매 청크마다 다시 들어오지 않도록.
      </Subtext>
    </Stack>
  ),
};
