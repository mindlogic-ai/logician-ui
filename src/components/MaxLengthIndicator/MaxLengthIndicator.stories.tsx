import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { MaxLengthIndicator } from '.';

const meta: Meta<typeof MaxLengthIndicator> = {
  title: 'Components/MaxLengthIndicator',
  component: MaxLengthIndicator,
  args: {
    value: 1,
    maxLength: 50,
  },
  argTypes: {
    value: {
      control: 'number',
    },
    maxLength: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryFn<typeof MaxLengthIndicator>;

export const Basic: Story = (args) => <MaxLengthIndicator {...args} />;
