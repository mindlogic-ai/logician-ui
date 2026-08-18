import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

/**
 * The two ways `animationStyle` goes wrong are both silent, and neither can be
 * caught by types. Chakra declares the prop as
 * `ConditionalValue<UtilityValues["animationStyle"] | CssVars | AnyString>`:
 * `AnyString` swallows every typo, and `ConditionalValue` accepts every array.
 * Both compile. A typo then does nothing at all, and an array is read as
 * *breakpoints* — one motion below `sm`, another above — which is the only
 * mistake here that looks correct on the machine that wrote it.
 *
 * So the guard is a pair of `no-restricted-syntax` rules, and this is the test
 * that the guard still guards. Without it those rules are two entries in a
 * config that any unrelated cleanup can delete with nothing failing to say so.
 *
 * ESLint runs as a subprocess rather than through its Node API because its
 * plugin loader resolves through the filesystem, which the jsdom environment
 * these tests run in cannot provide.
 */
const CASES = {
  vocabulary: `<div animationStyle="feedback" />`,
  chakraOwn: `<div animationStyle="scale-fade-in" />`,
  typo: `<div animationStyle="sprng" />`,
  moved: `<div animationStyle="spin" />`,
  array: `<div animationStyle={['travel', 'spring']} />`,
  breakpoints: `<div animationStyle={{ base: 'travel', md: 'spring' }} />`,
};

type Case = keyof typeof CASES;

/** ESLint messages from the motion guards, keyed by case name. */
const reported = new Map<Case, string[]>();

beforeAll(() => {
  const dir = mkdtempSync(join(tmpdir(), 'motion-guards-'));
  const file = join(dir, 'probe.tsx');
  // One line per case, so a single lint run tells us all six answers and the
  // reported line number says which case each message belongs to.
  const names = Object.keys(CASES) as Case[];
  writeFileSync(
    file,
    names.map((n, i) => `export const C${i} = () => ${CASES[n]};`).join('\n')
  );

  let raw = '[]';
  try {
    raw = execFileSync(
      'npx',
      ['eslint', '--no-eslintrc', '-c', '.eslintrc.js', '-f', 'json', file],
      { cwd: process.cwd(), encoding: 'utf-8' }
    );
  } catch (error) {
    // ESLint exits non-zero when it reports errors, which is the expected case.
    raw = (error as { stdout?: string }).stdout ?? raw;
  }
  rmSync(dir, { recursive: true, force: true });

  const [result] = JSON.parse(raw) as {
    messages: { ruleId: string | null; line: number; message: string }[];
  }[];

  names.forEach((n) => reported.set(n, []));
  result?.messages
    .filter((m) => m.ruleId === 'no-restricted-syntax')
    .forEach((m) => reported.get(names[m.line - 1])?.push(m.message));
});

describe('the animationStyle guards', () => {
  it('lets the vocabulary through', () => {
    expect(reported.get('vocabulary')).toEqual([]);
  });

  it("lets Chakra's own names through, since they are real", () => {
    expect(reported.get('chakraOwn')).toEqual([]);
  });

  it('catches a typo, which Chakra would otherwise ignore in silence', () => {
    expect(reported.get('typo')?.join()).toContain('Unknown animationStyle');
  });

  it('catches a preset that moved to its component', () => {
    // `spin` was global once, so anyone reading an older branch will try it.
    expect(reported.get('moved')?.join()).toContain('Unknown animationStyle');
  });

  it('catches the array, which is breakpoints rather than two motions', () => {
    expect(reported.get('array')?.join()).toContain('one name');
  });

  it('catches the breakpoint object for the same reason', () => {
    expect(reported.get('breakpoints')?.join()).toContain('one name');
  });
});
