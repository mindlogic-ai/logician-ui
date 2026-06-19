import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeItemIndicatorProps } from './Tree.types';

export const TreeItemIndicator = forwardRef<
  HTMLDivElement,
  TreeItemIndicatorProps
>((props, ref) => {
  return (
    <ChakraTreeView.ItemIndicator
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
});
TreeItemIndicator.displayName = 'TreeItemIndicator';
