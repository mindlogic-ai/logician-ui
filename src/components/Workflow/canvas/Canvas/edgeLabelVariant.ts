/**
 * Pill variant for an edge label, derived from the SOURCE handle it leaves.
 *
 * Guardrail has two exits — `pass` / `fail` — a binary safety outcome, so they
 * read as semantic green / red. Every routing exit — If-Else branches, the
 * If-Else `else` fallback, and Classify categories (`branch_*` / `cat_*` /
 * `else`) — plus any free-text label reads as a neutral badge, so the branch
 * names all look alike. `else` stays its own variant in case it ever needs
 * distinguishing, but currently renders neutral like the other keys.
 */
export type EdgeLabelVariant = 'pass' | 'fail' | 'else' | 'key' | 'default';

export const getEdgeLabelVariant = (
  sourceHandle?: string | null
): EdgeLabelVariant => {
  if (sourceHandle === 'pass') return 'pass';
  if (sourceHandle === 'fail') return 'fail';
  if (sourceHandle === 'else') return 'else';
  if (sourceHandle?.startsWith('branch_') || sourceHandle?.startsWith('cat_')) {
    return 'key';
  }
  return 'default';
};
