import React, { useState } from 'react';
import { HStack, Stack, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Text } from '../Typography';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: { type: 'select' },
      options: [true, false, 'indeterminate'],
    },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
};

export const Checked: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { checked: true },
};

export const Indeterminate: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { checked: 'indeterminate' },
};

export const Disabled: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { disabled: true, checked: true },
};

export const DisabledIndeterminate: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { disabled: true, checked: 'indeterminate' },
};

export const WithLabel: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Control />
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={6} align="center">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <VStack key={size} gap={2}>
          <Checkbox size={size} checked={true}>
            <Checkbox.Control />
            <Checkbox.Label>{size}</Checkbox.Label>
          </Checkbox>
        </VStack>
      ))}
    </HStack>
  ),
};

export const LeftLabel: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Label>Label on the left</Checkbox.Label>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { checked: false },
};

export const RichLabel: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <Checkbox.Control />
      <Checkbox.Label>
        Accept our <a href="/terms">Terms of Service</a>
      </Checkbox.Label>
    </Checkbox>
  ),
  args: { checked: false },
};

export const Group: Story = {
  render: () => {
    const items = ['Apple', 'Banana', 'Cherry', 'Date'];
    const [selected, setSelected] = useState<string[]>([]);

    const allSelected = selected.length === items.length;
    const someSelected = selected.length > 0 && !allSelected;

    const handleSelectAll = () => {
      if (allSelected || someSelected) {
        setSelected([]);
      } else {
        setSelected([...items]);
      }
    };

    const handleToggle = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };

    return (
      <Stack gap={3}>
        <Checkbox
          checked={allSelected ? true : someSelected ? 'indeterminate' : false}
          onCheckedChange={handleSelectAll}
        >
          <Checkbox.Control />
          <Checkbox.Label>Select All</Checkbox.Label>
        </Checkbox>
        <Stack gap={2} pl={6}>
          {items.map((item) => (
            <Checkbox
              key={item}
              checked={selected.includes(item)}
              onCheckedChange={() => handleToggle(item)}
            >
              <Checkbox.Control />
              <Checkbox.Label>{item}</Checkbox.Label>
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Checkbox.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`); `tags`
// is written out on each story because the indexer reads CSF statically.

const CHANNELS = ['이메일', '앱 알림', '문자'];

export const DoLabelledList: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: several independent choices',
  render: () => (
    <Stack gap={2}>
      <Text fontWeight="semibold">알림 받을 곳</Text>
      {CHANNELS.map((channel, i) => (
        <Checkbox key={channel} defaultChecked={i === 0}>
          <Checkbox.Control />
          <Checkbox.Label>{channel}</Checkbox.Label>
        </Checkbox>
      ))}
    </Stack>
  ),
};

export const DoSelectAll: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: indeterminate for a partial select-all',
  render: () => {
    const [checked, setChecked] = useState([true, false, true]);
    const all = checked.every(Boolean);
    const some = checked.some(Boolean);
    return (
      <Stack gap={2}>
        <Checkbox
          checked={all ? true : some ? 'indeterminate' : false}
          onCheckedChange={() => setChecked(checked.map(() => !all))}
        >
          <Checkbox.Control />
          <Checkbox.Label>전체 선택</Checkbox.Label>
        </Checkbox>
        <Stack gap={2} pl={6}>
          {CHANNELS.map((channel, i) => (
            <Checkbox
              key={channel}
              checked={checked[i]}
              onCheckedChange={(e) =>
                setChecked(checked.map((v, j) => (j === i ? !!e.checked : v)))
              }
            >
              <Checkbox.Control />
              <Checkbox.Label>{channel}</Checkbox.Label>
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    );
  },
};

export const DontNegativeLabel: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a negative label",
  render: () => (
    <Checkbox>
      <Checkbox.Control />
      <Checkbox.Label>마케팅 메일 받지 않기</Checkbox.Label>
    </Checkbox>
  ),
};

export const DoHiddenLabelInTable: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a hidden label when the row names it',
  render: () => (
    <HStack gap={3}>
      <Checkbox>
        <Checkbox.Control />
        <Checkbox.Label srOnly>김민지 선택</Checkbox.Label>
      </Checkbox>
      <Text>김민지</Text>
      <Text color="fg.muted">minji@company.com</Text>
    </HStack>
  ),
};

/** Tokens `CheckboxControl` reads, as written in `CheckboxControl.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'bg.surface',
          use: <T en="Unchecked box" ko="선택 전 상자" />,
        },
        {
          token: 'border.control',
          use: <T en="Unchecked border (3:1)" ko="선택 전 테두리(3:1)" />,
        },
        {
          token: 'primary.main',
          use: (
            <T en="Checked and indeterminate fill" ko="선택·일부 선택 채움" />
          ),
        },
        { token: 'fg.onPrimary', use: <T en="Check mark" ko="체크 표시" /> },
        { token: 'disabled.bg', use: <T en="Disabled box" ko="비활성 상자" /> },
        {
          token: 'disabled.fg',
          use: <T en="Disabled mark" ko="비활성 표시" />,
        },
        {
          token: 'focus.ring',
          use: <T en="Keyboard focus ring" ko="키보드 초점 링" />,
        },
      ]}
    />
  ),
};
