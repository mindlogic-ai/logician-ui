import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FormControl } from './FormControl';

export default {
  title: 'Components/FormControl',
  component: FormControl,
} as ComponentMeta<typeof FormControl>;

const Template: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args} />
);

export const Default = Template.bind({});
Default.args = {};
