import { Meta, StoryFn } from '@storybook/react';

import { H1 } from '../Typography';
import { DataField } from './DataField';

const meta: Meta<typeof DataField> = {
  title: 'Components/DataField',
  component: DataField,
};

export default meta;
type Story = StoryFn<typeof DataField>;

export const Basic: Story = {
  args: {
    label: 'Session name',
    value: 'test-test-test',
  },
};

export const EditableField: Story = {
  args: {
    ...Basic.args,
    isEditable: true,
    onChange: val => console.log(val),
    editableProps: {
      onSubmit: e => console.log(e),
    },
  },
};

export const EditableHeaderField: Story = {
  args: {
    ...Basic.args,
    isEditable: true,
    as: H1,
    onChange: val => console.log(val),
    editableProps: {
      onSubmit: e => console.log(e),
    },
  },
};

export const CopyableField: Story = {
  args: {
    ...Basic.args,
    isCopyable: true,
  },
};

export const EditableCopyableField: Story = {
  args: {
    ...Basic.args,
    isEditable: true,
    onChange: val => console.log(val),
    editableProps: {
      onSubmit: val => console.log(val),
    },
    isCopyable: true,
  },
};
