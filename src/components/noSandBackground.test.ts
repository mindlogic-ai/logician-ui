/* eslint-disable no-deprecated-tokens -- the strings below are fixtures for the pattern under test */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * The sand tint — `secondary.surface` (light #FBEFE3, reads peach) and
 * `secondary.surfaceStrong` — is tint/accent only, never a component
 * background (Sean, design-system owner). Components fill with the neutral
 * grounds instead (`bg.subtle`, `bg.muted`, `layer.*`, `primary.wash` /
 * `primary.selected`); a "secondary" variant keeps its identity through
 * `secondary.border` / `secondary.fgStrong`.
 *
 * This scans every source file under `src/components` — stories included,
 * tests excluded — for the sand token in any spelling (`'secondary.surface'`,
 * `{colors.secondary.surface}`, `--chakra-colors-secondary-surface(-strong)`,
 * and the 4.x aliases `secondary.extralight` / `secondary.lighter` that
 * resolve to them) and fails when it is the value of a background property:
 * `bg`, `bgColor`, `background`, `backgroundColor` (JSX prop, style object,
 * `css` object, nested `_hover` / `_active` / `_selected`, responsive
 * `{ base, md }` values). A use on a colour/border prop (`color`,
 * `borderColor`, `fill` …) is allowed; any other spot (a constant, an
 * unrecognised prop) is flagged too, because a bg reached through a variable
 * is still a bg.
 */

const ROOT = join(__dirname);
const REPO = join(__dirname, '..', '..');

const SAND = new RegExp(
  [
    // dotted token, bare or inside `{colors.…}`
    String.raw`(?<![\w$-])secondary\.(?:surface(?:Strong)?|extralight|lighter)(?![\w$])`,
    // Chakra CSS variable
    String.raw`--chakra-colors-secondary-(?:surface(?:-strong|Strong)?|extralight|lighter)(?![\w-])`,
  ].join('|'),
  'g'
);

const BG_PROPS = new Set([
  'bg',
  'bgColor',
  'background',
  'backgroundColor',
  'bgGradient',
  'bgImage',
  'backgroundImage',
]);

/** Props where the tint is fine: text, borders, strokes. */
const isTintProp = (key: string) =>
  BG_PROPS.has(key)
    ? false
    : /color$/i.test(key) ||
      /^border/.test(key) ||
      /^outline/.test(key) ||
      ['fill', 'stroke', 'boxShadow', 'hoverBorder', 'textShadow'].includes(
        key
      );

/** Keys that only select a condition / breakpoint — the real prop is above. */
const isConditionKey = (key: string) =>
  /^_/.test(key) ||
  /^[&@:[]/.test(key) ||
  ['base', 'sm', 'md', 'lg', 'xl', '2xl'].includes(key);

/** Blank out comments, keeping offsets (strings are left intact). */
function stripComments(src: string): string {
  const out = src.split('');
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') {
      const q = c;
      i += 1;
      while (i < src.length && src[i] !== q) i += src[i] === '\\' ? 2 : 1;
      i += 1;
    } else if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') out[i++] = ' ';
    } else if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      const stop = end === -1 ? src.length : end + 2;
      for (; i < stop; i += 1) if (src[i] !== '\n') out[i] = ' ';
    } else {
      i += 1;
    }
  }
  return out.join('');
}

const IDENT = /[\w$-]/;

/**
 * The property a value at `at` is assigned to: scan backwards, skipping
 * strings and balanced brackets, to the nearest `key:` / `key=` at the same or
 * an enclosing level. Condition keys (`_hover`, `base`, `'&:hover'` …) hop to
 * the enclosing object's key. Returns null when none is found (`;`, start of
 * file).
 */
function propertyAt(src: string, at: number): string | null {
  let i = at;
  // Step out of the string literal the match sits in.
  while (i > 0 && !`'"\``.includes(src[i - 1]) && src[i - 1] !== '\n') i -= 1;
  i -= 1;
  let depth = 0;
  let skipToOpener = false;
  while (i > 0) {
    i -= 1;
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') {
      i -= 1;
      while (i > 0 && (src[i] !== c || src[i - 1] === '\\')) i -= 1;
      continue;
    }
    if (')]}'.includes(c)) {
      depth += 1;
      continue;
    }
    if ('([{'.includes(c)) {
      if (depth > 0) depth -= 1;
      else skipToOpener = false; // left the enclosing scope
      continue;
    }
    if (depth > 0 || skipToOpener) continue;
    if (c === ';') return null;
    if (c !== ':' && c !== '=') continue;
    if (c === '=' && '=>'.includes(src[i + 1])) continue;
    if (c === '=' && '=!<>'.includes(src[i - 1])) continue;
    // Read the key before the separator: identifier or quoted string.
    let j = i - 1;
    while (j >= 0 && /\s/.test(src[j])) j -= 1;
    let key = '';
    if (src[j] === "'" || src[j] === '"') {
      const q = src[j];
      const end = j;
      j -= 1;
      while (j >= 0 && src[j] !== q) j -= 1;
      key = src.slice(j + 1, end);
      // A quoted string followed by `:` is a key only after `{` or `,`.
      let k = j - 1;
      while (k >= 0 && /\s/.test(src[k])) k -= 1;
      if (!'{,'.includes(src[k])) continue;
    } else {
      const end = j + 1;
      while (j >= 0 && IDENT.test(src[j])) j -= 1;
      key = src.slice(j + 1, end);
      if (!key) continue;
      // `cond ? a : value` — `a` is not a key.
      let k = j;
      while (k >= 0 && /\s/.test(src[k])) k -= 1;
      if (src[k] === '?') continue;
    }
    if (isConditionKey(key)) {
      skipToOpener = true;
      i = j + 1;
      continue;
    }
    return key;
  }
  return null;
}

