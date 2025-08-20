import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AvatarInput } from './AvatarInput'; // Adjust the path as necessary

export default {
  title: 'Components/AvatarInput',
  component: AvatarInput,
} as ComponentMeta<typeof AvatarInput>;

const Template: ComponentStory<typeof AvatarInput> = args => (
  <AvatarInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
