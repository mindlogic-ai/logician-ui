import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Chip } from '../Chip';
import { Input } from '../Input';
import { Subtext } from '../Typography';
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
          <Chip colorScheme="danger" variant="soft">
            ✕ 다시 시도해 주세요
          </Chip>
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
 * What a reader who asked for less motion actually gets.
 *
 * The shake is `animationName: none` under `prefers-reduced-motion`, which
 * makes the wrapper a no-op — so the right-hand column, rendered without it, is
 * literally what those readers see. If the refusal is not legible there, the
 * component is carrying meaning it cannot deliver.
 */
export const ReducedMotion: Story = {
  name: '동작 줄이기에서 남는 것',
  render: () => {
    const [n, setN] = useState(0);

    // The real form primitives, so the demo shows what an invalid field
    // actually looks like rather than an approximation of one.
    const Field = ({ signalled }: { signalled: boolean }) => (
      <Stack gap={1} w="100%">
        <Input
          value={signalled ? '1998' : ''}
          readOnly
          aria-invalid={signalled || undefined}
          placeholder="답을 입력하세요"
        />
        {signalled && (
          <Chip colorScheme="danger" variant="soft">
            ✕ 다시 시도해 주세요
          </Chip>
        )}
      </Stack>
    );

    return (
      <Stack gap={5} align="flex-start" maxW="620px">
        <Button size="sm" variant="outline" onClick={() => setN((a) => a + 1)}>
          틀린 답 제출
        </Button>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} w="100%">
          {[
            { label: '보통', reduced: false },
            { label: '동작 줄이기 켠 사람이 보는 것', reduced: true },
          ].map((col) => (
            <Stack key={col.label} gap={2}>
              <Subtext
                fontSize="2xs"
                color={col.reduced ? 'warning.main' : 'fg.muted'}
                mb={0}
              >
                {col.label}
              </Subtext>
              {col.reduced ? (
                <Field signalled={n > 0} />
              ) : (
                <Shake trigger={n} display="block">
                  <Field signalled={n > 0} />
                </Shake>
              )}
            </Stack>
          ))}
        </Grid>

        <Subtext color="fg.muted" mb={0}>
          오른쪽에서도 거절이 읽히는 이유는 <b>테두리 색 · ✕ 아이콘 · 문구</b>가
          같이 바뀌기 때문입니다. 흔들림만 있었다면 저 사람에게는 아무 일도
          일어나지 않은 화면입니다.
        </Subtext>
      </Stack>
    );
  },
};
