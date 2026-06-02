import type { Meta, StoryObj } from '@storybook/react';

import { CodeTabs } from './CodeTabs';

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
