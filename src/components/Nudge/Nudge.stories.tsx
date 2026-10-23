import { Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Subtext } from '../Typography';
import { Nudge } from '.';

/**
 * Leans once whenever `trigger` changes — the house "you have not done this
 * yet" gesture, for a call to action the reader has walked past.
 */
const meta = {
  title: 'Components/Motion/Nudge',
  component: Nudge,
  args: { trigger: 0 },
} satisfies Meta<typeof Nudge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [prompts, setPrompts] = useState(0);

    return (
      <Stack gap={4} align="flex-start">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setPrompts((p) => p + 1)}
        >
          20초 지났다고 가정
        </Button>
        <Nudge trigger={prompts}>
          <Button variant="primary">시작하기</Button>
        </Nudge>
        <Subtext color="fg.muted" mb={0}>
          실제로는 이 버튼을 누르는 쪽이 타이머입니다. 컴포넌트에는 기억이 없어서
          값이 바뀔 때마다 재생하니, <b>횟수 제한은 호출하는 쪽에서</b> 걸어야
          합니다. 보통 두 번이 전부입니다.
        </Subtext>
      </Stack>
    );
  },
};

/** `tilt` is the peak lean. Past about 6 degrees it reads as a toy, not an invitation. */
export const Tilt: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={5} align="flex-start">
        <Button size="sm" onClick={() => setRun((r) => r + 1)}>
          셋 동시 재생
        </Button>
        <HStack gap={8} align="flex-start">
          {[undefined, 5, 10].map((tilt) => (
            <Stack key={tilt ?? 'default'} gap={2} align="center">
              <Nudge trigger={run} tilt={tilt}>
                <Button variant="primary">시작하기</Button>
              </Nudge>
              <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mb={0}>
                {tilt === undefined ? '2.5deg (기본)' : `${tilt}deg`}
              </Subtext>
            </Stack>
          ))}
        </HStack>
      </Stack>
    );
  },
};

/**
 * What a reader who asked for less motion actually gets.
 *
 * The lean is `animationName: none` under `prefers-reduced-motion`, which makes
 * the wrapper a no-op — the right-hand column, rendered without it, is literally
 * their screen. A nudge says nothing even when it plays, so whatever it points
 * at has to stand on its own copy either way.
 */
export const ReducedMotion: Story = {
  name: '동작 줄이기에서 남는 것',
  render: () => {
    const [n, setN] = useState(0);

    return (
      <Stack gap={5} align="flex-start" maxW="620px">
        <Button size="sm" variant="secondary" onClick={() => setN((p) => p + 1)}>
          20초 지났다고 가정
        </Button>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} w="100%">
          {[
            { label: '보통', reduced: false },
            { label: '동작 줄이기 켠 사람이 보는 것', reduced: true },
          ].map((col) => (
            <Stack key={col.label} gap={2} align="flex-start">
              <Subtext
                fontSize="2xs"
                color={col.reduced ? 'warning.fg' : 'fg.muted'}
                mb={0}
              >
                {col.label}
              </Subtext>
              {col.reduced ? (
                <Button variant="primary">시작하기</Button>
              ) : (
                <Nudge trigger={n}>
                  <Button variant="primary">시작하기</Button>
                </Nudge>
              )}
            </Stack>
          ))}
        </Grid>

        <Subtext color="fg.muted" mb={0}>
          오른쪽 버튼은 아무 일도 일어나지 않습니다. 넛지는 내용이 없는 권유라서
          <b> 문구와 위치</b>가 혼자서도 읽혀야 합니다.
        </Subtext>
      </Stack>
    );
  },
};
