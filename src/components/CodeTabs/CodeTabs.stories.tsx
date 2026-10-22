import type { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { CodeTabs } from './CodeTabs';
import { CODE_CHROME } from './CodeTabs.styles';

const meta = {
  title: 'Components/CodeTabs',
  component: CodeTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CodeTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const CODE_SAMPLES = {
  javascript: `
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello, javascript?" }],
});
`,
  python: `
response = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello, python?"}]
)
`,
  typescript: `
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello, typescript?" }],
});
`,
};

export const Default: Story = {
  args: {
    code: CODE_SAMPLES,
  },
};

export const WithCopyFunction: Story = {
  args: {
    code: CODE_SAMPLES,
    onCopy: (code: string) => {
      console.log('Copied code:', code);
    },
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `CodeTabs.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

export const DoSameCallPerLanguage: Story = {
  tags: ['!dev'],
  name: 'Usage / Do: one call, one tab per language',
  args: { code: CODE_SAMPLES, onCopy: () => {} },
};

export const DontStepsAsTabs: Story = {
  tags: ['!dev'],
  name: "Usage / Don't: different steps behind language tabs",
  args: {
    code: {
      bash: 'npm install openai',
      javascript: "const client = new OpenAI({ apiKey: process.env.API_KEY });",
      json: '{ "model": "gpt-4o", "stream": true }',
    },
  },
};

const CHROME_USE = {
  bg: { en: 'Surface (tab bar and code)', ko: '바탕(탭 막대와 코드)' },
  bgHover: { en: 'Tab and copy hover', ko: '탭과 복사 버튼 호버' },
  bgActive: { en: 'Copy pressed', ko: '복사 버튼 누름' },
  fg: {
    en: 'Selected tab; unselected at 70%, divider at 15%',
    ko: '선택된 탭. 선택 안 된 탭은 70%, 구분선은 15%',
  },
} as const;

/** Read from `CODE_CHROME` in `CodeTabs.styles.ts`; alpha variants folded in. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  name: 'Usage / Tokens',
  args: { code: CODE_SAMPLES },
  render: () => (
    <TokenTable
      rows={(Object.keys(CHROME_USE) as (keyof typeof CHROME_USE)[]).map(
        (role) => ({
          token: CODE_CHROME[role],
          use: <T {...CHROME_USE[role]} />,
        })
      )}
    />
  ),
};
