import React, { useState } from 'react';
import { Stack, Switch, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    isChecked: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'], // Available sizes in Chakra's Switch
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

// Uncontrolled Story: Allows toggling without external state management
export const Uncontrolled: Story = {
  args: {
    size: 'md',
    isDisabled: false,
  },
};

// Controlled Story: Manage state externally
export const Controlled: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
      setIsChecked(!isChecked);
    };

    return (
      <Stack direction="row" align="center" spacing={4}>
        <Switch
          {...args}
          isChecked={isChecked} // Controlled isChecked state
          onChange={handleToggle} // Toggling state
        />
        <Text>{isChecked ? 'On' : 'Off'}</Text>
      </Stack>
    );
  },
  args: {
    size: 'md',
    isDisabled: false,
  },
};

// Disabled Story: Switch in a disabled state
export const Disabled: Story = {
  args: {
    size: 'md',
    isDisabled: true,
    isChecked: true,
  },
};
