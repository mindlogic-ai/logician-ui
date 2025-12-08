import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { FileItemData } from '@/components/FileList/FileList.types';

import { FileList } from './FileList';

const meta = {
  title: 'Components/FileList',
  component: FileList,
} satisfies Meta<typeof FileList>;

export default meta;

type Story = StoryObj<typeof FileList>;

export const Default: Story = {
  args: {
    files: [
      {
        id: 1,
        name: 'File1.pdf',
        progress: 100,
      },
      {
        id: 2,
        name: 'Image.png',
        progress: 70,
      },
      {
        id: 3,
        name: 'Document.docx',
        progress: 45,
        error: 'Upload failed',
      },
      {
        id: 4,
        name: 'Presentation.pptx',
        progress: 80,
      },
    ],
    visibleCount: 3,
  },
  render: (args) => {
    const [files, setFiles] = useState<FileItemData[]>(args.files);

    const handleFileDelete = (currentFile: FileItemData) => {
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== currentFile.id)
      );
    };

    return <FileList {...args} files={files} onFileDelete={handleFileDelete} />;
  },
};
