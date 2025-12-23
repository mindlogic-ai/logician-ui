import React, { useState } from 'react';
import { Stack, Switch, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

// Create types for story components since Switch is a namespace in v3
type SwitchRootProps = React.ComponentProps<typeof Switch.Root>;
const SwitchRoot = Switch.Root as React.FC<SwitchRootProps & { children?: React.ReactNode }>;

type SwitchControlProps = React.ComponentProps<typeof Switch.Control>;
const SwitchControl = Switch.Control as React.FC<SwitchControlProps & { children?: React.ReactNode }>;

const meta = {
  title: 'Components/Switch',
  component: SwitchRoot,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof SwitchRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

// Uncontrolled Story: Allows toggling without external state management
export const Uncontrolled: Story = {
  args: {
    size: 'md',
    disabled: false,
  },
  render: (args) => (
    <SwitchRoot {...args}>
      <Switch.HiddenInput />
      <SwitchControl>
        <Switch.Thumb />
      </SwitchControl>
    </SwitchRoot>
  ),
};

// Controlled Story: Manage state externally
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Stack direction="row" align="center" gap={4}>
        <SwitchRoot
          {...args}
          checked={checked}
          onCheckedChange={(details) => setChecked(details.checked)}
        >
          <Switch.HiddenInput />
          <SwitchControl>
            <Switch.Thumb />
          </SwitchControl>
        </SwitchRoot>
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
  render: (args) => (
    <SwitchRoot {...args}>
      <Switch.HiddenInput />
      <SwitchControl>
        <Switch.Thumb />
      </SwitchControl>
    </SwitchRoot>
  ),
};
