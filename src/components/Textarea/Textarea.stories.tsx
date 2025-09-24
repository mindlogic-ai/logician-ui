import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { AutosizeTextarea, Textarea } from '.';

const meta: Meta<typeof Textarea> = {
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
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    maxLength: { control: 'number' },
    minRows: { control: 'number' },
    maxRows: { control: 'number' },
    preFocusMaxRows: { control: 'number' },
  },
};

export default meta;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState('');

  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={args.placeholder ?? 'Type here...'}
    />
  );
};

export const Basic: StoryFn = Template.bind({});
Basic.args = {
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  maxLength: 200,
};

export const Disabled: StoryFn = Template.bind({});
Disabled.args = {
  isDisabled: true,
  placeholder: 'Disabled textarea',
};

export const Invalid: StoryFn = Template.bind({});
Invalid.args = {
  isInvalid: true,
  placeholder: 'Invalid state',
};

export const Autosize: StoryFn = (args) => {
  const [value, setValue] = useState('');

  return (
    <AutosizeTextarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={args.placeholder ?? 'Autosize textarea...'}
    />
  );
};
Autosize.args = {
  minRows: 6,
  preFocusMaxRows: 8,
  maxRows: 12,
};
