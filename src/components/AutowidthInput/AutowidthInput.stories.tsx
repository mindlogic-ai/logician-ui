import type { Meta, StoryObj } from '@storybook/react';

import { AutowidthInput } from './AutowidthInput';

const meta = {
  title: 'Components/AutowidthInput',
  component: AutowidthInput,
  args: {
    value: 'test',
  },
} satisfies Meta<typeof AutowidthInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: 'test',
  },
};

export const AsHeading: Story = {
  args: {
    value: 'Heading Text',
  },
};
