#!/usr/bin/env node
/**
 * BAZE palette generator (logician-ui 5.0).
 *
 * Port of the prototype generator (`gen.py` / `ramps2.py` / `tokens.py` in the
 * palette proposal, v4 2026-10-20). It
 *
 *   1. builds the 12-step light/dark ramps for `ink`, `sand` and `slate` by
 *      solving OKLCH lightness for a fixed contrast target per step (hue and
 *      chroma held per scale — Radix-style "step number = job"),
 *   2. derives every semantic token for light / dark / hcLight / hcDark from
 *      those ramps plus the brand anchors (`#252525` black, `#F5EDE0` cream,
 *      coral, the 12 system hues), nudging only lightness until each
 *      text/control token clears its contrast target on every layer,
 *   3. writes `src/theme/palette.generated.ts`.
 *
 * The values for `ink`/`sand` must equal the prototype's `ramps.json` /
 * `tokens.json` (the designer-reviewed source of truth). `--check` fails if
 * they drift. `slate` is new: today's cool gray rebuilt on the same contrast
 * targets as `ink`, for products/tenants that need a cool neutral.
 *
 * Usage:
 *   node scripts/palette/generate.mjs          # write the TS module
 *   node scripts/palette/generate.mjs --check  # verify against the reference values and the committed file, write nothing
 *
 * To adopt designer-confirmed values (open question in the 5.0 PR): replace
 * the anchors/targets below, run the script, and commit the regenerated file.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../../src/theme/palette.generated.ts');
const REFERENCE = resolve(here, 'reference.json');

// ───────────────────────────── colour math ─────────────────────────────
// Kept bit-for-bit with the Python prototype (same constants, same 60-step
// bisection, same rounding) so the generated hex values match exactly.

function oklch2hex(L, C, H) {
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const enc = (x) => {
    const v = Math.max(0, Math.min(1, x));
    return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
  };
  return (
    '#' +
    [r, g, bb]
      .map((v) =>
        pyRound(enc(v) * 255)
          .toString(16)
          .toUpperCase()
          .padStart(2, '0')
      )
      .join('')
  );
}

/** Python's round() — banker's rounding on exact halves. */
function pyRound(x) {
  const f = Math.floor(x);
  const d = x - f;
  if (d > 0.5) return f + 1;
  if (d < 0.5) return f;
  return f % 2 === 0 ? f : f + 1;
}

function hex2oklch(h) {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  );
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const [l_, m_, s_] = [l, m, s].map((x) => Math.cbrt(x));
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  return [
    L,
    Math.hypot(A, B),
    ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360,
  ];
}

export function luminance(h) {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** Bisect OKLCH lightness until `contrast(result, ref)` sits on `target`. */
function solve(target, ref, C, H, darker = true) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const c = contrast(oklch2hex(mid, C, H), ref);
    if (darker) {
      if (c < target) hi = mid;
      else lo = mid;
    } else if (c < target) lo = mid;
    else hi = mid;
  }
  return oklch2hex(darker ? lo : hi, C, H);
}

/** Move lightness (hue/chroma kept) until `h` clears `target` on every bg. */
function push(h, bgs, target, darker) {
  if (Math.min(...bgs.map((b) => contrast(h, b))) >= target) return h;
  const [L, C, H] = hex2oklch(h);
  const step = darker ? -0.002 : 0.002;
  let x = L;
  while (x > 0 && x < 1) {
    x += step;
    const c = oklch2hex(x, C, H);
    if (Math.min(...bgs.map((b) => contrast(c, b))) >= target) return c;
  }
  return darker ? '#000000' : '#FFFFFF';
}

