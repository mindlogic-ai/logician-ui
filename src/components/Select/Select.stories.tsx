import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Select } from '.';

const meta: Meta<typeof Select> = {
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
};

export default meta;
type Story = StoryFn<typeof Select>;

export const Basic: Story = args => <Select {...args} />;

export const Multiselect: Story = args => <Select {...args} isMulti={true} />;
export const Combobox: Story = args => (
  <Select {...args} isMulti={true} isSearchable={true} />
);
export const OnScrollToBottom: Story = args => (
  <Select
    {...args}
    options={Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option${i + 1}`,
    }))}
    onMenuScrollToBottom={() => {
      console.log('scrolled to bottom');
    }}
  />
);

export const OnScrollToBottomNewItems: Story = args => {
  const [options, setOptions] = React.useState(
    Array.from({ length: 500 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option${i + 1}`,
    })),
  );
  return (
    <Select
      {...args}
      options={options}
      isMulti={true}
      isSearchable={true}
      onMenuScrollToBottom={() => {
        console.log('scrolled to bottom');
        setOptions(prev => [
          ...prev,
          ...Array.from({ length: 500 }, (_, i) => ({
            label: `Option ${prev.length + i + 1}`,
            value: `option${prev.length + i + 1}`,
          })),
        ]);
      }}
    />
  );
};
