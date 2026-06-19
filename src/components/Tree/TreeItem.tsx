import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { TreeItemProps } from './Tree.types';

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
  (props, ref) => {
    // Chakra v3's `treeView.item` recipe already supplies layout,
    // padding-block, gap, rounded etc — and crucially sets
    // `padding-inline-start: var(--tree-offset)` so each item indents
    // by its node depth. Don't re-set `px`/`py`/`display`/`gap`/`rounded`
    // here or the recipe's depth-based start padding gets overridden
    // and every item collapses to the same column (no indent guide
    // alignment, items render under the vertical guide bars).
    //
    // `cursor` is the one common-sense interactive default the recipe
    // does NOT supply, so we add it explicitly.
    return (
      <ChakraTreeView.Item
        ref={ref}
        cursor="pointer"
        color="fg.default"
        _hover={{ bg: 'bg.subtle' }}
        _selected={{ bg: 'primary.lightest', color: 'primary.dark' }}
        {...focusRing}
        {...props}
      />
    );
  }
);
TreeItem.displayName = 'TreeItem';
