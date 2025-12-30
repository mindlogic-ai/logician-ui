import type { Meta, StoryObj } from '@storybook/react';

import { H1 } from '../Typography';
import { DataField } from './DataField';

const meta = {
  title: 'Components/DataField',
  component: DataField,
  args: {
    label: 'Session name',
    value: 'test-test-test',
  },
} satisfies Meta<typeof DataField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const EditableField: Story = {
  args: {
    isEditable: true,
    onChange: (val) => console.log(val),
    editableProps: {
      onSubmit: (e) => console.log(e),
    },
  },
};

export const EditableHeaderField: Story = {
  args: {
    isEditable: true,
    as: H1,
    onChange: (val) => console.log(val),
    editableProps: {
      onSubmit: (e) => console.log(e),
    },
  },
};

export const CopyableField: Story = {
  args: {
    isCopyable: true,
  },
};

export const EditableCopyableField: Story = {
  args: {
    isEditable: true,
    onChange: (val) => console.log(val),
    editableProps: {
      onSubmit: (val) => console.log(val),
    },
    isCopyable: true,
  },
};
