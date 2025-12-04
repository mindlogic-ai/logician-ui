import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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
