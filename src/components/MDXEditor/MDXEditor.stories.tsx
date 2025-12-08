import type { Meta, StoryObj } from '@storybook/react';

import { MDXEditor } from './MDXEditor';

const meta = {
  title: 'Components/MDXEditor',
  component: MDXEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof MDXEditor>;

export default meta;

type Story = StoryObj<typeof MDXEditor>;

const sampleMarkdown = `# Hello World
This is a sample markdown text. You can:
- Make lists
- **Bold text**
- *Italic text*
- Create [links](https://example.com)
## Second Level Heading
> This is a blockquote
1. Numbered lists
2. Work too!
---
### Try the editor out!
`;

const sampleMarkdownWithError = `
Sample Link (<https://example.com>)
`;

export const Default: Story = {
  args: {
    markdown: sampleMarkdown,
  },
};

export const Empty: Story = {
  args: {
    markdown: '',
  },
};

export const WithPlaceholder: Story = {
  args: {
    markdown: '',
    placeholder: '마크다운을 입력해보세요...',
  },
};

export const Error: Story = {
  args: {
    markdown: sampleMarkdownWithError,
  },
};
