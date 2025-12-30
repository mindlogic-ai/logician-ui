import { Meta, StoryObj } from '@storybook/react';

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
