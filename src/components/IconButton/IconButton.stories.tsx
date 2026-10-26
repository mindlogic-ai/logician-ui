import { Meta, StoryObj } from '@storybook/react';

import { Box, Flex, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button } from '../Button';
import {
  CopyIcon,
  DownloadIcon,
  EditIcon,
  FaUniversity,
  PlusIcon,
  SendIcon,
  ShareIcon,
  TrashIcon,
} from '../Icon';
import { Tooltip } from '../Tooltip';
import { IconButton, iconButtonVariants, iconButtonVariantStyles } from '.';
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
      description:
        'Role. `ghost` (default): toolbars and row actions, glyph in `fg.icon`. `secondary`: ghost with an outline, for a control that must read as a button on its own. `primary`: black fill, the one main icon action. `danger`: red fill, confirms a destructive step. `action`: the coral send button of a chat composer.',
    },
    isDestructive: {
      control: 'boolean',
      description:
        'Danger-coloured glyph (`danger.fg`) on `ghost` / `secondary`, for a delete icon in a row. Ignored on filled roles.',
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

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `IconButton.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

/** A chat message's action row: copy, edit, share, delete. */
export const DoGhostToolbar: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: ghost icon buttons in a toolbar',
  render: () => (
    <HStack gap={1}>
      <Tooltip content="복사">
        <IconButton aria-label="복사" size="sm">
          <CopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip content="수정">
        <IconButton aria-label="수정" size="sm">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip content="공유">
        <IconButton aria-label="공유" size="sm">
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Tooltip content="삭제">
        <IconButton aria-label="삭제" size="sm" isDestructive>
          <TrashIcon />
        </IconButton>
      </Tooltip>
    </HStack>
  ),
};

export const DontFilledToolbar: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: filled icon buttons in a toolbar",
  render: () => (
    <HStack gap={1}>
      <IconButton aria-label="복사" size="sm" variant="primary">
        <CopyIcon />
      </IconButton>
      <IconButton aria-label="수정" size="sm" variant="primary">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="공유" size="sm" variant="primary">
        <ShareIcon />
      </IconButton>
      <IconButton aria-label="삭제" size="sm" variant="danger">
        <TrashIcon />
      </IconButton>
    </HStack>
  ),
};

/** A chat composer: the coral send button is the one run signal. */
export const DoActionForSend: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: action only for send',
  render: () => (
    <Flex
      align="center"
      gap={2}
      maxW="420px"
      px={4}
      py={2}
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="xl"
      bg="bg.surface"
    >
      <Tooltip content="파일 첨부">
        <IconButton aria-label="파일 첨부" size="sm">
          <PlusIcon />
        </IconButton>
      </Tooltip>
      <Text flex={1} fontSize="sm" color="fg.default">
        지난달 사용량을 요약해 줘
      </Text>
      <IconButton aria-label="보내기" size="sm" variant="action">
        <SendIcon />
      </IconButton>
    </Flex>
  ),
};

export const DontActionForAdd: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: the coral action button for a non-send action",
  render: () => (
    <Flex align="center" justify="space-between" maxW="420px">
      <Text fontWeight="bold" color="fg.default">
        멤버
      </Text>
      <IconButton aria-label="멤버 추가" size="sm" variant="action">
        <PlusIcon />
      </IconButton>
    </Flex>
  ),
};

export const DoTextWhenUnclear: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a labelled Button when the icon is not obvious',
  render: () => (
    <Box>
      <Button variant="secondary" size="sm">
        <DownloadIcon />
        사용 내역 내려받기
      </Button>
    </Box>
  ),
};

export const DontUnclearIcon: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: an icon only you can read",
  render: () => (
    <HStack gap={1}>
      <IconButton aria-label="사용 내역 내려받기" variant="secondary" size="sm">
        <FaUniversity />
      </IconButton>
    </HStack>
  ),
};

type StateStyles = {
  bgColor?: unknown;
  borderColor?: unknown;
  color?: unknown;
  _hover?: { bgColor?: unknown; color?: unknown };
  _active?: { bgColor?: unknown };
};

type Use = { en: string; ko: string };

/**
 * One row per token, listing every role and state that reads it. Read from
 * `iconButtonVariantStyles`, so a recipe change shows up on the next build.
 */
const iconButtonTokenRows = () => {
  const uses = new Map<string, Use[]>();
  const add = (token: unknown, use: Use) => {
    if (typeof token !== 'string' || token === 'transparent') return;
    uses.set(token, [...(uses.get(token) ?? []), use]);
  };
  iconButtonVariants.forEach((variant) => {
    const s = iconButtonVariantStyles[variant] as StateStyles;
    const at = (en: string, ko: string) => ({
      en: `${variant} ${en}`,
      ko: `${variant} ${ko}`,
    });
    add(s.bgColor, at('fill', '바탕'));
    add(s.borderColor, at('border', '테두리'));
    add(s.color, at('icon', '아이콘'));
    add(s._hover?.bgColor, at('hover fill', '마우스 올림 바탕'));
    add(s._hover?.color, at('hover icon', '마우스 올림 아이콘'));
    add(s._active?.bgColor, at('pressed fill', '누름 바탕'));
  });
  add('danger.fg', { en: 'isDestructive icon', ko: 'isDestructive 아이콘' });
  add('disabled.bg', { en: 'disabled fill', ko: '비활성 바탕' });
  add('disabled.fg', { en: 'disabled icon', ko: '비활성 아이콘' });
  add('disabled.fgGhost', {
    en: 'ghost disabled icon',
    ko: 'ghost 비활성 아이콘',
  });
  add('focus.ring', { en: 'keyboard focus ring', ko: '키보드 초점 링' });
  return [...uses].map(([token, list]) => ({
    token,
    use: (
      <T
        en={list.map((u) => u.en).join(', ')}
        ko={list.map((u) => u.ko).join(', ')}
      />
    ),
  }));
};

/** Tokens each role reads, resolved from `IconButton.styles.ts` and the theme. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => <TokenTable rows={iconButtonTokenRows()} />,
};
