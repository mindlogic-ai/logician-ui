import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { InfoBlock } from './InfoBlock';

const meta: Meta<typeof InfoBlock> = {
  title: 'Components/InfoBlock',
  component: InfoBlock,
  args: {
    variant: 'default',
    label: 'Let me tell you why this is important.',
    children: 'This is the stuff. The reeeeally good stuff',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'danger'],
    },
  },
};

export default meta;
type Story = StoryFn<typeof InfoBlock>;

export const Basic: Story = args => {
  return <InfoBlock {...args} />;
};
