/**
 * BAZE color system — logician-ui 5.0.
 *
 * Three layers, and components only ever read the third:
 *
 * 1. **Raw scales** carry colour names. `ink.1–12` / `inkDark.1–12` (warm
 *    black), `sand.1–12` / `sandDark.1–12` (beige-brown), `slate.1–12` /
 *    `slateDark.1–12` (today's cool gray rebuilt on the same contrast targets),
 *    `coral.*`, and the 12 system hues (`red` … `brown`, each
 *    `{base, baseDark, hc, hcDark, surface, ink, surfaceDark, inkDark}`), and
 *    `dataviz.*` (the data-visualisation values no hue step covers).
 *    The step number is the job (Radix-style): 1–3 backgrounds, 4–6 dividers
 *    and borders, 7 control border (3:1), 8 icon/placeholder (4.5:1), 9–11
 *    text, 12 maximum contrast.
 * 2. **Semantic steps** carry role names: `neutral.1–12` and `secondary.1–12`.
 *    `createLogicianTheme({ neutral, secondary })` decides which raw scale fills
 *    them (default `ink` / `sand`).
 * 3. **Semantic roles** — `bg.*`, `layer.*`, `fg.*`, `border.*`, `primary.*`,
 *    `secondary.*`, `action.*`, `send.*`, `count.*`, `disabled.*`, `focus.ring`,
 *    the four status families, `tooltip.*`, `category.{hue}.*` (plus the
 *    nameless `category.neutral.*`), the `bg.logo` / `fg.onLogo` tile, and the
 *    data-visualisation fills `data.1–4` and `diverging.{pos,neg}.1–3` /
 *    `diverging.mid`.
 *
 * Every value comes from `palette.generated.ts` (see
 * `scripts/palette/generate.mjs`), which ports the designer-reviewed prototype
 * and is pinned to it by `--check`. `contrast.test.ts` re-measures every
 * registered fg/bg pair in light, dark and both high-contrast modes.
 *
 * High contrast follows `prefers-contrast: more`. Chakra cannot express
 * "dark AND more-contrast" as one condition (nesting compiles to an invalid
 * selector), so a token whose high-contrast value differs reads a per-mode
 * helper — `scheme.light.<name>` / `scheme.dark.<name>`, each
 * `{ base, _moreContrast }` — and only flips `_light`/`_dark` itself. Those
 * helpers are internal; never reference them.
 *
 * The 4.x names (`primary.lightest`, `danger.main`, `slate.800`, …) stay as
 * deprecated aliases of their 5.0 replacement — see
 * `deprecatedColorTokens.json`, `MIGRATION-5.0.md` and the
 * `no-deprecated-tokens` lint rule. They are removed in 6.0.
 */
import DEPRECATED from './deprecatedColorTokens.json';
import {
  CORAL,
  DATAVIZ,
  RAMPS,
  SCHEMES,
  SYSTEM_HUES,
} from './palette.generated';

/** Raw scale that fills `neutral.1–12` and every neutral role. */
export type NeutralScale = 'ink' | 'slate';
/** Raw scale that fills `secondary.1–12` and the secondary roles. */
export type SecondaryScale = 'sand';

export interface LogicianColorOptions {
  /** @default 'ink' (BAZE warm black). `'slate'` is the cool 4.x temperature. */
  neutral?: NeutralScale;
  /** @default 'sand' (BAZE beige-brown). */
  secondary?: SecondaryScale;
}

export const SYSTEM_HUE_NAMES = [
  'red',
  'orange',
  'yellow',
  'green',
  'mint',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'pink',
  'brown',
] as const;
export type SystemHue = (typeof SYSTEM_HUE_NAMES)[number];

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type Step = (typeof STEPS)[number];

type TokenValue = { value: string };
type TokenTree = { [key: string]: TokenValue | TokenTree };

const v = (value: string): TokenValue => ({ value });

// ───────────────────────────── raw tokens ─────────────────────────────

function rampTokens(
  values: Record<Step, string>,
  extra: Record<string, string>
) {
  const out: Record<string, TokenValue> = {};
  for (const s of STEPS) out[s] = v(values[s]);
  for (const [k, val] of Object.entries(extra)) out[k] = v(val);
  return out;
}

