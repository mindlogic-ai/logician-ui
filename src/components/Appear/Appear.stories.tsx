import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Menu } from '../Menu';
import { Subtext, Text } from '../Typography';
import { staggerProps } from '../../utils/staggerProps';
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

/**
 * The three entrances, played together.
 *
 * They overlap enough that picking the wrong one is silent, and the difference
 * is easier to see than to read: only one of them can close, and only one of
 * them has a rhythm.
 */
export const WhichOne: Story = {
  name: '어느 것을 쓸까',
  render: () => {
    const [run, setRun] = useState(0);
    const [open, setOpen] = useState(false);

    return (
      <Stack gap={6} align="flex-start" maxW="720px">
        <HStack gap={2}>
          <Button size="sm" onClick={() => setRun((r) => r + 1)}>
            셋 동시 재생
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '닫기' : '열기'} — presence만 가능
          </Button>
        </HStack>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={6}
          w="100%"
          alignItems="start"
        >
          {/* presence — 유일하게 닫힐 수 있는 것 */}
          <Stack gap={2}>
            <Text fontFamily="mono" fontSize="xs" fontWeight="700" mb={0}>
              presence
            </Text>
            <Subtext fontSize="2xs" color="fg.muted" mb={0}>
              두 상태를 다 가진 파트. <b>나갈 때도 애니메이션됩니다.</b>
            </Subtext>
            <Menu>
              <Menu.Trigger asChild>
                <Button size="xs" variant="outline">
                  메뉴 열기
                </Button>
              </Menu.Trigger>
              <Menu.List>
                <Menu.Item value="a">이름 바꾸기</Menu.Item>
                <Menu.Item value="b">삭제</Menu.Item>
              </Menu.List>
            </Menu>
            <Collapsible.Root open={open}>
              <Collapsible.Content>
                <Box
                  px={3}
                  py={2}
                  borderRadius="md"
                  bg="bg.subtle"
                  fontSize="xs"
                >
                  닫기를 눌러 보세요
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>
          </Stack>

          {/* stagger — 리듬이 요점 */}
          <Stack gap={2}>
            <Text fontFamily="mono" fontSize="xs" fontWeight="700" mb={0}>
              stagger
            </Text>
            <Subtext fontSize="2xs" color="fg.muted" mb={0}>
              한 목록. index가 곧 <b>리듬</b>입니다.
            </Subtext>
            <Stack key={run} gap="2px">
              {['첫째 줄', '둘째 줄', '셋째 줄', '넷째 줄'].map((t, i) => (
                <Box
                  key={t}
                  px={3}
                  py={2}
                  borderRadius="sm"
                  bg="bg.subtle"
                  fontSize="xs"
                  {...staggerProps(i)}
                >
                  {t}
                </Box>
              ))}
            </Stack>
          </Stack>

          {/* Appear — 혼자 한 번 */}
          <Stack gap={2}>
            <Text fontFamily="mono" fontSize="xs" fontWeight="700" mb={0}>
              Appear
            </Text>
            <Subtext fontSize="2xs" color="fg.muted" mb={0}>
              혼자 한 번. 지연을 <b>손으로</b> 정합니다.
            </Subtext>
            <HStack gap={2} align="center" minH="44px">
              <Appear key={`a-${run}`} scaleFrom={0.5}>
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg="success.main"
                  color="fg.inverse"
                  display="grid"
                  placeItems="center"
                  fontWeight="700"
                  fontSize="sm"
                >
                  ✓
                </Box>
              </Appear>
              <Appear key={`b-${run}`} rise={6} delayMs={140}>
                <Text fontSize="sm" fontWeight="600" mb={0}>
                  정답입니다
                </Text>
              </Appear>
            </HStack>
          </Stack>
        </Grid>

        <Subtext color="fg.muted" mb={0}>
          <b>
            닫힐 수 있으면 presence, 같이 도착하는 형제가 있으면 stagger, 아니면
            Appear.
          </b>{' '}
          「열기/닫기」를 눌러 보면 왼쪽만 반응합니다 — <code>Appear</code>는
          나가지 않습니다. CSS는 DOM에서 제거되는 요소를 애니메이션할 수 없고,
          그 자리를 메우는 게 presence입니다.
        </Subtext>
      </Stack>
    );
  },
};
