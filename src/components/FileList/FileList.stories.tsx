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

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `FileList.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoDownloadAndDelete: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: download where there is a URL',
  render: () => (
    <FileList
      files={[
        {
          id: 1,
          name: '2026년 3분기 이용 보고서.pdf',
          size: 482_133,
          fileUrl: '#',
        },
        { id: 2, name: '서비스 이용약관.docx', size: 91_204, fileUrl: '#' },
        { id: 3, name: '업로드 중인 파일.pptx', progress: 40 },
      ]}
      onFileDownload={() => {}}
      onFileDelete={async () => {}}
    />
  ),
};
