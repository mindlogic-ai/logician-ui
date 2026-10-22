/**
 * Fixture tests for the logician-ui 5.0 codemods.
 *
 * Run: npx vitest run --config codemods/vitest.config.ts
 *
 * Each `__testfixtures__/<name>.input.tsx` is run through its transform and
 * compared with `<name>.output.tsx`. Both sides are normalised with the repo's
 * Prettier config first, so the fixtures can be Prettier-formatted without
 * breaking the comparison; the comparison still catches every token, prop and
 * import change. Transforms are loaded with Node's own `require`, the same way
 * jscodeshift loads them, so no build step is involved.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import { createRequire } from 'module';
import os from 'os';
import path from 'path';
import prettier from 'prettier';
import { describe, expect, it } from 'vitest';

import { resolveLegacyButtonVariant } from '../../src/components/Button/Button.legacy';
import { mapLegacyTagProps } from '../../src/components/Tag/Tag.styles';

const require = createRequire(import.meta.url);
const { applyTransform } = require('jscodeshift/dist/testUtils');
const jscodeshift = require('jscodeshift');
const { createReporter } = require('./lib/shared');
const indexModule = require('./index');

const HERE = path.dirname(new URL(import.meta.url).pathname);
const FIXTURES = path.join(HERE, '__testfixtures__');
const REPO = path.resolve(HERE, '../..');

type Site = {
  transform: string;
  line: number;
  component: string;
  prop: string;
  kind: string;
  source: string;
  note?: string;
};

const transformFor = (prefix: string) =>
  prefix.startsWith('tag-chip') ? 'tag-chip' : prefix;
const load = (name: string) => require(`./${name}`);
const read = (f: string) => fs.readFileSync(path.join(FIXTURES, f), 'utf8');

const prettierOptions = {
  ...JSON.parse(fs.readFileSync(path.join(REPO, '.prettierrc'), 'utf8')),
  parser: 'typescript',
};
const fmt = (code: string) => prettier.format(code, prettierOptions);

/** Run a transform with a reporter we can inspect. */
const run = (name: string, source: string, filePath = `${name}.tsx`) => {
  const j = jscodeshift.withParser('tsx');
  const messages: string[] = [];
  const api = {
    jscodeshift: j,
    j,
    stats: () => {},
    report: (m: string) => messages.push(m),
  };
  const file = { path: filePath, source };
  const reporter = createReporter(api, file, name);
  const out = load(name)(file, api, { __reporter: reporter });
  return { out: out ?? source, sites: reporter.sites as Site[], messages };
};

const prefixes = fs
  .readdirSync(FIXTURES)
  .filter((f) => f.endsWith('.input.tsx'))
  .map((f) => f.replace(/\.input\.tsx$/, ''))
  .sort();

describe('fixtures', () => {
  it('has a fixture pair for every transform', () => {
    for (const t of [
      'button-variants',
      'badge-variants',
      'tag-chip',
      'card-gradient',
      'token-renames',
      'index',
    ]) {
      expect(prefixes).toContain(t);
    }
    for (const p of prefixes)
      expect(fs.existsSync(path.join(FIXTURES, `${p}.output.tsx`))).toBe(true);
  });

  for (const prefix of prefixes) {
    it(`${prefix}: input → output`, async () => {
      const mod = load(transformFor(prefix));
      const input = read(`${prefix}.input.tsx`);
      const out = applyTransform(
        mod,
        {},
        { path: `${prefix}.input.tsx`, source: input },
        { parser: 'tsx' }
      );
      expect(await fmt(out || input)).toBe(
        await fmt(read(`${prefix}.output.tsx`))
      );
    });

    it(`${prefix}: idempotent (output is a fixed point)`, async () => {
      const mod = load(transformFor(prefix));
      const output = read(`${prefix}.output.tsx`);
      const again = applyTransform(
        mod,
        {},
        { path: `${prefix}.output.tsx`, source: output },
        { parser: 'tsx' }
      );
      expect(await fmt(again || output)).toBe(await fmt(output));
    });
  }
});

const kinds = (sites: Site[]) =>
  sites.reduce<Record<string, number>>((acc, s) => {
    acc[s.kind] = (acc[s.kind] || 0) + 1;
    return acc;
  }, {});

