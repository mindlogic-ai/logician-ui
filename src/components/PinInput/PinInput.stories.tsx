import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PinInput } from '.';

const meta = {
  title: 'Components/PinInput',
  component: PinInput,
  args: {
    length: 5,
  },
  argTypes: {
    length: { control: 'number' },
    type: {
      control: 'select',
      options: ['numeric', 'alphanumeric', 'alphabetic'],
    },
    autoFocus: { control: 'boolean' },
    otp: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof PinInput>;

const Controlled = (args: React.ComponentProps<typeof PinInput>) => {
  const [value, setValue] = useState('');
  return <PinInput {...args} value={value} onChange={setValue} />;
};

export const Numeric: Story = {
  args: { length: 6, type: 'numeric' },
  render: (args) => <Controlled {...args} />,
};

export const Alphanumeric: Story = {
  args: { length: 6, type: 'alphanumeric' },
  render: (args) => <Controlled {...args} />,
};

export const Otp: Story = {
  args: { length: 6, type: 'numeric', otp: true, autoFocus: true },
  render: (args) => <Controlled {...args} />,
};

export const Disabled: Story = {
  args: { length: 5, disabled: true },
  render: (args) => <Controlled {...args} />,
};

export const Invalid: Story = {
  args: { length: 5, invalid: true },
  render: (args) => <Controlled {...args} />,
};
