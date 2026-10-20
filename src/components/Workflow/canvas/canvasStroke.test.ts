import { describe, expect, it } from 'vitest';

import { SCHEMES } from '../../../theme/palette.generated';
import { defaultEdgeOptions } from './Canvas/Canvas.styles';
import { colorVar } from './colorVar';
import { PORT_STYLE } from './NodeShell/NodeShell.styles';

/**
 * Edges, arrowheads and port rings are non-text marks: they need ≥ 3:1
 * (≥ 4.5:1 in high contrast, as in src/theme/contrast.test.ts) against every
 * surface they sit on. The colour is read back out of the shipped styles, so
 * the test follows whatever token the canvas actually paints.
 */

type Mode = 'light' | 'dark' | 'hcLight' | 'hcDark';
const MODES: Mode[] = ['light', 'dark', 'hcLight', 'hcDark'];
const SURFACES = ['bg-canvas', 'bg-surface', 'bg-subtle', 'primary-wash'];

const lum = (h: string) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const x = lum(a);
  const y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

const kebab = (flat: string) =>
  flat.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** `var(--chakra-colors-fg-icon)` → the SCHEMES value for that role. */
function resolveVar(
  css: string,
  table: Record<string, string>
): string | undefined {
  const name = /var\(--chakra-colors-([a-z0-9-]+)\)/.exec(css)?.[1];
  const key = Object.keys(table).find((k) => kebab(k) === name);
  return key ? table[key] : undefined;
}

const STROKES: [string, string][] = [
  ['edge stroke', String(defaultEdgeOptions.style?.stroke)],
  [
    'arrowhead',
    String(
      (defaultEdgeOptions.markerEnd as { color?: string } | undefined)?.color
    ),
  ],
  ['port ring', String(PORT_STYLE.border)],
];

describe('colorVar', () => {
  it('kebab-cases camelCase segments the way Chakra emits them', () => {
    expect(colorVar('fg.onPrimary')).toBe('var(--chakra-colors-fg-on-primary)');
    expect(colorVar('primary.washActive')).toBe(
      'var(--chakra-colors-primary-wash-active)'
    );
    expect(colorVar('bg.surface')).toBe('var(--chakra-colors-bg-surface)');
  });
});

describe.each(Object.keys(SCHEMES) as (keyof typeof SCHEMES)[])(
  'canvas strokes — %s scheme',
  (scheme) => {
    it.each(MODES)('clear non-text contrast on every surface in %s', (mode) => {
      const table = SCHEMES[scheme][mode] as Record<string, string>;
      const need = mode.startsWith('hc') ? 4.5 : 3;
      const failures = STROKES.flatMap(([what, css]) => {
        const fg = resolveVar(css, table);
        if (!fg) return [`${what}: ${css} names no role token`];
        return SURFACES.flatMap((bg) => {
          const c = ratio(fg, table[bg]);
          return c >= need - 1e-9
            ? []
            : [`${what} (${css}) on ${bg}: ${c.toFixed(2)} < ${need}`];
        });
      });
      expect(failures).toEqual([]);
    });
  }
);
