import { Box, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { Shake } from '.';

/**
 * The house "no, not that" gesture — a rejected answer, an invalid field, a
 * refused action. Replays whenever `trigger` changes.
 */
const meta = {
  title: 'Components/Motion/Shake',
  component: Shake,
  args: { trigger: 0 },
} satisfies Meta<typeof Shake>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [attempts, setAttempts] = useState(0);

    return (
      <Stack gap={4} align="flex-start">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAttempts((a) => a + 1)}
        >
          틀린 답 제출
        </Button>
        <Shake trigger={attempts}>
          <Box
            px={4}
            py={2}
            borderRadius="md"
            border="1px solid"
            borderColor="danger.main"
            bg="danger.lightest"
            color="danger.main"
            fontWeight="600"
          >
            ✕ 다시 시도해 주세요
          </Box>
        </Shake>
        <Subtext color="fg.muted" mb={0}>
          같은 답을 두 번 내도 두 번 흔들립니다 — 값이 아니라 사건을 셉니다.
        </Subtext>
      </Stack>
    );
  },
};

/** `distance` is the peak travel. Past ~10px it reads as broken rather than as "no". */
export const Distance: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={5} align="flex-start">
        <Button size="sm" onClick={() => setRun((r) => r + 1)}>
          셋 동시 재생
        </Button>
        <HStack gap={6}>
          {[4, 6, 12].map((d) => (
            <Stack key={d} gap={2} align="center">
              <Shake trigger={run} distance={d}>
                <Box
                  px={3}
                  py={2}
                  borderRadius="md"
                  bg="bg.subtle"
                  fontSize="sm"
                >
                  거절
                </Box>
              </Shake>
              <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mb={0}>
                {d}px
              </Subtext>
            </Stack>
          ))}
        </HStack>
      </Stack>
    );
  },
};

/**
 * Removed entirely under reduced motion, so for some readers nothing happens at
 * all. It can never be the only signal.
 */
export const NeverTheOnlySignal: Story = {
  render: () => (
    <Stack gap={3} maxW="60ch">
      <Text fontWeight="600" mb={0}>
        색 · 아이콘 · 문구 중 하나는 반드시 같이
      </Text>
      <Subtext color="fg.muted" mb={0}>
        <code>prefers-reduced-motion</code>에서는 흔들림이 통째로 사라집니다.
        흔들림만으로 거절을 말하면 그 사람에게는 아무 일도 일어나지 않은
        화면입니다. 위 예시가 테두리 색과 ✕ 아이콘과 문구를 함께 쓰는
        이유입니다.
      </Subtext>
    </Stack>
  ),
};
