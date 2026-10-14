import { type DefaultEdgeOptions, MarkerType } from '@xyflow/react';

/**
 * Edge defaults. Stroke comes from a theme token (slate.700) via CSS var
 * since React Flow takes SVG-style props, not Chakra ones. The label
 * itself is rendered through the `labeled` custom edge so its
 * typography uses the design system's semantic `Subtext` primitive —
 * see `LabeledEdge.tsx`. The arrowhead makes each edge's direction
 * self-describing rather than implied by left→right placement alone.
 */
export const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'labeled',
  style: {
    stroke: 'var(--chakra-colors-slate-700)',
    strokeWidth: 1.5,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'var(--chakra-colors-slate-700)',
    width: 18,
    height: 18,
  },
};

/**
 * Selection outline for edges. React Flow toggles `.selected` on the
 * edge group; we layer an outline on the path so the user gets visual
 * feedback before pressing Delete. Scoped via the Canvas wrapper's
 * `css` prop rather than a global stylesheet.
 */
export const canvasSelectionCss = {
  // Ports paint as 8px dots (see PORT_STYLE) but that's a pixel-hunt drag
  // target; a pseudo-element participates in its parent's hit-testing, so this
  // pads every handle's grab area to ~24px without changing the visual dot.
  '& .react-flow__handle::after': {
    content: '""',
    position: 'absolute',
    inset: '-8px',
  },
  // Hover feedback: thicken/darken the path so an edge reads as grabbable
  // before it's selected. Listed before the `.selected` rule (equal
  // specificity) so selection styling wins when an edge is both.
  '& .react-flow__edge:hover .react-flow__edge-path': {
    stroke: 'var(--chakra-colors-slate-900)',
    strokeWidth: 2,
  },
  '& .react-flow__edge.selected .react-flow__edge-path': {
    stroke: 'var(--chakra-colors-primary-main)',
    strokeWidth: 2.5,
    filter: 'drop-shadow(0 0 4px var(--chakra-colors-primary-lighter))',
  },
  '& .react-flow__edge.selected .react-flow__edge-interaction': {
    stroke: 'var(--chakra-colors-primary-main)',
  },
  // React Flow's stock zoom/lock controls are fixed white — point its theme
  // vars at our tokens so the cluster follows the color mode (light values match
  // the stock look). A solid surface (rather than transparent buttons) keeps the
  // icons legible as the canvas pans content beneath the cluster, and matches the
  // minimap panel in the opposite corner. Frame it like the node cards — md
  // radius + slate.200 border + shadow — so it reads as a deliberate floating
  // toolbar; the border carries the definition in dark mode where the stock
  // shadow is invisible on the dark canvas. `overflow: hidden` clips the stacked
  // buttons to the rounded corners (tooltips portal out, so they aren't clipped).
  '& .react-flow__controls': {
    '--xy-controls-button-background-color': 'var(--chakra-colors-bg-surface)',
    '--xy-controls-button-background-color-hover':
      'var(--chakra-colors-slate-100)',
    '--xy-controls-button-color': 'var(--chakra-colors-slate-1200)',
    '--xy-controls-button-color-hover': 'var(--chakra-colors-slate-1500)',
    '--xy-controls-button-border-color': 'var(--chakra-colors-slate-200)',
    '--xy-controls-box-shadow': 'var(--chakra-shadows-sm)',
    borderRadius: 'var(--chakra-radii-md)',
    border: '1px solid var(--chakra-colors-slate-200)',
    overflow: 'hidden',
  },
  // Our control glyphs (lucide Plus/Minus + Tabler arrows/lock/maximize/sitemap)
  // are stroke-based — `fill="none"`, `stroke="currentColor"`. React Flow's stock
  // CSS forces `fill: currentColor` on control-button SVGs (its own icons are
  // solid), which fills these outline icons into blobs (the lock rendered as a
  // solid lozenge) and, via its `:disabled svg { fill-opacity: .4 }` companion,
  // painted a translucent gray inside the disabled undo/redo arrows. Restore the
  // intended stroke-only rendering.
  '& .react-flow__controls-button svg': {
    fill: 'none',
  },
  // With fill removed, RF's fill-opacity disabled cue is a no-op — dim the whole
  // glyph instead so disabled undo/redo still read as inactive.
  '& .react-flow__controls-button:disabled svg': {
    opacity: 0.4,
  },
};
