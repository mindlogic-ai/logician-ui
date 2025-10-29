import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import {
  FileGroupProps,
  FileItemData,
} from '@/components/FileList/FileList.types';

import { FileList } from './FileList';

export default {
  title: 'Components/FileList',
  component: FileList,
} as Meta;

const Template: StoryFn<FileGroupProps> = ({ ...args }) => {
  const [files, setFiles] = useState<FileItemData[]>(args.files);
  const [visibleCount, setVisibleCount] = useState(3);

  const handleFileDelete = (currentFile: FileItemData) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.id !== currentFile.id)
    );
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

export const InteractionTest: StoryFn = () => {
  const [displayFiles, setDisplayFiles] = useState<FileItemData[]>([
    {
      id: 1,
      name: 'Document.pdf',
      size: 1024000, // 1 MB
      progress: 100,
      error: false,
      fileUrl: 'https://example.com/document.pdf',
    },
    {
      id: 2,
      name: 'Image.png',
      size: 512000, // 500 KB
      progress: 100,
      error: false,
      fileUrl: 'https://example.com/image.png',
    },
    {
      id: 3,
      name: 'Presentation.pptx',
      size: 2048000, // 2 MB
      progress: 100,
      error: false,
      fileUrl: 'https://example.com/presentation.pptx',
    },
  ]);

  const [multipleFiles, setMultipleFiles] = useState<FileItemData[]>([
    { id: 1, name: 'File1.pdf', size: 1024000, progress: 100, error: false },
    { id: 2, name: 'File2.pdf', size: 2048000, progress: 100, error: false },
    { id: 3, name: 'File3.pdf', size: 512000, progress: 100, error: false },
    { id: 4, name: 'File4.pdf', size: 3072000, progress: 100, error: false },
    { id: 5, name: 'File5.pdf', size: 256000, progress: 100, error: false },
  ]);

  const emptyFiles: FileItemData[] = [];

  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);
  const [deleteCount, setDeleteCount] = useState(0);

  const handleFileDelete = async (currentFile: FileItemData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setDisplayFiles((prevFiles) =>
      prevFiles.filter((file) => file.id !== currentFile.id)
    );
    setDeleteCount(prev => prev + 1);
  };

  const handleMultipleFileDelete = async (currentFile: FileItemData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setMultipleFiles((prevFiles) =>
      prevFiles.filter((file) => file.id !== currentFile.id)
    );
  };

  const handleFileDownload = (file: FileItemData) => {
    setDownloadedFiles(prev => [...prev, file.name]);
  };

  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      {/* Happy Path: 파일 정보 표시 */}
      <Box data-testid="display-container">
        <Box mb={2} fontSize="md" fontWeight="bold">
          File Display
        </Box>
        <FileList
          files={displayFiles}
          onFileDelete={handleFileDelete}
          onFileDownload={handleFileDownload}
          visibleCount={3}
        />
        {deleteCount > 0 && (
          <Box mt={2} fontSize="sm" color="gray.600" data-testid="delete-count">
            Deleted {deleteCount} file(s)
          </Box>
        )}
        {downloadedFiles.length > 0 && (
          <Box mt={2} fontSize="sm" color="gray.600" data-testid="downloaded-files">
            Downloaded: {downloadedFiles.join(', ')}
          </Box>
        )}
      </Box>

      {/* Happy Path: 여러 파일 리스트 + "See More" */}
      <Box data-testid="multiple-container">
        <Box mb={2} fontSize="md" fontWeight="bold">
          Multiple Files with Pagination
        </Box>
        <FileList
          files={multipleFiles}
          onFileDelete={handleMultipleFileDelete}
          visibleCount={3}
        />
      </Box>

      {/* Bad Path: 빈 파일 리스트 */}
      <Box data-testid="empty-container">
        <Box mb={2} fontSize="md" fontWeight="bold">
          Empty File List
        </Box>
        <Box data-testid="empty-wrapper">
          <FileList files={emptyFiles} visibleCount={3} />
        </Box>
        <Box fontSize="sm" color="gray.600" mt={2}>
          빈 파일 리스트일 때는 아무것도 렌더링되지 않습니다
        </Box>
      </Box>
    </Box>
  );
};

