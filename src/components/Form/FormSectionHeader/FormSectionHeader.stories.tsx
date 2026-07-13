import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { InfoSprinkle } from '@/components/InfoSprinkle';

import { FormSectionHeader } from './FormSectionHeader';

const meta: Meta<typeof FormSectionHeader> = {
  title: 'Components/Form/FormSectionHeader',
  component: FormSectionHeader,
  decorators: [
    (Story) => (
      <Box maxW="480px">
        <Story />
      </Box>
    ),
  ],
  args: {
    title: 'Collaboration',
  },
};

export default meta;
type Story = StoryObj<typeof FormSectionHeader>;

export const TitleOnly: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'Grant analysts and editors access to work on this assistant.',
  },
};

export const WithTitleAdornment: Story = {
  args: {
    title: 'Attached files',
    description: 'Files this assistant can reference when answering.',
    titleAdornment: <InfoSprinkle>Up to 20 files, 100MB each.</InfoSprinkle>,
  },
};

export const WithAction: Story = {
  args: {
    title: 'Connectors',
    description: 'Live data sources this assistant can query.',
    action: (
      <Button size="sm" variant="ghost">
        Add
      </Button>
    ),
  },
};
