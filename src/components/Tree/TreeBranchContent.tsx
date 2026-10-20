import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeBranchContentProps } from './Tree.types';

export const TreeBranchContent = forwardRef<
  HTMLDivElement,
  TreeBranchContentProps
>((props, ref) => {
  return (
    <ChakraTreeView.BranchContent
      ref={ref}
      position="relative"
      display="flex"
      flexDirection="column"
      gap={0.5}
      {...props}
    />
  );
});
TreeBranchContent.displayName = 'TreeBranchContent';
