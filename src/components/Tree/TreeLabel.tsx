import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeLabelProps } from './Tree.types';

export const TreeLabel = forwardRef<HTMLLabelElement, TreeLabelProps>(
  (props, ref) => {
    return (
      <ChakraTreeView.Label
        ref={ref}
        fontSize="sm"
        fontWeight="semibold"
        color="fg.muted"
        {...props}
      />
    );
  }
);
TreeLabel.displayName = 'TreeLabel';
