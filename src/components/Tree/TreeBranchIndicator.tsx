import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { ChevronRightIcon } from '@/components/Icon';
import { transitions } from '@/theme/motion';

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
      {...transitions.feedback('transform')}
      _open={{ transform: 'rotate(90deg)' }}
      {...rest}
    >
      {children ?? <ChevronRightIcon boxSize="xs" />}
    </ChakraTreeView.BranchIndicator>
  );
});
TreeBranchIndicator.displayName = 'TreeBranchIndicator';
