import { useState } from 'react';
import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { IoFolder, IoFolderOpen } from 'react-icons/io5';

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

/**
 * Realistic 5-level deep org chart. Exercises deep nesting, mixed
 * branch/leaf siblings, and long-ish Korean labels (회사 → 본부 →
 * 그룹 → 팀 → 파트 → 멤버).
 */
const orgSample: Node = {
  id: 'ROOT',
  name: '',
  children: [
    {
      id: 'hq',
      name: '본사',
      children: [
        {
          id: 'hq-mgmt',
          name: '경영지원본부',
          children: [
            {
              id: 'hq-mgmt-hr',
              name: '인사팀',
              children: [
                {
                  id: 'hq-mgmt-hr-recruit',
                  name: '채용파트',
                  children: [
                    { id: 'hq-mgmt-hr-recruit-kim', name: '김채용' },
                    { id: 'hq-mgmt-hr-recruit-lee', name: '이지원' },
                  ],
                },
                { id: 'hq-mgmt-hr-eval', name: '평가파트' },
                { id: 'hq-mgmt-hr-edu', name: '교육파트' },
              ],
            },
            {
              id: 'hq-mgmt-fin',
              name: '재무팀',
              children: [
                { id: 'hq-mgmt-fin-acct', name: '회계파트' },
                { id: 'hq-mgmt-fin-tax', name: '세무파트' },
              ],
            },
            { id: 'hq-mgmt-legal', name: '법무팀' },
          ],
        },
        {
          id: 'hq-dev',
          name: '개발본부',
          children: [
            {
              id: 'hq-dev-backend',
              name: '백엔드그룹',
              children: [
                {
                  id: 'hq-dev-backend-api',
                  name: 'API팀',
                  children: [
                    { id: 'hq-dev-backend-api-cs', name: '김철수' },
                    { id: 'hq-dev-backend-api-yh', name: '이영희' },
                    { id: 'hq-dev-backend-api-jm', name: '박지민' },
                  ],
                },
                {
                  id: 'hq-dev-backend-db',
                  name: 'DB팀',
                  children: [{ id: 'hq-dev-backend-db-sh', name: '최성호' }],
                },
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
            {
              id: 'hq-dev-ai',
              name: 'AI그룹',
              children: [
                {
                  id: 'hq-dev-ai-research',
                  name: '연구파트',
                  children: [
                    { id: 'hq-dev-ai-research-senior', name: '시니어 연구원' },
                    { id: 'hq-dev-ai-research-junior', name: '주니어 연구원' },
                  ],
                },
                { id: 'hq-dev-ai-eng', name: '엔지니어링파트' },
              ],
            },
          ],
        },
        {
          id: 'hq-sales',
          name: '영업본부',
          children: [
            { id: 'hq-sales-domestic', name: '국내영업팀' },
            {
              id: 'hq-sales-global',
              name: '해외영업팀',
              children: [
                {
                  id: 'hq-sales-global-amer',
                  name: '미주파트',
                  children: [
                    { id: 'hq-sales-global-amer-us', name: '미국' },
                    { id: 'hq-sales-global-amer-ca', name: '캐나다' },
                  ],
                },
                { id: 'hq-sales-global-eu', name: '유럽파트' },
                {
                  id: 'hq-sales-global-asia',
                  name: '아시아파트',
                  children: [
                    { id: 'hq-sales-global-asia-jp', name: '일본' },
                    { id: 'hq-sales-global-asia-cn', name: '중국' },
                  ],
                },
              ],
            },
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
        { id: 'rnd-infra', name: '리서치인프라팀' },
      ],
    },
    { id: 'subsidiary', name: '미국지사' },
  ],
};

const orgCollection = createTreeCollection<Node>({
  rootNode: orgSample,
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
});

// Convenience: all branch ids — for "expand all" demos.
const allBranchIds = (function collect(n: Node): string[] {
  if (!n.children) return [];
  return n.children.flatMap(c =>
    c.children ? [c.id, ...collect(c)] : [],
  );
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
 * All branches collapsed — the simplest entry point. Click a branch
 * (or the chevron) to expand. Single selection mode by default.
 */
export const Default: Story = {
  args: { collection: orgCollection, 'aria-label': '조직' },
  render: (args) => (
    <Box maxWidth="360px">
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

/**
 * Some branches pre-expanded so the depth-based indent and the
 * vertical indent guides are visible without interaction.
 */
export const DefaultExpanded: Story = {
  args: {
    collection: orgCollection,
    'aria-label': '조직',
    defaultExpandedValue: [
      'hq',
      'hq-dev',
      'hq-dev-backend',
      'hq-dev-backend-api',
    ],
    defaultSelectedValue: ['hq-dev-backend-api-yh'],
  },
  render: (args) => (
    <Box maxWidth="360px">
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

/**
 * Every branch expanded. Use to verify that depth-based padding and
 * the stacked vertical indent guides line up correctly at 4-5 levels
 * deep (본사 → 개발본부 → 백엔드그룹 → API팀 → 김철수).
 */
export const DeeplyNested: Story = {
  args: {
    collection: orgCollection,
    'aria-label': '조직',
    defaultExpandedValue: allBranchIds,
  },
  render: (args) => (
    <Box maxWidth="420px">
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

/**
 * Side-by-side comparison: default style (chevron + depth padding only)
 * vs. factchat 그룹 관리 style (∟ leaf prefix using the `Tree.Item`
 * children slot). Demonstrates that any custom content can be inlined
 * before `Tree.ItemText`.
 */
export const LeafIndicatorComparison: Story = {
  args: {
    collection: orgCollection,
    'aria-label': '조직',
    defaultExpandedValue: ['hq', 'hq-dev', 'hq-dev-backend', 'hq-dev-backend-api'],
  },
  render: (args) => {
    const renderWithLeafPrefix = ({
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
          <Text as="span" color="fg.muted" fontSize="sm" lineHeight="1">
            ∟
          </Text>
          <Tree.ItemText>{node.name}</Tree.ItemText>
        </Tree.Item>
      );

    return (
      <HStack align="flex-start" gap={8}>
        <Stack gap={2} width="360px">
          <Text fontSize="sm" fontWeight="semibold" color="fg.muted">
            기본
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
        <Stack gap={2} width="360px">
          <Text fontSize="sm" fontWeight="semibold" color="fg.muted">
            ∟ leaf 표시 (factchat 그룹 관리 스타일)
          </Text>
          <Tree.Root {...args}>
            <Tree.Tree>
              <Tree.Node
                indentGuide={<Tree.BranchIndentGuide />}
                render={renderWithLeafPrefix}
              />
            </Tree.Tree>
          </Tree.Root>
        </Stack>
      </HStack>
    );
  },
};

/**
 * Replace the default chevron with a folder icon that swaps between
 * `IoFolder` (closed) and `IoFolderOpen` (expanded). Uses the
 * `nodeState.expanded` boolean exposed by Ark's render prop, and
 * sets `transform="none"` on the indicator to suppress the recipe's
 * default `_open: rotate(90deg)` (which fits a chevron, not a folder).
 */
export const CustomBranchIcon: Story = {
  args: {
    collection: orgCollection,
    'aria-label': '조직',
    defaultExpandedValue: ['hq', 'hq-mgmt', 'hq-mgmt-hr'],
  },
  render: (args) => {
    const renderWithFolder = ({
      node,
      nodeState,
    }: {
      node: Node;
      nodeState: { isBranch: boolean; expanded: boolean };
    }) =>
      nodeState.isBranch ? (
        <Tree.BranchControl>
          <Tree.BranchIndicator
            transform="none"
            _open={{ transform: 'none' }}
          >
            {nodeState.expanded ? <IoFolderOpen /> : <IoFolder />}
          </Tree.BranchIndicator>
          <Tree.BranchText>{node.name}</Tree.BranchText>
        </Tree.BranchControl>
      ) : (
        <Tree.Item>
          <Tree.ItemText>{node.name}</Tree.ItemText>
        </Tree.Item>
      );

    return (
      <Box maxWidth="360px">
        <Tree.Root {...args}>
          <Tree.Tree>
            <Tree.Node
              indentGuide={<Tree.BranchIndentGuide />}
              render={renderWithFolder}
            />
          </Tree.Tree>
        </Tree.Root>
      </Box>
    );
  },
};

/**
 * The recipe ships three size variants (`xs` / `sm` / `md`). They
 * scale row text size, padding-block, indentation step and icon size
 * proportionally — useful for dense sidebars (xs) vs. main content (md).
 */
export const SizeVariants: Story = {
  args: {
    collection: orgCollection,
    'aria-label': '조직',
    defaultExpandedValue: ['hq', 'hq-dev', 'hq-dev-backend'],
  },
  render: (args) => (
    <HStack align="flex-start" gap={6}>
      {(['xs', 'sm', 'md'] as const).map(size => (
        <Stack key={size} gap={2} width="300px">
          <Text fontSize="sm" fontWeight="semibold" color="fg.muted">
            size = {size}
          </Text>
          <Tree.Root {...args} size={size}>
            <Tree.Tree>
              <Tree.Node
                indentGuide={<Tree.BranchIndentGuide />}
                render={renderNode}
              />
            </Tree.Tree>
          </Tree.Root>
        </Stack>
      ))}
    </HStack>
  ),
};

/**
 * Long labels that exceed the container width — verifies the leaf
 * rows wrap (or, in tight columns, truncate) without breaking the
 * depth-based start padding alignment.
 */
const longLabelSample: Node = {
  id: 'ROOT',
  name: '',
  children: [
    {
      id: 'long-root',
      name: '아주 긴 한글 그룹명 — 사이드바 폭을 시험하기 위한 항목',
      children: [
        {
          id: 'long-child-1',
          name: '여러 줄로 줄바꿈이 일어날 수 있는 충분히 긴 자식 노드의 이름',
        },
        {
          id: 'long-child-2',
          name: '비교적 짧은 이름',
        },
        {
          id: 'long-branch',
          name: '하위 그룹도 있는, 마찬가지로 길어서 줄바꿈 테스트가 가능한 브랜치 노드',
          children: [
            {
              id: 'long-leaf',
              name: '깊게 들여쓰여진 상태에서의 매우 긴 잎 노드 — 가로 폭이 좁아질수록 줄바꿈이 잘 일어나야 합니다',
            },
          ],
        },
      ],
    },
  ],
};

export const LongLabels: Story = {
  args: {
    collection: createTreeCollection<Node>({
      rootNode: longLabelSample,
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
    }),
    'aria-label': '긴 라벨 트리',
    defaultExpandedValue: ['long-root', 'long-branch'],
  },
  render: (args) => (
    <Box maxWidth="280px">
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
    'hq',
    'hq-mgmt',
    'hq-mgmt-hr',
  ]);
  const [selectedValue, setSelectedValue] = useState<string[]>([
    'hq-mgmt-hr-eval',
  ]);

  return (
    <Box maxWidth="360px">
      <Tree.Root
        collection={orgCollection}
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
      <Text mt={4} fontSize="xs" color="fg.muted">
        expanded: {expandedValue.join(', ') || '(none)'}
        <br />
        selected: {selectedValue.join(', ') || '(none)'}
      </Text>
    </Box>
  );
};

/**
 * Fully controlled — `expandedValue` and `selectedValue` are driven
 * by React state. Useful when parent state needs to react to user
 * navigation (e.g., sync with URL).
 */
export const Controlled: Story = {
  args: { collection: orgCollection },
  render: () => <ControlledTree />,
};

/**
 * Multiple selection — Ctrl/Cmd-click (or Shift-click for range) to
 * select more than one node at a time.
 */
export const MultipleSelection: Story = {
  args: {
    collection: orgCollection,
    'aria-label': '조직',
    selectionMode: 'multiple',
    defaultExpandedValue: ['hq', 'hq-dev', 'hq-dev-backend'],
    defaultSelectedValue: [
      'hq-dev-backend-api',
      'hq-dev-backend-db',
      'hq-dev-frontend',
    ],
  },
  render: (args) => (
    <Box maxWidth="360px">
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
