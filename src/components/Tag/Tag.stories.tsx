import { useState } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { SYSTEM_HUE_NAMES } from '@/theme/colors';
import { disabledControl } from '@/utils/disabledControl';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { getTagStyles, Tag, tagTones, tagToneStyles } from '.';
import { TagCloseButton } from './TagCloseButton';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Tag',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: tagTones,
      description:
        '`neutral` (default): a plain label. `success` / `warning` / `danger` / `info`: only when the tag reports a status every reader shares. Ignored while `selected` or `category` is set.',
    },
    selected: {
      control: 'boolean',
      description:
        'Filter-chip "on" state (black fill). Passing it, true or false, makes the tag a toggle; with `as="button"` it sets `aria-pressed`.',
    },
    category: {
      control: 'select',
      options: [undefined, ...SYSTEM_HUE_NAMES],
      description:
        'One of twelve category hues. Classifies only: no status meaning. Wins over `tone`.',
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

/** `neutral` + the four status tones. */
export const Tones: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      {tagTones.map((tone) => (
        <Tag key={tone} tone={tone}>
          {tone}
        </Tag>
      ))}
    </Flex>
  ),
};

export const Neutral: Story = { args: { tone: 'neutral', children: 'Draft' } };
export const Success: Story = {
  args: { tone: 'success', children: 'Active' },
};
export const Warning: Story = {
  args: { tone: 'warning', children: 'Review' },
};
export const Danger: Story = { args: { tone: 'danger', children: 'Blocked' } };
export const Info: Story = { args: { tone: 'info', children: 'Beta' } };

/**
 * Filter chips (what `Chip` used to be). Rendered `as="button"` so they are
 * focusable; `selected` fills them black and sets `aria-pressed`.
 */
export const FilterChips: Story = {
  render: function FilterChipsStory() {
    const [on, setOn] = useState<string[]>(['Images']);
    const toggle = (name: string) =>
      setOn((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
    return (
      <Flex gap={2} wrap="wrap">
        {['All', 'Images', 'Documents', 'Code'].map((name) => (
          <Tag
            key={name}
            as="button"
            selected={on.includes(name)}
            onClick={() => toggle(name)}
          >
            {name}
          </Tag>
        ))}
        <Tag as="button" selected={false} disabled>
          Disabled
        </Tag>
      </Flex>
    );
  },
};

/** The 12 category hues, each with a leading mark in `category.{hue}.fg`. */
export const Categories: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      {SYSTEM_HUE_NAMES.map((hue) => (
        <Tag key={hue} category={hue} icon="#">
          {hue}
        </Tag>
      ))}
    </Flex>
  ),
};

