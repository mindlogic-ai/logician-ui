import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CopyableCode } from './CopyableCode';
import { CopyableCodeProps } from './CopyableCode.types';

const meta: Meta<typeof CopyableCode> = {
  title: 'Components/CopyableCode',
  component: CopyableCode,
  args: {
    children: `const example = 'This is a code example';
console.log(example);`,
    onCopy: () => {
      console.log('Code copied to clipboard');
    },
  },
};

export default meta;

const Template: StoryFn<CopyableCodeProps> = (args: CopyableCodeProps) => (
  <CopyableCode {...args} />
);

export const Basic: StoryFn<CopyableCodeProps> = Template.bind({});
Basic.args = {};
