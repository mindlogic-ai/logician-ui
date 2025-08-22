import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Banner } from './Banner';

export default {
  title: 'Components/Banner',
  component: Banner,
  args: {
    children: 'This is a banner message',
  },
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />;

export const Info = Template.bind({});
Info.args = {
  variant: 'info',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: 'Operation completed successfully!',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: 'warning',
  children: 'Please review your changes before continuing.',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  children: 'An error occurred. Please try again.',
};
