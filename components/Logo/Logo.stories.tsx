import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Logo } from '.';
import { LogoProps } from './Logo.types';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
};

export default meta;
type Story = StoryFn<typeof Logo>;

export const Basic: Story = (props: LogoProps) => {
  return <Logo />;
};
