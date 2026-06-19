import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { TreeBranchControlProps } from './Tree.types';

export const TreeBranchControl = forwardRef<
  HTMLDivElement,
  TreeBranchControlProps
>((props, ref) => {
  // See TreeItem — same reason: the recipe's depth-based padding-inline-
  // start (`var(--tree-offset)`) gets overridden if we re-declare `px`
  // here. Only the color/state overrides remain.
  return (
    <ChakraTreeView.BranchControl
      ref={ref}
      color="fg.default"
      _hover={{ bg: 'bg.subtle' }}
      _selected={{ bg: 'primary.lightest', color: 'primary.dark' }}
      {...focusRing}
      {...props}
    />
  );
});
TreeBranchControl.displayName = 'TreeBranchControl';
