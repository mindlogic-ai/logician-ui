import { Grid, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { MOTION_DURATION_MS } from '../../theme/motion';
import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { CountUp } from '.';

/**
 * The only thing in the motion layer CSS cannot animate at all: a number is
 * text, and text content is not an animatable property. So it interpolates in
 * JavaScript — and reads the same curve CSS would have, through `cubicBezier`.
 */
const meta = {
  title: 'Components/CountUp',
  component: CountUp,
  args: { to: 1250 },
} satisfies Meta<typeof CountUp>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Omit `from` and it renders `to` immediately, counting only on later changes. */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(1250);

    return (
      <Stack gap={4} align="flex-start">
        <Button size="sm" onClick={() => setValue((v) => v + 500)}>
          +500
        </Button>
        <Text fontSize="3xl" fontWeight="700" mb={0}>
          <CountUp to={value} /> 크레딧
        </Text>
        <Subtext color="fg.muted" mb={0}>
          다음 카운트는 앞선 카운트가 끝난 자리에서 이어집니다 — 두 번째 보상이
          첫 번째에 더해지는 것으로 읽히도록.
        </Subtext>
      </Stack>
    );
  },
};

/**
 * Which band a count-up belongs to is the judgement, not how many milliseconds.
 * A KPI refreshing is a response; a balance rising under confetti is a
 * celebration.
 */
export const Bands: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={5} align="flex-start">
        <Button size="sm" onClick={() => setRun((r) => r + 1)}>
          둘 동시 재생
        </Button>
        {[
          {
            label: '응답 — 기본값',
            note: 'motion.slower (700ms), 지연 없음. 관리자 KPI 카드처럼 갱신을 알리는 자리.',
            duration: MOTION_DURATION_MS.slower,
            delay: 0,
          },
          {
            label: '축하 — 호출부가 올림',
            note: 'celebrate.fall (1800ms) + celebrate.burst 지연. 컨페티가 터지는 동안 올라가는 잔액.',
            duration: MOTION_DURATION_MS.celebrateFall,
            delay: MOTION_DURATION_MS.celebrateBurst,
          },
        ].map((b) => (
          <Grid
            key={b.label}
            templateColumns={{ base: '1fr', md: '190px 190px 1fr' }}
            gap={4}
            alignItems="baseline"
          >
            <Text fontSize="sm" fontWeight="600" mb={0}>
              {b.label}
            </Text>
            <Text fontSize="2xl" fontWeight="700" mb={0}>
              <CountUp
                key={`${b.label}-${run}`}
                from={1250}
                to={1750}
                durationMs={b.duration}
                delayMs={b.delay}
              />
            </Text>
            <Subtext color="fg.muted" fontSize="2xs" mb={0}>
              {b.note}
            </Subtext>
          </Grid>
        ))}
      </Stack>
    );
  },
};

/** `format` owns the whole string, so a unit or a currency rides along. */
export const Format: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={4} align="flex-start">
        <Button size="sm" onClick={() => setRun((r) => r + 1)}>
          재생
        </Button>
        <Text fontSize="2xl" fontWeight="700" mb={0}>
          <CountUp
            key={run}
            from={0}
            to={87.4}
            format={(n) => `${n.toFixed(1)}%`}
          />
        </Text>
        <Subtext color="fg.muted" mb={0}>
          기본값은 천 단위 구분입니다. 소수점·통화·단위가 필요하면 넘기세요.
        </Subtext>
      </Stack>
    );
  },
};
