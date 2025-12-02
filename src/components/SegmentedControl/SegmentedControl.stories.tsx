import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Icon, HStack, Text } from '@chakra-ui/react';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

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

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  options: [
    {
      label: (
        <HStack spacing={2}>
          <Icon as={FiHome} />
          <Text>Home</Text>
        </HStack>
      ),
      value: 'home',
    },
    {
      label: (
        <HStack spacing={2}>
          <Icon as={FiUser} />
          <Text>Profile</Text>
        </HStack>
      ),
      value: 'profile',
    },
    {
      label: (
        <HStack spacing={2}>
          <Icon as={FiSettings} />
          <Text>Settings</Text>
        </HStack>
      ),
      value: 'settings',
    },
  ],
};
