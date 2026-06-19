import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeBranchTextProps } from './Tree.types';

export const TreeBranchText = forwardRef<HTMLSpanElement, TreeBranchTextProps>(
  (props, ref) => {
    return (
      <ChakraTreeView.BranchText
        ref={ref}
        flex={1}
        fontWeight="medium"
        truncate
        {...props}
      />
    );
  }
);
TreeBranchText.displayName = 'TreeBranchText';
