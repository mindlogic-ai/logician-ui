import React, { useState } from 'react';
import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

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
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    disabled: true,
    checked: 'indeterminate',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <Checkbox {...args}>Accept terms and conditions</Checkbox>
  ),
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={6} align="center">
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <VStack key={size} gap={2}>
          <Checkbox size={size} checked={true}>
            {size}
          </Checkbox>
        </VStack>
      ))}
    </HStack>
  ),
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
      setSelected(prev =>
        prev.includes(item)
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    };

    return (
      <Stack gap={3}>
        <Checkbox
          checked={allSelected ? true : someSelected ? 'indeterminate' : false}
          onCheckedChange={handleSelectAll}
        >
          Select All
        </Checkbox>
        <Stack gap={2} pl={6}>
          {items.map(item => (
            <Checkbox
              key={item}
              checked={selected.includes(item)}
              onCheckedChange={() => handleToggle(item)}
            >
              {item}
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    );
  },
};
