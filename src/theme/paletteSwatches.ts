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