describe('reporting', () => {
  it('button-variants reports dynamic props, spreads and TODO combos', () => {
    const { sites, messages } = run(
      'button-variants',
      read('button-variants.input.tsx')
    );
    expect(kinds(sites)).toEqual({ dynamic: 3, spread: 1, todo: 5 });
    const dyn = sites.filter((s) => s.kind === 'dynamic');
    expect(dyn.map((s) => [s.component, s.prop, s.source])).toEqual([
      ['Button', 'variant', 'variant={kind}'],
      ['Button', 'colorPalette', "colorPalette={ok ? 'danger' : 'primary'}"],
      ['IB', 'colorPalette', 'colorPalette={palette}'],
    ]);
    for (const s of dyn) expect(s.line).toBeGreaterThan(0);
    expect(sites.find((s) => s.kind === 'spread')?.source).toBe('{...rest}');
    expect(sites.filter((s) => s.kind === 'todo').map((s) => s.note)).toEqual([
      'colorPalette="secondary" variant="solid" → variant="primary"',
      'colorPalette="warning" variant="solid" → variant="primary"',
      'colorPalette="primary" variant="link" → variant="subtle"',
      'colorPalette="danger" variant="plain" → variant="subtle" isDestructive',
      'colorPalette="secondary" variant="solid" → variant="primary"',
    ]);
    // api.report gets one line per site, with the line number.
    expect(messages).toHaveLength(sites.length);
    expect(messages[0]).toMatch(/^\[button-variants\] L\d+ <Button> /);
  });

  it('badge-variants reports dynamic, spread and unknown variants', () => {
    const { sites } = run('badge-variants', read('badge-variants.input.tsx'));
    expect(kinds(sites)).toEqual({ dynamic: 1, spread: 1, todo: 1 });
    expect(sites.find((s) => s.kind === 'dynamic')?.source).toBe('variant={v}');
  });

  it('tag-chip reports dynamic, spread, TODO, Chip types and references', () => {
    const { sites } = run('tag-chip', read('tag-chip.input.tsx'));
    expect(kinds(sites)).toEqual({
      type: 1,
      reference: 1,
      dynamic: 1,
      spread: 1,
      todo: 1,
      selected: 3,
    });
    expect(sites.find((s) => s.kind === 'todo')?.note).toBe(
      'danger/outline has no outlined 5.0 Tag; now a plain Tag — tone="danger"?'
    );
    expect(sites.find((s) => s.kind === 'dynamic')).toMatchObject({
      component: 'Tag (was Chip)',
      prop: 'colorScheme',
      source: 'colorScheme={cs}',
    });
    expect(sites.find((s) => s.kind === 'type')?.prop).toBe('ChipProps');
    expect(sites.find((s) => s.kind === 'reference')?.source).toBe(
      'styled(Chip)'
    );
    const merged = run('tag-chip', read('tag-chip-merge.input.tsx'));
    expect(kinds(merged.sites)).toEqual({ todo: 5, selected: 5 });
    // An explicit `selected` is also a toggle (Tag.tsx) — every one is reported.
    for (const s of merged.sites.filter((x) => x.kind === 'selected'))
      expect(s.note).toMatch(/interactive/);
  });

  it('card-gradient reports removed gradients and dynamic variants', () => {
    const { sites } = run('card-gradient', read('card-gradient.input.tsx'));
    expect(kinds(sites)).toEqual({ todo: 2, dynamic: 1 });
  });

  it('token-renames reports raw primitives and token keys, not renames', () => {
    const { sites } = run('token-renames', read('token-renames.input.tsx'));
    expect(kinds(sites)).toEqual({ primitive: 6, key: 2 });
    expect(
      sites.filter((s) => s.kind === 'primitive').map((s) => s.prop)
    ).toEqual([
      'blue.500',
      'violet.300',
      '--chakra-colors-green-600',
      'grayDark.200',
      'colors.grayDark.200',
      '--chakra-colors-gray-dark-200',
    ]);
  });

  it('summarize() prints counts and a site table', () => {
    const lines = [
      JSON.stringify({
        transform: 'button-variants',
        file: path.join(process.cwd(), 'src/a.tsx'),
        line: 3,
        component: 'Button',
        prop: 'variant',
        kind: 'dynamic',
        source: 'variant={x}',
      }),
      JSON.stringify({
        transform: 'button-variants',
        file: 'src/a.tsx',
        migrated: 'elements migrated',
        quantity: 5,
      }),
    ];
    const text = indexModule.summarize(lines);
    expect(text).toContain('button-variants · elements migrated');
    expect(text).toMatch(/Needs a human: 1 site/);
    expect(text).toMatch(
      /src\/a\.tsx:3\s+Button\s+variant\s+dynamic\s+variant=\{x\}/
    );
  });
});

