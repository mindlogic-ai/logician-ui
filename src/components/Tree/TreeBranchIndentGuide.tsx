import { forwardRef } from 'react';
import { TreeView as ChakraTreeView } from '@chakra-ui/react';

import { TreeBranchIndentGuideProps } from './Tree.types';

// The parent rail column, measured from a child row (item / branch-control).
// A row's content starts at its own `--tree-offset`, and the parent rail
// sits exactly one `--tree-indentation` to its left (verified against the
// recipe's offset math for both the guide and the row slots).
const ROW_RAIL_COLUMN = 'calc(var(--tree-offset) - var(--tree-indentation))';

// The same column, computed from the `branch` element itself. A branch
// only carries Ark's inline `--depth` (the recipe's `--tree-offset` is
// defined on item/branch-control, not here), so expand the recipe math:
// rail(x) = padding + indentation * (depth - 2) + icon * 0.5 * (depth - 1)
// — algebraically identical to ROW_RAIL_COLUMN for a row at `--depth`.
const BRANCH_RAIL_COLUMN =
  'calc(var(--tree-padding-inline) + var(--tree-indentation) * (var(--depth) - 2) + var(--tree-icon-size) * 0.5 * (var(--depth) - 1))';

export const TreeBranchIndentGuide = forwardRef<
  HTMLDivElement,
  TreeBranchIndentGuideProps
>(
  (
    {
      elbow = false,
      footLength = 'calc(var(--tree-indentation) - 4px)',
      guideColor = 'border.default',
      ...props
    },
    ref
  ) => {
    // Chakra v3's `branchIndentGuide` slot renders ONE absolutely-positioned
    // vertical line per `branchContent` (its first child), `height: 100%`,
    // with `insetInlineStart` auto-calculated from tree depth. Don't add
    // `ms`/`ps` (breaks the depth math) or `borderInlineStartWidth` (stacks
    // a second 1px stroke on the slot's own bg-painted 1px) — only `bg`.
    //
    // That single full-height rail cannot form a `└` on the last row: it
    // always paints past the last row's centre down to the content bottom.
    // So in `elbow` mode the slot's own rail is hidden (`bg: transparent`,
    // the element stays as the CSS sibling anchor) and the guide lines are
    // re-drawn per row on the guide's sibling rows (`[data-part="item"]`
    // leaves and `[data-part="branch"]` subtrees):
    //
    //  - every row gets a `::before` foot — the horizontal cross-stroke
    //    from the rail column toward the row content, pinned to the row's
    //    vertical centre;
    //  - non-last rows get a full-height vertical segment (`├`); for a
    //    branch it is drawn on the `[data-part="branch"]` element so it
    //    passes through the whole expanded subtree, like the original rail
    //    (zIndex 1 for the same paint-above-row-hover reason);
    //  - the LAST row's segment stops at the row's vertical centre where
    //    the foot meets it (`└`); for a branch that means half the
    //    branch-control only, so an expanded last branch hangs below the
    //    elbow with no rail running past it.
    const foot = {
      content: '""',
      position: 'absolute',
      insetBlockStart: '50%',
      insetInlineStart: ROW_RAIL_COLUMN,
      width: footLength,
      height: '1px',
      bg: guideColor,
    } as const;
    const rail = {
      content: '""',
      position: 'absolute',
      insetBlockStart: '0',
      insetInlineStart: ROW_RAIL_COLUMN,
      width: '1px',
      bg: guideColor,
    } as const;
    const elbowCss = elbow
      ? {
          '& ~ [data-part="item"]::before': foot,
          '& ~ [data-part="branch"] > [data-part="branch-control"]::before':
            foot,
          '& ~ [data-part="item"]:not(:last-child)::after': {
            ...rail,
            insetBlockEnd: '0',
          },
          '& ~ [data-part="item"]:last-child::after': {
            ...rail,
            height: '50%',
          },
          '& ~ [data-part="branch"]:not(:last-child)::before': {
            ...rail,
            insetBlockEnd: '0',
            insetInlineStart: BRANCH_RAIL_COLUMN,
            zIndex: 1,
          },
          '& ~ [data-part="branch"]:last-child > [data-part="branch-control"]::after':
            {
              ...rail,
              height: '50%',
            },
        }
      : undefined;

    return (
      <ChakraTreeView.BranchIndentGuide
        ref={ref}
        bg={elbow ? 'transparent' : guideColor}
        css={elbowCss}
        {...props}
      />
    );
  }
);
TreeBranchIndentGuide.displayName = 'TreeBranchIndentGuide';
