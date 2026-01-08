import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSizes: Story = {
  render: () => (
    <Stack maxW="300px">
      <PasswordInput placeholder="xs" size="xs" />
      <PasswordInput placeholder="sm" size="sm" />
      <PasswordInput placeholder="md" size="md" />
      <PasswordInput placeholder="lg" size="lg" />
    </Stack>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <Stack maxW="300px">
        <PasswordInput
          defaultValue="secret"
          visible={visible}
          onVisibleChange={setVisible}
        />
        <Text>Password is {visible ? 'visible' : 'hidden'}</Text>
      </Stack>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'password123',
  },
};
