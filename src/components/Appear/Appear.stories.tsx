import { Box, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { Appear } from '.';

/**
 * Brings an element in on mount — a fade, plus an optional scale (a *stamp*) or
 * vertical travel (an *arrival*).
 *
 * One of three entrances in this library, and they are not interchangeable —
 * see **어느 것을 쓸까**.
 */
const meta = {
  title: 'Components/Motion/Appear',
  component: Appear,
} satisfies Meta<typeof Appear>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={5} align="flex-start">
        <Button size="sm" onClick={() => setRun((r) => r + 1)}>
          셋 동시 재생
        </Button>
        <HStack gap={8} align="flex-start" minH="90px">
          {[
            { label: '페이드', props: {} },
            { label: '스탬프', props: { scaleFrom: 0.5 } },
            { label: '도착', props: { rise: 10 } },
          ].map((v) => (
            <Stack key={v.label} gap={2} align="center" w="110px">
              <Appear key={`${v.label}-${run}`} {...v.props}>
                <Box
                  px={4}
                  py={3}
                  borderRadius="md"
                  bg="primary.lightest"
                  color="primary.main"
                  fontWeight="600"
                  fontSize="sm"
                >
                  {v.label}
                </Box>
              </Appear>
              <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mb={0}>
                {v.label === '페이드'
                  ? '기본'
                  : v.label === '스탬프'
                    ? 'scaleFrom=0.5'
                    : 'rise=10'}
              </Subtext>
            </Stack>
          ))}
        </HStack>
      </Stack>
    );
  },
};

/** `delayMs` is hand-set per call site — there is no list to derive it from. */
export const Sequenced: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={4} align="flex-start">
        <Button size="sm" onClick={() => setRun((r) => r + 1)}>
          재생
        </Button>
        <HStack gap={3} align="center" minH="60px">
          <Appear key={`a-${run}`} scaleFrom={0.5}>
            <Box
              w="40px"
              h="40px"
              borderRadius="full"
              bg="success.main"
              color="fg.inverse"
              display="grid"
              placeItems="center"
              fontWeight="700"
            >
              ✓
            </Box>
          </Appear>
          <Appear key={`b-${run}`} rise={6} delayMs={140}>
            <Text fontWeight="600" mb={0}>
              정답입니다
            </Text>
          </Appear>
        </HStack>
        <Subtext color="fg.muted" mb={0}>
          도장이 먼저 찍히고 문구가 따라옵니다. 두 박자로 나뉘어야 하나의
          제스처로 읽힙니다.
        </Subtext>
      </Stack>
    );
  },
};

/** The rule of thumb, in one place. */
export const WhichOne: Story = {
  name: '어느 것을 쓸까',
  render: () => (
    <Stack gap={4} maxW="66ch">
      {[
        [
          'animationStyle="presence"',
          '두 상태를 다 가진 파트 — 메뉴 · 팝오버 · 모달. 노드가 마운트된 채로 Chakra가 _open/_closed를 뒤집으므로 나갈 때도 애니메이션됩니다.',
        ],
        [
          'staggerProps(index)',
          '한 목록의 항목들. index가 곧 리듬이고, 형제들 사이의 간격이 요점입니다.',
        ],
        [
          'Appear',
          '혼자 한 번 등장하는 요소. 대개 방금 한 행동에 대한 답이고, 파생할 목록이 없어서 지연을 손으로 정합니다.',
        ],
      ].map(([name, desc]) => (
        <Box key={name}>
          <Text fontFamily="mono" fontSize="sm" fontWeight="700" mb={1}>
            {name}
          </Text>
          <Subtext color="fg.muted" mb={0}>
            {desc}
          </Subtext>
        </Box>
      ))}
      <Subtext color="fg.muted" mb={0}>
        <b>
          닫힐 수 있으면 presence, 같이 도착하는 형제가 있으면 stagger, 아니면
          Appear.
        </b>{' '}
        그리고 Appear는 <b>나가지 않습니다</b> — CSS는 DOM에서 제거되는 요소를
        애니메이션할 수 없고, 그 자리를 메우는 게 presence입니다.
      </Subtext>
    </Stack>
  ),
};
