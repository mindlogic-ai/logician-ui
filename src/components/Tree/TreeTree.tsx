import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeTreeProps } from './Tree.types';

export const TreeTree = forwardRef<HTMLDivElement, TreeTreeProps>(
  (props, ref) => {
    return <ChakraTreeView.Tree ref={ref} {...props} />;
  }
);
TreeTree.displayName = 'TreeTree';
