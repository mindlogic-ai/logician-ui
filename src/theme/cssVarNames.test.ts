import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Chakra kebab-cases token paths when it emits CSS variables:
 * `fg.onPrimary` becomes `--chakra-colors-fg-on-primary`. A hand-written
 * `var(--chakra-colors-fg-onPrimary)` names a variable that never exists, so
 * the declaration silently falls back — that is how the checked radio lost its
 * dot (the dot rendered in the fill colour). Write the kebab-case name, or
 * better, pass the token path through Chakra instead of a raw `var()`.
 */
const CAMEL_CASE_VAR = /--chakra-[a-z]+-[a-z0-9-]*[A-Z]/;

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx|css)$/.test(name) ? [path] : [];
  });
}

describe('raw Chakra CSS variable references', () => {
  it('never use camelCase segments (Chakra emits kebab-case)', () => {
    const offenders = sourceFiles(join(__dirname, '..'))
      .filter((file) => !file.endsWith('cssVarNames.test.ts'))
      .flatMap((file) =>
        readFileSync(file, 'utf8')
          .split('\n')
          .map((line, i) => ({ file, line: i + 1, text: line }))
          .filter(({ text }) => CAMEL_CASE_VAR.test(text))
          .map(({ file, line, text }) => `${file}:${line}: ${text.trim()}`)
      );
    expect(offenders).toEqual([]);
  });
});
