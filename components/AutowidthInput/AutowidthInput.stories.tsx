import { Meta, StoryFn } from '@storybook/react';

import { AutowidthInput } from './AutowidthInput';

const meta: Meta<typeof AutowidthInput> = {
  title: 'Components/AutowidthInput',
  component: AutowidthInput,
};

export default meta;
type Story = StoryFn<typeof AutowidthInput>;

export const Basic: Story = {
  args: {
    value: 'test',
  },
};

export const AsHeading: Story = {
  args: {
    value: 'test',
  },
};
