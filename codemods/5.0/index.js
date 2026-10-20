#!/usr/bin/env node
/**
 * logician-ui 5.0 codemod — all transforms, in order:
 *   button-variants → badge-variants → tag-chip → card-gradient → token-renames
 *
 * Two ways to use this file (see README.md):
 *
 *  1. As a jscodeshift transform:
 *       npx jscodeshift -t node_modules/@mindlogic-ai/logician-ui/codemods/5.0/index.js \
 *         --parser=tsx --extensions=tsx,ts src/
 *     Every site that needs a human is printed as a ` REP ` line; with `--dry`
 *     jscodeshift also prints per-kind counts at the end.
 *     `--only=button-variants,token-renames` limits the transforms.
 *
 *  2. As a runner (`node index.js [--dry] [--print] [--only=…] [--cpus=N] <paths…>`):
 *     same transforms, plus a summary table of every needs-a-human site at the
 *     end. Needs `jscodeshift` resolvable from the cwd or this package.
 *
 * Exit code is 0 even when sites need a human — the report is the output.
 */
'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');

const TRANSFORMS = [
  ['button-variants', require('./button-variants')],
  ['badge-variants', require('./badge-variants')],
  ['tag-chip', require('./tag-chip')],
  ['card-gradient', require('./card-gradient')],
  ['token-renames', require('./token-renames')],
];

const selected = (options) => {
  const only = options && options.only;
  if (!only) return TRANSFORMS;
  const want = String(only)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const unknown = want.filter((w) => !TRANSFORMS.some(([n]) => n === w));
  if (unknown.length)
    throw new Error(`Unknown transform(s) in --only: ${unknown.join(', ')}`);
  return TRANSFORMS.filter(([n]) => want.includes(n));
};

function transform(file, api, options) {
  let source = file.source;
  let changed = false;
  for (const [, t] of selected(options)) {
    const out = t({ ...file, source }, api, options);
    if (typeof out === 'string' && out !== source) {
      source = out;
      changed = true;
    }
  }
  return changed ? source : undefined;
}

module.exports = transform;
module.exports.parser = 'tsx';
module.exports.transforms = TRANSFORMS;

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

const resolveRunner = () => {
  for (const base of [process.cwd(), __dirname]) {
    try {
      return require(
        require.resolve('jscodeshift/src/Runner', { paths: [base] })
      );
    } catch (_) {
      /* try next */
    }
  }
  console.error(
    'jscodeshift is not installed. Either `npm i -D jscodeshift` or run via\n' +
      '  npx jscodeshift -t <this file> --parser=tsx --extensions=tsx,ts src/'
  );
  process.exit(2);
};

const pad = (s, n) => {
  s = String(s);
  return s.length >= n ? s : s + ' '.repeat(n - s.length);
};

