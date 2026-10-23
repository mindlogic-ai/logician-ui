/**
 * Swatch data for the Setup/Theme → Default story: every 5.0 semantic colour,
 * resolved to concrete hex per mode. Kept out of the story so it can be tested.
 */
import { colors, semanticTokens } from './colors';
import DEPRECATED from './deprecatedColorTokens.json';

type Mode = 'light' | 'dark';
type Node = { value?: unknown; [key: string]: unknown };

/** 4.x name → 5.0 replacement (removed in 6.0). */
export const DEPRECATED_ALIASES: Readonly<Record<string, string>> =
  DEPRECATED.aliases;

const lookup = (root: unknown, path: string): Node | undefined => {
  let node = root as Node | undefined;
  for (const key of path.split('.')) node = node?.[key] as Node | undefined;
  // `{colors.layer.1}` points at the group; Chakra reads its DEFAULT.
  if (node && node.value === undefined && node.DEFAULT)
    node = node.DEFAULT as Node;
  return node;
};

/**
 * Resolve a token value (`'#hex'`, `'{colors.x.y}'`, or a `{ base, _light,
 * _dark, _moreContrast }` object) to hex in one mode, following semantic →
 * semantic references until a raw value is reached.
 */
export const resolveColor = (value: unknown, mode: Mode, depth = 0): string => {
  if (depth > 20) return String(value);
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    const other = mode === 'light' ? v._dark : v._light;
    return resolveColor(
      (mode === 'light' ? v._light : v._dark) ?? v.base ?? other,
      mode,
      depth + 1
    );
  }
  if (typeof value !== 'string') return '';
  const ref = value.match(/^\{colors\.([^}]+)\}$/);
  if (!ref) return value;
  const node = lookup(semanticTokens.colors, ref[1]) ?? lookup(colors, ref[1]);
  return node?.value === undefined
    ? value
    : resolveColor(node.value, mode, depth + 1);
};

export type Swatch = { path: string; light: string; dark: string };

/** In-cell label colour on a data-viz fill: `ink.11` (#252525), white, or none. */
export type DataVizLabel = 'ink' | 'white' | null;

/** Raw token each label resolves to, in either mode. */
export const DATA_VIZ_LABEL_TOKEN = { ink: 'ink.11', white: 'white' } as const;

/**
 * Data-visualisation fills (`data.*`, `diverging.*`, by flat key) and the label
 * a chart may print inside each one, per mode — the tables in
 * SemanticTokens.mdx. Picked per step by measured contrast (≥ 4.5:1), not by
 * step number; `null` means neither label clears it, so the value goes outside
 * the mark. `contrast.test.ts` audits every entry; the BAZE Palette Data Viz
 * story renders from it.
 */
export type DataVizKey =
  | `data-${1 | 2 | 3 | 4}`
  | `diverging-${'pos' | 'neg'}-${1 | 2 | 3}`
  | 'diverging-mid';

export const DATA_VIZ_LABELS: Readonly<
  Record<DataVizKey, { light: DataVizLabel; dark: DataVizLabel }>
> = {
  'data-1': { light: 'ink', dark: 'white' },
  'data-2': { light: 'ink', dark: 'white' },
  'data-3': { light: 'ink', dark: 'ink' },
  'data-4': { light: 'white', dark: 'ink' },
  'diverging-pos-1': { light: 'ink', dark: 'white' },
  'diverging-pos-2': { light: 'ink', dark: 'ink' },
  'diverging-pos-3': { light: 'white', dark: 'ink' },
  'diverging-neg-1': { light: 'ink', dark: 'white' },
  'diverging-neg-2': { light: null, dark: null },
  'diverging-neg-3': { light: 'white', dark: 'ink' },
  'diverging-mid': { light: 'ink', dark: 'white' },
};

/**
 * 5.0 semantic colours grouped by their first segment. Deprecated 4.x aliases
 * (including the whole 4.x `slate.*` step scale) and the internal high-contrast
 * helpers (`scheme.*`) are left out.
 */
export const getSwatchGroups = (): [string, Swatch[]][] => {
  const groups: [string, Swatch[]][] = [];
  const walk = (node: Node, path: string, out: Swatch[]) => {
    if (node.value !== undefined) {
      const name = path.replace(/\.DEFAULT$/, '');
      if (!(name in DEPRECATED_ALIASES))
        out.push({
          path: name,
          light: resolveColor(node.value, 'light'),
          dark: resolveColor(node.value, 'dark'),
        });
      return;
    }
    for (const [key, child] of Object.entries(node))
      if (child && typeof child === 'object')
        walk(child as Node, `${path}.${key}`, out);
  };
  for (const [group, node] of Object.entries(semanticTokens.colors)) {
    if (group === 'scheme' || group.startsWith('chakra')) continue;
    const out: Swatch[] = [];
    walk(node as Node, group, out);
    if (out.length) groups.push([group, out]);
  }
  return groups;
};
