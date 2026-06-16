import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeBranchIndentGuideProps } from './Tree.types';

export const TreeBranchIndentGuide = forwardRef<
  HTMLDivElement,
  TreeBranchIndentGuideProps
>((props, ref) => {
  return (
    <ChakraTreeView.BranchIndentGuide
      ref={ref}
      borderInlineStartWidth="1px"
      borderColor="border.subtle"
      ms={4}
      ps={4}
      {...props}
    />
  );
});
TreeBranchIndentGuide.displayName = 'TreeBranchIndentGuide';
