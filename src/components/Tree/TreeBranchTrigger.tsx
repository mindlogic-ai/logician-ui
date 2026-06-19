import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { TreeBranchTriggerProps } from './Tree.types';

export const TreeBranchTrigger = forwardRef<
  HTMLDivElement,
  TreeBranchTriggerProps
>((props, ref) => {
  return (
    <ChakraTreeView.BranchTrigger
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      rounded="sm"
      cursor="pointer"
      {...focusRing}
      {...props}
    />
  );
});
TreeBranchTrigger.displayName = 'TreeBranchTrigger';
