import { Stack, Box, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PhoneFilledIcon, SearchIcon, MailIcon } from '@/components/Icon';
import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { FieldRow } from '../Form';
import { MaxLengthIndicator } from '../MaxLengthIndicator';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
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
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {};

export const ControlledWithValue: Story = {
  args: {
    placeholder: 'Type something...',
  },
  render: (args) => {
    const [value, setValue] = useState('Initial value');

    return (
      <Stack gap={4}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text fontSize="sm" color="fg.muted">
          Current value: "{value}"
        </Text>
      </Stack>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    return (
      <Stack gap={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Small
          </Text>
          <Input size="sm" placeholder="Small input" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Medium (default)
          </Text>
          <Input size="md" placeholder="Medium input" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Large
          </Text>
          <Input size="lg" placeholder="Large input" />
        </Box>
      </Stack>
    );
  },
};

export const WithStates: Story = {
  render: () => {
    return (
      <Stack gap={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Normal
          </Text>
          <Input placeholder="Normal state" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Disabled
          </Text>
          <Input placeholder="Disabled state" disabled value="Disabled" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Read Only
          </Text>
          <Input placeholder="Read only" readOnly value="Read only value" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Invalid (with error border)
          </Text>
          <Input placeholder="Invalid state" invalid />
        </Box>
      </Stack>
    );
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Max 20 characters',
    maxLength: 20,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Stack gap={2}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MaxLengthIndicator value={value.length} maxLength={20} />
      </Stack>
    );
  },
};

export const LeftIcon: Story = {
  args: {
    placeholder: 'Phone number',
    size: 'md',
    disabled: false,
    leftIcon: <PhoneFilledIcon color="fg.icon" />,
  },
};

export const RightIcon: Story = {
  args: {
    placeholder: 'Search...',
    size: 'md',
    disabled: false,
    rightIcon: <SearchIcon color="fg.icon" />,
  },
};

export const BothIcons: Story = {
  args: {
    placeholder: 'Email address',
    leftIcon: <MailIcon color="fg.icon" />,
    rightIcon: <SearchIcon color="fg.icon" />,
  },
};

export const NumberWithMask: Story = {
  args: {
    placeholder: 'Enter amount',
    type: 'number',
    maskNumber: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Stack gap={2}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text fontSize="sm" color="fg.muted">
          Raw value: {value}
        </Text>
        <Text fontSize="xs" color="fg.subtle">
          Numbers are automatically formatted with commas
        </Text>
      </Stack>
    );
  },
};

export const TrimWhiteSpace: Story = {
  args: {
    placeholder: 'No leading/trailing spaces allowed',
    trimWhiteSpace: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Stack gap={2}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text fontSize="xs" color="fg.subtle">
          Try typing spaces at the beginning or end
        </Text>
      </Stack>
    );
  },
};

export const NoSpaces: Story = {
  args: {
    placeholder: 'No spaces allowed at all',
    noSpaces: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Stack gap={2}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text fontSize="xs" color="fg.subtle">
          Try typing spaces - they will be removed
        </Text>
      </Stack>
    );
  },
};

export const FocusState: Story = {
  args: {
    placeholder: 'Click to see focus border (primary.main)',
  },
  render: (args) => {
    return (
      <Stack gap={2}>
        <Input {...args} />
        <Text fontSize="xs" color="fg.subtle">
          Focus border should be primary.main color
        </Text>
      </Stack>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Input.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

export const DoLabelAbove: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a label above the field',
  render: () => (
    <Box maxW="360px">
      <FieldRow
        label="업무용 이메일"
        helperText="초대 메일이 이 주소로 갑니다."
        required
      >
        <Input
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
        />
      </FieldRow>
    </Box>
  ),
};

export const DontPlaceholderAsLabel: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: the placeholder as the label",
  render: () => (
    <Box maxW="360px">
      <Input type="email" placeholder="업무용 이메일" />
    </Box>
  ),
};

export const DoErrorInWords: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: say what is wrong, under the field',
  render: () => (
    <Box maxW="360px">
      <FieldRow label="업무용 이메일" error="이메일 주소 형식이 아닙니다.">
        <Input type="email" value="name@company" onChange={() => {}} />
      </FieldRow>
    </Box>
  ),
};

export const DontBorderOnly: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a red border and nothing else",
  render: () => (
    <Box maxW="360px">
      <Input type="email" value="name@company" onChange={() => {}} invalid />
    </Box>
  ),
};

export const DoMaskedAmount: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: maskNumber for amounts',
  render: () => {
    const [value, setValue] = useState('2000000');
    return (
      <Box maxW="360px">
        <FieldRow
          label="월 크레딧 한도"
          helperText={`저장되는 값: ${value || '(비어 있음)'}`}
        >
          <Input
            type="number"
            maskNumber
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FieldRow>
      </Box>
    );
  },
};

export const DoCountWithLimit: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: show the limit next to maxLength',
  render: () => {
    const [value, setValue] = useState('마케팅팀');
    return (
      <Box maxW="360px">
        <FieldRow
          label="그룹 이름"
          endAdornment={
            <MaxLengthIndicator value={value.length} maxLength={20} />
          }
        >
          <Input
            maxLength={20}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FieldRow>
      </Box>
    );
  },
};

/**
 * Tokens Input reads. Input has no styles file — the values are written in
 * `Input.tsx` (and mirrored by `Select.styles.ts`); this list follows that file.
 */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'bg.surface',
          use: <T en="Field background" ko="입력란 배경" />,
        },
        { token: 'fg.default', use: <T en="Typed text" ko="입력한 글자" /> },
        {
          token: 'border.control',
          use: (
            <T
              en="Border at rest (3:1 against the page)"
              ko="평소 테두리(배경과 3:1)"
            />
          ),
        },
        {
          token: 'fg.icon',
          use: <T en="Border on hover" ko="마우스를 올렸을 때 테두리" />,
        },
        {
          token: 'primary.main',
          use: (
            <T
              en="Border and 1px ring on focus"
              ko="초점을 받았을 때 테두리와 1px 링"
            />
          ),
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
          token: 'border.subtle',
          use: <T en="Read-only border" ko="읽기 전용 테두리" />,
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