function scaleTokens(name: 'ink' | 'sand' | 'slate') {
  const r = RAMPS[name];
  const a = r.anchors as Partial<
    Record<'cream' | 'press' | 'primaryDark' | 'pressDark', string>
  >;
  const light: Record<string, string> = {};
  const dark: Record<string, string> = { canvas: r.canvasDark };
  if (a.cream) light.cream = a.cream;
  if (a.press) light.press = a.press;
  if (a.primaryDark) dark.primary = a.primaryDark;
  if (a.pressDark) dark.press = a.pressDark;
  return {
    [name]: rampTokens(r.light, light),
    [`${name}Dark`]: rampTokens(r.dark, dark),
  };
}

/**
 * Raw palette. Components never read these; the semantic layer below does.
 * Override a raw step (e.g. `ink.11`) to retint everything built on it.
 */
export const colors = {
  ...scaleTokens('ink'),
  ...scaleTokens('sand'),
  ...scaleTokens('slate'),
  coral: Object.fromEntries(
    Object.entries(CORAL).map(([k, val]) => [k, v(val)])
  ),
  ...Object.fromEntries(
    SYSTEM_HUE_NAMES.map((hue) => [
      hue,
      Object.fromEntries(
        Object.entries(SYSTEM_HUES[hue]).map(([k, val]) => [k, v(val)])
      ),
    ])
  ),
  dataviz: Object.fromEntries(
    Object.entries(DATAVIZ).map(([k, val]) => [k, v(val)])
  ),
  white: v('#FFFFFF'),
} as Record<string, Record<string, TokenValue> | TokenValue>;

// ───────────────────────────── semantic tokens ─────────────────────────────

type Mode = 'light' | 'dark' | 'hcLight' | 'hcDark';
type FlatKey = keyof (typeof SCHEMES)['ink']['light'];

/** Prototype flat name → Chakra token path. */
const PATHS: Record<FlatKey, string> = {
  'bg-canvas': 'bg.canvas',
  'bg-subtle': 'bg.subtle',
  'bg-surface': 'bg.surface',
  'bg-muted': 'bg.muted',
  track: 'bg.track',
  'layer-1': 'layer.1.DEFAULT',
  'layer-1-hover': 'layer.1.hover',
  'layer-1-active': 'layer.1.active',
  'layer-2': 'layer.2.DEFAULT',
  'layer-2-hover': 'layer.2.hover',
  'layer-2-active': 'layer.2.active',
  'layer-3': 'layer.3.DEFAULT',
  'layer-3-hover': 'layer.3.hover',
  'layer-3-active': 'layer.3.active',
  'border-subtle': 'border.subtle',
  'border-default': 'border.default',
  'border-strong': 'border.strong',
  'border-control': 'border.control',
  'fg-default': 'fg.default',
  'fg-muted': 'fg.muted',
  'fg-subtle': 'fg.subtle',
  'fg-icon': 'fg.icon',
  'fg-placeholder': 'fg.placeholder',
  'fg-onPrimary': 'fg.onPrimary',
  'fg-link': 'fg.link',
  'fg-linkHover': 'fg.linkHover',
  'primary-main': 'primary.main',
  'primary-hover': 'primary.hover',
  'primary-active': 'primary.active',
  'primary-wash': 'primary.wash',
  'primary-washActive': 'primary.washActive',
  'primary-selected': 'primary.selected',
  // Sand tint (#FBEFE3 / #F4E7DA light — reads peach): tint/accent only — not
  // a component background. Fill with bg.subtle / bg.muted / layer.* /
  // primary.wash|selected instead; `noSandBackground.test.ts` enforces it in
  // src/components. Kept because the 4.x aliases secondary.extralight /
  // secondary.lighter point here.
  'secondary-surface': 'secondary.surface',
  'secondary-surfaceStrong': 'secondary.surfaceStrong',
  'secondary-border': 'secondary.border',
  'secondary-fg': 'secondary.fg',
  'secondary-fgStrong': 'secondary.fgStrong',
  'action-mark': 'action.mark',
  'action-iconOnSolid': 'action.iconOnSolid',
  'action-bg': 'action.bg',
  'action-bgHover': 'action.bgHover',
  'action-bgActive': 'action.bgActive',
  'action-fg': 'action.fg',
  'action-border': 'action.border',
  'send-bg': 'send.bg',
  'send-bgHover': 'send.bgHover',
  'send-bgActive': 'send.bgActive',
  'send-fg': 'send.fg',
  'count-bg': 'count.bg',
  'count-fg': 'count.fg',
  'disabled-bg': 'disabled.bg',
  'disabled-fg': 'disabled.fg',
  focus: 'focus.ring',
  'danger-bg': 'danger.bg',
  'danger-border': 'danger.border',
  'danger-fg': 'danger.fg',
  'danger-solid': 'danger.solid',
  'danger-solidHover': 'danger.solidHover',
  'danger-solidActive': 'danger.solidActive',
  'danger-onSolid': 'danger.onSolid',
  'success-bg': 'success.bg',
  'success-border': 'success.border',
  'success-fg': 'success.fg',
  'success-solid': 'success.solid',
  'success-onSolid': 'success.onSolid',
  'warning-bg': 'warning.bg',
  'warning-border': 'warning.border',
  'warning-fg': 'warning.fg',
  'warning-solid': 'warning.solid',
  'warning-onSolid': 'warning.onSolid',
  'info-bg': 'info.bg',
  'info-border': 'info.border',
  'info-fg': 'info.fg',
  'info-solid': 'info.solid',
  'info-onSolid': 'info.onSolid',
  'tooltip-bg': 'tooltip.bg',
  'tooltip-fg': 'tooltip.fg',
  // Data visualisation (fills only). Higher number = larger value, in both
  // modes; the dark values flip lightness so the strongest step stays the
  // most prominent on a dark canvas.
  'data-1': 'data.1',
  'data-2': 'data.2',
  'data-3': 'data.3',
  'data-4': 'data.4',
  'diverging-pos-1': 'diverging.pos.1',
  'diverging-pos-2': 'diverging.pos.2',
  'diverging-pos-3': 'diverging.pos.3',
  'diverging-neg-1': 'diverging.neg.1',
  'diverging-neg-2': 'diverging.neg.2',
  'diverging-neg-3': 'diverging.neg.3',
  'diverging-mid': 'diverging.mid',
};

