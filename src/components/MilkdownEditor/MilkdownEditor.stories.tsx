import type { Meta, StoryObj } from '@storybook/react';
import { MilkdownEditor } from './MilkdownEditor';

const meta = {
  title: 'Components/MilkdownEditor',
  component: MilkdownEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof MilkdownEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  args: {
    defaultValue: sampleMarkdown,
  },
};

export const Empty: Story = {
  args: {
    defaultValue: '',
  },
};
