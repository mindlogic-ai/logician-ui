import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Select } from '.';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Disabled', value: 'option4', isDisabled: true },
    ],
    defaultValue: { label: 'Option 1', value: 'option1' },
  },
  argTypes: {
    isMulti: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {};

export const Multiselect: Story = {
  args: {
    isMulti: true,
  },
};

export const Combobox: Story = {
  args: {
    isMulti: true,
    isSearchable: true,
  },
};

export const OnScrollToBottom: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option${i + 1}`,
    })),
    onMenuScrollToBottom: () => {
      console.log('scrolled to bottom');
    },
  },
};

export const OnScrollToBottomNewItems: Story = {
  render: (args) => {
    const [options, setOptions] = useState(
      Array.from({ length: 500 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: `option${i + 1}`,
      }))
    );
    return (
      <Select
        {...args}
        options={options}
        isMulti={true}
        isSearchable={true}
        onMenuScrollToBottom={() => {
          console.log('scrolled to bottom');
          setOptions((prev) => [
            ...prev,
            ...Array.from({ length: 500 }, (_, i) => ({
              label: `Option ${prev.length + i + 1}`,
              value: `option${prev.length + i + 1}`,
            })),
          ]);
        }}
      />
    );
  },
};