describe('token map', () => {
  const data = require('../../src/theme/deprecatedColorTokens.json');
  const { rewrite } = load('token-renames');
  // Chakra's CSS variable name for a token path (dashCase): `fg.onPrimary` →
  // `fg-on-primary`. Written out here, not imported, so a codemod bug cannot
  // hide behind the same helper.
  const kebab = (s: string) =>
    s.replace(/\./g, '-').replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
  const CAMEL_CASE_VAR = /--chakra-[a-z]+-[a-z0-9-]*[A-Z]/;

  it('renames every alias in both dotted and CSS-var form', () => {
    for (const [from, to] of Object.entries<string>(data.aliases)) {
      expect(rewrite(`'${from}'`).text).toBe(`'${to}'`);
      const out = rewrite(`var(--chakra-colors-${kebab(from)})`).text;
      expect(out).toBe(`var(--chakra-colors-${kebab(to)})`);
      expect(out).not.toMatch(CAMEL_CASE_VAR);
    }
  });

  it('no rewritten fixture contains a camelCase --chakra- variable', () => {
    for (const f of fs
      .readdirSync(FIXTURES)
      .filter((n) => n.endsWith('.output.tsx'))) {
      expect([f, read(f).match(CAMEL_CASE_VAR)?.[0]]).toEqual([f, undefined]);
    }
  });

  it('CSS variables are matched and written kebab-case', () => {
    expect(rewrite('var(--chakra-colors-primary-lighter)').text).toBe(
      'var(--chakra-colors-primary-wash-active)'
    );
    expect(rewrite('var(--chakra-colors-primary-fill-strong)').text).toBe(
      'var(--chakra-colors-primary-hover)'
    );
    expect(rewrite('var(--chakra-colors-secondary-lighter)').text).toBe(
      'var(--chakra-colors-secondary-surface-strong)'
    );
    // A camelCase var never existed in 4.x output; it is not ours to touch.
    expect(rewrite('var(--chakra-colors-primary-fillStrong)').renamed).toEqual(
      []
    );
    const r = rewrite('var(--chakra-colors-gray-dark-200)');
    expect(r.primitives).toEqual(['--chakra-colors-gray-dark-200']);
  });

  it('matches Chakra token references with a colors. prefix and keeps it', () => {
    expect(rewrite('{colors.success.main}').text).toBe(
      '{colors.success.solid}'
    );
    expect(
      rewrite('color-mix(in oklab, {colors.warning.fill} 70%, black)').text
    ).toBe('color-mix(in oklab, {colors.warning.solid} 70%, black)');
    expect(rewrite("token('colors.danger.main')").text).toBe(
      "token('colors.danger.solid')"
    );
    expect(rewrite('"colors.primary.lighter"').text).toBe(
      '"colors.primary.washActive"'
    );
    expect(rewrite('colors.slate.800').text).toBe('colors.neutral.9');
    expect(rewrite('{colors.gray.300}').text).toBe('{colors.neutral.5}');
    expect(rewrite('{colors.grayDark.200}').primitives).toEqual([
      'colors.grayDark.200',
    ]);
    // Still a boundary: not a token reference, just a longer path.
    for (const t of [
      'foo.primary.light',
      'theme.colors.primary.light',
      'x colors.primary.light',
      'mycolors.primary.light',
    ]) {
      expect(rewrite(t).text).toBe(t);
    }
  });

  it('renames gray.N to neutral.N and leaves other primitives', () => {
    for (const [step, to] of Object.entries<string>(
      data.removedPrimitives.gray
    )) {
      expect(rewrite(`gray.${step}`).text).toBe(to);
    }
    const r = rewrite('blue.500 rose.200');
    expect(r.text).toBe('blue.500 rose.200');
    expect(r.primitives).toEqual(['blue.500', 'rose.200']);
  });

  it('fg.accent → fg.link only in link colour context', () => {
    expect(rewrite('fg.accent').text).toBe('primary.main');
    expect(rewrite('fg.accent', { linkColor: true }).text).toBe('fg.link');
  });
});