// ───────────────────────────── ramps ─────────────────────────────
// Contrast target per step against the mode's canvas (white / dark canvas).
// Step 1–3 backgrounds · 4–6 dividers & borders · 7 control border (3:1)
// · 8 icon/placeholder (4.5:1) · 9–11 text · 12 maximum contrast.
const LT = [1.06, 1.13, 1.21, 1.32, 1.5, 1.95, 3.1, 4.8, 7.4, 11.0, 15.3, 18.0];
const DT = [1.1, 1.21, 1.33, 1.48, 1.72, 2.15, 3.2, 4.8, 7.4, 10.5, 13.0, 15.0];

const sandChroma = (arr) =>
  arr.map((v, i) => (i >= 2 && i <= 4 ? pyRound4(v * 0.8) : v));
function pyRound4(x) {
  return Math.round(x * 1e4) / 1e4;
}

const SCALES = {
  ink: {
    hue: 75,
    light: [
      0.005, 0.008, 0.01, 0.011, 0.012, 0.012, 0.011, 0.01, 0.009, 0.008, 0.004,
      0.003,
    ],
    dark: [
      0.008, 0.01, 0.011, 0.012, 0.012, 0.012, 0.012, 0.012, 0.012, 0.014, 0.02,
      0.022,
    ],
    canvasDark: '#1F1E1D',
    // Brand anchor: step 11 is the guide's primary black, not the solved value.
    lightOverrides: { 10: '#252525' },
    // Brand anchors that are not ramp steps (guide values).
    anchors: {
      cream: '#F5EDE0', // text on primary (light) · body text (dark)
      press: '#2E2A25', // primary/action pressed (light)
      primaryDark: '#E3D7C4', // primary fill (dark)
      pressDark: '#D6C8B2', // primary pressed (dark)
    },
  },
  sand: {
    hue: 70,
    light: sandChroma([
      0.012, 0.02, 0.028, 0.035, 0.042, 0.05, 0.058, 0.06, 0.056, 0.048, 0.036,
      0.024,
    ]),
    dark: sandChroma([
      0.012, 0.018, 0.024, 0.03, 0.036, 0.044, 0.052, 0.056, 0.054, 0.046,
      0.034, 0.024,
    ]),
    canvasDark: '#1F1E1D',
  },
  // Today's cool gray (golden-ratio `gray`, OKLCH hue ≈ 267) rebuilt on the
  // same targets as ink. Chroma per step is read off the old ramp at the same
  // contrast, so the slate theme keeps the 4.x temperature.
  slate: {
    hue: 267,
    light: [
      0.005, 0.009, 0.013, 0.017, 0.019, 0.0255, 0.036, 0.0425, 0.044, 0.0398,
      0.03, 0.024,
    ],
    dark: [
      0.012, 0.015, 0.0155, 0.016, 0.017, 0.019, 0.02, 0.019, 0.017, 0.013,
      0.008, 0.005,
    ],
    canvasDark: oklch2hex(0.2357, 0.012, 267),
    anchors: {
      cream: oklch2hex(0.9488, 0.008, 267),
      press: oklch2hex(0.2876, 0.02, 267),
      primaryDark: oklch2hex(0.8837, 0.012, 267),
      pressDark: oklch2hex(0.8384, 0.014, 267),
    },
  },
};

function buildRamp(name) {
  const s = SCALES[name];
  const light = LT.map((t, i) => solve(t, '#FFFFFF', s.light[i], s.hue, true));
  const dark = DT.map((t, i) =>
    solve(t, s.canvasDark, s.dark[i], s.hue, false)
  );
  for (const [i, v] of Object.entries(s.lightOverrides ?? {})) light[i] = v;
  return { light, dark, canvasDark: s.canvasDark, anchors: s.anchors };
}

// ───────────────────────────── brand + system colours ─────────────────────────────
export const CORAL = {
  base: '#FF8680', // send surface (light), coral icon on the black action button, logo mark
  hover: '#FF9A95',
  active: '#F07670',
  strong: '#DA483E', // small coral marks (diamond, thinking dots) on light surfaces
  count: '#D44239', // unread-count badge
  baseDark: '#EE8580',
  hoverDark: '#F79A95',
  activeDark: '#DC766F',
};

