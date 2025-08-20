import React, { useRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    options: [
      {
        label: 'Complete',
        value: 'complete',
      },
      {
        label: 'Incomplete',
        value: 'incomplete',
      },
      {
        label: 'Pending',
        value: 'pending',
      },
    ],
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryFn<typeof SegmentedControl>;

const Template: Story = (props: any) => <SegmentedControl {...props} />;

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  options: [
    {
      label: 'Complete',
      value: 'complete',
    },
    {
      label: 'Incomplete',
      value: 'incomplete',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
  ],
};

export const Controlled: Story = (props: any) => {
  const [selectedValue, setSelectedValue] = useState<string>('complete');
  return (
    <SegmentedControl
      {...props}
      value={selectedValue}
      onSelect={(val: string) => {
        setSelectedValue(val);
        console.log('changed to ', val);
      }}
    />
  );
};
Controlled.args = {
  options: [
    {
      label: 'Complete',
      value: 'complete',
    },
    {
      label: 'Incomplete',
      value: 'incomplete',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
  ],
};

export const Rounded = Template.bind({});
Rounded.args = {
  borderRadius: 'full',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  borderRadius: 'full',
  w: 'fit-content',
};
