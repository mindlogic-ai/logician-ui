import { Flex, HStack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { BellIcon } from '../Icon';
import { IconButton } from '../IconButton';
import { CountBadge } from '.';

const meta = {
  title: 'Components/CountBadge',
  component: CountBadge,
  tags: ['autodocs'],
  args: {
    count: 5,
  },
  argTypes: {
    count: { control: 'number' },
    max: { control: 'number' },
    dot: { control: 'boolean' },
    showZero: { control: 'boolean' },
    label: { control: 'text' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof CountBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

/** Above `max` (default 99) the badge reads `99+`. */
export const Capped: Story = {
  args: { count: 120, label: '읽지 않은 알림 120개' },
};

/** Count 0 renders nothing unless `showZero`. */
export const Zero: Story = {
  render: () => (
    <HStack gap={4}>
      <Text textStyle="subtext">count=0 →</Text>
      <CountBadge count={0} />
      <Text textStyle="subtext">showZero →</Text>
      <CountBadge count={0} showZero />
    </HStack>
  ),
};

/** Dot mode: no number. `aria-hidden` unless a `label` is given. */
export const Dot: Story = {
  render: () => (
    <HStack gap={4}>
      <CountBadge dot size="sm" />
      <CountBadge dot />
      <CountBadge dot size="lg" label="새 소식" />
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={4} align="center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <HStack key={size} gap={2}>
          <CountBadge size={size} count={3} />
          <CountBadge size={size} count={42} />
          <CountBadge size={size} count={1000} />
        </HStack>
      ))}
    </Flex>
  ),
};

/** Next to a label, as in a nav item. */
export const InContext: Story = {
  render: () => (
    <HStack gap={2}>
      <Text>받은 편지함</Text>
      <CountBadge count={12} label="읽지 않은 메시지 12개" />
    </HStack>
  ),
};

/**
 * On an icon-only button the count belongs in the BUTTON's `aria-label`:
 * that label replaces the button's whole subtree as its accessible name, so a
 * `label` on the badge would never be announced. The badge stays unlabelled
 * and is only the visible number.
 */
export const OnIconButton: Story = {
  render: () => {
    const unread = 5;
    return (
      <IconButton
        aria-label={`알림, 읽지 않음 ${unread}개`}
        variant="ghost"
        position="relative"
      >
        <BellIcon />
        <CountBadge
          count={unread}
          size="sm"
          position="absolute"
          top="-2px"
          right="-2px"
        />
      </IconButton>
    );
  },
};
