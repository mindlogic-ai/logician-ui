import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeBranchProps } from './Tree.types';

export const TreeBranch = forwardRef<HTMLDivElement, TreeBranchProps>(
  (props, ref) => {
    return <ChakraTreeView.Branch ref={ref} {...props} />;
  }
);
TreeBranch.displayName = 'TreeBranch';
