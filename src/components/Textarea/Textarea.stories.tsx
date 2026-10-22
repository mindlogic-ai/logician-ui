import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Box } from '@chakra-ui/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { FieldRow } from '../Form';
import { Input } from '../Input';
import { MaxLengthIndicator } from '../MaxLengthIndicator';
import { Textarea } from '.';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    disabled: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={args.placeholder ?? 'Type here...'}
      />
    );
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    size: 'md',
    disabled: false,
    maxLength: 200,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid state',
    invalid: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Textarea
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span
          style={{
            color: 'var(--chakra-colors-danger-fg)',
            fontSize: '14px',
          }}
        >
          This field contains an error. Please fix it.
        </span>
      </div>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Textarea.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

const INSTRUCTIONS =
  '답변은 존댓말로 합니다. 근거가 되는 문서가 있으면 제목을 함께 알려 줍니다.';

export const DoInstructionsWithCount: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: long text with a label and a count',
  render: () => {
    const [value, setValue] = useState(INSTRUCTIONS);
    return (
      <Box maxW="420px">
        <FieldRow
          label="시스템 지시문"
          helperText="챗봇이 모든 대화에서 따르는 규칙입니다."
          endAdornment={
            <MaxLengthIndicator value={value.length} maxLength={500} />
          }
        >
          <Textarea
            rows={4}
            maxLength={500}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FieldRow>
      </Box>
    );
  },
};

export const DontSingleValue: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a textarea for a one-line value",
  render: () => (
    <Box maxW="420px">
      <FieldRow label="그룹 이름">
        <Textarea rows={4} value="마케팅팀" onChange={() => {}} />
      </FieldRow>
    </Box>
  ),
};

export const DoSingleValueInInput: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: an Input for a one-line value',
  render: () => (
    <Box maxW="420px">
      <FieldRow label="그룹 이름">
        <Input value="마케팅팀" onChange={() => {}} />
      </FieldRow>
    </Box>
  ),
};

/** Tokens Textarea reads, as written in `Textarea.tsx` (same set as Input). */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.surface', use: <T en="Background" ko="배경" /> },
        { token: 'fg.default', use: <T en="Text" ko="글자" /> },
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
          token: 'bg.subtle',
          use: <T en="Read-only background" ko="읽기 전용 배경" />,
        },
        {
          token: 'fg.muted',
          use: <T en="Read-only text" ko="읽기 전용 글자" />,
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
