import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { AutosizeTextarea, Textarea } from '.';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    disabled: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={args.placeholder ?? 'Type here...'}
      />
    );
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    size: 'md',
    disabled: false,
    maxLength: 200,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Invalid state',
  },
};

export const Autosize: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <AutosizeTextarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={args.placeholder ?? 'Autosize textarea...'}
      />
    );
  },
};
