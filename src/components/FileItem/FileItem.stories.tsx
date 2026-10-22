import { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@chakra-ui/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { FieldRow } from '../Form';
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

export const Downloading: Story = {
  args: {
    fileName: 'Test File',
    onFileDownload: () => {},
    isDownloading: true,
  },
};

export const Deleting: Story = {
  args: {
    fileName: 'Test File',
    onFileDelete: () => {},
    isDeleting: true,
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `FileItem.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoErrorInText: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: repeat the error in text',
  render: () => (
    <Stack maxW="480px">
      <FieldRow error="members.xlsx: 파일이 5MB를 넘습니다. 나눠서 올려 주세요.">
        <FileItem
          fileName="members.xlsx"
          error="파일이 5MB를 넘습니다."
          onFileDelete={() => {}}
        />
      </FieldRow>
    </Stack>
  ),
};

export const DontErrorInTooltipOnly: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: the reason only in a tooltip",
  render: () => (
    <Stack maxW="480px">
      <FileItem
        fileName="members.xlsx"
        error="파일이 5MB를 넘습니다."
        onFileDelete={() => {}}
      />
    </Stack>
  ),
};

/** Tokens `FileItem.tsx` reads. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        { token: 'border.subtle', use: <T en="Row border" ko="행 테두리" /> },
        {
          token: 'fg.muted',
          use: <T en="File icon, action icons" ko="파일 아이콘, 동작 아이콘" />,
        },
        {
          token: 'fg.subtle',
          use: <T en="Cancel-upload icon" ko="업로드 취소 아이콘" />,
        },
        {
          token: 'danger.fg',
          use: (
            <T
              en="Error: left bar, icon, file name"
              ko="오류: 왼쪽 막대, 아이콘, 파일 이름"
            />
          ),
        },
      ]}
    />
  ),
};
