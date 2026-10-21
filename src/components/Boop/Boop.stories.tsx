import { HStack, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { CopyIcon, ShareIcon, StarIcon, ThumbUpIcon } from '../Icon';
import { IconButton } from '../IconButton';
import { Subtext } from '../Typography';
import { Boop } from '.';

/**
 * A hover that answers. The smallest motion in the set and the only one tied to
 * the pointer — for icons that are already interactive, and nothing else.
 */
const meta = {
  title: 'Components/Motion/Boop',
  component: Boop,
  args: { gesture: 'tilt' },
} satisfies Meta<typeof Boop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack gap={3} align="flex-start">
      <Boop>
        <IconButton aria-label="좋아요" variant="secondary">
          <ThumbUpIcon />
        </IconButton>
      </Boop>
      <Subtext color="fg.muted" mb={0}>
        포인터를 올려 보세요. 떼면 제자리로 돌아옵니다. 아무것도 알려주지 않고,
        이미 누를 수 있는 버튼이라는 사실에 반응만 합니다.
      </Subtext>
    </Stack>
  ),
};

/**
 * Three ways to answer. Pick one per surface and keep it — a toolbar whose
 * icons each boop differently reads as three unrelated controls rather than as
 * one toolbar.
 */
export const Gestures: Story = {
  render: () => (
    <HStack gap={10} align="flex-start">
      {(
        [
          { gesture: 'tilt', note: '기운다', Icon: StarIcon },
          { gesture: 'grow', note: '커진다', Icon: CopyIcon },
          { gesture: 'lift', note: '뛰어오른다', Icon: ShareIcon },
        ] as const
      ).map(({ gesture, note, Icon }) => (
        <Stack key={gesture} gap={2} align="center">
          <Boop gesture={gesture}>
            <IconButton aria-label={note} variant="secondary">
              <Icon />
            </IconButton>
          </Boop>
          <Subtext mb={0}>
            {gesture} · {note}
          </Subtext>
        </Stack>
      ))}
    </HStack>
  ),
};
