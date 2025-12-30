import type { Meta, StoryObj } from '@storybook/react';

import { FormControl } from './FormControl';

const meta = {
  title: 'Components/FormControl',
  component: FormControl,
} satisfies Meta<typeof FormControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
