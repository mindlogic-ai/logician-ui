import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Tag } from './Tag';
import { TagCloseButton } from './TagCloseButton';

export default {
  title: 'Components/Tag',
  component: Tag,
  args: {
    children: 'Insert your tag',
  },
} as Meta<typeof Tag>;

const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Closable = Template.bind({});
Closable.args = {
  children: (
    <>
      Insert your tag
      <TagCloseButton />
    </>
  ),
};
