import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Tree } from './Tree';
import {
  createTreeCollection,
  type TreeExpandedChangeDetails,
  type TreeSelectionChangeDetails,
} from './index';

interface Node {
  id: string;
  name: string;
  children?: Node[];
}

const sample: Node = {
  id: 'ROOT',
  name: '',
  children: [
    {
      id: 'rank',
      name: '직급',
      children: [
        {
          id: 'rank-other',
          name: '기타',
          children: [{ id: 'rank-other-ai', name: 'AI' }],
        },
        {
          id: 'rank-manager',
          name: '매니저',
          children: [
            { id: 'rank-manager-backend', name: '백엔드팀' },
            { id: 'rank-manager-ai', name: 'AI' },
          ],
        },
        { id: 'rank-member', name: '멤버' },
        { id: 'rank-invite-test', name: '초대 테스트' },
        { id: 'rank-test', name: '테스트' },
        { id: 'rank-student', name: '학생' },
      ],
    },
    {
      id: 'team',
      name: '팀',
      children: [
        {
          id: 'team-backend',
          name: '백엔드팀',
          children: [{ id: 'team-backend-manager', name: '매니저' }],
        },
        { id: 'team-frontend', name: '프론트팀' },
      ],
    },
    { id: 'test', name: '테스트' },
  ],
};

const collection = createTreeCollection<Node>({
  rootNode: sample,
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
});

const renderNode = ({
  node,
  nodeState,
}: {
  node: Node;
  nodeState: { isBranch: boolean };
}) =>
  nodeState.isBranch ? (
    <Tree.BranchControl>
      <Tree.BranchIndicator />
      <Tree.BranchText>{node.name}</Tree.BranchText>
    </Tree.BranchControl>
  ) : (
    <Tree.Item>
      <Tree.ItemText>{node.name}</Tree.ItemText>
    </Tree.Item>
  );

const meta = {
  title: 'Components/Tree',
  component: Tree.Root,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tree.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { collection, 'aria-label': '조직' },
  render: (args) => (
    <Box maxWidth="320px">
      <Tree.Root {...args}>
        <Tree.Tree>
          <Tree.Node
            indentGuide={<Tree.BranchIndentGuide />}
            render={renderNode}
          />
        </Tree.Tree>
      </Tree.Root>
    </Box>
  ),
};

export const DefaultExpanded: Story = {
  args: {
    collection,
    'aria-label': '조직',
    defaultExpandedValue: [
      'rank',
      'rank-other',
      'rank-manager',
      'team',
      'team-backend',
    ],
    defaultSelectedValue: ['rank-other-ai'],
  },
  render: (args) => (
    <Box maxWidth="320px">
      <Tree.Root {...args}>
        <Tree.Tree>
          <Tree.Node
            indentGuide={<Tree.BranchIndentGuide />}
            render={renderNode}
          />
        </Tree.Tree>
      </Tree.Root>
    </Box>
  ),
};

const ControlledTree = () => {
  const [expandedValue, setExpandedValue] = useState<string[]>([
    'rank',
    'rank-other',
  ]);
  const [selectedValue, setSelectedValue] = useState<string[]>([
    'rank-other-ai',
  ]);

  return (
    <Box maxWidth="320px">
      <Tree.Root
        collection={collection}
        aria-label="조직"
        expandedValue={expandedValue}
        onExpandedChange={(details: TreeExpandedChangeDetails) =>
          setExpandedValue(details.expandedValue)
        }
        selectedValue={selectedValue}
        onSelectionChange={(details: TreeSelectionChangeDetails) =>
          setSelectedValue(details.selectedValue)
        }
      >
        <Tree.Tree>
          <Tree.Node
            indentGuide={<Tree.BranchIndentGuide />}
            render={renderNode}
          />
        </Tree.Tree>
      </Tree.Root>
    </Box>
  );
};

export const Controlled: Story = {
  args: { collection },
  render: () => <ControlledTree />,
};

export const MultipleSelection: Story = {
  args: {
    collection,
    'aria-label': '조직',
    selectionMode: 'multiple',
    defaultExpandedValue: ['rank', 'rank-other', 'team'],
  },
  render: (args) => (
    <Box maxWidth="320px">
      <Tree.Root {...args}>
        <Tree.Tree>
          <Tree.Node
            indentGuide={<Tree.BranchIndentGuide />}
            render={renderNode}
          />
        </Tree.Tree>
      </Tree.Root>
    </Box>
  ),
};
