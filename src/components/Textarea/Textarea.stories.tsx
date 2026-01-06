import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Textarea } from '.';

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
    placeholder: 'Invalid state',
    invalid: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Textarea
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span style={{ color: '#D01721', fontSize: '14px' }}>
          This field contains an error. Please fix it.
        </span>
      </div>
    );
  },
};
