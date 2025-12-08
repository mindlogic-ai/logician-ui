import { Meta, StoryObj } from '@storybook/react';

import { MaxLengthIndicator } from '.';

const meta = {
  title: 'Components/MaxLengthIndicator',
  component: MaxLengthIndicator,
  args: {
    value: 1,
    maxLength: 50,
  },
  argTypes: {
    value: {
      control: 'number',
    },
    maxLength: {
      control: 'number',
    },
  },
} satisfies Meta<typeof MaxLengthIndicator>;

export default meta;

type Story = StoryObj<typeof MaxLengthIndicator>;

export const Basic: Story = {};
