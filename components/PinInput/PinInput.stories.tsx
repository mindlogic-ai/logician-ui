import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { PinInput, PinInputProps } from '.';

const meta: Meta<typeof PinInput> = {
  title: 'Components/PinInput',
  component: PinInput,
  args: {
    length: 5,
  },
  argTypes: {
    length: { control: 'number' },
  },
};

export default meta;

const Template: StoryFn<PinInputProps> = (args: PinInputProps) => {
  const [value, setValue] = useState('');

  return <PinInput {...args} value={value} onChange={setValue} />;
};

export const Basic: StoryFn<PinInputProps> = Template.bind({});
Basic.args = {};
