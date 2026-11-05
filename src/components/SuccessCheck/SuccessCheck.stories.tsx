import { HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { SuccessCheck } from '.';

/**
 * The end of something the reader waited through. The ring closes, then the
 * tick is written inside it. Draws once on mount and stays.
 */
const meta = {
  title: 'Components/Motion/SuccessCheck',
  component: SuccessCheck,
  args: { label: '리포트 생성 완료' },
} satisfies Meta<typeof SuccessCheck>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack gap={2} align="center" color="success.main">
      <SuccessCheck label="리포트 생성 완료" />
      <Text>리포트를 만들었어요</Text>
    </Stack>
  ),
};

/**
 * It draws on mount, so replaying it means mounting it again. That is the
 * honest shape for a full stop: there is no "confirm it a second time".
 */
export const Replay: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={4} align="flex-start">
        <Button size="sm" variant="secondary" onClick={() => setRun(r => r + 1)}>
          다시 실행
        </Button>
        <Stack gap={2} align="center" color="success.main">
          <SuccessCheck key={run} label="리포트 생성 완료" />
          <Text>리포트를 만들었어요</Text>
        </Stack>
      </Stack>
    );
  },
};

/**
 * `currentColor`, so it takes the colour of whatever it sits in. `success.main`
 * is the plain confirmation; `accent.positive` is rationed to the one figure on
 * a screen that says *gained*.
 */
export const Colours: Story = {
  render: () => (
    <HStack gap={8}>
      <Stack gap={1} align="center" color="success.main">
        <SuccessCheck label="저장 완료" />
        <Subtext mb={0}>success.main</Subtext>
      </Stack>
      <Stack gap={1} align="center" color="accent.positive">
        <SuccessCheck label="크레딧 적립 완료" />
        <Subtext mb={0}>accent.positive</Subtext>
      </Stack>
      <Stack gap={1} align="center" color="fg.muted">
        <SuccessCheck label="처리 완료" />
        <Subtext mb={0}>fg.muted</Subtext>
      </Stack>
    </HStack>
  ),
};

/**
 * `size` takes any CSS length or sizing token. The default 48px is where the
 * mark reads as a confirmation; much smaller and it reads as an icon, which is
 * the job `Checkbox` and the icon set already do.
 */
export const Sizes: Story = {
  render: () => (
    <HStack gap={8} align="flex-end" color="success.main">
      {(['32px', '48px', '72px'] as const).map(size => (
        <Stack key={size} gap={1} align="center">
          <SuccessCheck label={`완료 ${size}`} size={size} />
          <Subtext mb={0}>{size}</Subtext>
        </Stack>
      ))}
    </HStack>
  ),
};