type SandHit = { line: number; key: string | null; text: string };

/** Every background (or unclassified) use of the sand tint in `src`. */
function findSandBackgrounds(src: string): SandHit[] {
  const code = stripComments(src);
  const hits: SandHit[] = [];
  for (const m of code.matchAll(SAND)) {
    const key = propertyAt(code, m.index ?? 0);
    if (key && isTintProp(key)) continue;
    const line = code.slice(0, m.index).split('\n').length;
    hits.push({ line, key, text: src.split('\n')[line - 1].trim() });
  }
  return hits;
}

function* sourceFiles(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(full);
    else if (/\.(tsx?|mdx)$/.test(entry.name) && !/\.test\./.test(entry.name))
      yield full;
  }
}

/**
 * Files allowed to keep a sand background, and why. Keep it short; an entry
 * needs a reason a reviewer would accept.
 */
const ALLOWED: Record<string, string> = {};

describe('no component uses the sand tint as a background', () => {
  it('src/components has no secondary.surface / surfaceStrong background', () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(ROOT)) {
      const rel = relative(REPO, file);
      if (rel in ALLOWED) continue;
      for (const h of findSandBackgrounds(readFileSync(file, 'utf8')))
        offenders.push(`${rel}:${h.line} [${h.key ?? '?'}] ${h.text}`);
    }
    expect(offenders).toEqual([]);
  });

  it('every ALLOWED entry is a real file', () => {
    for (const rel of Object.keys(ALLOWED))
      expect(() => readFileSync(join(REPO, rel))).not.toThrow();
  });
});

describe('sand-background guard self-test', () => {
  const flagged = (src: string) => findSandBackgrounds(src).map((h) => h.key);

  it('catches the pre-fix ErrorFallback support box (JSX prop)', () => {
    // Verbatim from ErrorFallback.tsx before the fix.
    const old = `
            {/* Support Information */}
            <Card
              bg="secondary.surface"
              borderColor="secondary.border"
              p={6}
              w="full"
            >`;
    expect(flagged(old)).toEqual(['bg']);
  });

  it('catches every other pre-fix site shape', () => {
    expect(
      flagged(
        `neutral: {\n    bgColor: 'secondary.surface',\n    color: 'secondary.fgStrong',\n  },`
      )
    ).toEqual(['bgColor']);
    expect(
      flagged(`{...(isBrand && { bg: 'secondary.surfaceStrong' })}`)
    ).toEqual(['bg']);
    expect(
      flagged(
        `isInRangeBtnProps: {\n  color: 'fg.default',\n  background: 'secondary.surfaceStrong',\n}`
      )
    ).toEqual(['background']);
    expect(
      flagged(
        `if (!hue) return { bg: 'secondary.surface', color: 'secondary.fgStrong' };`
      )
    ).toEqual(['bg']);
  });

  it('catches nested conditions, responsive values, css objects and vars', () => {
    expect(flagged(`_hover: { bg: 'secondary.surface' }`)).toEqual(['bg']);
    expect(
      flagged(
        `_selected: { _hover: { backgroundColor: 'secondary.surfaceStrong' } }`
      )
    ).toEqual(['backgroundColor']);
    expect(
      flagged(`bg={{ base: 'bg.canvas', xl: 'secondary.extralight' }}`)
    ).toEqual(['bg']);
    expect(
      flagged(
        `css={{ '&:hover': { background: 'var(--chakra-colors-secondary-surface-strong)' } }}`
      )
    ).toEqual(['background']);
    expect(flagged(`bg: '{colors.secondary.surface}'`)).toEqual(['bg']);
    expect(flagged(`bg={on ? 'bg.muted' : 'secondary.lighter'}`)).toEqual([
      'bg',
    ]);
    expect(flagged(`const WASH = 'secondary.surface';`)).toEqual(['WASH']);
  });

  it('allows the tint on text/border props and in comments', () => {
    expect(flagged(`color: 'secondary.surface'`)).toEqual([]);
    expect(flagged(`borderColor="secondary.surfaceStrong"`)).toEqual([]);
    expect(flagged(`_hover: { borderColor: 'secondary.surface' }`)).toEqual([]);
    expect(
      flagged(`// bg: 'secondary.surface'\n/* bg="secondary.surface" */`)
    ).toEqual([]);
    expect(
      flagged(`bg: 'secondary.border', color: 'secondary.fgStrong'`)
    ).toEqual([]);
    expect(flagged(`bg: 'category.blue.surface'`)).toEqual([]);
  });
});
