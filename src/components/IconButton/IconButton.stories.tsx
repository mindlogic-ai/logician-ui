import { Meta, StoryObj } from '@storybook/react';

import { Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { FaUniversity, SendIcon, TrashIcon } from '../Icon';
import { IconButton, iconButtonVariants } from '.';
import { IconButtonVariant } from './IconButton.types';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    children: <FaUniversity />,
    'aria-label': 'University',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: iconButtonVariants,
      description: 'Role. Default `ghost`.',
    },
    isDestructive: {
      control: 'boolean',
      description: 'Danger icon on ghost / secondary',
    },
    children: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    variant: 'ghost',
  },
};

/**
 * Different sizes of icon buttons.
 */
export const Sizes: Story = {
  render: (args) => (
    <HStack gap={4} align="center">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <VStack key={size} gap={1}>
          <Text fontSize="sm" color="fg.muted">
            {size}
          </Text>
          <IconButton {...args} size={size} variant="primary" />
        </VStack>
      ))}
    </HStack>
  ),
};

const NOTES: Record<IconButtonVariant, string> = {
  ghost: '기본 — fg.icon, hover 시 워시',
  secondary: '테두리 있는 ghost',
  primary: 'BAZE 블랙 면',
  danger: '빨간 면',
  action: '보내기 — 코랄 면 + 블랙 화살표',
};

/**
 * Every role, enabled and disabled.
 */
export const Variants: Story = {
  render: (args) => (
    <Grid templateColumns="max-content max-content max-content 1fr" gap={4}>
      {iconButtonVariants.map((variant) => (
        <HStack key={variant} display="contents">
          <Text fontSize="sm" fontWeight="semibold" color="fg.default">
            {variant}
          </Text>
          <IconButton {...args} variant={variant} />
          <IconButton {...args} variant={variant} disabled />
          <Text fontSize="sm" color="fg.muted">
            {NOTES[variant]}
          </Text>
        </HStack>
      ))}
    </Grid>
  ),
};

/**
 * `isDestructive`: a delete icon in a row. Ghost and secondary only.
 */
export const Destructive: Story = {
  render: () => (
    <HStack gap={4}>
      <IconButton aria-label="삭제" isDestructive>
        <TrashIcon />
      </IconButton>
      <IconButton aria-label="삭제" variant="secondary" isDestructive>
        <TrashIcon />
      </IconButton>
      <IconButton aria-label="삭제" isDestructive disabled>
        <TrashIcon />
      </IconButton>
    </HStack>
  ),
};

/**
 * `action` is the coral SEND button of a chat composer (`send.*` tokens).
 * Disabled (nothing typed yet) is the fixed disabled pair.
 */
export const ActionSend: Story = {
  render: () => (
    <HStack gap={4}>
      <IconButton aria-label="보내기" variant="action">
        <SendIcon />
      </IconButton>
      <IconButton aria-label="보내기" variant="action" disabled>
        <SendIcon />
      </IconButton>
    </HStack>
  ),
};
