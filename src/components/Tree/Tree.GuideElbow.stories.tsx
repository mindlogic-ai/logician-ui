import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Tree } from './Tree';
import { createTreeCollection } from './index';

/**
 * Stories for the `elbow` option on `Tree.BranchIndentGuide`.
 *
 * `elbow` adds an `L`-shaped horizontal foot to the innermost vertical
 * rail, so every row reads as a connected `├` / `└` branch — the
 * "guide line" tree feel — instead of a set of free-floating column
 * lines. Pass it through the `indentGuide` element:
 *
 *   <Tree.Node indentGuide={<Tree.BranchIndentGuide elbow />} ... />
 */

interface Node {
  id: string;
  name: string;
  children?: Node[];
}

const orgSample: Node = {
  id: 'ROOT',
  name: '',
  children: [
    {
      id: 'hq',
      name: '본사',
      children: [
        {
          id: 'hq-dev',
          name: '개발본부',
          children: [
            {
              id: 'hq-dev-backend',
              name: '백엔드그룹',
              children: [
                { id: 'hq-dev-backend-api', name: 'API팀' },
                { id: 'hq-dev-backend-db', name: 'DB팀' },
                { id: 'hq-dev-backend-platform', name: '플랫폼팀' },
              ],
            },
            {
              id: 'hq-dev-frontend',
              name: '프론트엔드그룹',
              children: [
                { id: 'hq-dev-frontend-web', name: '웹팀' },
                { id: 'hq-dev-frontend-mobile', name: '모바일팀' },
              ],
            },
          ],
        },
        {
          id: 'hq-sales',
          name: '영업본부',
          children: [
            { id: 'hq-sales-domestic', name: '국내영업팀' },
            { id: 'hq-sales-global', name: '해외영업팀' },
          ],
        },
      ],
    },
    {
      id: 'rnd',
      name: 'R&D센터',
      children: [
        { id: 'rnd-ml', name: '머신러닝팀' },
        { id: 'rnd-data', name: '데이터팀' },
      ],
    },
  ],
};

const orgCollection = createTreeCollection<Node>({
  rootNode: orgSample,
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
});

const allBranchIds = (function collect(n: Node): string[] {
  if (!n.children) return [];
  return n.children.flatMap((c) => (c.children ? [c.id, ...collect(c)] : []));
})(orgSample);

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

/**
 * `elbow` guides — the innermost rail grows a horizontal foot so each
 * row connects to its parent column like a classic file-tree.
 */
export const WithElbowGuides: Story = {
  args: {
    collection: orgCollection,
    'aria-label': '조직',
    defaultExpandedValue: allBranchIds,
    defaultSelectedValue: ['hq-dev-frontend-web'],
  },
  render: (args) => (
    <Box maxWidth="360px">
      <Tree.Root {...args}>
        <Tree.Tree>
          <Tree.Node
            indentGuide={<Tree.BranchIndentGuide elbow />}
            render={renderNode}
          />
        </Tree.Tree>
      </Tree.Root>
    </Box>
  ),
};

/**
 * Plain vertical rails (default) vs. `elbow` guides, side by side.
 */
export const ElbowGuideComparison: Story = {
  args: {
    collection: orgCollection,
    'aria-label': '조직',
    defaultExpandedValue: allBranchIds,
  },
  render: (args) => (
    <HStack align="flex-start" gap={8}>
      <Stack gap={2} width="320px">
        <Text fontSize="sm" fontWeight="semibold" color="fg.muted">
          기본 — 수직 레일
        </Text>
        <Tree.Root {...args}>
          <Tree.Tree>
            <Tree.Node
              indentGuide={<Tree.BranchIndentGuide />}
              render={renderNode}
            />
          </Tree.Tree>
        </Tree.Root>
      </Stack>
      <Stack gap={2} width="320px">
        <Text fontSize="sm" fontWeight="semibold" color="fg.muted">
          elbow — ├ / └ 가이드 라인
        </Text>
        <Tree.Root {...args}>
          <Tree.Tree>
            <Tree.Node
              indentGuide={<Tree.BranchIndentGuide elbow />}
              render={renderNode}
            />
          </Tree.Tree>
        </Tree.Root>
      </Stack>
    </HStack>
  ),
};