/** Exposed for tests and docs: every role token generated from the scheme table. */
export const ROLE_TOKEN_PATHS = PATHS;

/**
 * Hex → raw token reference, so a role token points at the raw step it was
 * derived from (a tenant overriding `ink.11` retints everything on it). Earlier
 * entries win, so the active neutral/secondary scale is preferred over an
 * identical hex elsewhere. Values with no raw step (status washes, pushed
 * high-contrast lightness) stay literal.
 */
function buildRefIndex(neutral: NeutralScale, secondary: SecondaryScale) {
  const index = new Map<string, string>();
  const add = (hex: string, ref: string) => {
    const key = hex.toUpperCase();
    if (!index.has(key)) index.set(key, `{colors.${ref}}`);
  };
  const addScale = (name: string) => {
    for (const s of STEPS) add(RAMPS[name].light[s], `${name}.${s}`);
    for (const s of STEPS) add(RAMPS[name].dark[s], `${name}Dark.${s}`);
    add(RAMPS[name].canvasDark, `${name}Dark.canvas`);
    const a = RAMPS[name].anchors as Record<string, string>;
    if (a.cream) add(a.cream, `${name}.cream`);
    if (a.press) add(a.press, `${name}.press`);
    if (a.primaryDark) add(a.primaryDark, `${name}Dark.primary`);
    if (a.pressDark) add(a.pressDark, `${name}Dark.press`);
  };
  addScale(neutral);
  addScale(secondary);
  add('#FFFFFF', 'white');
  for (const [k, hex] of Object.entries(CORAL)) add(hex, `coral.${k}`);
  for (const hue of SYSTEM_HUE_NAMES)
    for (const [k, hex] of Object.entries(SYSTEM_HUES[hue]))
      add(hex, `${hue}.${k}`);
  for (const [k, hex] of Object.entries(DATAVIZ)) add(hex, `dataviz.${k}`);
  // The brand black/cream anchors exist only on ink; reachable from any scheme.
  if (neutral !== 'ink') addScale('ink');
  return (hex: string) => index.get(hex.toUpperCase()) ?? hex;
}

function setPath(tree: TokenTree, path: string, token: TokenValue) {
  const parts = path.split('.');
  let node = tree;
  for (const p of parts.slice(0, -1)) {
    node[p] ??= {};
    node = node[p] as TokenTree;
  }
  node[parts[parts.length - 1]] = token as never;
}

const camel = (flat: string) =>
  flat.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

/**
 * Build the semantic colour tokens for one neutral/secondary choice.
 * `createLogicianTheme` calls this; the default export below is BAZE.
 */
