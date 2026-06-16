import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { TreeBranchControlProps } from './Tree.types';

export const TreeBranchControl = forwardRef<
  HTMLDivElement,
  TreeBranchControlProps
>((props, ref) => {
  return (
    <ChakraTreeView.BranchControl
      ref={ref}
      display="flex"
      alignItems="center"
      gap={2}
      px={3}
      py={2}
      rounded="md"
      cursor="pointer"
      color="fg.default"
      _hover={{ bg: 'bg.subtle' }}
      _selected={{ bg: 'primary.lightest', color: 'primary.dark' }}
      {...focusRing}
      {...props}
    />
  );
});
TreeBranchControl.displayName = 'TreeBranchControl';
