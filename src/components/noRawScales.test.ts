/* eslint-disable no-deprecated-tokens -- the strings below are fixtures for the pattern under test */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

import { SYSTEM_HUE_NAMES } from '@/theme/colors';
import { CORAL } from '@/theme/palette.generated';

/**
 * Components read ROLE tokens (`bg.*`, `fg.*`, `primary.*`, `category.*` …),
 * never a raw scale step. A raw step does not flip with colour mode or follow
 * the `neutral` / `secondary` theme option, and the contrast audit only checks
 * roles — so a raw step in a component is an unaudited colour.
 *
 * `Button.variants.test.tsx` used to check this for Button's style table only;
 * this scans every component source file (stories and tests excluded).
 *
 * Only `<scale>.<step>` token strings are flagged — `'green'` as a hue name, a
 * `category.green.surface` role, or `theme.colors.gray` property access are
 * not.
 */

const ROOT = join(__dirname);
const REPO = join(__dirname, '..', '..');

/** 4.x primitive scales (numeric steps). */
const LEGACY_SCALES = [
  'blue',
  'violet',
  'rose',
  'gold',
  'green',
  'gray',
  'grayDark',
  'slate',
];
/** 5.0 raw numeric scales. */
const RAW_SCALES = ['ink', 'inkDark', 'sand', 'sandDark', 'slate', 'slateDark'];
/** Chakra's alpha scales (numeric steps). */
const ALPHA_SCALES = ['whiteAlpha', 'blackAlpha'];
/** Named-step keys of the 12 system hues. */
const HUE_KEYS = [
  'base',
  'baseDark',
  'hc',
  'hcDark',
  'surface',
  'surfaceDark',
  'ink',
  'inkDark',
];

const numeric = [
  ...new Set([...LEGACY_SCALES, ...RAW_SCALES, ...ALPHA_SCALES]),
];
const alt = (xs: readonly string[]) => xs.join('|');

/**
 * Not preceded by a word char, `.`, `$` or `-` (so `category.blue.surface`,
 * `colors.gray.100` and `--chakra-colors-gray-100` are not hits); not followed
 * by a word char or `.`.
 */
const TOKEN = new RegExp(
  `(?<![\\w.$-])(?:` +
    `(?:${alt(numeric)})\\.\\d+` +
    `|coral\\.(?:${alt(Object.keys(CORAL))})` +
    `|(?:${alt(SYSTEM_HUE_NAMES)})\\.(?:${alt(HUE_KEYS)})` +
    `)(?![\\w.])`,
  'g'
);

/**
 * Files allowed to name raw steps, and why. Keep this short and specific:
 * an entry needs a reason a reviewer would accept, not "TODO".
 */
const ALLOWED: Record<string, string> = {
  // The sheet's scrim is the same `blackAlpha.500` Chakra's own dialog
  // backdrop recipe uses (Modal inherits it), so a sheet and a modal dim the
  // page identically. A scrim is meant to be mode-invariant; there is no role
  // token for it.
  'src/components/BottomSheet/BottomSheet.styles.ts':
    'mirrors Chakra dialog backdrop (blackAlpha.500)',
};

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = join(dir, d.name);
    if (d.isDirectory()) return walk(p);
    return /\.(ts|tsx)$/.test(d.name) &&
      !/\.(stories|test|spec)\.(ts|tsx)$/.test(d.name) &&
      !d.name.endsWith('.d.ts')
      ? [p]
      : [];
  });

/** Drop comments, keeping line numbers. */
const stripComments = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`\\])\/\/[^\n]*/g, '$1');

const findHits = () => {
  const hits: string[] = [];
  for (const file of walk(ROOT)) {
    const rel = relative(REPO, file);
    if (rel in ALLOWED) continue;
    const lines = stripComments(readFileSync(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      for (const m of line.matchAll(TOKEN)) {
        hits.push(`${rel}:${i + 1}  ${m[0]}`);
      }
    });
  }
  return hits;
};

describe('components read no raw palette scales', () => {
  it('the pattern flags raw steps and spares roles', () => {
    const flagged = (s: string) => (s.match(TOKEN) ?? []).length > 0;
    for (const raw of [
      "'gray.50'",
      '"blue.500"',
      "'grayDark.200'",
      "'ink.12'",
      "'sandDark.3'",
      "'coral.base'",
      "'red.surface'",
      "'blue.hc'",
      "'blackAlpha.600'",
      '`whiteAlpha.300`',
    ]) {
      expect(flagged(raw), raw).toBe(true);
    }
    for (const role of [
      "'category.green.surface'",
      "'green'",
      "'fg.default'",
      'theme.colors.gray.100',
      "'--chakra-colors-gray-100'",
      "'secondary.surface'",
      "'neutral.12'",
      "'secondary.3'",
      "'primary.main'",
    ]) {
      expect(flagged(role), role).toBe(false);
    }
  });

  it('no component source names a raw scale step', () => {
    expect(findHits()).toEqual([]);
  });
});
