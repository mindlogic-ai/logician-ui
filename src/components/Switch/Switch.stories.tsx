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
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  render: args => (
    <Switch {...args}>
      <Switch.Control />
    </Switch>
  ),
  args: {
    size: 'md',
    disabled: false,
  },
};

export const Controlled: Story = {
  render: args => {
    const [checked, setChecked] = useState(false);

    return (
      <Stack direction="row" align="center" gap={4}>
        <Switch {...args} checked={checked} onCheckedChange={e => setChecked(e.checked)}>
          <Switch.Control />
        </Switch>
        <Text>{checked ? 'On' : 'Off'}</Text>
      </Stack>
    );
  },
  args: {
    size: 'md',
    disabled: false,
  },
};

export const Disabled: Story = {
  render: args => (
    <Switch {...args}>
      <Switch.Control />
    </Switch>
  ),
  args: {
    size: 'md',
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: args => (
    <Switch {...args}>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch>
  ),
  args: {
    size: 'md',
  },
};
