import type { PortStyle } from './NodeShell.types';

export const CARD_WIDTH = '174px';

/**
 * Floor height (px) for a canvas node so a content-light node (e.g. Start,
 * whose header is just an icon + label) doesn't render as a cramped sliver.
 * Composed into a px string at the call site — a raw number would be read as
 * a Chakra spacing token, not pixels.
 */
export const NODE_MIN_HEIGHT = 64;

/**
 * Vertical gap (px) between adjacent ports. Ports are stacked symmetrically
 * around the card's vertical centre (see `portTop` in NodeShell), so a node
 * with `n` ports reserves `PORT_GAP * (n - 1)` between the first and last —
 * enough that a many-branch node's exits (Classify, If/Else) don't squish
 * together or collide their labels.
 */
export const PORT_GAP = 28;

/**
 * Padding (px) above the first port and below the last. Kept deliberately
 * tighter than `PORT_GAP` so a busy node (e.g. Classify with many categories)
 * doesn't grow taller than it needs to — the old percentage spread forced this
 * edge gap to equal the inter-port gap, which read as too much dead space.
 */
export const PORT_EDGE_PAD = 14;

/**
 * Vertical offset for the `i`-th of `count` ports, expressed relative to the
 * card's centre. Stacking them around the middle (rather than spreading them
 * across the full height) keeps a single port dead-centre and lets the top /
 * bottom edge padding shrink to `PORT_EDGE_PAD` independently of `PORT_GAP`,
 * so a busy node isn't padded out taller than it needs to be.
 */
export function getPortTop(index: number, count: number): string {
  const offset = (index - (count - 1) / 2) * PORT_GAP;
  return `calc(50% + ${offset}px)`;
}

/** Cap on the meta-chip row so a node with many badges can't grow unboundedly. */
export const MAX_META_CHIPS = 4;

/**
 * React Flow `<Handle>` takes inline SVG-style props rather than Chakra
 * tokens, so port colors are spelled as CSS vars from the theme.
 */
function colorVar(token: string): string {
  return `var(--chakra-colors-${token.replace(/\./g, '-')})`;
}

export const PORT_STYLE: PortStyle = {
  width: 8,
  height: 8,
  background: colorVar('bg.surface'),
  border: `1.5px solid ${colorVar('slate.700')}`,
};

/**
 * Compact pill styling for the canvas node's meta row. Overrides logician-ui
 * Chip's chunky defaults so a row of badges fits on a 174px-wide card,
 * but the font size stays on the `sm` theme token — no sub-`sm` sizes
 * in the editor.
 */
export const metaChipStyles = {
  variant: 'soft' as const,
  colorPalette: 'neutral' as const,
  fontWeight: 'medium',
  px: 2,
  py: 0.5,
  borderRadius: 'sm',
};

/**
 * Per-tone color overrides applied on top of `metaChipStyles`. `default`
 * is empty so the base styles win; `danger`/`warning` tint the chip when
 * a sub-value (e.g. an unknown model) is invalid.
 */
export const metaChipToneStyles = {
  default: {},
  danger: { bg: 'danger.lightest', color: 'danger.dark' },
  warning: { bg: 'warning.lightest', color: 'warning.dark' },
} as const;
