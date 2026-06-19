import type { TreeViewNodeProps } from '@chakra-ui/react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

export type TreeNodeProps<T> = TreeViewNodeProps<T>;

export const TreeNode = ChakraTreeView.Node;