export function createSemanticColors({
  neutral = 'ink',
  secondary = 'sand',
}: LogicianColorOptions = {}) {
  const table = SCHEMES[neutral] as unknown as Record<
    Mode,
    Record<FlatKey, string>
  >;
  const ref = buildRefIndex(neutral, secondary);
  const tree: TokenTree = {};

  // Semantic steps.
  for (const s of STEPS) {
    setPath(tree, `neutral.${s}`, {
      value: {
        _light: `{colors.${neutral}.${s}}`,
        _dark: `{colors.${neutral}Dark.${s}}`,
      },
    } as never);
    setPath(tree, `secondary.${s}`, {
      value: {
        _light: `{colors.${secondary}.${s}}`,
        _dark: `{colors.${secondary}Dark.${s}}`,
      },
    } as never);
  }

  // Role tokens, with per-mode high-contrast helpers where the value differs.
  for (const [flat, path] of Object.entries(PATHS) as [FlatKey, string][]) {
    const perMode = (mode: 'light' | 'dark', hcMode: Mode) => {
      const base = ref(table[mode][flat]);
      const hc = ref(table[hcMode][flat]);
      if (base === hc) return base;
      const helper = `scheme.${mode}.${camel(flat)}`;
      setPath(tree, helper, { value: { base, _moreContrast: hc } } as never);
      return `{colors.${helper}}`;
    };
    setPath(tree, path, {
      value: {
        _light: perMode('light', 'hcLight'),
        _dark: perMode('dark', 'hcDark'),
      },
    } as never);
  }

  // Roles that reuse another role's value (kept 4.x names, Chakra globals).
  const sameAs: Record<string, string> = {
    'bg.DEFAULT': 'bg.canvas', // Chakra paints `html { background: bg }`
    'fg.DEFAULT': 'fg.default', // … and `html { color: fg }`
    'border.DEFAULT': 'border.subtle', // Chakra's implicit border colour
    'bg.panel': 'bg.surface', // Chakra overlay surfaces (Menu, Modal, Popover, Toast)
    'bg.raised': 'layer.2', // one level above surface
    'bg.inverse': 'tooltip.bg',
    'fg.inverse': 'tooltip.fg',
    'fg.emphasized': 'fg.default',
    'bg.invalid.subtle': 'danger.bg',
    'bg.highlighted': 'warning.bg',
    // The no-identity pair, shaped like a category pair so a `colorPalette`
    // can point at it (`colorPalette="category.neutral"`, the avatar recipe's
    // default). Not a 13th hue — `hueForName` never returns it.
    'category.neutral.surface': 'bg.muted',
    'category.neutral.fg': 'secondary.fgStrong',
    // Every other name Chakra's own recipes read (menu/combobox `_highlighted`
    // is `bg.emphasized/60`, radiomark borders are `border.emphasized`, the
    // field recipe reads `fg.error` …). 4.x got these for free because its
    // raw `gray` shared Chakra's keys; 5.0 has no `gray`, so without this
    // they fall through to Chakra's zinc/red palette (1.06:1 menu highlight
    // in dark). `chakraTokens.test.ts` fails if Chakra adds one we miss.
    'bg.emphasized': 'layer.1.active',
    'bg.inverted': 'tooltip.bg',
    'fg.inverted': 'tooltip.fg',
    'border.emphasized': 'border.strong',
    'border.muted': 'border.subtle',
    'border.inverted': 'tooltip.bg',
    'bg.error': 'danger.bg',
    'bg.warning': 'warning.bg',
    'bg.success': 'success.bg',
    'bg.info': 'info.bg',
    'fg.error': 'danger.fg',
    'fg.warning': 'warning.fg',
    'fg.success': 'success.fg',
    'fg.info': 'info.fg',
    'border.error': 'danger.border',
    'border.warning': 'warning.border',
    'border.success': 'success.border',
    'border.info': 'info.border',
  };
  for (const [path, target] of Object.entries(sameAs))
    setPath(tree, path, { value: `{colors.${target}}` });
  // Sunken page wash: neutral.1 in light, the canvas floor in dark (so cards
  // on it still read as raised — the dark ramp is compressed).
  setPath(tree, 'bg.sunken', {
    value: { _light: '{colors.bg.subtle}', _dark: '{colors.bg.canvas}' },
  } as never);

  // Category pairs (decorative — no status meaning).
  for (const hue of SYSTEM_HUE_NAMES) {
    setPath(tree, `category.${hue}.surface`, {
      value: {
        _light: `{colors.${hue}.surface}`,
        _dark: `{colors.${hue}.surfaceDark}`,
      },
    } as never);
    setPath(tree, `category.${hue}.fg`, {
      value: {
        _light: `{colors.${hue}.ink}`,
        _dark: `{colors.${hue}.inkDark}`,
      },
    } as never);
  }

  // Logo tile: model, chatbot and brand marks are drawn for a light ground,
  // so the tile stays light in both modes (white, then the warm cream anchor
  // in dark so it does not glare on the dark canvas), and the text on it stays
  // dark in both modes. Avatar `variant="logo"` reads the pair.
  setPath(tree, 'bg.logo', {
    value: { _light: '{colors.white}', _dark: '{colors.ink.cream}' },
  } as never);
  setPath(tree, 'fg.onLogo', { value: `{colors.${neutral}.11}` });

  // Deprecated 4.x names → 5.0 replacement (removed in 6.0).
  for (const [oldName, newName] of Object.entries(DEPRECATED.aliases))
    setPath(tree, oldName, { value: `{colors.${newName}}` });

  return tree;
}

