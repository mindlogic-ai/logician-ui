import { Box, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { FlyTo } from '.';

/**
 * Sends a ghost arcing from one rect to another — "this went there".
 *
 * JavaScript measures; CSS animates. The two rects are only knowable at
 * runtime, so the distance is computed and handed to a keyframe as three custom
 * properties — the arc itself runs on the compositor with no frame loop.
 */
/**
 * Untyped against the component on purpose: `from` and `to` are `DOMRect`s
 * measured at runtime, so there is no static `args` to satisfy — every story
 * here has to render its own instance after laying the two elements out.
 */
const meta = {
  title: 'Components/Motion/FlyTo',
  component: FlyTo,
} satisfies Meta;

export default meta;

type Story = StoryObj;

const Chip = () => (
  <HStack
    gap={1}
    bg="primary.main"
    color="fg.inverse"
    px={3}
    py={1}
    borderRadius="full"
    fontSize="sm"
    fontWeight="700"
  >
    <Box>◆</Box>
    <Box>+50</Box>
  </HStack>
);

/**
 * The caller owns mounting. `onDone` is what advances the sequence — a reward
 * that landed has to update a balance, and that happens when the ghost arrives
 * rather than when it left.
 */
export const Default: Story = {
  render: () => {
    const source = useRef<HTMLButtonElement>(null);
    const target = useRef<HTMLDivElement>(null);
    const [flight, setFlight] = useState<{ from: DOMRect; to: DOMRect } | null>(
      null
    );
    const [balance, setBalance] = useState(1250);

    return (
      <Stack gap={6}>
        <HStack gap={12} justify="space-between" maxW="480px" align="center">
          <Button
            ref={source}
            size="sm"
            onClick={() => {
              const from = source.current?.getBoundingClientRect();
              const to = target.current?.getBoundingClientRect();
              if (from && to) setFlight({ from, to });
            }}
          >
            보내기
          </Button>

          <Box ref={target} textAlign="right">
            <Subtext color="fg.muted" fontSize="2xs" mb={0}>
              잔액
            </Subtext>
            <Text fontSize="xl" fontWeight="700" mb={0}>
              {balance.toLocaleString()}
            </Text>
          </Box>
        </HStack>

        {flight && (
          <FlyTo
            from={flight.from}
            to={flight.to}
            onDone={() => {
              setFlight(null);
              setBalance((b) => b + 50);
            }}
          >
            <Chip />
          </FlyTo>
        )}

        <Subtext color="fg.muted" mb={0}>
          잔액은 타이머가 아니라 착지 시점에 오릅니다.
        </Subtext>
      </Stack>
    );
  },
};

/** `lift` is how high the arc rises above the straight line between the rects. */
export const Lift: Story = {
  render: () => {
    const source = useRef<HTMLButtonElement>(null);
    const target = useRef<HTMLDivElement>(null);
    const [lift, setLift] = useState<number | null>(null);

    const send = (value: number) => {
      const from = source.current?.getBoundingClientRect();
      const to = target.current?.getBoundingClientRect();
      if (from && to) setLift(value);
    };

    return (
      <Stack gap={6}>
        <HStack gap={2}>
          {[0, 46, 120].map((v) => (
            <Button key={v} size="xs" variant="outline" onClick={() => send(v)}>
              lift {v}
            </Button>
          ))}
        </HStack>

        <HStack gap={12} justify="space-between" maxW="480px" align="center">
          <Button ref={source} size="sm" variant="ghost">
            출발
          </Button>
          <Box ref={target} px={3} py={2} borderRadius="md" bg="bg.subtle">
            도착
          </Box>
        </HStack>

        {lift !== null && source.current && target.current && (
          <FlyTo
            key={lift}
            from={source.current.getBoundingClientRect()}
            to={target.current.getBoundingClientRect()}
            lift={lift}
            onDone={() => setLift(null)}
          >
            <Chip />
          </FlyTo>
        )}

        <Subtext color="fg.muted" mb={0}>
          <b>0이면 직선</b>이고, 직선 보간은 던진 것이 아니라 레이아웃이 바뀐
          것으로 읽힙니다. 궤적이 이 프리미티브의 전부입니다.
        </Subtext>
      </Stack>
    );
  },
};
