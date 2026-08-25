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

/**
 * Colours are literal hex and deliberately off the palette — the one place in
 * this library that is.
 */
export const WhyNotTokens: Story = {
  render: () => (
    <Stack gap={3} maxW="62ch">
      <Text fontWeight="600" mb={0}>
        semantic 토큰을 쓰면 안 되는 자리
      </Text>
      <Subtext color="fg.muted" mb={0}>
        <code>danger.main</code>은 에러 빨강이고 <code>warning.main</code>은
        경고 노랑입니다. 컨페티는 페이지에서 유일하게 전달할 내용이 없는
        요소인데, 전달하는 색을 뿌리면 「결제 완료」 화면에 에러가 쏟아집니다.
      </Subtext>
      <Subtext color="fg.muted" mb={0}>
        광학적으로도 맞지 않습니다. 우리 팔레트는 흰 배경 위 텍스트가 읽히도록
        만들어져 평균 명도 47%에 다섯 중 셋이 파랑입니다 — 50개를 뿌리면 차트
        범례가 떨어지는 것처럼 보입니다. 기본 6색은 평균 명도 56%에 색상환을
        거의 한 바퀴 돕니다.
      </Subtext>
      <Subtext color="fg.muted" mb={0}>
        비용은 그대로입니다: 리브랜딩을 따라가지 않고 다크모드에 적응하지
        않습니다. 2초짜리 장식이라 감수하고, 필요하면 <code>colors</code>로 자기
        팔레트를 넘기면 됩니다.
      </Subtext>
    </Stack>
  ),
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
