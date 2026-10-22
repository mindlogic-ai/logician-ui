import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { CopyableCode } from './CopyableCode';
import { CopyableCodeProps } from './CopyableCode.types';

const meta = {
  title: 'Components/CopyableCode',
  component: CopyableCode,
  args: {
    children: `const example = 'This is a code example';
console.log(example);`,
    onCopy: () => {
      console.log('Code copied to clipboard');
    },
  },
} satisfies Meta<typeof CopyableCode>;

export default meta;

type Story = StoryObj<typeof CopyableCode>;

export const Basic: Story = {};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `CopyableCode.usage.mdx` with <Canvas of={…} />. Hidden from
// the sidebar (`!dev`); `tags` is written out on each story because the
// indexer reads CSF statically.

/** CopyableCode does not touch the clipboard; the caller's `onCopy` does. */
const copy = (text: string) => () => {
  void navigator.clipboard?.writeText(text);
};

const ENDPOINT = 'https://api.example.com/v1/chat/completions';

export const DoOneLineValue: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: one line the user pastes somewhere else',
  args: { children: ENDPOINT, onCopy: copy(ENDPOINT) },
};

const SCRIPT = `import OpenAI from 'openai';
const client = new OpenAI({ baseURL: '${ENDPOINT}' });
const res = await client.chat.completions.create({ model: 'gpt-4o' });`;

export const DontMultiLine: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a multi-line snippet",
  args: { children: SCRIPT, onCopy: copy(SCRIPT) },
};

export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'bg.surface',
          use: (
            <T
              en="Card surface and the fade under the button"
              ko="카드 바탕과 버튼 아래 흐려지는 부분"
            />
          ),
        },
        { token: 'border.subtle', use: <T en="Card border" ko="카드 테두리" /> },
        {
          token: 'primary.main',
          use: <T en="Copy button (primary)" ko="복사 버튼(primary)" />,
        },
        {
          token: 'fg.onPrimary',
          use: <T en="Copy button label" ko="복사 버튼 글자" />,
        },
      ]}
    />
  ),
};
