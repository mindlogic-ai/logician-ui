import { VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { InfoSprinkle } from '@/components/InfoSprinkle';
import { Input } from '@/components/Input';

import { FieldRow } from '../FieldRow';
import { FormSection } from './FormSection';

const meta: Meta<typeof FormSection> = {
  title: 'Components/Form/FormSection',
  component: FormSection,
  args: {
    title: 'Profile',
    children: (
      <>
        <FieldRow label="Display name">
          <Input placeholder="Enter a name" />
        </FieldRow>
        <FieldRow label="Tagline" description="A short one-line summary.">
          <Input placeholder="Enter a tagline" />
        </FieldRow>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof FormSection>;

export const Flat: Story = {};

export const WithDescription: Story = {
  args: { description: 'How this assistant introduces itself.' },
};

export const WithAction: Story = {
  args: {
    action: (
      <Button size="sm" variant="outline">
        Add
      </Button>
    ),
  },
};

export const WithDivider: Story = {
  args: { divider: true },
};

export const Collapsible: Story = {
  args: { collapsible: true },
};

export const CollapsibleWithError: Story = {
  args: {
    title: 'Behavior',
    collapsible: true,
    defaultOpen: false,
    hasError: true,
  },
};

export const WithTitleAdornment: Story = {
  args: {
    title: 'Attached files',
    description: 'Files this assistant can reference when answering.',
    titleAdornment: <InfoSprinkle>Up to 20 files, 100MB each.</InfoSprinkle>,
  },
};

/**
 * Several sections stacked the way a real sidebar form composes them — a lead
 * section, a divided follow-on, and a collapsible group — to show the shared
 * heading/description/field rhythm holds across the whole panel.
 */
export const PanelComposition: Story = {
  render: () => (
    <VStack align="stretch" gap={8} maxW="480px">
      <FormSection
        title="Profile"
        description="How this assistant introduces itself."
      >
        <FieldRow label="Display name">
          <Input placeholder="Enter a name" />
        </FieldRow>
        <FieldRow label="Tagline" description="A short one-line summary.">
          <Input placeholder="Enter a tagline" />
        </FieldRow>
      </FormSection>

      <FormSection
        title="Connectors"
        description="Live data sources this assistant can query."
        divider
        action={
          <Button size="sm" variant="ghost">
            Add
          </Button>
        }
      >
        <FieldRow label="Default source">
          <Input placeholder="Select a connector" />
        </FieldRow>
      </FormSection>

      <FormSection title="Advanced" collapsible defaultOpen={false}>
        <FieldRow label="Rate limit" description="Requests per minute.">
          <Input placeholder="60" />
        </FieldRow>
      </FormSection>
    </VStack>
  ),
};
