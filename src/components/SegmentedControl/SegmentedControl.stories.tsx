import { HStack, Icon, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FiHome, FiSettings, FiUser } from 'react-icons/fi';

import { SegmentedControl } from './SegmentedControl';

const meta = {
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
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Uncontrolled = {
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
};

export const Controlled: Story = {
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
  render: (props) => {
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
  },
};

export const Rounded: Story = {
  args: {
    borderRadius: 'full',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    w: 'fit-content',
  },
};

export const WithDisabledOption = {
  args: {
    options: [
      {
        label: 'Complete',
        value: 'complete',
      },
      {
        label: 'Incomplete',
        value: 'incomplete',
        disabled: true,
      },
      {
        label: 'Pending',
        value: 'pending',
      },
    ],
  },
};

export const EditableLabel: StoryObj<
  React.ComponentProps<typeof SegmentedControl> & { firstLabel?: string }
> = {
  args: {
    firstLabel: 'Complete',
  },
  argTypes: {
    firstLabel: {
      control: 'text',
      name: 'First item label',
    },
  },
  render: ({ firstLabel, ...props }) => (
    <SegmentedControl
      {...props}
      options={[
        { label: firstLabel as string, value: 'complete' },
        { label: 'Incomplete', value: 'incomplete' },
        { label: 'Pending', value: 'pending' },
      ]}
    />
  ),
};

export const WithCustomContent = {
  args: {
    options: [
      {
        label: (
          <HStack gap={2}>
            <Icon as={FiHome} />
            <Text>Home</Text>
          </HStack>
        ),
        value: 'home',
      },
      {
        label: (
          <HStack gap={2}>
            <Icon as={FiUser} />
            <Text>Profile</Text>
          </HStack>
        ),
        value: 'profile',
      },
      {
        label: (
          <HStack gap={2}>
            <Icon as={FiSettings} />
            <Text>Settings</Text>
          </HStack>
        ),
        value: 'settings',
      },
    ],
  },
};
