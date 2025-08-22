import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ProgressBar } from '.';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {},
  argTypes: {
    value: { control: 'number' },
  },
};

export default meta;
type Story = StoryFn<typeof ProgressBar>;

export const Basic: Story = (args) => <ProgressBar {...args} />;
