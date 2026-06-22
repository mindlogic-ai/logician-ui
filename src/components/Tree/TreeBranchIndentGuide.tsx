import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeBranchIndentGuideProps } from './Tree.types';

export const TreeBranchIndentGuide = forwardRef<
  HTMLDivElement,
  TreeBranchIndentGuideProps
>(
  (
    { elbow = false, footLength = 'var(--tree-indentation)', ...props },
    ref
  ) => {
    // Chakra v3's `branchIndentGuide` slot already renders the vertical
    // line via `position: absolute`, `width: 1px`, `bg: border`, with
    // `insetInlineStart` auto-calculated from tree depth. Don't add
    // `ms`/`ps` (breaks the depth math, pushes the line over content)
    // or `borderInlineStartWidth` (stacks a second 1px stroke on top of
    // the slot's own bg-painted 1px). Only override `bg` to lighten.
    //
    // `elbow` adds the `├` / `└` horizontal foot. NOTE the actual DOM:
    // Chakra renders ONE guide per `branchContent`, as its first child,
    // followed by that branch's child rows (`[data-part="item"]` leaves
    // and `[data-part="branch"]` branches) as siblings. The single guide
    // is `height: 100%`, so it paints one continuous vertical rail down
    // the whole subtree — it is NOT one box per depth. That means a
    // `:last-of-type::after` on the guide can never match (the child
    // rows are later siblings of the same `div` type), so the foot has
    // to be drawn on the rows themselves.
    //
    // We reach each direct-child row from the guide via the general
    // sibling combinator and give it a `::before` cross-stroke. Geometry
    // (verified against the recipe): a child row's content starts at its
    // own `--tree-offset`, and the parent rail sits exactly one
    // `--tree-indentation` to its left. So a foot pinned to the row's
    // vertical centre (`insetBlockStart: 50%`), starting at
    // `--tree-offset - --tree-indentation` (the rail column) and running
    // `footLength` toward the text, joins the rail to the row across
    // every `size` variant without hard-coding heights. `footLength`
    // defaults to a full `--tree-indentation` so the stroke meets the
    // text; `bg: border.subtle` matches the rail so corner + rail read
    // as one stroke. (True `└` clipping for last children is a follow-up
    // — needs a last-child signal from Ark.)
    const foot = {
      content: '""',
      position: 'absolute',
      insetBlockStart: '50%',
      insetInlineStart: 'calc(var(--tree-offset) - var(--tree-indentation))',
      width: footLength,
      height: '1px',
      bg: 'border.subtle',
    } as const;
    const elbowCss = elbow
      ? {
          '& ~ [data-part="item"]::before': foot,
          '& ~ [data-part="branch"] > [data-part="branch-control"]::before':
            foot,
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
  }
);
TreeBranchIndentGuide.displayName = 'TreeBranchIndentGuide';
