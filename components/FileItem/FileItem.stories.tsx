import { Meta, StoryObj } from '@storybook/react';

import { FileItem } from './FileItem';
import { FileItemProps } from '@/components/FileItem/FileItem.types';

const meta: Meta<typeof FileItem> = {
  title: 'Components/FileItem',
  component: FileItem,
};

export default meta;

type Story = StoryObj<FileItemProps>;

export const Basic: Story = {
  args: {
    fileName: 'Test File',
  },
};

export const WithProgress: Story = {
  args: {
    fileName: 'Test File',
    progress: 30,
  },
};