// [name, base, baseDark, hc, hcDark, surface, ink, surfaceDark, inkDark]
// base/hc: 12-colour sheet (plan B, Apple set) measured on #F9F6F3 / #2A2724.
// surface/ink: the guide's system-colour table (category tiles, tags, avatars).
const SYSTEM = [
  [
    'red',
    '#C34742',
    '#D67067',
    '#A02525',
    '#FF958A',
    '#F9E4E2',
    '#78534F',
    '#3C2826',
    '#E0BAB5',
  ],
  [
    'orange',
    '#ECA36D',
    '#ECA36D',
    '#834300',
    '#FEB47D',
    '#F6E6DB',
    '#745641',
    '#3A2A1F',
    '#DCBDA8',
  ],
  [
    'yellow',
    '#E4AC44',
    '#E4AC44',
    '#704E01',
    '#F6BE58',
    '#F2E8D9',
    '#6D5B3C',
    '#362C1C',
    '#D4C2A4',
  ],
  [
    'green',
    '#5E7A37',
    '#7C965A',
    '#425C17',
    '#A0BB7D',
    '#E5EDDD',
    '#556344',
    '#293121',
    '#BCCAAB',
  ],
  [
    'mint',
    '#7FC7B0',
    '#7FC7B0',
    '#0E5F4C',
    '#90D9C1',
    '#DBEFE8',
    '#3E675A',
    '#1E332C',
    '#A8CEC1',
  ],
  [
    'teal',
    '#447C7B',
    '#669694',
    '#235C5C',
    '#8BBCB9',
    '#D9EFEE',
    '#386766',
    '#1B3332',
    '#A3CECD',
  ],
  [
    'cyan',
    '#7FC1D7',
    '#7FC1D7',
    '#135B6F',
    '#90D3E9',
    '#DAEDF4',
    '#3B6472',
    '#1C3138',
    '#A5CBD9',
  ],
  [
    'blue',
    '#4674A4',
    '#6892BD',
    '#295684',
    '#8BB7E3',
    '#DFEBF9',
    '#48607A',
    '#232F3D',
    '#AFC7E1',
  ],
  [
    'indigo',
    '#696BBA',
    '#8488CE',
    '#4C4B97',
    '#A8ADF5',
    '#E6E8F9',
    '#585A7A',
    '#2B2C3D',
    '#BEC1E1',
  ],
  [
    'purple',
    '#975E98',
    '#B07CB0',
    '#764078',
    '#D7A1D6',
    '#F2E5F2',
    '#6D546D',
    '#362936',
    '#D4BBD4',
  ],
  [
    'pink',
    '#AC5875',
    '#C3778F',
    '#893956',
    '#EB9CB4',
    '#F8E4E9',
    '#76525D',
    '#3B282D',
    '#DEB9C3',
  ],
  [
    'brown',
    '#896E52',
    '#A28A70',
    '#694F34',
    '#C7AE93',
    '#F4E7DA',
    '#71583E',
    '#382B1D',
    '#D9BFA6',
  ],
];
export const SYSTEM_HUES = Object.fromEntries(
  SYSTEM.map(
    ([n, base, baseDark, hc, hcDark, surface, ink, surfaceDark, inkDark]) => [
      n,
      { base, baseDark, hc, hcDark, surface, ink, surfaceDark, inkDark },
    ]
  )
);

