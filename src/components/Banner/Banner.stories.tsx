import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { VStack } from '@chakra-ui/react';

import { Banner } from './Banner';
import { Subtext, H5 } from '../Typography';

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

// Size with Typography components
export const AllSizes: ComponentStory<typeof Banner> = () => (
  <VStack spacing={4} align="stretch">
    <Banner size="sm" variant="info">
      <Subtext color="inherit">Small banner with Subtext component</Subtext>
    </Banner>
    <Banner size="md" variant="success">
      Medium banner with Text component (default)
    </Banner>
    <Banner size="lg" variant="warning">
      <H5>Large banner with H5 component</H5>
    </Banner>
  </VStack>
);
