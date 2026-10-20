import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeRootProps } from './Tree.types';

export const TreeRoot = forwardRef<HTMLDivElement, TreeRootProps>(
  (props, ref) => {
    return <ChakraTreeView.Root ref={ref} {...props} />;
  }
);
TreeRoot.displayName = 'TreeRoot';
