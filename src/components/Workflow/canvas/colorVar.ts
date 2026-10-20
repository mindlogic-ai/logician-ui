/**
 * Token path → the CSS variable Chakra emits for it, for the React Flow props
 * (`<Handle style>`, edge `style` / `markerEnd`) that take raw CSS rather than
 * Chakra tokens. Chakra kebab-cases every segment, so `fg.onPrimary` is
 * `--chakra-colors-fg-on-primary`; swapping only the dots would name a
 * variable that never exists and the declaration would silently fall back.
 */
export function colorVar(token: string): string {
  const name = token
    .split('.')
    .map((segment) => segment.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`))
    .join('-');
  return `var(--chakra-colors-${name})`;
}

/**
 * Colour of the canvas's structural strokes — edges, arrowheads and port
 * rings. These are the only marks that say what connects to what, so they are
 * non-text graphics and need ≥ 3:1 against every surface they sit on
 * (`primary.wash` canvas, `bg.subtle` read-only canvas, `bg.canvas` in dark,
 * `bg.surface` behind a port). `border.strong` is a separator (~1.7:1 on the
 * wash) and fails that; `fg.icon` is the role for non-text marks and clears it
 * in every mode (see `canvasStroke.test.ts`). 4.x drew these in `slate.700`,
 * which deprecatedColorTokens.json maps to `neutral.8` — the same job.
 */
export const CANVAS_STROKE_TOKEN = 'fg.icon';
