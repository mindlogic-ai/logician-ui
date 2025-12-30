import { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';
import { CodeProps } from './Code.types';

const meta = {
  title: 'Components/Code',
  component: Code,
  args: {
    children: `const t = 'test';`,
  },
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof Code>;

export const Basic: Story = {
  args: {
    children: `const t = 'test';`,
  },
};

export const Copyable: Story = {
  args: {
    children: `const t = 'test';`,
    onCopy: (str) => {
      navigator.clipboard.writeText(str);
      console.log(str);
    },
  },
};