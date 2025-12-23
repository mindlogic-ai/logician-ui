import React, { useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'], // Available sizes in Chakra's Switch
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

// Uncontrolled Story: Allows toggling without external state management
export const Uncontrolled: Story = {
  args: {
    size: 'md',
    disabled: false,
  },
};

// Controlled Story: Manage state externally
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    const handleToggle = (e: any) => {
      setChecked(e.checked);
    };

    return (
      <Stack direction="row" align="center" gap={4}>
        <Switch
          {...args}
          checked={checked} // Controlled checked state
          onCheckedChange={handleToggle} // Toggling state
        />
        <Text>{checked ? 'On' : 'Off'}</Text>
      </Stack>
    );
  },
  args: {
    size: 'md',
    disabled: false,
  },
};

// Disabled Story: Switch in a disabled state
export const Disabled: Story = {
  args: {
    size: 'md',
    disabled: true,
    checked: true,
  },
};
