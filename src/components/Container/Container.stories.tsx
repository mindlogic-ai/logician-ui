import React from 'react';
import { ContainerProps } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import * as CSS from 'csstype';

import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
};

export default meta;
type Story = StoryFn<typeof Container>;

const containerStoryStyles = {
  bg: 'red',
  p: 32,
  textAlign: 'center' as CSS.Property.TextAlign,
};

export const Basic: Story = (props: ContainerProps) => {
  return (
    <Container {...containerStoryStyles} {...props}>
      Container
    </Container>
  );
};
