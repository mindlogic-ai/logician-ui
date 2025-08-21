import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

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
  return <FileInput {...args} onChange={handleChange} bgImage={bgImage} />;
};

export const Basic = Template.bind({});
Basic.args = {};
