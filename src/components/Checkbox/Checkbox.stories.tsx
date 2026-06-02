import React, { useState } from 'react';
import { HStack, Stack, VStack } from '@chakra-ui/react';
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
  render: args => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
};

export const Checked: Story = {
  render: args => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { checked: true },
};

export const Indeterminate: Story = {
  render: args => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { checked: 'indeterminate' },
};

export const Disabled: Story = {
  render: args => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  render: args => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { disabled: true, checked: true },
};

export const DisabledIndeterminate: Story = {
  render: args => (
    <Checkbox {...args}>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { disabled: true, checked: 'indeterminate' },
};

export const WithLabel: Story = {
  render: args => (
    <Checkbox {...args}>
      <Checkbox.Control />
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={6} align="center">
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
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
  render: args => (
    <Checkbox {...args}>
      <Checkbox.Label>Label on the left</Checkbox.Label>
      <Checkbox.Control />
    </Checkbox>
  ),
  args: { checked: false },
};

export const RichLabel: Story = {
  render: args => (
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
      setSelected(prev =>
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
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
          {items.map(item => (
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
