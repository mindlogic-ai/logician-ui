import React from 'react';
import { FormControl } from './FormControl';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/FormControl',
  component: FormControl,
} as ComponentMeta<typeof FormControl>;

const Template: ComponentStory<typeof FormControl> = args => (
  <FormControl {...args} />
);

export const Default = Template.bind({});
Default.args = {};
