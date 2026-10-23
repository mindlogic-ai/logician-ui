import { describe, expect, it } from 'vitest';

import {
  colors,
  createSemanticColors,
  DEPRECATED_COLOR_TOKENS,
  type NeutralScale,
  ROLE_TOKEN_PATHS,
  SYSTEM_HUE_NAMES,
} from './colors';
import { system } from './index';
import { SCHEMES } from './palette.generated';
import { DATA_VIZ_LABEL_TOKEN, DATA_VIZ_LABELS } from './paletteSwatches';

/**
 * Contrast audit for the BAZE semantic tokens — the same check as section 3-1
 * of the 5.0 palette prototype, run on the token tree the theme actually ships.
 *
 * - text ≥ 4.5:1 (high contrast ≥ 7:1)
 * - non-text — icons, control borders, focus ring, marks ≥ 3:1 (HC ≥ 4.5:1)
 * - neighbouring layers ≥ 1.10:1
 * in light, dark, hcLight and hcDark, for every neutral scheme.
 *
 * The pair list is a USAGE RULE ("this foreground is put on this
 * background"). When you add a semantic token, register it: add its pair(s)
 * to PAIRS, or give it a reason in NO_PAIR. The registry test below fails
 * until you do.
 */

type Mode = 'light' | 'dark' | 'hcLight' | 'hcDark';
const MODES: Mode[] = ['light', 'dark', 'hcLight', 'hcDark'];
const SCHEME_NAMES: NeutralScale[] = ['ink', 'slate'];
type Kind = 'text' | 'nontext';

// Ported verbatim from the prototype (`PAIRS` / `SEP` in index.html v4).
const PAIRS: [string, string, Kind][] = [
  ...(['bg-canvas', 'layer-1', 'layer-2', 'layer-3'] as const).flatMap(
    (bg) =>
      [
        ['fg-default', bg, 'text'],
        ['fg-muted', bg, 'text'],
        ['fg-subtle', bg, 'text'],
        ['fg-link', bg, 'text'],
        ['fg-icon', bg, 'nontext'],
        ['border-control', bg, 'nontext'],
        ['focus', bg, 'nontext'],
        ['action-mark', bg, 'nontext'],
        ['primary-main', bg, 'nontext'],
        ['danger-fg', bg, 'nontext'],
      ] as [string, string, Kind][]
  ),
  ['fg-placeholder', 'bg-surface', 'text'],
  ['fg-default', 'primary-wash', 'text'],
  ['fg-default', 'primary-washActive', 'text'],
  ['fg-default', 'primary-selected', 'text'],
  // Neutral grounds that replaced the sand tint as component backgrounds
  // (Badge/Tag/Avatar fallback, Card wash, ErrorFallback support box →
  // bg.muted; Banner neutral → bg.subtle; Modal brand header → layer.3 and
  // RangeDatePicker range fill → primary.selected, both covered above).
  // `secondary.surface*` is tint-only — never a component background.
  ['fg-default', 'bg-muted', 'text'],
  ['fg-muted', 'bg-muted', 'text'],
  ['secondary-fgStrong', 'bg-muted', 'text'],
  ['fg-default', 'bg-subtle', 'text'],
  ['fg-muted', 'bg-subtle', 'text'],
  ['fg-icon', 'bg-muted', 'nontext'],
  ['fg-icon', 'bg-subtle', 'nontext'],
  ['fg-default', 'secondary-surface', 'text'],
  ['secondary-fgStrong', 'secondary-surface', 'text'],
  ['secondary-fgStrong', 'secondary-surfaceStrong', 'text'],
  ['secondary-fg', 'bg-canvas', 'text'],
  ['fg-onPrimary', 'primary-main', 'text'],
  ['fg-onPrimary', 'primary-hover', 'text'],
  ['fg-onPrimary', 'primary-active', 'text'],
  ['action-fg', 'action-bg', 'text'],
  ['action-iconOnSolid', 'action-bg', 'nontext'],
  ['action-fg', 'action-bgHover', 'text'],
  ['action-iconOnSolid', 'action-bgHover', 'nontext'],
  ['action-fg', 'action-bgActive', 'text'],
  ['action-iconOnSolid', 'action-bgActive', 'nontext'],
  // `text`, not `nontext`: Button `accent` puts a label on these fills.
  ['send-fg', 'send-bg', 'text'],
  ['send-fg', 'send-bgHover', 'text'],
  ['send-fg', 'send-bgActive', 'text'],
  ['danger-fg', 'danger-bg', 'text'],
  ['danger-onSolid', 'danger-solid', 'text'],
  ['success-fg', 'success-bg', 'text'],
  ['success-onSolid', 'success-solid', 'text'],
  ['warning-fg', 'warning-bg', 'text'],
  ['warning-onSolid', 'warning-solid', 'text'],
  ['info-fg', 'info-bg', 'text'],
  ['info-onSolid', 'info-solid', 'text'],
  ['danger-onSolid', 'danger-solidHover', 'text'],
  ['danger-onSolid', 'danger-solidActive', 'text'],
  ['count-fg', 'count-bg', 'text'],
  ['tooltip-fg', 'tooltip-bg', 'text'],
];

