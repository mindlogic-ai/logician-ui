import type { NodeCategory } from '../../Workflow.types';
import type { CategoryTokenMap, CategoryTokens } from './IconTile.types';

/**
 * Default mapping from the six categories to logician-ui semantic color
 * tokens. "fg" tints the icon, "bg" fills the tile background. Output and
 * Note don't map cleanly to a `colorPalette` so they're spelled out with
 * raw token pairs.
 *
 * Host apps that want to retheme can override the map via the
 * `categoryTokens` prop on `<Workflow>` — see WorkflowContext.
 */
export const DEFAULT_CATEGORY_TOKENS: CategoryTokenMap = {
  trigger: {
    bg: 'success.lightest',
    fg: 'success.main',
    border: 'slate.300',
  },
  ai: { bg: 'primary.lightest', fg: 'primary.main', border: 'slate.300' },
  logic: {
    bg: 'secondary.lightest',
    fg: 'secondary.main',
    border: 'slate.300',
  },
  safety: { bg: 'danger.lightest', fg: 'danger.main', border: 'slate.300' },
  output: { bg: 'slate.50', fg: 'slate.1200', border: 'slate.300' },
  // Note's `border` doubles as the body border so it reads as warm, not gray.
  note: { bg: 'warning.lightest', fg: 'warning.dark', border: 'warning.light' },
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
