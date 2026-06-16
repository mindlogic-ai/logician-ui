import type {
  TreeViewBranchContentProps,
  TreeViewBranchControlProps,
  TreeViewBranchIndentGuideProps,
  TreeViewBranchIndicatorProps,
  TreeViewBranchProps,
  TreeViewBranchTextProps,
  TreeViewBranchTriggerProps,
  TreeViewItemIndicatorProps,
  TreeViewItemProps,
  TreeViewItemTextProps,
  TreeViewLabelProps,
  TreeViewNodeCheckboxProps,
  TreeViewRootProps,
  TreeViewTreeProps,
} from '@chakra-ui/react';

export type TreeRootProps = TreeViewRootProps;
export type TreeTreeProps = TreeViewTreeProps;
export type TreeBranchProps = TreeViewBranchProps;
export type TreeBranchControlProps = TreeViewBranchControlProps;
export type TreeBranchTriggerProps = TreeViewBranchTriggerProps;
export type TreeBranchIndicatorProps = TreeViewBranchIndicatorProps;
export type TreeBranchTextProps = TreeViewBranchTextProps;
export type TreeBranchContentProps = TreeViewBranchContentProps;
export type TreeBranchIndentGuideProps = TreeViewBranchIndentGuideProps;
export type TreeItemProps = TreeViewItemProps;
export type TreeItemTextProps = TreeViewItemTextProps;
export type TreeItemIndicatorProps = TreeViewItemIndicatorProps;
export type TreeNodeCheckboxProps = TreeViewNodeCheckboxProps;
export type TreeLabelProps = TreeViewLabelProps;

// Detail payloads aren't re-exported from `@chakra-ui/react`'s top-level entry,
// so derive them from the event handler signatures the Root component exposes.
export type TreeExpandedChangeDetails = Parameters<
  NonNullable<TreeViewRootProps['onExpandedChange']>
>[0];

export type TreeSelectionChangeDetails = Parameters<
  NonNullable<TreeViewRootProps['onSelectionChange']>
>[0];

export type TreeCheckedChangeDetails = Parameters<
  NonNullable<TreeViewRootProps['onCheckedChange']>
>[0];

export type TreeFocusChangeDetails = Parameters<
  NonNullable<TreeViewRootProps['onFocusChange']>
>[0];

export type { TreeCollection } from '@chakra-ui/react';
