import { TreeBranch } from './TreeBranch';
import { TreeBranchContent } from './TreeBranchContent';
import { TreeBranchControl } from './TreeBranchControl';
import { TreeBranchIndentGuide } from './TreeBranchIndentGuide';
import { TreeBranchIndicator } from './TreeBranchIndicator';
import { TreeBranchText } from './TreeBranchText';
import { TreeBranchTrigger } from './TreeBranchTrigger';
import { TreeItem } from './TreeItem';
import { TreeItemIndicator } from './TreeItemIndicator';
import { TreeItemText } from './TreeItemText';
import { TreeLabel } from './TreeLabel';
import { TreeNode } from './TreeNode';
import { TreeNodeCheckbox } from './TreeNodeCheckbox';
import { TreeNodeContext } from './TreeNodeContext';
import { TreeNodeProvider } from './TreeNodeProvider';
import { TreeRoot } from './TreeRoot';
import { TreeTree } from './TreeTree';

export const Tree = {
  Root: TreeRoot,
  Tree: TreeTree,
  Branch: TreeBranch,
  BranchControl: TreeBranchControl,
  BranchTrigger: TreeBranchTrigger,
  BranchIndicator: TreeBranchIndicator,
  BranchText: TreeBranchText,
  BranchContent: TreeBranchContent,
  BranchIndentGuide: TreeBranchIndentGuide,
  Item: TreeItem,
  ItemText: TreeItemText,
  ItemIndicator: TreeItemIndicator,
  Node: TreeNode,
  NodeCheckbox: TreeNodeCheckbox,
  NodeContext: TreeNodeContext,
  NodeProvider: TreeNodeProvider,
  Label: TreeLabel,
};
