import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeBranchIndentGuideProps } from './Tree.types';

export const TreeBranchIndentGuide = forwardRef<
  HTMLDivElement,
  TreeBranchIndentGuideProps
>((props, ref) => {
  // Chakra v3's `branchIndentGuide` slot already renders the vertical
  // line via `position: absolute`, `width: 1px`, `bg: border`, with
  // `insetInlineStart` auto-calculated from tree depth. Don't add
  // `ms`/`ps` (breaks the depth math, pushes the line over content)
  // or `borderInlineStartWidth` (stacks a second 1px stroke on top of
  // the slot's own bg-painted 1px). Only override `bg` to lighten.
  return (
    <ChakraTreeView.BranchIndentGuide
      ref={ref}
      bg="border.subtle"
      {...props}
    />
  );
});
TreeBranchIndentGuide.displayName = 'TreeBranchIndentGuide';
