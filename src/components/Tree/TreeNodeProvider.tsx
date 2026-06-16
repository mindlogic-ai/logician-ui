import type { TreeViewNodeProviderProps } from '@chakra-ui/react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

export type TreeNodeProviderProps<T> = TreeViewNodeProviderProps<T>;

export const TreeNodeProvider = ChakraTreeView.NodeProvider;
