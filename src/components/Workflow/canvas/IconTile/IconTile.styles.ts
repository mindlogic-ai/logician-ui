import type { NodeCategory } from '../../Workflow.types';
import type { CategoryTokenMap, CategoryTokens } from './IconTile.types';

/**
 * Default mapping from the six categories to logician-ui semantic color
 * tokens. "fg" tints the icon, "bg" fills the tile background.
 *
 * 5.0: category tiles are decorative, not status — so five of the six pick a
 * `category.*` hue (purely for visual grouping, swap-able via `categoryTokens`
 * without implying anything is wrong/warning/safe) instead of borrowing
 * `success`/`danger`/`secondary`, which are status/brand families with their
 * own meaning elsewhere in the same canvas. `output` has no obvious hue, so
 * it gets the documented neutral pair (`primary.wash` + `fg.default`) instead
 * of inventing a 13th hue. `note` keeps a real `warning.*` triple — unlike the
 * others it already reads as "a note needs your attention", which IS a status
 * meaning, so it stays on the status family rather than moving to a hue.
 *
 * Host apps that want to retheme can override the map via the
 * `categoryTokens` prop on `<Workflow>` — see WorkflowContext.
 */
export const DEFAULT_CATEGORY_TOKENS: CategoryTokenMap = {
  trigger: {
    bg: 'category.green.surface',
    fg: 'category.green.fg',
    border: 'border.default',
  },
  ai: {
    bg: 'category.purple.surface',
    fg: 'category.purple.fg',
    border: 'border.default',
  },
  logic: {
    bg: 'category.brown.surface',
    fg: 'category.brown.fg',
    border: 'border.default',
  },
  safety: {
    bg: 'category.red.surface',
    fg: 'category.red.fg',
    border: 'border.default',
  },
  output: { bg: 'primary.wash', fg: 'fg.default', border: 'border.default' },
  // Note's `border` doubles as the body border so it reads as warm, not gray.
  note: { bg: 'warning.bg', fg: 'warning.fg', border: 'warning.border' },
};

/**
 * Returns tokens for a category, falling back to `output` if a host passes
 * an unknown category (e.g. from a JSON graph payload).
 */
export function getCategoryTokens(
  category: NodeCategory,
  map: CategoryTokenMap = DEFAULT_CATEGORY_TOKENS
): CategoryTokens {
  return map[category] ?? DEFAULT_CATEGORY_TOKENS.output;
}