// Data-visualisation values that are not system-hue steps.
// - `blueMid`: the middle step of the single-measure `data.*` ramp; the other
//   three steps are the blue hue's ink/surface pair (`blue.ink`, `blue.surface`
//   and their dark twins).
// - `blue1–3` / `orange1–3`: the diverging ramp (`diverging.pos.*` /
//   `diverging.neg.*`). A dedicated ramp — steps 2–3 at OKLCH C ≈ 0.10–0.11,
//   step 1 at 0.06 — because the dusty data blue (C ≈ 0.05) turns any warm
//   partner brown. Steps are matched in OKLCH lightness and chroma across the
//   two sides (L 0.82 / 0.64 / 0.47), so neither direction looks larger at the
//   same magnitude. Blue ↔ orange keeps the
//   largest colour-blind separation of the candidates (deutan ΔE 11.4).
export const DATAVIZ = {
  blueMid: '#7492B3',
  blue1: '#A9C7EB',
  blue2: '#5890CD',
  blue3: '#2C5D91',
  orange1: '#E4BBA0',
  orange2: '#BF7946',
  orange3: '#85491A',
};

// ───────────────────────────── semantic tokens (port of tokens.py) ─────────────────────────────
const LAYERS = ['bg-canvas', 'layer-1', 'layer-2', 'layer-3'];

/**
 * Data-visualisation fills. The higher number is always the larger value; in
 * dark mode the lightness order flips, so the strongest step is the lightest.
 * They are fills, not text or controls, so high contrast keeps them as they
 * are (like `track`). `diverging-mid` is neutral step 3 of the active scheme —
 * the "no change" cell, never the canvas.
 */
function dataviz(mode, neutral3) {
  const B = SYSTEM_HUES.blue;
  const D = DATAVIZ;
  const light = mode === 'light';
  return {
    'data-1': light ? B.surface : B.surfaceDark,
    'data-2': light ? B.inkDark : B.ink,
    'data-3': D.blueMid,
    'data-4': light ? B.ink : B.inkDark,
    'diverging-pos-1': light ? D.blue1 : D.blue3,
    'diverging-pos-2': D.blue2,
    'diverging-pos-3': light ? D.blue3 : D.blue1,
    'diverging-neg-1': light ? D.orange1 : D.orange3,
    'diverging-neg-2': D.orange2,
    'diverging-neg-3': light ? D.orange3 : D.orange1,
    'diverging-mid': neutral3,
  };
}