const SEP: [string, string][] = [
  ['layer-1', 'bg-canvas'],
  ['layer-2', 'layer-1'],
  ['layer-3', 'layer-2'],
  // Card `wash` is borderless: its bg.muted ground alone separates it.
  ['bg-muted', 'bg-canvas'],
  // Modal `headerTone="brand"` band (layer.3) on the dialog panel (bg.surface).
  ['layer-3', 'bg-surface'],
];

/**
 * Role tokens deliberately not in a contrast pair, and why. Anything that is
 * neither here nor in PAIRS/SEP fails the registry test.
 */
const NO_PAIR: Record<string, string> = {
  'layer-1-hover':
    'hover state of layer-1; fg on it is covered by primary-wash pairs',
  'layer-1-active': 'pressed state; same step as primary-selected',
  'layer-2-hover': 'hover state of layer-2',
  'layer-2-active': 'pressed state of layer-2',
  'layer-3-hover': 'hover state of layer-3',
  'layer-3-active': 'pressed state of layer-3',
  'border-subtle':
    'decorative divider — no WCAG requirement (controls use border-control)',
  'border-default': 'decorative card border — no WCAG requirement',
  'border-strong': 'decorative emphasis border — no WCAG requirement',
  'fg-linkHover': 'hover state of fg-link; link stays underlined',
  'secondary-border': 'decorative border of a secondary surface',
  'action-border':
    'outline of the dark-mode action button; the fill carries the contrast',
  'disabled-bg':
    'disabled controls are exempt from WCAG contrast (1.4.3 / 1.4.11)',
  'disabled-fg':
    'disabled controls are exempt from WCAG contrast (1.4.3 / 1.4.11)',
  'danger-border':
    'decorative edge of a status surface; the fg/icon carries the status',
  'success-border': 'decorative edge of a status surface',
  'warning-border': 'decorative edge of a status surface',
  'info-border': 'decorative edge of a status surface',
  track: 'unfilled track; the filled part (primary-main) carries the value',
};

// Data-viz fills (`data.*`, `diverging.*`) are registered through
// DATA_VIZ_LABELS (paletteSwatches.ts): each fill with the in-cell label it may
// carry. Audited at 4.5:1 in light and dark, like the category pairs: the fills
// keep their value under high contrast (they are fills, like `track`), so an
// in-cell label is not held to the 7:1 high-contrast text target.

// ───────────────────────────── resolver ─────────────────────────────

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

type Node = { value?: unknown; [k: string]: unknown };

function lookup(tree: Node, path: string): Node | undefined {
  let node: Node | undefined = tree;
  for (const p of path.split('.')) node = node?.[p] as Node | undefined;
  if (node && node.value === undefined && node.DEFAULT)
    node = node.DEFAULT as Node;
  return node;
}

