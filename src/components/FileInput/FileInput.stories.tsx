import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';

import { FileInput, FileInputProps } from '.';

const meta: Meta = {
  title: 'Components/FileInput',
  component: FileInput,
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryFn<FileInputProps>;

const Template: Story = ({ ...args }) => {
  const [bgImage, setBgImage] = useState<string>();
  const handleChange = (filePath: string) => {
    if (filePath.startsWith('data:image')) {
      setBgImage(filePath);
    }
  };
  return (
    <FileInput
      {...args}
      onChange={(files: FileList | null) => {
        if (files && files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            if (result && result.startsWith('data:image')) {
              setBgImage(result);
            }
          };
          reader.readAsDataURL(file);
        }
      }}
      bgImage={bgImage}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {};

/**
 * Component Test: FileInput 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 파일 선택 시 파일 정보가 표시되는지
 * - 여러 파일 선택 가능한지 (multiple)
 *
 * Bad Path:
 * - accept 타입 외의 파일 선택 시 거부되는지
 * - maxSize 초과 파일 거부되는지
 */
type InteractionStory = StoryObj<typeof FileInput>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [normalFiles, setNormalFiles] = useState<FileList | null>(null);
    const [multipleFiles, setMultipleFiles] = useState<FileList | null>(null);
    const [acceptFiles, setAcceptFiles] = useState<FileList | null>(null);
    const [sizeFiles, setSizeFiles] = useState<FileList | null>(null);

    const handleNormalChange = (fileList: FileList | null) => {
      setNormalFiles(fileList);
    };

    const handleMultipleChange = (fileList: FileList | null) => {
      setMultipleFiles(fileList);
    };

    const handleAcceptChange = (fileList: FileList | null) => {
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        // accept="image/*" 체크
        if (file.type.startsWith('image/')) {
          setAcceptFiles(fileList);
        }
      }
    };

    const handleSizeChange = (fileList: FileList | null) => {
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const maxSize = 1024 * 1024; // 1MB
        if (file.size <= maxSize) {
          setSizeFiles(fileList);
        }
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Normal File Input
          </div>
          <div data-testid="normal-container">
            <FileInput
              onChange={handleNormalChange}
              name="normal-file-input"
            />
          </div>
          {normalFiles && normalFiles.length > 0 && (
            <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="normal-result">
              Selected: {normalFiles[0].name} ({normalFiles[0].size} bytes)
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Multiple File Input
          </div>
          <div data-testid="multiple-container">
            <FileInput
              onChange={handleMultipleChange}
              multiple
              name="multiple-file-input"
            />
          </div>
          {multipleFiles && multipleFiles.length > 0 && (
            <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="multiple-result">
              Files: {Array.from(multipleFiles).map(f => f.name).join(', ')}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Accept Image Only
          </div>
          <div data-testid="accept-container">
            <FileInput
              onChange={handleAcceptChange}
              accept="image/*"
              name="accept-file-input"
            />
          </div>
          {acceptFiles && acceptFiles.length > 0 && (
            <div style={{ marginTop: '8px', fontSize: '14px', color: 'green' }} data-testid="accept-result">
              Accepted: {acceptFiles[0].name}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Max Size 1MB
          </div>
          <div data-testid="size-container">
            <FileInput
              onChange={handleSizeChange}
              name="size-file-input"
            />
          </div>
          {sizeFiles && sizeFiles.length > 0 && (
            <div style={{ marginTop: '8px', fontSize: '14px', color: 'green' }} data-testid="size-result">
              Accepted: {sizeFiles[0].name} ({sizeFiles[0].size} bytes)
            </div>
          )}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step('파일 선택 시 파일 정보가 표시되는지 확인', async () => {
      const container = canvasElement.querySelector('[data-testid="normal-container"]');
      const fileInput = container?.querySelector('input[name="normal-file-input"]') as HTMLInputElement;

      if (!fileInput) {
        throw new Error('File input not found');
      }

      // 테스트용 파일 생성
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;

      // change 이벤트 트리거
      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 파일 정보가 표시되는지 확인
      const result = canvasElement.querySelector('[data-testid="normal-result"]');
      await expect(result).toBeTruthy();
      await expect(result?.textContent).toContain('test.txt');
    });

    await step('여러 파일 선택 가능한지 확인', async () => {
      const container = canvasElement.querySelector('[data-testid="multiple-container"]');
      const multipleInput = container?.querySelector('input[name="multiple-file-input"]') as HTMLInputElement;

      if (!multipleInput) {
        throw new Error('Multiple file input not found');
      }

      // multiple 속성 확인
      await expect(multipleInput).toHaveAttribute('multiple');

      // 여러 파일 생성
      const file1 = new File(['content1'], 'file1.txt', { type: 'text/plain' });
      const file2 = new File(['content2'], 'file2.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file1);
      dataTransfer.items.add(file2);
      multipleInput.files = dataTransfer.files;

      const event = new Event('change', { bubbles: true });
      multipleInput.dispatchEvent(event);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 여러 파일 이름이 표시되는지 확인
      const result = canvasElement.querySelector('[data-testid="multiple-result"]');
      await expect(result).toBeTruthy();
      await expect(result?.textContent).toContain('file1.txt');
      await expect(result?.textContent).toContain('file2.txt');
    });

    await step('accept 타입 외의 파일 선택 시 거부되는지 확인', async () => {
      const container = canvasElement.querySelector('[data-testid="accept-container"]');
      const acceptInput = container?.querySelector('input[name="accept-file-input"]') as HTMLInputElement;

      if (!acceptInput) {
        throw new Error('Accept file input not found');
      }

      // accept 속성 확인
      await expect(acceptInput).toHaveAttribute('accept', 'image/*');

      // 이미지가 아닌 파일 시도
      const textFile = new File(['text content'], 'document.txt', { type: 'text/plain' });
      const dataTransfer1 = new DataTransfer();
      dataTransfer1.items.add(textFile);
      acceptInput.files = dataTransfer1.files;

      const event1 = new Event('change', { bubbles: true });
      acceptInput.dispatchEvent(event1);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 텍스트 파일은 표시되지 않아야 함
      let result = canvasElement.querySelector('[data-testid="accept-result"]');
      await expect(result).toBeFalsy();

      // 이미지 파일 시도
      const imageFile = new File(['image content'], 'image.png', { type: 'image/png' });
      const dataTransfer2 = new DataTransfer();
      dataTransfer2.items.add(imageFile);
      acceptInput.files = dataTransfer2.files;

      const event2 = new Event('change', { bubbles: true });
      acceptInput.dispatchEvent(event2);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 이미지 파일은 표시되어야 함
      result = canvasElement.querySelector('[data-testid="accept-result"]');
      await expect(result).toBeTruthy();
      await expect(result?.textContent).toContain('image.png');
    });

    await step('maxSize 초과 파일 거부되는지 확인', async () => {
      const container = canvasElement.querySelector('[data-testid="size-container"]');
      const sizeInput = container?.querySelector('input[name="size-file-input"]') as HTMLInputElement;

      if (!sizeInput) {
        throw new Error('Size file input not found');
      }

      // 큰 파일 시도 (2MB)
      const largeContent = new Array(2 * 1024 * 1024).fill('a').join('');
      const largeFile = new File([largeContent], 'large.txt', { type: 'text/plain' });
      const dataTransfer1 = new DataTransfer();
      dataTransfer1.items.add(largeFile);
      sizeInput.files = dataTransfer1.files;

      const event1 = new Event('change', { bubbles: true });
      sizeInput.dispatchEvent(event1);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 큰 파일은 표시되지 않아야 함 (1MB 제한)
      let result = canvasElement.querySelector('[data-testid="size-result"]');
      await expect(result).toBeFalsy();

      // 작은 파일 시도 (100 bytes)
      const smallFile = new File(['small content'], 'small.txt', { type: 'text/plain' });
      const dataTransfer2 = new DataTransfer();
      dataTransfer2.items.add(smallFile);
      sizeInput.files = dataTransfer2.files;

      const event2 = new Event('change', { bubbles: true });
      sizeInput.dispatchEvent(event2);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 작은 파일은 표시되어야 함
      result = canvasElement.querySelector('[data-testid="size-result"]');
      await expect(result).toBeTruthy();
      await expect(result?.textContent).toContain('small.txt');
    });
  },
};
