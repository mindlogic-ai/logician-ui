import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Code } from './Code';
import { CodeProps } from './Code.types';

const meta: Meta<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  args: {
    children: `const t = 'test';`,
  },
};

export default meta;

const Template: StoryFn<CodeProps> = (args: CodeProps) => <Code {...args} />;

export const Basic: StoryFn<CodeProps> = Template.bind({});
Basic.args = {};

export const Copyable: StoryFn<CodeProps> = Template.bind({});
Copyable.args = {
  onCopy: (str) => {
    navigator.clipboard.writeText(str);
    console.log(str);
  },
};
