import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = args => (
  <Breadcrumb {...args} />
);

export const Default = Template.bind({});
Default.args = {};
