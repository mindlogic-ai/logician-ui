import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HStack, Stack } from '@chakra-ui/react';

import { Button } from '../Button';
import { FaCheck, FaRegCopy } from '../Icon';
import { Subtext, Text } from '../Typography';
import { Swap } from './Swap';

/**
 * Swaps between labelled states without changing size.
 *
 * A button whose label changes is a moving target: "복사" → "복사 완료" grows the
 * button under the cursor, and if it is positioned from an edge it walks across
 * whatever is next to it. Every case here renders into the same grid cell, so
 * the box is always as wide as its widest state.
 *
 * **Declaration order is the running order.** A case listed before the one
 * showing has already happened and leaves upward; a case listed after has not
 * happened yet and waits below. Everything travels the same way, so a sequence
 * reads as a queue advancing rather than two labels bouncing past each other.
 */
const meta = {
  title: 'Components/Swap',
  component: Swap,
} satisfies Meta<typeof Swap>;

export default meta;
type Story = StoryObj<typeof Swap>;

export const Default: Story = {
  render: () => {
    const [done, setDone] = useState(false);

    return (
      <Stack gap={8} p={6} maxW="520px">
        <div>
          <Text mb={2}>고정된 폭</Text>
          <Button
            colorPalette={done ? 'success' : 'primary'}
            variant="solid"
            size="xs"
            onClick={() => setDone((d) => !d)}
          >
            <Swap value={done ? 'done' : 'idle'}>
              <Swap.Case value="idle">
                <FaRegCopy boxSize="xs" />
                복사
              </Swap.Case>
              <Swap.Case value="done">
                <FaCheck boxSize="xs" />
                복사 완료
              </Swap.Case>
            </Swap>
          </Button>
          <Subtext color="fg.muted" mt={2} mb={0}>
            눌러보세요. 라벨이 두 글자 길어지는데 버튼은 그대로입니다.
          </Subtext>
        </div>

        <div>
          <Text mb={2}>비교 — Swap 없이 같은 라벨 교체</Text>
          <HStack gap={3} align="center">
            <Button
              colorPalette={done ? 'success' : 'primary'}
              variant="solid"
              size="xs"
              onClick={() => setDone((d) => !d)}
            >
              {done ? (
                <>
                  <FaCheck boxSize="xs" /> 복사 완료
                </>
              ) : (
                <>
                  <FaRegCopy boxSize="xs" /> 복사
                </>
              )}
            </Button>
          </HStack>
          <Subtext color="fg.muted" mt={2} mb={0}>
            같은 버튼을 삼항으로 갈아끼운 것. 폭이 바뀌고, 아무것도 교차하지
            않습니다.
          </Subtext>
        </div>
      </Stack>
    );
  },
};

/**
 * Three states, where the direction matters.
 *
 * Watch "저장 중": it rises in from below on the way to `saving`, then leaves
 * upward on the way to `saved` — the same label, moving the same direction each
 * time, because it sits between the other two in declaration order.
 */
export const ThreeStates: Story = {
  render: () => {
    const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
    const cycle = () =>
      setState((s) =>
        s === 'idle' ? 'saving' : s === 'saving' ? 'saved' : 'idle'
      );

    return (
      <Stack gap={3} p={6} align="flex-start">
        <Button colorPalette="primary" variant="solid" onClick={cycle}>
          <Swap value={state}>
            <Swap.Case value="idle">저장</Swap.Case>
            <Swap.Case value="saving">저장하는 중…</Swap.Case>
            <Swap.Case value="saved">
              <FaCheck boxSize="xs" />
              저장했습니다
            </Swap.Case>
          </Swap>
        </Button>
        <Subtext color="fg.muted" mb={0}>
          현재: <b>{state}</b> — 눌러 다음 상태로. 폭은 가장 긴 “저장했습니다”에
          맞춰 고정되고, 라벨은 선언한 순서대로 위로 밀려 올라갑니다.
        </Subtext>
      </Stack>
    );
  },
};
