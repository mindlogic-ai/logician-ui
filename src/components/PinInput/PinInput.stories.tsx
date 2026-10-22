import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Stack } from '@chakra-ui/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { FieldRow } from '../Form';
import { Subtext } from '../Typography';
import { PinInput } from '.';

const meta = {
  title: 'Components/PinInput',
  component: PinInput,
  args: {
    length: 5,
  },
  argTypes: {
    length: { control: 'number' },
    type: {
      control: 'select',
      options: ['numeric', 'alphanumeric', 'alphabetic'],
    },
    autoFocus: { control: 'boolean' },
    otp: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof PinInput>;

const Controlled = (args: React.ComponentProps<typeof PinInput>) => {
  const [value, setValue] = useState('');
  return <PinInput {...args} value={value} onChange={setValue} />;
};

export const Numeric: Story = {
  args: { length: 6, type: 'numeric' },
  render: (args) => <Controlled {...args} />,
};

export const Alphanumeric: Story = {
  args: { length: 6, type: 'alphanumeric' },
  render: (args) => <Controlled {...args} />,
};

export const Otp: Story = {
  args: { length: 6, type: 'numeric', otp: true, autoFocus: true },
  render: (args) => <Controlled {...args} />,
};

export const Disabled: Story = {
  args: { length: 5, disabled: true },
  render: (args) => <Controlled {...args} />,
};

export const Invalid: Story = {
  args: { length: 5, invalid: true },
  render: (args) => <Controlled {...args} />,
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `PinInput.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoSayWhereTheCodeWent: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: say where the code was sent',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Stack gap={2} maxW="420px">
        <Subtext color="fg.muted">
          name@company.com 으로 보낸 6자리 코드를 입력하세요.
        </Subtext>
        <PinInput
          length={6}
          type="numeric"
          otp
          value={value}
          onChange={setValue}
        />
      </Stack>
    );
  },
};

export const DontCodeWithoutContext: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: boxes with no context",
  render: () => <PinInput length={6} type="numeric" />,
};

export const DoErrorBelow: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a wrong code, in words',
  render: () => (
    <Stack maxW="420px">
      <FieldRow error="코드가 맞지 않습니다. 메일을 다시 확인해 주세요.">
        <PinInput length={6} type="numeric" value="123456" invalid />
      </FieldRow>
    </Stack>
  ),
};

/** Tokens each box reads, as written in `PinInput.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.surface', use: <T en="Box background" ko="칸 배경" /> },
        { token: 'fg.default', use: <T en="Character" ko="글자" /> },
        {
          token: 'border.control',
          use: <T en="Border at rest" ko="평소 테두리" />,
        },
        {
          token: 'fg.icon',
          use: <T en="Border on hover" ko="마우스를 올렸을 때 테두리" />,
        },
        {
          token: 'primary.main',
          use: <T en="Border and ring on focus" ko="초점 테두리와 링" />,
        },
        {
          token: 'danger.solid',
          use: <T en="Border when invalid" ko="오류 상태 테두리" />,
        },
        {
          token: 'disabled.bg',
          use: <T en="Disabled background" ko="비활성 배경" />,
        },
        {
          token: 'disabled.fg',
          use: <T en="Disabled text" ko="비활성 글자" />,
        },
      ]}
    />
  ),
};
