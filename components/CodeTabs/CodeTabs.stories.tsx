import type { Meta, StoryObj } from '@storybook/react';

import { CodeTabs } from './CodeTabs';

const meta: Meta<typeof CodeTabs> = {
  title: 'Components/CodeTabs',
  component: CodeTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CodeTabs>;

const CODE_SAMPLES = {
  javascript: `
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello, how are you?" }],
});
`,
  python: `
response = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello, how are you?"}]
)
`,
  typescript: `
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello, how are you?" }],
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
