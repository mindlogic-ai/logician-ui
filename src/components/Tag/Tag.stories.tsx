import { Meta, StoryObj } from '@storybook/react';

import { Tag } from './Tag';
import { TagCloseButton } from './TagCloseButton';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Insert your tag',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Tag {...args} />,
};

export const Closable: Story = {
  args: {
    children: (
      <>
        Insert your tag
        <TagCloseButton />
      </>
    ),
  },
};
