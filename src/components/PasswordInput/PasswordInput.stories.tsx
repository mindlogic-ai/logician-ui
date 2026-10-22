import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import { FieldRow } from '../Form';
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

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `PasswordInput.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoSignInPassword: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: labelled, with autocomplete',
  render: () => (
    <Stack maxW="360px">
      <FieldRow label="비밀번호" required>
        <PasswordInput autoComplete="current-password" />
      </FieldRow>
    </Stack>
  ),
};

export const DoRulesBeforeTyping: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: state the rule before the user types',
  render: () => (
    <Stack maxW="360px">
      <FieldRow
        label="새 비밀번호"
        helperText="영문, 숫자, 특수문자를 섞어 8자 이상 입력합니다."
        required
      >
        <PasswordInput autoComplete="new-password" />
      </FieldRow>
    </Stack>
  ),
};

export const DontRuleOnlyInError: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: reveal the rule only as an error",
  render: () => (
    <Stack maxW="360px">
      <FieldRow
        label="새 비밀번호"
        error="비밀번호가 올바르지 않습니다."
        required
      >
        <PasswordInput autoComplete="new-password" defaultValue="abcd" />
      </FieldRow>
    </Stack>
  ),
};
