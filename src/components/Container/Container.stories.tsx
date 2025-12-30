import { Meta, StoryObj } from '@storybook/react';

import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  args: {
    children: 'Container',
    bg: 'primary.lighter',
    p: 32,
    textAlign: 'center',
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