function makeResolver(neutral: NeutralScale) {
  const semantic = createSemanticColors({ neutral }) as unknown as Node;
  const raw = colors as unknown as Node;
  const resolve = (path: string, mode: Mode, seen: string[] = []): string => {
    if (seen.includes(path))
      throw new Error(`cycle: ${[...seen, path].join(' → ')}`);
    const sem = lookup(semantic, path);
    if (sem?.value !== undefined) {
      let val = sem.value as string | Record<string, string>;
      if (typeof val === 'object') {
        const dark = mode === 'dark' || mode === 'hcDark';
        const hc = mode === 'hcLight' || mode === 'hcDark';
        if ('_moreContrast' in val || ('base' in val && !('_dark' in val))) {
          val = hc && val._moreContrast ? val._moreContrast : val.base;
        } else {
          val = (dark ? val._dark : val._light) ?? val.base;
        }
      }
      return deref(val as string, mode, [...seen, path]);
    }
    const r = lookup(raw, path);
    if (typeof r?.value === 'string') return r.value;
    throw new Error(`unknown colour token: ${path}`);
  };
  const deref = (val: string, mode: Mode, seen: string[]): string => {
    const m = /^\{colors\.(.+)\}$/.exec(val);
    return m ? resolve(m[1], mode, seen) : val;
  };
  const flat = (key: string, mode: Mode) => {
    const path = (ROLE_TOKEN_PATHS as Record<string, string>)[key];
    if (!path) throw new Error(`no role token for ${key}`);
    return resolve(path.replace(/\.DEFAULT$/, ''), mode);
  };
  return { semantic, resolve, flat };
}

const need = (kind: Kind, mode: Mode) => {
  const hc = mode === 'hcLight' || mode === 'hcDark';
  return kind === 'text' ? (hc ? 7 : 4.5) : hc ? 4.5 : 3;
};

// ───────────────────────────── tests ─────────────────────────────

describe.each(SCHEME_NAMES)('contrast — %s scheme', (neutral) => {
  const { flat, resolve } = makeResolver(neutral);

  it.each(MODES)('every registered pair clears its target in %s', (mode) => {
    const failures = PAIRS.flatMap(([fg, bg, kind]) => {
      const c = ratio(flat(fg, mode), flat(bg, mode));
      return c >= need(kind, mode) - 1e-9
        ? []
        : [`${fg} on ${bg}: ${c.toFixed(2)} < ${need(kind, mode)}`];
    });
    expect(failures).toEqual([]);
  });

  it.each(MODES)('neighbouring layers separate by ≥ 1.10 in %s', (mode) => {
    const failures = SEP.flatMap(([a, b]) => {
      const c = ratio(flat(a, mode), flat(b, mode));
      return c >= 1.1 ? [] : [`${a} vs ${b}: ${c.toFixed(3)}`];
    });
    expect(failures).toEqual([]);
  });

  it('the theme ships exactly the generated values', () => {
    const table = SCHEMES[neutral] as unknown as Record<
      Mode,
      Record<string, string>
    >;
    const drift: string[] = [];
    for (const mode of MODES)
      for (const [key, want] of Object.entries(table[mode])) {
        const got = flat(key, mode);
        if (got.toUpperCase() !== want.toUpperCase())
          drift.push(`${mode} ${key}: ${got} != ${want}`);
      }
    expect(drift).toEqual([]);
  });

  it('category ink on its surface reads as text (≥ 4.5:1, light and dark)', () => {
    const failures = SYSTEM_HUE_NAMES.flatMap((hue) =>
      (['light', 'dark'] as const).flatMap((mode) => {
        const c = ratio(
          resolve(`category.${hue}.fg`, mode),
          resolve(`category.${hue}.surface`, mode)
        );
        return c >= 4.5 ? [] : [`${hue} ${mode}: ${c.toFixed(2)}`];
      })
    );
    expect(failures).toEqual([]);
  });

  it('data-viz fills: each in-cell label clears 4.5:1, and "no label" means neither does (light and dark)', () => {
    const failures = Object.entries(DATA_VIZ_LABELS).flatMap(([fill, labels]) =>
      (['light', 'dark'] as const).flatMap((mode) => {
        const bg = flat(fill, mode);
        const label = labels[mode];
        if (label) {
          const c = ratio(resolve(DATA_VIZ_LABEL_TOKEN[label], mode), bg);
          return c >= 4.5
            ? []
            : [`${label} on ${fill} ${mode}: ${c.toFixed(2)}`];
        }
        const best = Math.max(
          ...Object.values(DATA_VIZ_LABEL_TOKEN).map((t) =>
            ratio(resolve(t, mode), bg)
          )
        );
        return best < 4.5
          ? []
          : [`${fill} ${mode} has no label but one clears ${best.toFixed(2)}`];
      })
    );
    expect(failures).toEqual([]);
  });

  it('every deprecated 4.x name resolves to its replacement in all modes', () => {
    for (const [oldName, newName] of Object.entries(DEPRECATED_COLOR_TOKENS))
      for (const mode of MODES)
        expect(`${oldName} ${mode} ${resolve(oldName, mode)}`).toBe(
          `${oldName} ${mode} ${resolve(newName, mode)}`
        );
  });
});

