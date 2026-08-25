import { HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { Tag } from '../Tag';
import { Subtext } from '../Typography';
import { Pulse } from '.';

/**
 * Pops once whenever `trigger` changes — for drawing the eye to a value that
 * just updated. Pure CSS: a changed `key` is a new element, and a new element
 * runs its animation from the top.
 */
const meta = {
  title: 'Components/Motion/Pulse',
  component: Pulse,
  args: { trigger: 0 },
} satisfies Meta<typeof Pulse>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The first render never pops — a counter that mounts at 12 has not just become 12. */
export const Default: Story = {
  render: () => {
    const [balance, setBalance] = useState(1250);

    return (
      <Stack gap={4} align="flex-start">
        <Button size="sm" onClick={() => setBalance((b) => b + 50)}>
          +50 크레딧
        </Button>
        <Pulse trigger={balance}>
          <Tag colorPalette="primary" variant="soft">
            {balance.toLocaleString()} 크레딧
          </Tag>
        </Pulse>
        <Subtext color="fg.muted" mb={0}>
          마운트할 때는 조용하고, 값이 바뀔 때만 튑니다.
        </Subtext>
      </Stack>
    );
  },
};

/** `peak` is amplitude. `overshoot` is what makes even 1.12 readable. */
export const Peak: Story = {
  render: () => {
    const [run, setRun] = useState(0);

    return (
      <Stack gap={5} align="flex-start">
        <Button size="sm" onClick={() => setRun((r) => r + 1)}>
          셋 동시 재생
        </Button>
        <HStack gap={8}>
          {[1.12, 1.3, 1.6].map((peak) => (
            <Stack key={peak} gap={2} align="center">
              <Pulse trigger={run} peak={peak}>
                <Badge variant="success">완료</Badge>
              </Pulse>
              <Subtext fontFamily="mono" fontSize="2xs" color="fg.muted" mb={0}>
                {peak}
              </Subtext>
            </Stack>
          ))}
        </HStack>
      </Stack>
    );
  },
};
