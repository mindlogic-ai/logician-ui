import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeItemTextProps } from './Tree.types';

export const TreeItemText = forwardRef<HTMLSpanElement, TreeItemTextProps>(
  (props, ref) => {
    return (
      <ChakraTreeView.ItemText
        ref={ref}
        flex={1}
        fontWeight="medium"
        truncate
        {...props}
      />
    );
  }
);
TreeItemText.displayName = 'TreeItemText';