describe('contrast registry', () => {
  const registered = new Set([
    ...PAIRS.flatMap(([a, b]) => [a, b]),
    ...SEP.flatMap(([a, b]) => [a, b]),
    ...Object.keys(NO_PAIR),
    ...Object.keys(DATA_VIZ_LABELS),
  ]);

  it('every role token has a contrast pair or a NO_PAIR reason', () => {
    const missing = Object.keys(ROLE_TOKEN_PATHS).filter(
      (k) => !registered.has(k)
    );
    expect(missing).toEqual([]);
  });

  it('no semantic token exists outside the audited structure', () => {
    // Every leaf of the shipped tree must be a role token (audited above) or one
    // of the structural families below. Adding a token anywhere else in
    // `createSemanticColors` fails here — register it in ROLE_TOKEN_PATHS (and
    // a pair) or extend this list with a reason.
    const { semantic } = makeResolver('ink');
    const roles = new Set(
      Object.values(ROLE_TOKEN_PATHS).map((p) => p.replace(/\.DEFAULT$/, ''))
    );
    const deprecated = new Set(Object.keys(DEPRECATED_COLOR_TOKENS));
    const structural = [
      /^neutral\.\d+$/, // semantic step → raw scale
      /^secondary\.\d+$/,
      /^scheme\.(light|dark)\.\w+$/, // internal high-contrast helpers
      /^category\.\w+\.(surface|fg)$/, // audited by the category test
      // kept 4.x names / Chakra globals that reuse a role value verbatim
      /^(bg|fg|border)$/,
      /^bg\.(panel|raised|inverse|sunken|highlighted|invalid\.subtle)$/,
      /^fg\.(inverse|emphasized)$/,
      // Chakra's own names, each `{colors.<role>}` of an audited role
      // (`sameAs` in colors.ts; chakraTokens.test.ts keeps the list complete)
      /^bg\.(emphasized|inverted|error|warning|success|info)$/,
      /^fg\.(inverted|error|warning|success|info)$/,
      /^border\.(emphasized|muted|inverted|error|warning|success|info)$/,
    ];
    const leaves: string[] = [];
    const walk = (node: Node, path: string[]) => {
      if (node.value !== undefined) {
        leaves.push(path.filter((p) => p !== 'DEFAULT').join('.'));
        return;
      }
      for (const [k, child] of Object.entries(node))
        walk(child as Node, [...path, k]);
    };
    walk(semantic, []);
    const unaudited = leaves.filter(
      (p) =>
        !roles.has(p) &&
        !deprecated.has(p) &&
        !structural.some((re) => re.test(p))
    );
    expect(unaudited).toEqual([]);
  });

  it('every NO_PAIR entry is a real role token', () => {
    const stale = Object.keys(NO_PAIR).filter((k) => !(k in ROLE_TOKEN_PATHS));
    expect(stale).toEqual([]);
  });
});

describe('high contrast wiring (prefers-contrast: more)', () => {
  const css = JSON.stringify(system.getTokenCss());

  it('emits the high-contrast overrides inside the media query', () => {
    // fg.subtle is one of the tokens whose HC value differs in light and dark.
    const media = css.slice(css.indexOf('@media (prefers-contrast: more)'));
    expect(media).toContain('--chakra-colors-scheme-light-fg-subtle');
    expect(media).toContain('--chakra-colors-scheme-dark-fg-subtle');
    expect(media).toContain(SCHEMES.ink.hcLight['fg-subtle']);
    expect(media).toContain(SCHEMES.ink.hcDark['fg-subtle']);
  });

  it('never nests dark inside the media query (Chakra emits an invalid selector for that)', () => {
    expect(css).not.toMatch(/_moreContrast:_dark|_dark:_moreContrast/);
  });
});
