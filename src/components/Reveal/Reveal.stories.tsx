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
  title: 'Components/Reveal',
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

/** The caller owns mounting. It opens; it does not close. */
export const OpensOnly: Story = {
  render: () => (
    <Stack gap={3} maxW="64ch">
      <Text fontWeight="600" mb={0}>
        열고 닫는 것이라면 Collapsible입니다
      </Text>
      <Subtext color="fg.muted" mb={0}>
        <code>Reveal</code>은 마운트될 때 열립니다. 닫히는 애니메이션이 필요하면
        노드가 남아 있어야 하고, 그게 <code>presence</code>를 쓰는{' '}
        <code>Collapsible</code>입니다. <code>FlyTo</code>와 같은 계약 — 보여줄
        때 렌더하고, 끝나면 호출부가 내립니다.
      </Subtext>
      <Subtext color="warning.main" mb={0}>
        ⚠️ 매 프레임 레이아웃 비용이 듭니다. content-height로 여는 일에 내재된
        비용이라 <b>작은 블록에만</b> 쓰세요 — 긴 목록, 테이블, 중첩 스크롤은 안
        됩니다.
      </Subtext>
    </Stack>
  ),
};
