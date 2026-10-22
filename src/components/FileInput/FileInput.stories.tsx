import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Stack } from '@chakra-ui/react';

import { FieldRow } from '../Form';
import { FileInput } from '.';

const meta = {
  title: 'Components/FileInput',
  component: FileInput,
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof FileInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [bgImage, setBgImage] = useState<string>();

    const handleChange = (files: FileList | null) => {
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          if (result.startsWith('data:image')) {
            setBgImage(result);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    return <FileInput onChange={handleChange} bgImage={bgImage} />;
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `FileInput.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoSayWhatFits: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: say which files fit',
  render: () => (
    <Stack maxW="420px">
      <FieldRow
        label="멤버 목록 파일"
        helperText="CSV 또는 XLSX, 최대 5MB. 첫 줄은 이메일, 이름 순서입니다."
      >
        <FileInput
          accept=".csv,.xlsx"
          fileInputLabel="파일을 눌러서 고르기"
          onChange={() => {}}
        />
      </FieldRow>
    </Stack>
  ),
};

export const DontUnexplained: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: no type, size or purpose",
  render: () => (
    <Stack maxW="420px">
      <FileInput onChange={() => {}} />
    </Stack>
  ),
};
