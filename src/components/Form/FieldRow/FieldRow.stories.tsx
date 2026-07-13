import { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/Input';
import { SelectField } from '@/components/Select';
import { Textarea } from '@/components/Textarea';

import { FieldRow } from './FieldRow';

const meta: Meta<typeof FieldRow> = {
  title: 'Components/Form/FieldRow',
  component: FieldRow,
  args: {
    label: 'Display name',
    children: <Input placeholder="Enter a name" />,
  },
  parameters: {
    docs: {
      description: {
        component:
          'The composition keystone for a form field. Wraps a control in a ' +
          'logician `FormControl` and lays out label, description, helper and ' +
          'error consistently, delegating all label↔control / aria wiring to ' +
          'the Chakra `Field` context.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldRow>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const WithDescription: Story = {
  args: { description: 'Shown to teammates who can see this chatbot.' },
};

export const WithHelperText: Story = {
  args: { helperText: 'Up to 40 characters.' },
};

export const WithError: Story = {
  args: { required: true, error: 'Display name is required.' },
};

export const WithEndAdornment: Story = {
  args: {
    label: 'Recommended questions',
    endAdornment: '2 / 5',
    children: <Input placeholder="Add a question" />,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const TextareaControl: Story = {
  args: {
    label: 'System instructions',
    helperText: 'Describe how the assistant should behave.',
    children: <Textarea placeholder="You are a helpful assistant…" />,
  },
};

export const SelectControl: Story = {
  args: {
    label: 'Aspect ratio',
    children: (
      <SelectField
        options={[
          { label: '16:9', value: '16:9' },
          { label: '9:16', value: '9:16' },
          { label: '1:1', value: '1:1' },
        ]}
        value="16:9"
        onChange={() => {}}
      />
    ),
  },
};
