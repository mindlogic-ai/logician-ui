import React from 'react';
import { Checkbox } from './Checkbox';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = args => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {};