function buildScheme(n, s) {
  const iL = n.light;
  const iD = n.dark;
  const sL = s.light;
  const sD = s.dark;
  const A = n.anchors;
  const CANL = '#FFFFFF';
  const CAND = n.canvasDark;
  const light = {
    'bg-canvas': CANL,
    'layer-1': iL[1],
    'layer-1-hover': iL[2],
    'layer-1-active': iL[3],
    'layer-2': '#FFFFFF',
    'layer-2-hover': iL[1],
    'layer-2-active': iL[2],
    'layer-3': iL[1],
    'layer-3-hover': iL[2],
    'layer-3-active': iL[3],
    'bg-subtle': iL[0],
    'bg-surface': '#FFFFFF',
    'bg-muted': iL[1],
    'border-subtle': iL[3],
    'border-default': iL[4],
    'border-strong': iL[5],
    'fg-default': iL[10],
    'fg-muted': iL[9],
    'fg-subtle': iL[8],
    'fg-icon': iL[7],
    'fg-placeholder': iL[7],
    'fg-onPrimary': A.cream,
    'primary-main': iL[10],
    'primary-hover': iL[9],
    'primary-active': A.press,
    'primary-wash': iL[1],
    'primary-washActive': iL[2],
    'primary-selected': iL[3],
    'secondary-surface': sL[1],
    'secondary-surfaceStrong': sL[2],
    'secondary-border': sL[4],
    'secondary-fg': sL[7],
    'secondary-fgStrong': sL[8],
    'action-mark': CORAL.strong,
    'action-iconOnSolid': CORAL.base,
    'action-bg': iL[10],
    'action-bgHover': iL[9],
    'action-bgActive': A.press,
    'action-fg': A.cream,
    'action-border': 'transparent',
    'send-bg': CORAL.base,
    'send-bgHover': CORAL.hover,
    'send-bgActive': CORAL.active,
    'send-fg': '#252525',
    'count-bg': CORAL.count,
    'count-fg': '#FFFFFF',
    'disabled-bg': '#EDEDED',
    'disabled-fg': '#8A8A8A',
    // Fill-less (ghost) disabled glyph/label: lighter than disabled-fg so it
    // separates from the resting fg-icon without a disabled-bg to help.
    'disabled-fgGhost': '#C2C2C2',
    'fg-link': '#48607A',
    'fg-linkHover': '#295684',
    focus: iL[10],
    'danger-bg': '#FEE9E6',
    'danger-border': '#F3C3BD',
    'danger-fg': '#A02525',
    'danger-solid': '#A02525',
    'danger-solidHover': '#B5332F',
    'danger-solidActive': '#8E1F1F',
    'danger-onSolid': '#FFFFFF',
    'success-bg': '#E5EDDD',
    'success-border': '#C5D4B5',
    'success-fg': '#556344',
    'success-solid': '#5E7A37',
    'success-onSolid': '#FFFFFF',
    'warning-bg': '#FEE9BC',
    'warning-border': '#F0CF83',
    'warning-fg': '#704E01',
    'warning-solid': '#E4AC44',
    'warning-onSolid': '#1A1A1A',
    'info-bg': '#DFEBF9',
    'info-border': '#AFC7E1',
    'info-fg': '#295684',
    'info-solid': '#4674A4',
    'info-onSolid': '#FFFFFF',
    'tooltip-bg': iL[10],
    'tooltip-fg': A.cream,
    track: iL[3],
    ...dataviz('light', iL[2]),
  };
  const dark = {
    'bg-canvas': CAND,
    'layer-1': iD[1],
    'layer-1-hover': iD[2],
    'layer-1-active': iD[3],
    'layer-2': iD[3],
    'layer-2-hover': iD[4],
    'layer-2-active': iD[5],
    'layer-3': iD[4],
    'layer-3-hover': iD[5],
    'layer-3-active': iD[6],
    'bg-subtle': iD[0],
    'bg-surface': iD[1],
    'bg-muted': iD[2],
    'border-subtle': iD[3],
    'border-default': iD[4],
    'border-strong': iD[5],
    'fg-default': A.cream,
    'fg-muted': iD[9],
    'fg-subtle': iD[8],
    'fg-icon': iD[7],
    'fg-placeholder': iD[7],
    'fg-onPrimary': '#252525',
    'primary-main': A.primaryDark,
    'primary-hover': A.cream,
    'primary-active': A.pressDark,
    'primary-wash': iD[1],
    'primary-washActive': iD[2],
    'primary-selected': iD[4],
    'secondary-surface': sD[2],
    'secondary-surfaceStrong': sD[3],
    'secondary-border': sD[5],
    'secondary-fg': sD[8],
    'secondary-fgStrong': sD[9],
    'action-mark': CORAL.base,
    'action-iconOnSolid': CORAL.base,
    'action-bg': iD[2],
    'action-bgHover': iD[3],
    'action-bgActive': iD[1],
    'action-fg': '#FFFFFF',
    'action-border': iD[6],
    'send-bg': CORAL.baseDark,
    'send-bgHover': CORAL.hoverDark,
    'send-bgActive': CORAL.activeDark,
    'send-fg': '#252525',
    'count-bg': CORAL.count,
    'count-fg': '#FFFFFF',
    'disabled-bg': '#2C2C2C',
    'disabled-fg': '#737373',
    'disabled-fgGhost': '#4A4A4A',
    'fg-link': '#AFC7E1',
    'fg-linkHover': '#8BB7E3',
    focus: A.primaryDark,
    'danger-bg': '#47211E',
    'danger-border': '#6E3530',
    'danger-fg': '#F5B9B6',
    'danger-solid': '#C34742',
    'danger-solidHover': push('#D67067', ['#FFFFFF'], 4.5, true),
    'danger-solidActive': '#A83B37',
    'danger-onSolid': '#FFFFFF',
    'success-bg': '#293121',
    'success-border': '#45523A',
    'success-fg': '#BCCAAB',
    'success-solid': '#BCCAAB',
    'success-onSolid': '#1B1B1B',
    'warning-bg': '#3F2D04',
    'warning-border': '#6A4E10',
    'warning-fg': '#F6BE58',
    'warning-solid': '#E4AC44',
    'warning-onSolid': '#1B1B1B',
    'info-bg': '#232F3D',
    'info-border': '#3A4C60',
    'info-fg': '#8BB7E3',
    'info-solid': '#6892BD',
    'info-onSolid': '#1B1B1B',
    'tooltip-bg': A.primaryDark,
    'tooltip-fg': '#252525',
    track: iD[4],
    ...dataviz('dark', iD[2]),
  };
  const controlBorder = (m, darker) =>
    push(
      m['border-strong'],
      LAYERS.map((x) => m[x]),
      3.0,
      darker
    );
  light['border-control'] = controlBorder(light, true);
  dark['border-control'] = controlBorder(dark, false);
  // Text and icons must clear their target on every layer.
  for (const [m, dk] of [
    [light, true],
    [dark, false],
  ]) {
    const L = LAYERS.map((x) => m[x]);
    m['fg-subtle'] = push(m['fg-subtle'], L, 4.5, dk);
    m['fg-icon'] = push(m['fg-icon'], L, 3.0, dk);
    m['fg-placeholder'] = push(m['fg-placeholder'], [m['bg-surface']], 4.5, dk);
    m['fg-link'] = push(m['fg-link'], L, 4.5, dk);
    m['action-mark'] = push(m['action-mark'], L, 3.0, dk);
    m.focus = push(m.focus, L, 3.0, dk);
  }
  // High contrast: all text 7:1, controls/icons/focus 4.5:1.
  const hc = (m, dk) => {
    const h = { ...m };
    const L = LAYERS.map((x) => m[x]);
    for (const k of [
      'fg-default',
      'fg-muted',
      'fg-subtle',
      'fg-link',
      'fg-linkHover',
    ])
      h[k] = push(m[k], L, 7, dk);
    h['fg-placeholder'] = push(m['fg-placeholder'], [m['bg-surface']], 7, dk);
    for (const k of ['fg-icon', 'border-control', 'focus', 'action-mark'])
      h[k] = push(m[k], L, 4.5, dk);
    h['border-default'] = push(m['border-default'], L, 3.0, dk);
    for (const s of ['danger', 'success', 'warning', 'info']) {
      h[`${s}-fg`] = push(m[`${s}-fg`], [m[`${s}-bg`]], 7, dk);
      h[`${s}-border`] = push(m[`${s}-border`], [m[`${s}-bg`]], 3.0, dk);
    }
    h['secondary-fgStrong'] = push(
      m['secondary-fgStrong'],
      [m['secondary-surface'], m['secondary-surfaceStrong']],
      7,
      dk
    );
    h['secondary-fg'] = push(m['secondary-fg'], L, 7, dk);
    for (const [bg, fg] of [
      ['danger-solid', 'danger-onSolid'],
      ['success-solid', 'success-onSolid'],
      ['info-solid', 'info-onSolid'],
      ['warning-solid', 'warning-onSolid'],
    ])
      h[bg] = push(m[bg], [m[fg]], 7, luminance(m[fg]) > 0.5);
    for (const k of ['danger-solidHover', 'danger-solidActive'])
      h[k] = push(
        m[k],
        [m['danger-onSolid']],
        7,
        luminance(m['danger-onSolid']) > 0.5
      );
    for (const k of ['send-bg', 'send-bgHover', 'send-bgActive'])
      h[k] = push(m[k], [m['send-fg']], 7, false);
    h['count-bg'] = push(m['count-bg'], [m['count-fg']], 7, true);
    return h;
  };
  return { light, dark, hcLight: hc(light, true), hcDark: hc(dark, false) };
}