/** BAZE semantic tokens (ink + sand). */
export const semanticTokens = { colors: createSemanticColors() };

/** Deprecated 4.x semantic name → 5.0 replacement. */
export const DEPRECATED_COLOR_TOKENS: Readonly<Record<string, string>> =
  DEPRECATED.aliases;

type Hue = SystemHue;
type StatusFamily = 'danger' | 'success' | 'warning' | 'info';

/**
 * Every public semantic colour token, in Chakra dotted-path form.
 *
 * The contract consumed by the factchat codemod and by reviewers; hand-kept
 * beside `PATHS` so a rename is a visible diff. Internal `scheme.*` helpers and
 * the bare `bg`/`fg`/`border` DEFAULTs are deliberately absent.
 */
export type SemanticColorToken =
  | `neutral.${Step}`
  | `secondary.${Step}`
  | `bg.${'canvas' | 'surface' | 'raised' | 'subtle' | 'muted' | 'sunken' | 'track' | 'inverse' | 'panel' | 'highlighted' | 'logo'}`
  | 'bg.invalid.subtle'
  | `layer.${1 | 2 | 3}`
  | `layer.${1 | 2 | 3}.${'hover' | 'active'}`
  | `fg.${'default' | 'emphasized' | 'muted' | 'subtle' | 'icon' | 'placeholder' | 'onPrimary' | 'onLogo' | 'link' | 'linkHover' | 'inverse'}`
  | `border.${'subtle' | 'default' | 'strong' | 'control'}`
  | `primary.${'main' | 'hover' | 'active' | 'wash' | 'washActive' | 'selected'}`
  | `secondary.${'surface' | 'surfaceStrong' | 'border' | 'fg' | 'fgStrong'}`
  | `action.${'mark' | 'iconOnSolid' | 'bg' | 'bgHover' | 'bgActive' | 'fg' | 'border'}`
  | `send.${'bg' | 'bgHover' | 'bgActive' | 'fg'}`
  | `count.${'bg' | 'fg'}`
  | `disabled.${'bg' | 'fg'}`
  | 'focus.ring'
  | `${StatusFamily}.${'bg' | 'border' | 'fg' | 'solid' | 'onSolid'}`
  | `danger.${'solidHover' | 'solidActive'}`
  | `tooltip.${'bg' | 'fg'}`
  | `category.${Hue | 'neutral'}.${'surface' | 'fg'}`
  | `data.${1 | 2 | 3 | 4}`
  | `diverging.${'pos' | 'neg'}.${1 | 2 | 3}`
  | 'diverging.mid'
  | DeprecatedSemanticColorToken;

/**
 * @deprecated 4.x names kept as aliases in 5.0 — see `DEPRECATED_COLOR_TOKENS`
 * for the replacement. Removed in 6.0.
 */
export type DeprecatedSemanticColorToken =
  | `primary.${'lightest' | 'extralight' | 'lighter' | 'light' | 'dark' | 'darker' | 'fill' | 'fillStrong'}`
  | `${'secondary' | 'danger' | 'success' | 'warning'}.${'lightest' | 'extralight' | 'lighter' | 'light' | 'main' | 'dark' | 'darker'}`
  | 'warning.fill'
  | 'bg.selected'
  | 'fg.accent'
  | `slate.${0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 1100 | 1200 | 1300 | 1400 | 1500}`;
