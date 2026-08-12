import { Box, HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Button } from '../Button';
import { Subtext, Text } from '../Typography';
import { Skeleton, SkeletonCircle, SkeletonText } from './Skeleton';

/**
 * # Skeleton
 *
 * 아직 도착하지 않은 내용의 자리를 잡아 두는 블록입니다. 스피너와 달리 **레이아웃을
 * 미리 그리므로**, 데이터가 도착할 때 페이지가 튀지 않습니다.
 *
 * 움직임은 `shimmer` · `pulse` 프리셋에서 옵니다 — 컴포넌트가 duration을 직접
 * 들고 있지 않습니다. `prefers-reduced-motion`이 켜져 있으면 둘 다 **멈춥니다**:
 * 자리표시자가 무엇인지는 모양이 말해 주지, 움직임이 말해 주는 게 아니기
 * 때문입니다.
 */
const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { height: '5', width: '260px' },
};

/**
 * 셋의 차이는 **폭**에서 갈립니다. shimmer는 블록 전체를 가로지르므로 넓은
 * 블록에서만 움직임으로 읽히고, 아바타만 한 너비에서는 한 번 깜빡인 것처럼
 * 보입니다. 그래서 `SkeletonCircle`의 기본값은 `pulse`입니다.
 */
export const Animations: Story = {
  render: () => (
    <Stack gap={6} maxW="520px">
      {(['shimmer', 'pulse', 'none'] as const).map((animation) => (
        <Stack key={animation} gap={2}>
          <Text fontFamily="mono" fontSize="sm" mb={0}>
            {animation}
          </Text>
          <HStack gap={4}>
            <SkeletonCircle size="12" animation={animation} />
            <Skeleton height="5" flex="1" animation={animation} />
          </HStack>
        </Stack>
      ))}
      <Subtext color="fg.muted" mb={0}>
        <code>none</code>은 오래 떠 있을 자리표시자, 또는 이미 움직이는 것 안에
        들어가는 자리표시자에 씁니다.
      </Subtext>
    </Stack>
  ),
};

/**
 * `loading`이 `false`가 되면 진짜 내용이 짧은 페이드로 드러납니다. 로딩 중에도
 * 자식의 박스는 유지되므로, 도착 전후로 레이아웃이 움직이지 않습니다.
 */
export const LoadingSwap: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    // 실제 요청처럼 한 번 돌려 보고 다시 세울 수 있게.
    useEffect(() => {
      if (!loading) return;
      const id = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(id);
    }, [loading]);

    return (
      <Stack gap={5} maxW="520px">
        <HStack gap={4} align="flex-start">
          <SkeletonCircle size="12" loading={loading}>
            <Box w="12" h="12" borderRadius="full" bg="primary.main" />
          </SkeletonCircle>
          <Stack gap={2} flex="1">
            <Skeleton loading={loading} height="5">
              <Text mb={0}>정서강</Text>
            </Skeleton>
            {/* `SkeletonText`는 줄 수만큼 같은 블록을 반복해 그리므로 자식을
                넘기지 않습니다 — 넘기면 줄마다 같은 내용이 복제됩니다. */}
            {loading ? (
              <SkeletonText noOfLines={2} gap="2" />
            ) : (
              <Subtext color="fg.muted" mb={0}>
                요청이 끝나면 이 자리에 진짜 문장이 들어옵니다. 자리표시자가
                이미 같은 높이를 차지하고 있어 페이지가 튀지 않습니다.
              </Subtext>
            )}
          </Stack>
        </HStack>
        <Button size="xs" variant="outline" onClick={() => setLoading(true)}>
          다시 불러오기
        </Button>
      </Stack>
    );
  },
};

/**
 * 문단은 줄마다 따로 도착하지 않습니다 — 한 덩어리의 글이므로 줄들이 같은
 * 리듬으로 함께 흐릅니다. 항목마다 따로 도착해야 하는 건 목록이고, 그건
 * `staggerProps`의 몫입니다.
 */
export const Paragraph: Story = {
  render: () => (
    <Stack gap={4} maxW="520px">
      <SkeletonText noOfLines={4} gap="3" />
    </Stack>
  ),
};
