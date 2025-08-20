import React from 'react';
import { PasswordInput } from './PasswordInput';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
} as Meta<typeof PasswordInput>;

const Template: StoryFn<typeof PasswordInput> = args => (
  <PasswordInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
