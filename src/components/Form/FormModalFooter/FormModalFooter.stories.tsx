import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { FormModalFooter } from './FormModalFooter';

const meta: Meta<typeof FormModalFooter> = {
  title: 'Components/Form/FormModalFooter',
  component: FormModalFooter,
  args: {
    onCancel: () => {},
    onSubmit: () => {},
    cancelLabel: 'Cancel',
    submitLabel: 'Save',
  },
  decorators: [
    (Story) => (
      <Box w="480px" bg="bg.canvas">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The action footer shared by form-in-a-modal surfaces — the form ' +
          'analog of a confirm-modal footer. Standardizes the optional delete ' +
          '+ Cancel + primary-submit trio every create/edit modal was ' +
          'hand-rolling. Copy-agnostic: `cancelLabel` is required and labels ' +
          'are rendered verbatim.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormModalFooter>;

/** The common shape: Cancel + primary submit. */
export const Default: Story = {};

/** Edit modal shape: a far-left destructive Delete beside Cancel + submit. */
export const WithDelete: Story = {
  args: {
    onDelete: () => {},
    deleteLabel: 'Delete',
    submitLabel: 'Save changes',
  },
};

/** Mid-request: spinner on submit, every button disabled. */
export const Submitting: Story = {
  args: { isSubmitting: true },
};

/** Gated submit (e.g. a required field is empty). */
export const SubmitDisabled: Story = {
  args: { submitDisabled: true },
};

/** Scroll-inside modal: the bordered separator against a pinned footer. */
export const Bordered: Story = {
  args: { bordered: true, onDelete: () => {}, deleteLabel: 'Delete' },
};
