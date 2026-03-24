import { Meta, StoryObj } from '@storybook/react';
import { Text } from '@chakra-ui/react';

import { Collapsible, CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '.';

const meta = {
  title: 'Components/Collapsible',
  component: CollapsibleRoot,
  render: (args) => (
    <CollapsibleRoot {...args}>
      <CollapsibleTrigger>Section title</CollapsibleTrigger>
      <CollapsibleContent>
        <Text>This is the collapsible content.</Text>
      </CollapsibleContent>
    </CollapsibleRoot>
  ),
} satisfies Meta<typeof CollapsibleRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const Controlled: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <CollapsibleRoot {...args}>
      <CollapsibleTrigger>Always open (controlled)</CollapsibleTrigger>
      <CollapsibleContent>
        <Text>This panel is controlled externally via the open prop.</Text>
      </CollapsibleContent>
    </CollapsibleRoot>
  ),
};

export const CustomIcon: Story = {
  render: (args) => (
    <CollapsibleRoot {...args}>
      <CollapsibleTrigger customIcon={<Text fontSize="sm">▼</Text>}>
        Custom icon trigger
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>Content with a custom icon in the trigger.</Text>
      </CollapsibleContent>
    </CollapsibleRoot>
  ),
};

export const CompoundAPI: Story = {
  render: (args) => (
    <Collapsible.Root {...args}>
      <Collapsible.Trigger>Using compound API</Collapsible.Trigger>
      <Collapsible.Content>
        <Text>You can also use the compound Collapsible.Root / Collapsible.Trigger / Collapsible.Content API.</Text>
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};
