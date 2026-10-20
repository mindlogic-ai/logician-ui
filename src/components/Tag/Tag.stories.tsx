import { useState } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { SYSTEM_HUE_NAMES } from '@/theme/colors';

import { Tag, tagTones } from '.';
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
      description: 'Colour role; `neutral` (grey wash) is the default',
    },
    selected: {
      control: 'boolean',
      description: 'Filter-chip "on" state (black fill)',
    },
    category: {
      control: 'select',
      options: [undefined, ...SYSTEM_HUE_NAMES],
      description: 'Decorative category hue (no status meaning)',
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
