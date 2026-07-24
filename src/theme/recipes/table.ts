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
      // Opt-in sticky column affordance: <Th|Td isSticky stickyDirection="left|right">
      // sets `data-sticky="left"` or `data-sticky="right"`. The consumer still
      // owns the pin position (`left`/`right` prop) and column width (`w`) —
      // use the `stickyOffsets` helper for cumulative-offset math with
      // multiple sticky columns on the same side.
      //
      // Distinct values ("left"/"right") rather than a bare `data-sticky`
      // attribute so this selector never collides with <Thead sticky>'s
      // `data-sticky=""` on the `<thead>`.
      //
      // Force `table-layout: fixed` when ANY sticky column is present. In
      // auto layout `width` is a hint and columns grow to fit content, which
      // breaks the cumulative-offset math (declared `left="15em"` on column N
      // is wrong once column N-1 actually renders wider than its declared
      // width). Fixed layout hard-caps each column at its declared `w` so
      // content truncates via the existing `text-overflow: ellipsis` and the
      // pin offsets always line up.
      //
      // `table-layout: fixed` + `min-width: max-content` are applied at
      // the component level via `<Table stickyColumns>` (not here via a
      // `:has()` selector) — Chakra v3's Panda pipeline compiled the
      // `:has()` rule but the runtime selector never matched our
      // `data-sticky` cells, leaving fixed layout off and pinned columns
      // shrinking to content width. Component-side prop is the reliable
      // path.
      '& [data-sticky="left"], & [data-sticky="right"]': {
        position: 'sticky',
        // Below sticky <Thead> (docked = 10) so a scrolled header still
        // paints over pinned columns.
        zIndex: 1,
        _after: {
          content: '""',
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          bottom: '-1px',
          width: '32px',
        },
      },
      '& [data-sticky="left"]': {
        _after: {
          insetInlineEnd: 0,
          translate: '100% 0',
          shadow: 'inset 8px 0px 8px -8px rgba(0, 0, 0, 0.16)',
        },
      },
      '& [data-sticky="right"]': {
        _after: {
          insetInlineStart: 0,
          translate: '-100% 0',
          shadow: 'inset -8px 0px 8px -8px rgba(0, 0, 0, 0.16)',
        },
      },
      // Opaque backdrop so scrolled content doesn't show through the pinned
      // column. Th already gets `bg.subtle` from the columnHeader slot; Td
      // is transparent by default so we set an explicit body-cell surface.
      '& tbody [data-sticky="left"], & tbody [data-sticky="right"]': {
        bg: 'bg.surface',
      },
    },
    header: {
      color: 'fg.muted',
      fontWeight: 'medium',
      // Opt-in sticky header affordance: <Thead sticky>
      '&[data-sticky]': {
        position: 'sticky',
        top: 0,
        // Above sticky-column cells (zIndex 1 above)
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
