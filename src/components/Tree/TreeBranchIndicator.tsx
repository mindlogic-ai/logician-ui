import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { IoChevronForward } from '@/components/Icon';

import { TreeBranchIndicatorProps } from './Tree.types';

export const TreeBranchIndicator = forwardRef<
  HTMLDivElement,
  TreeBranchIndicatorProps
>(({ children, ...rest }, ref) => {
  return (
    <ChakraTreeView.BranchIndicator
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="transform 0.15s ease-out"
      _open={{ transform: 'rotate(90deg)' }}
      _motionReduce={{ transition: 'none' }}
      {...rest}
    >
      {children ?? <IoChevronForward boxSize="xs" />}
    </ChakraTreeView.BranchIndicator>
  );
});
TreeBranchIndicator.displayName = 'TreeBranchIndicator';