/** Summary of a JSON-lines report file → string. Exported for tests. */
function summarize(lines, cwd = process.cwd()) {
  const sites = [];
  const migrated = {};
  for (const line of lines) {
    if (!line.trim()) continue;
    let e;
    try {
      e = JSON.parse(line);
    } catch (_) {
      continue;
    }
    if (e.migrated) {
      const k = `${e.transform} · ${e.migrated}`;
      migrated[k] = (migrated[k] || 0) + (e.quantity || 1);
    } else sites.push(e);
  }
  const out = [];
  out.push('', '── logician-ui 5.0 codemod summary ──', '');
  const mk = Object.keys(migrated).sort();
  out.push('Migrated automatically:');
  if (!mk.length) out.push('  (nothing)');
  for (const k of mk) out.push(`  ${pad(k, 44)} ${migrated[k]}`);
  out.push('');

  const byKind = {};
  for (const s of sites) {
    const k = `${s.transform} · ${s.kind}`;
    byKind[k] = (byKind[k] || 0) + 1;
  }
  out.push(`Needs a human: ${sites.length} site(s)`);
  for (const k of Object.keys(byKind).sort())
    out.push(`  ${pad(k, 44)} ${byKind[k]}`);
  if (sites.length) {
    out.push('');
    const rows = sites
      .map((s) => ({
        loc: `${path.relative(cwd, s.file) || s.file}:${s.line}`,
        comp: s.component,
        prop: s.prop,
        kind: s.kind,
        src: s.source + (s.note ? `   ← ${s.note}` : ''),
      }))
      .sort((a, b) => a.loc.localeCompare(b.loc, 'en', { numeric: true }));
    const w = {
      loc: Math.min(70, Math.max(8, ...rows.map((r) => r.loc.length))),
      comp: Math.min(24, Math.max(9, ...rows.map((r) => r.comp.length))),
      prop: Math.min(24, Math.max(4, ...rows.map((r) => r.prop.length))),
      kind: Math.max(4, ...rows.map((r) => r.kind.length)),
    };
    out.push(
      `${pad('location', w.loc)}  ${pad('component', w.comp)}  ${pad('prop', w.prop)}  ${pad('kind', w.kind)}  source`
    );
    out.push(
      `${'-'.repeat(w.loc)}  ${'-'.repeat(w.comp)}  ${'-'.repeat(w.prop)}  ${'-'.repeat(w.kind)}  ------`
    );
    for (const r of rows)
      out.push(
        `${pad(r.loc, w.loc)}  ${pad(r.comp, w.comp)}  ${pad(r.prop, w.prop)}  ${pad(r.kind, w.kind)}  ${r.src}`
      );
  }
  out.push('');
  out.push(
    'kinds: dynamic = prop value is an expression · spread = {...props} may carry old props ·'
  );
  out.push(
    '       todo = converted but marked TODO(logician-ui 5.0) · primitive = raw blue.N/violet.N/… ·'
  );
  out.push(
    '       reference/type = Chip used outside JSX / Chip* type import · key = token as object key'
  );
  return out.join('\n');
}
module.exports.summarize = summarize;

async function main(argv) {
  const opts = { parser: 'tsx', extensions: 'tsx,ts,jsx,js', babel: false };
  const paths = [];
  for (const a of argv) {
    if (a === '--dry' || a === '-d') opts.dry = true;
    else if (a === '--print' || a === '-p') opts.print = true;
    else if (a === '--run-in-band') opts.runInBand = true;
    else if (a === '--silent' || a === '-s') opts.silent = true;
    else if (a.startsWith('--only=')) opts.only = a.slice(7);
    else if (a.startsWith('--cpus=')) opts.cpus = Number(a.slice(7));
    else if (a.startsWith('--extensions=')) opts.extensions = a.slice(13);
    else if (a.startsWith('--ignore-pattern='))
      opts.ignorePattern = [a.slice(17)];
    else if (a === '--help' || a === '-h') {
      console.log(
        'usage: node index.js [--dry] [--print] [--only=a,b] [--cpus=N] [--extensions=tsx,ts] <paths…>'
      );
      return 0;
    } else paths.push(a);
  }
  if (!paths.length) paths.push('src');
  selected(opts); // validate --only early
  opts.ignorePattern = [
    ...(opts.ignorePattern || []),
    '**/node_modules/**',
    '**/*.d.ts',
  ];

  const reportFile = path.join(
    fs.mkdtempSync(
      path.join(process.env.TMPDIR || os.tmpdir(), 'lui5-codemod-')
    ),
    'report.jsonl'
  );
  fs.writeFileSync(reportFile, '');
  process.env.LUI5_CODEMOD_REPORT = reportFile;

  const Runner = resolveRunner();
  await Runner.run(__filename, paths, opts);

  const lines = fs.readFileSync(reportFile, 'utf8').split('\n');
  console.log(summarize(lines));
  console.log(`\nraw report (JSON lines): ${reportFile}`);
  return 0;
}

if (require.main === module) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (err) => {
      console.error(err && err.stack ? err.stack : err);
      process.exit(1);
    }
  );
}