// ───────────────────────────── run ─────────────────────────────
const ramps = {
  ink: buildRamp('ink'),
  sand: buildRamp('sand'),
  slate: buildRamp('slate'),
};
const schemes = {
  ink: buildScheme(ramps.ink, ramps.sand),
  slate: buildScheme(ramps.slate, ramps.sand),
};

function check() {
  const ref = JSON.parse(readFileSync(REFERENCE, 'utf8'));
  const diffs = [];
  for (const [k, want] of Object.entries(ref.ramps)) {
    const [scale, mode] = [k.slice(0, -1), k.endsWith('L') ? 'light' : 'dark'];
    const got = ramps[scale][mode];
    want.forEach((w, i) => {
      if (w !== got[i]) diffs.push(`ramp ${k}[${i + 1}] ${got[i]} != ${w}`);
    });
  }
  for (const mode of Object.keys(ref.tokens)) {
    for (const [k, w] of Object.entries(ref.tokens[mode])) {
      const got = schemes.ink[mode][k];
      if (got !== w) diffs.push(`token ${mode}.${k} ${got} != ${w}`);
    }
  }
  return diffs;
}

const diffs = check();
if (diffs.length) {
  console.error(
    `✗ generator drifted from the reference values (${diffs.length}):\n  ` +
      diffs.join('\n  ')
  );
  process.exit(1);
}
console.log(
  '✓ ink/sand ramps and every ink-scheme token match the reference values'
);
const banner = `/* eslint-disable */
// AUTO-GENERATED by scripts/palette/generate.mjs — do not edit by hand.
// Re-run \`node scripts/palette/generate.mjs\` after changing the generator.
`;
const toRamp = (arr) => Object.fromEntries(arr.map((v, i) => [i + 1, v]));
const body = `${banner}
/** 12-step light/dark ramps per raw neutral/secondary scale, plus brand anchors. */
export const RAMPS = ${JSON.stringify(
  Object.fromEntries(
    Object.entries(ramps).map(([k, r]) => [
      k,
      {
        light: toRamp(r.light),
        dark: toRamp(r.dark),
        canvasDark: r.canvasDark,
        anchors: r.anchors ?? {},
      },
    ])
  ),
  null,
  2
)} as const;

/** Coral (action) values. */
export const CORAL = ${JSON.stringify(CORAL, null, 2)} as const;

/** The 12 system hues: status + category colours. */
export const SYSTEM_HUES = ${JSON.stringify(SYSTEM_HUES, null, 2)} as const;

/** Data-visualisation values that are not system-hue steps (\`data.*\`, \`diverging.*\`). */
export const DATAVIZ = ${JSON.stringify(DATAVIZ, null, 2)} as const;

/**
 * Resolved hex per semantic token, per neutral scheme, per mode. Keys are the
 * prototype's flat names (\`layer-1-hover\`, \`primary-washActive\`); the Chakra
 * token paths are mapped in \`colors.ts\`.
 */
export const SCHEMES = ${JSON.stringify(schemes, null, 2)} as const;
`;
if (process.argv.includes('--check')) {
  // The shipped file must be exactly what the generator emits — otherwise a
  // hand edit to palette.generated.ts, or a generator change committed without
  // regenerating, passes every test (contrast.test reads the shipped file).
  if (readFileSync(OUT, 'utf8') !== body) {
    console.error(
      '✗ src/theme/palette.generated.ts is not the generator output — run `node scripts/palette/generate.mjs` and commit the result'
    );
    process.exit(1);
  }
  console.log('✓ palette.generated.ts matches the generator output');
  process.exit(0);
}
writeFileSync(OUT, body);
console.log(`wrote ${OUT}`);
