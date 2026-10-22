import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Text } from '../Typography';
import { InlineCode } from './InlineCode';

const meta = {
  title: 'Components/InlineCode',
  component: InlineCode,
  args: {
    children: 'model_id',
  },
} satisfies Meta<typeof InlineCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

/** In running text, where it is meant to be used. */
export const InSentence: Story = {
  render: (args) => (
    <Text>
      요청 본문의 <InlineCode {...args} /> 칸에 모델 이름을 넣습니다.
    </Text>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `InlineCode.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

export const DoIdentifierInSentence: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: names the user types or sees in code',
  render: () => (
    <Text>
      응답이 끊기면 <InlineCode>finish_reason</InlineCode> 값이{' '}
      <InlineCode>length</InlineCode>인지 확인하세요.
    </Text>
  ),
};

export const DontEmphasis: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: code styling for emphasis",
  render: () => (
    <Text>
      이 작업은 <InlineCode>되돌릴 수 없습니다</InlineCode>.
    </Text>
  ),
};

export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'bg.subtle', use: <T en="Chip fill" ko="칩 배경" /> },
        { token: 'fg.default', use: <T en="Text" ko="글자" /> },
        {
          token: 'border.subtle',
          use: <T en="1px ring (box-shadow)" ko="1px 테두리(box-shadow)" />,
        },
      ]}
    />
  ),
};