// The codemod claims "the screen looks the same whether or not it ran": its
// tables must be the runtime back-compat tables, cell for cell.
describe('parity with the runtime legacy mappers', () => {
  const PALETTES = [
    undefined,
    'primary',
    'secondary',
    'neutral',
    'danger',
    'success',
    'warning',
    'info',
    'brand',
  ];

  it('button-variants resolve() = resolveLegacyButtonVariant (Button.legacy.ts)', () => {
    const { resolve } = load('button-variants');
    const VARIANTS = [
      undefined,
      'solid',
      'outline',
      'ghost',
      'soft',
      'link',
      'plain',
      'surface',
      'primary',
      'action',
      'accent',
      'secondary',
      'subtle',
      'danger',
    ];
    for (const kind of ['button', 'icon'] as const)
      for (const p of PALETTES)
        for (const v of VARIANTS) {
          const rt = resolveLegacyButtonVariant(kind, p, v);
          const cm = resolve(kind, p ?? '', v ?? '');
          const cell = `${kind} ${p ?? '—'}/${v ?? '—'}`;
          expect([cell, cm.variant, cm.isDestructive]).toEqual([
            cell,
            rt.variant,
            rt.isDestructive,
          ]);
          // Whatever the runtime warns about, the codemod hands to a human.
          if (rt.needsHuman)
            expect([cell, cm.confident]).toEqual([cell, false]);
        }
  });

  it('tag-chip mapLegacy() = mapLegacyTagProps (Tag.styles.ts)', () => {
    const { mapLegacy } = load('tag-chip');
    for (const p of PALETTES)
      for (const v of [undefined, 'soft', 'solid', 'outline', 'subtle']) {
        const cell = `${p ?? '—'}/${v ?? '—'}`;
        const rt = mapLegacyTagProps(p, v);
        const cm = mapLegacy(p, v);
        expect([cell, cm.tone, !!cm.selected, cm.needsHuman]).toEqual([
          cell,
          rt.tone,
          !!rt.selected,
          rt.needsHuman,
        ]);
      }
  });

  it("a converted Chip gets exactly Chip.tsx's pill shape", () => {
    const chip = fs.readFileSync(
      path.join(REPO, 'src/components/Chip/Chip.tsx'),
      'utf8'
    );
    for (const prop of [
      'borderRadius="32px"',
      'px={3}',
      'py={2}',
      'fontWeight="medium"',
    ])
      expect(chip).toContain(prop);
    // `xl` is the 32px radius token the codemod writes.
    expect(
      fs.readFileSync(path.join(REPO, 'src/theme/index.ts'), 'utf8')
    ).toMatch(/xl: \{ value: '32px' \}/);
    const { out } = run(
      'tag-chip',
      "import { Chip } from '@mindlogic-ai/logician-ui';\nexport const A = () => <Chip>x</Chip>;\n"
    );
    expect(out).toContain(
      '<Tag borderRadius="xl" px={3} py={2} fontWeight="medium">'
    );
  });
});

describe('runner (node index.js)', () => {
  it('runs all transforms in --dry mode, prints the summary, exits 0', () => {
    const dir = fs.mkdtempSync(
      path.join(process.env.TMPDIR || os.tmpdir(), 'lui5-cm-test-')
    );
    const target = path.join(dir, 'a.tsx');
    fs.copyFileSync(path.join(FIXTURES, 'index.input.tsx'), target);
    const before = fs.readFileSync(target, 'utf8');
    const stdout = execFileSync(
      process.execPath,
      [path.join(HERE, 'index.js'), '--dry', '--run-in-band', dir],
      { cwd: REPO, encoding: 'utf8', env: { ...process.env } }
    );
    expect(stdout).toContain('logician-ui 5.0 codemod summary');
    expect(stdout).toMatch(/Needs a human: 6 site\(s\)/);
    expect(stdout).toMatch(/tag-chip · selected\s+1/);
    expect(stdout).toMatch(/button-variants · dynamic\s+1/);
    expect(stdout).toMatch(/token-renames · primitive\s+1/);
    expect(fs.readFileSync(target, 'utf8')).toBe(before); // --dry wrote nothing
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
