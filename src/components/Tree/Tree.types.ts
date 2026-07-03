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
export type TreeBranchIndentGuideProps = TreeViewBranchIndentGuideProps & {
  /**
   * Draw `├` / `└` guide lines instead of a plain vertical rail: every
   * row gets a horizontal foot joining it to its parent rail, middle
   * rows keep the vertical (`├`), and the last row of each group stops
   * at its centre (`└`). Off by default to preserve the existing
   * plain-vertical-rail look. See `TreeBranchIndentGuide`.
   * @default false
   */
  elbow?: boolean;
  /**
   * Length of the elbow foot — the horizontal cross-stroke that joins
   * the rail to the row content. Drawn from the parent rail column
   * toward the text, so the default reaches exactly to the row content.
   * Any Chakra width value. Only applies when `elbow` is set.
   * @default 'var(--tree-indentation)'
   */
  footLength?: string | number;
  /**
   * Color of the guide lines (rail, elbow foot and vertical segments).
   * Any Chakra color token. The default is a mode-flipping semantic
   * token, so it darkens in light mode and lightens in dark mode
   * automatically.
   * @default 'border.default'
   */
  guideColor?: string;
};
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
