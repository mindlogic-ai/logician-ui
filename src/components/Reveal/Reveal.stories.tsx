import { Box, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { Reveal } from '.';

/**
 * Opens a block out of zero height instead of inserting it — for content that
 * arrives *underneath* something the reader is already looking at.
 *
 * Opens through `grid-template-rows: 0fr → 1fr`, not through `height`.
 * `height: auto` is not interpolable, which is the only reason this needed
 * JavaScript before.
 */
const meta = {
  title: 'Components/Motion/Reveal',
  component: Reveal,
} satisfies Meta<typeof Reveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [shown, setShown] = useState(false);

    return (
      <Stack gap={3} align="flex-start" maxW="440px">
        <Box
          px={4}
          py={3}
          borderRadius="md"
          border="1px solid"
          borderColor="border.default"
          w="100%"
        >
          <Text fontWeight="600" mb={0}>
            지구의 대기는 78%가 질소다
          </Text>
        </Box>

        <Button size="xs" variant="outline" onClick={() => setShown((v) => !v)}>
          {shown ? '숨기기' : '근거 보기'}
        </Button>

        {shown && (
          <Reveal>
            <Box
              px={4}
              py={3}
              borderRadius="md"
              bg="bg.subtle"
              fontSize="sm"
              color="fg.muted"
            >
              건조 공기 기준 질소 78.08%, 산소 20.95%, 아르곤 0.93%입니다.
              수증기를 포함하면 비율이 달라집니다.
            </Box>
          </Reveal>
        )}

        <Subtext color="fg.muted" mb={0}>
          바로 렌더하면 아래 내용이 한 프레임에 밀립니다. 읽던 자리에서 그
          프레임은 「도착」이 아니라 「페이지가 깨졌다」로 읽힙니다.
        </Subtext>
      </Stack>
    );
  },
};

