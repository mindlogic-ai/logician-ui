import { Meta, StoryObj } from '@storybook/react';
import { Text } from '@chakra-ui/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Code } from '../Code';
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

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Collapsible.usage.mdx` with <Canvas of={…} />. Hidden from
// the sidebar (`!dev`); `tags` is written out on each story because the
// indexer reads CSF statically.

export const DoOptionalDetail: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: optional detail, closed by default',
  render: (args) => (
    <CollapsibleRoot {...args} maxW="560px">
      <CollapsibleTrigger>원본 데이터 보기</CollapsibleTrigger>
      <CollapsibleContent>
        <Code language="json">{`{ "event": "member.invite", "count": 3 }`}</Code>
      </CollapsibleContent>
    </CollapsibleRoot>
  ),
};

export const DontVagueTrigger: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a trigger that does not say what opens",
  render: (args) => (
    <CollapsibleRoot {...args} maxW="560px">
      <CollapsibleTrigger>더 보기</CollapsibleTrigger>
      <CollapsibleContent>
        <Text>초대 메일은 7일 뒤에 만료됩니다.</Text>
      </CollapsibleContent>
    </CollapsibleRoot>
  ),
};

export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'border.subtle',
          use: (
            <T
              en="Root border, trigger bottom border"
              ko="루트 테두리, 트리거 아래 테두리"
            />
          ),
        },
        { token: 'bg.subtle', use: <T en="Trigger hover" ko="트리거 호버" /> },
      ]}
    />
  ),
};
