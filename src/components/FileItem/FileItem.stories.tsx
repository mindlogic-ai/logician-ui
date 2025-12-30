import { Meta, StoryObj } from '@storybook/react';

import { FileItem } from './FileItem';

const meta = {
  title: 'Components/FileItem',
  component: FileItem,
} satisfies Meta<typeof FileItem>;

export default meta;

type Story = StoryObj<typeof FileItem>;

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

export const WithDownload: Story = {
  args: {
    fileName: 'Test File',
    onFileDownload: () => {},
  },
};

export const WithDelete: Story = {
  args: {
    fileName: 'Test File',
    onFileDelete: () => {},
  },
};