/** Tags with a close button for removable items. */
export const Closable: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      {tagTones.map((tone) => (
        <Tag key={tone} tone={tone}>
          {tone}
          <TagCloseButton aria-label={`${tone} 삭제`} />
        </Tag>
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Tag disabled>Neutral</Tag>
      <Tag tone="danger" disabled>
        Danger
      </Tag>
      <Tag as="button" selected disabled>
        Selected
      </Tag>
    </Flex>
  ),
};

/** Example use cases. */
export const UseCases: Story = {
  render: () => (
    <VStack align="start" gap={4}>
      <Box>
        <Text fontWeight="bold" mb={2}>
          Article categories
        </Text>
        <Flex gap={2} wrap="wrap">
          <Tag category="blue">Technology</Tag>
          <Tag category="purple">Design</Tag>
          <Tag category="green">Business</Tag>
          <Tag category="orange">Opinion</Tag>
        </Flex>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          Task status
        </Text>
        <Flex gap={2} wrap="wrap">
          <Tag>Draft</Tag>
          <Tag tone="info">In progress</Tag>
          <Tag tone="warning">Review</Tag>
          <Tag tone="success">Completed</Tag>
          <Tag tone="danger">Blocked</Tag>
        </Flex>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          Active filters
        </Text>
        <Flex gap={2} wrap="wrap">
          <Tag>
            Category: Design
            <TagCloseButton aria-label="Category: Design 필터 삭제" />
          </Tag>
          <Tag>
            Status: Active
            <TagCloseButton aria-label="Status: Active 필터 삭제" />
          </Tag>
        </Flex>
      </Box>
    </VStack>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Tag.usage.mdx` with <Canvas of={…} />. Hidden from the sidebar
// (`!dev`); `tags` is written on each story because the indexer reads CSF
// statically.

const TOPICS = [
  { label: '연구', hue: 'blue' },
  { label: '수업', hue: 'purple' },
  { label: '행정', hue: 'brown' },
] as const;

export const DoCategoryForTopics: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: category hues for topics',
  render: () => (
    <Flex gap={2} wrap="wrap">
      {TOPICS.map(({ label, hue }) => (
        <Tag key={label} category={hue} icon="#">
          {label}
        </Tag>
      ))}
    </Flex>
  ),
};

export const DontToneForTopics: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: status tones for topics",
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Tag tone="success">연구</Tag>
      <Tag tone="danger">수업</Tag>
      <Tag tone="warning">행정</Tag>
    </Flex>
  ),
};

export const DoFilterToggle: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: filter chips as buttons with `selected`',
  render: function DoFilterToggleStory() {
    const [on, setOn] = useState('전체');
    return (
      <Flex gap={2} wrap="wrap" role="group" aria-label="파일 종류">
        {['전체', '이미지', '문서', '코드'].map((name) => (
          <Tag
            key={name}
            as="button"
            selected={on === name}
            onClick={() => setOn(name)}
          >
            {name}
          </Tag>
        ))}
      </Flex>
    );
  },
};

export const DoRemovableWithName: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a remove button with its own name',
  render: function DoRemovableStory() {
    const [items, setItems] = useState(['마케팅팀', '영업팀', '개발팀']);
    return (
      <Flex gap={2} wrap="wrap">
        {items.map((item) => (
          <Tag key={item}>
            {item}
            <TagCloseButton
              type="button"
              aria-label={`${item} 삭제`}
              onClick={() => setItems((prev) => prev.filter((i) => i !== item))}
            />
          </Tag>
        ))}
      </Flex>
    );
  },
};

export const DontSelectedForStatus: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: `selected` to mark a status",
  render: () => (
    <Flex gap={2} wrap="wrap" align="center">
      <Text fontSize="sm">보고서 초안</Text>
      <Tag selected>게시됨</Tag>
    </Flex>
  ),
};

/** Tokens each tone and state reads, from `Tag.styles.ts` and the theme. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => {
    const selected = getTagStyles({ selected: true });
    const category = getTagStyles({ category: 'blue' });
    return (
      <TokenTable
        rows={[
          ...tagTones.flatMap((tone) => [
            {
              token: tagToneStyles[tone].bgColor,
              use: <T en={`${tone} · background`} ko={`${tone} · 배경`} />,
            },
            {
              token: tagToneStyles[tone].color,
              use: <T en={`${tone} · text`} ko={`${tone} · 글자`} />,
            },
            {
              token: tagToneStyles[tone].hoverBorder,
              use: (
                <T
                  en={`${tone} · hover border (interactive)`}
                  ko={`${tone} · 호버 테두리(누를 수 있을 때)`}
                />
              ),
            },
          ]),
          {
            token: selected.bgColor as string,
            use: <T en="selected · background" ko="selected · 배경" />,
          },
          {
            token: selected.color as string,
            use: <T en="selected · text" ko="selected · 글자" />,
          },
          {
            token: category.bgColor as string,
            use: (
              <T
                en="category (blue shown) · background"
                ko="category(예: blue) · 배경"
              />
            ),
          },
          {
            token: 'category.blue.fg',
            use: (
              <T
                en="category (blue shown) · icon mark"
                ko="category(예: blue) · 앞쪽 표시"
              />
            ),
          },
          {
            token: category.color as string,
            use: <T en="category · text" ko="category · 글자" />,
          },
          {
            token: disabledControl.bg,
            use: <T en="disabled · background" ko="disabled · 배경" />,
          },
          {
            token: disabledControl.color,
            use: <T en="disabled · text" ko="disabled · 글자" />,
          },
        ]}
      />
    );
  },
};
