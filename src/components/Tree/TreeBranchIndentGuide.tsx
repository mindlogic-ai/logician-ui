import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeBranchIndentGuideProps } from './Tree.types';

export const TreeBranchIndentGuide = forwardRef<
  HTMLDivElement,
  TreeBranchIndentGuideProps
>(({ elbow = false, footLength = '0.625rem', ...props }, ref) => {
  // Chakra v3's `branchIndentGuide` slot already renders the vertical
  // line via `position: absolute`, `width: 1px`, `bg: border`, with
  // `insetInlineStart` auto-calculated from tree depth. Don't add
  // `ms`/`ps` (breaks the depth math, pushes the line over content)
  // or `borderInlineStartWidth` (stacks a second 1px stroke on top of
  // the slot's own bg-painted 1px). Only override `bg` to lighten.
  //
  // `elbow` adds the `L`-shaped foot. The guides for a single row are
  // rendered as consecutive siblings — one per depth level — each an
  // absolutely-positioned, row-height, 1px-wide box. The straight
  // rails you normally see are those boxes stacking edge-to-edge down
  // the rows. Only the INNERMOST guide (`:last-of-type`, the one in
  // this node's own column) should grow a horizontal foot, turning its
  // rail into a `├` (mid sibling) / `└` (last sibling) connector. The
  // foot is a 1px cross-stroke pinned to the vertical centre of the
  // row, so it lands on the text baseline across every `size` variant
  // without hard-coding row heights. `bg: border.subtle` matches the
  // rail colour so corner and rail read as one stroke.
  const elbowCss = elbow
    ? {
        '&:last-of-type::after': {
          content: '""',
          position: 'absolute',
          insetBlockStart: '50%',
          insetInlineStart: 0,
          width: footLength,
          height: '1px',
          bg: 'border.subtle',
        },
      }
    : undefined;

  return (
    <ChakraTreeView.BranchIndentGuide
      ref={ref}
      bg="border.subtle"
      css={elbowCss}
      {...props}
    />
  );
});
TreeBranchIndentGuide.displayName = 'TreeBranchIndentGuide';
