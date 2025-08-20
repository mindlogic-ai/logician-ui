import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { FileList } from './FileList';
import { FileItemData } from '@/components/FileList/FileList.types';
import { FileGroupProps } from '@/components/FileList/FileList.types';

export default {
  title: 'Components/FileList',
  component: FileList,
} as Meta;

const Template: StoryFn<FileGroupProps> = ({ ...args }) => {
  const [files, setFiles] = useState<FileItemData[]>(args.files);
  const [visibleCount, setVisibleCount] = useState(3);

  const handleFileDelete = (currentFile: FileItemData) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== currentFile.id));
  };

  return (
    <FileList
      {...args}
      files={files}
      onFileDelete={handleFileDelete}
      visibleCount={visibleCount}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  files: [
    {
      id: 1,
      name: 'File1.pdf',
      progress: 100,
      error: false,
    },
    {
      id: 2,
      name: 'Image.png',
      progress: 70,
      error: false,
    },
    {
      id: 3,
      name: 'Document.docx',
      progress: 45,
      error: true,
    },
    {
      id: 4,
      name: 'Presentation.pptx',
      progress: 80,
      error: false,
    },
  ],
  visibleCount: 3,
};
