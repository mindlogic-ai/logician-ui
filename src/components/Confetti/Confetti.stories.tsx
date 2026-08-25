import { Box, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { Confetti } from '.';

/**
 * A one-shot celebratory burst. One class and one keyframe for every piece —
 * only the custom properties differ.
 *
 * Needs a positioned, clipped parent: it fills its container and measures the
 * fall against it.
 */
const meta = {
  title: 'Components/Motion/Confetti',
  component: Confetti,
} satisfies Meta<typeof Confetti>;

export default meta;

type Story = StoryObj<typeof meta>;

const Stage = ({ children }: { children: React.ReactNode }) => (
  <Box
    position="relative"
    overflow="hidden"
    w="100%"
    maxW="420px"
    h="240px"
    borderRadius="lg"
    border="1px solid"
    borderColor="border.subtle"
    bg="bg.surface"
    display="grid"
    placeItems="center"
  >
    {children}
  </Box>
);

export const Default: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={4} align="flex-start">
        <Button size="sm" onClick={() => setRun((r) => r + 1)}>
          재생
        </Button>
        <Stage>
          {run > 0 && <Confetti key={run} seed={run} />}
          <Text fontWeight="700" mb={0}>
            축하합니다
          </Text>
        </Stage>
      </Stack>
    );
  },
};


/** `seed` re-scatters. The generator is seeded so one burst holds still across re-renders. */
export const Seeded: Story = {
  render: () => {
    const [seed, setSeed] = useState(1);

    return (
      <Stack gap={4} align="flex-start">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSeed((s) => s + 1)}
        >
          다시 뿌리기 (seed {seed})
        </Button>
        <Stage>
          <Confetti key={seed} seed={seed} pieceCount={30} />
        </Stage>
        <Subtext color="fg.muted" mb={0}>
          <code>Math.random()</code>이었다면 부모가 리렌더할 때마다 조각이 다시
          흩어집니다 — 그리고 축하를 띄운 부모는 대개 리렌더 중입니다.
        </Subtext>
      </Stack>
    );
  },
};