InteractionTest.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('파일 정보가 올바르게 표시되는지 확인', async () => {
    const displayContainer = canvas.getByTestId('display-container');

    // FileList가 렌더링되었는지 확인
    await expect(displayContainer).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 파일 이름이 표시되는지 확인
    await expect(displayContainer.textContent).toContain('Document.pdf');
    await expect(displayContainer.textContent).toContain('Image.png');
    await expect(displayContainer.textContent).toContain('Presentation.pptx');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 파일 크기가 표시되는지 확인 (formatFileSize 함수가 형식화)
    // 1 MB = 1024000 bytes = "1.00 MB"
    await expect(displayContainer.textContent).toContain('MB');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 삭제 버튼이 있는지 확인
    const deleteButtons = within(displayContainer).getAllByRole('button', {
      name: /remove uploaded file button/i,
    });
    await expect(deleteButtons.length).toBeGreaterThanOrEqual(3);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다운로드 버튼이 있는지 확인
    const downloadButtons = within(displayContainer).getAllByRole('button', {
      name: /download uploaded file button/i,
    });
    await expect(downloadButtons.length).toBeGreaterThanOrEqual(3);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('삭제 버튼 클릭 시 파일이 제거되는지 확인', async () => {
    const displayContainer = canvas.getByTestId('display-container');

    // 초기 파일 개수 확인
    const initialDeleteButtons = within(displayContainer).getAllByRole('button', {
      name: /remove uploaded file button/i,
    });
    const initialCount = initialDeleteButtons.length;
    await expect(initialCount).toBeGreaterThanOrEqual(3);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 첫 번째 파일 삭제
    await userEvent.click(initialDeleteButtons[0]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 파일이 제거되었는지 확인
    const deleteCount = canvas.getByTestId('delete-count');
    await expect(deleteCount).toHaveTextContent('Deleted 1 file(s)');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 삭제 버튼 개수가 줄었는지 확인
    const updatedDeleteButtons = within(displayContainer).getAllByRole('button', {
      name: /remove uploaded file button/i,
    });
    await expect(updatedDeleteButtons.length).toBe(initialCount - 1);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 다운로드 버튼 클릭 테스트
    const downloadButtons = within(displayContainer).getAllByRole('button', {
      name: /download uploaded file button/i,
    });
    if (downloadButtons.length > 0) {
      await userEvent.click(downloadButtons[0]);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 다운로드가 기록되었는지 확인
      const downloadedFiles = canvas.getByTestId('downloaded-files');
      await expect(downloadedFiles).toBeInTheDocument();
      await expect(downloadedFiles.textContent).toContain('Downloaded:');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  });

  await step('여러 파일이 리스트로 표시되는지 확인', async () => {
    const multipleContainer = canvas.getByTestId('multiple-container');

    // 파일이 여러 개 표시되는지 확인
    await expect(multipleContainer.textContent).toContain('File1.pdf');
    await expect(multipleContainer.textContent).toContain('File2.pdf');
    await expect(multipleContainer.textContent).toContain('File3.pdf');
    await new Promise(resolve => setTimeout(resolve, 500));

    // "See More" 버튼이 표시되는지 확인 (5개 파일 중 3개만 표시)
    // translate('see_more')는 "더보기" 또는 "See more"
    const seeMoreButton = within(multipleContainer).getByRole('button', {
      name: /더보기|see more/i,
    });
    await expect(seeMoreButton).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // "See More" 버튼에 파일 개수 정보가 표시되는지 확인
    await expect(seeMoreButton.textContent).toMatch(/3\/5/);
    await new Promise(resolve => setTimeout(resolve, 500));

    // "See More" 버튼 클릭
    await userEvent.click(seeMoreButton);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 추가 파일이 표시되는지 확인
    await expect(multipleContainer.textContent).toContain('File4.pdf');
    await new Promise(resolve => setTimeout(resolve, 500));

    // 삭제 버튼 개수 확인 (최소 4개 이상)
    const deleteButtons = within(multipleContainer).getAllByRole('button', {
      name: /remove uploaded file button/i,
    });
    await expect(deleteButtons.length).toBeGreaterThanOrEqual(4);
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  await step('빈 파일 리스트일 때 처리되는지 확인', async () => {
    const emptyContainer = canvas.getByTestId('empty-container');

    // 빈 리스트는 null을 반환하므로 아무것도 렌더링되지 않음
    await expect(emptyContainer).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));

    // FileList 컴포넌트가 렌더링되지 않았는지 확인
    // (빈 wrapper 내부에 파일 관련 요소가 없어야 함)
    const emptyWrapper = canvas.getByTestId('empty-wrapper');
    const fileButtons = within(emptyWrapper).queryAllByRole('button');
    await expect(fileButtons.length).toBe(0);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 안내 텍스트가 표시되는지 확인
    await expect(emptyContainer.textContent).toContain('빈 파일 리스트일 때는 아무것도 렌더링되지 않습니다');
    await new Promise(resolve => setTimeout(resolve, 500));
  });
};
