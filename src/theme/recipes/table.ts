import { defineSlotRecipe } from '@chakra-ui/react';

/**
 * Logician overrides for Chakra's `table` slot recipe.
 *
 * Merged on top of Chakra's default table recipe by `createSystem`, so only
 * the deltas live here. Everything uses semantic (mode-aware) tokens so a
 * no-prop <Table> renders the correct header/border/text/hover in both light
 * and dark mode — consumers should only override for genuine per-row state
 * or layout.
 */
export const tableSlotRecipe = defineSlotRecipe({
  slots: ['root', 'header', 'body', 'row', 'columnHeader', 'cell'],
  base: {
    root: {
      color: 'fg.default',
    },
    header: {
      color: 'fg.muted',
      fontWeight: 'medium',
      // Opt-in sticky header affordance: <Thead sticky>
      '&[data-sticky]': {
        position: 'sticky',
        top: 0,
        // Above sticky-column cells (zIndex 2 in Table.styles.ts)
        zIndex: 'docked',
        bg: 'bg.surface',
        // border-collapse leaves cell borders behind when the header sticks;
        // the shadow keeps the bottom hairline visible while scrolled
        boxShadow: '0 1px 0 0 {colors.border.subtle}',
      },
    },
    body: {
      fontWeight: 'medium',
      // Remove the last row's bottom border so it doesn't double up with
      // TableContainer's border. Both rules are needed under border-collapse:
      // the row border comes from base.row, the cell border from Chakra's
      // line variant.
      '& > tr:last-of-type': {
        borderBottom: 'none',
      },
      '& > tr:last-of-type > td': {
        borderBottom: 'none',
      },
    },
    row: {
      borderBottomWidth: '1px',
      borderBottomColor: 'border.subtle',
      // Interactive styling is keyed off data-interactive, which <Tr> sets
      // automatically when it receives onClick / role="button" / tabIndex —
      // static tables never pick up hover/cursor styling.
      '&[data-interactive]': {
        cursor: 'pointer',
        _hover: { bg: 'bg.muted' },
        // Inset outline instead of the shared focusRing util (boxShadow
        // ring): rows are clipped by TableContainer's rounded overflow,
        // which would crop an outer ring.
        _focusVisible: {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '-2px',
        },
      },
      // Row-state tints: set via <Tr state="..."> (data-selected /
      // data-invalid / data-highlighted)
      _selected: { bg: 'bg.selected' },
      _invalid: { bg: 'bg.invalid.subtle' },
      _highlighted: { bg: 'bg.highlighted' },
    },
    columnHeader: {
      color: 'fg.muted',
      fontWeight: 'medium',
      bg: 'bg.subtle',
      borderBottomWidth: '1px',
      borderBottomColor: 'border.subtle',
    },
    cell: {
      borderBottomColor: 'border.subtle',
    },
  },
  variants: {
    variant: {
      line: {
        // Chakra's line variant paints rows with the raw `bg` token (pure
        // black in dark mode); keep rows transparent so the surface behind
        // the table shows through and state tints/hover sit on top.
        row: { bg: 'transparent' },
      },
    },
  },
});
