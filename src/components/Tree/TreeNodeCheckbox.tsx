import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeNodeCheckboxProps } from './Tree.types';

export const TreeNodeCheckbox = forwardRef<
  HTMLDivElement,
  TreeNodeCheckboxProps
>((props, ref) => {
  return <ChakraTreeView.NodeCheckbox ref={ref} {...props} />;
});
TreeNodeCheckbox.displayName = 'TreeNodeCheckbox';
