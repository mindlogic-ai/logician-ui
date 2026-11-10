import { Box, Grid, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Subtext } from '../Typography';
import { Shine } from '.';

/**
 * A band of light that crosses the surface, rests, and crosses again. For the
 * one thing on a screen that should keep asking — an upgrade CTA, a trial
 * banner.
 */
const meta = {
  title: 'Components/Motion/Shine',
  component: Shine,
} satisfies Meta<typeof Shine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack gap={3} align="flex-start">
      <Shine borderRadius="md">
        <Button variant="primary">업그레이드</Button>
      </Shine>
      <Subtext color="fg.muted" mb={0}>
        한 번 지나간 뒤 쉬고, 다시 지나갑니다. 쉬는 구간이 없으면 버튼에 걸린
        로딩 바로 읽힙니다.
      </Subtext>
    </Stack>
  ),
};

/**
 * `periodMs` is one pass plus its rest. The default is the house loop, 1800ms,
 * which next to reading content is often too eager; the proposal drew 3200.
 */
export const Period: Story = {
  render: () => (
    <HStack gap={8} align="flex-start">
      {[undefined, 3200, 6000].map((periodMs) => (
        <Stack key={periodMs ?? 'default'} gap={2} align="center">
          <Shine periodMs={periodMs} borderRadius="md">
            <Button variant="primary">업그레이드</Button>
          </Shine>
          <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mb={0}>
            {periodMs === undefined ? '1800ms (기본)' : `${periodMs}ms`}
          </Subtext>
        </Stack>
      ))}
    </HStack>
  ),
};

/**
 * The band is a lightening pass, not a glow, so the default white wash is
 * invisible on a pale surface. `colour` takes any CSS colour.
 */
export const Colour: Story = {
  render: () => (
    <HStack gap={8} align="flex-start">
      <Stack gap={2} align="center">
        <Shine borderRadius="md">
          <Box px={4} py={3} borderRadius="md" bg="bg.subtle" fontSize="sm">
            기본 흰 띠
          </Box>
        </Shine>
        <Subtext fontSize="2xs" color="warning.fg" mb={0}>
          밝은 면에서는 보이지 않습니다
        </Subtext>
      </Stack>
      <Stack gap={2} align="center">
        <Shine borderRadius="md" colour="rgba(0,0,0,0.12)">
          <Box px={4} py={3} borderRadius="md" bg="bg.subtle" fontSize="sm">
            어두운 띠
          </Box>
        </Shine>
        <Subtext fontSize="2xs" color="fg.muted" mb={0}>
          colour=&quot;rgba(0,0,0,0.12)&quot;
        </Subtext>
      </Stack>
    </HStack>
  ),
};

/**
 * What a reader who asked for less motion actually gets.
 *
 * The band is `animationName: none` *and* `opacity: 0` under
 * `prefers-reduced-motion`, so the wrapper becomes a no-op — the right-hand
 * column, rendered without it, is literally their screen. The ask has to be
 * legible there: in the copy, the colour, the placement.
 */
export const ReducedMotion: Story = {
  name: '동작 줄이기에서 남는 것',
  render: () => (
    <Stack gap={5} align="flex-start" maxW="620px">
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} w="100%">
        {[
          { label: '보통', reduced: false },
          { label: '동작 줄이기 켠 사람이 보는 것', reduced: true },
        ].map((col) => (
          <Stack key={col.label} gap={2}>
            <Subtext
              fontSize="2xs"
              color={col.reduced ? 'warning.fg' : 'fg.muted'}
              mb={0}
            >
              {col.label}
            </Subtext>
            {col.reduced ? (
              <Button variant="primary">업그레이드</Button>
            ) : (
              <Shine borderRadius="md" display="flex">
                <Button variant="primary" w="100%">
                  업그레이드
                </Button>
              </Shine>
            )}
          </Stack>
        ))}
      </Grid>

      <Subtext color="fg.muted" mb={0}>
        오른쪽에서도 무엇을 해야 하는지 읽히는 이유는 <b>문구와 채운 색</b>이 그
        역할을 하기 때문입니다. 빛 띠만 있었다면 저 사람에게는 아무것도 없는
        버튼입니다.
      </Subtext>
    </Stack>
  ),
};
