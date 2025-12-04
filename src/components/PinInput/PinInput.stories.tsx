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
  },
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof PinInput>;

export const Basic: Story = {
  args: {
    length: 5,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return <PinInput {...args} value={value} onChange={setValue} />;
  },
}
