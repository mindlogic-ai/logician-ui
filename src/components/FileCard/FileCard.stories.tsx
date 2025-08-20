import { Meta, StoryFn } from '@storybook/react';

import { FileCard } from './FileCard';

const meta: Meta<typeof FileCard> = {
  title: 'Components/FileCard',
  component: FileCard,
};

export default meta;
type Story = StoryFn<typeof FileCard>;

export const Basic: Story = {
  args: {
    size: 'small',
    fileSize: 1121211,
    fileType: 'image/jpg',
    fileName: 'Test File',
  },
};

export const WithProgress: Story = {
  args: {
    size: 'small',
    fileSize: 11212112111,
    fileType: 'documenet',
    fileName: 'Test File',
    progress: 30,
  },
};
