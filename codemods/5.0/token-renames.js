/**
 * logician-ui 5.0 codemod — token-renames
 *
 * Renames deprecated 4.x colour token names inside string literals, JSX string
 * attributes and template-literal quasis, using src/theme/deprecatedColorTokens.json
 * — the same file the theme builds its aliases from and the
 * `logician-ui/no-deprecated-tokens` ESLint rule warns with, and with the same
 * token boundaries as that rule:
 *
 *   'primary.lightest'                → 'primary.wash'
 *   'slate.800'                       → 'neutral.9'   ('slate.1000' is its own token)
 *   'var(--chakra-colors-slate-300)'  → 'var(--chakra-colors-neutral-5)'
 *   'gray.300'                        → 'neutral.5'   (removedPrimitives.gray)
 *   'fg.accent'                       → 'primary.main', except `color` on a
 *                                       <Link>/<a> element → 'fg.link'
 *
 * Not renamed, reported instead: the other removed raw primitives (blue.N,
 * violet.N, rose.N, gold.N, green.N, grayDark.N, purple/red/yellow.N) — their
 * replacement depends on what the colour is for — and token names used as
 * object keys or computed member access (`theme.colors['slate.800']`) — theme
 * definitions, where renaming changes what the key defines or reads.
 * Type-level literals (`type T = 'slate.800'`) are skipped, as in the rule.
 */
'use strict';

const data = require('../../src/theme/deprecatedColorTokens.json');
const {
  setStringLiteral,
  lineOf,
  textOf,
  createReporter,
} = require('./lib/shared');

const NAME = 'token-renames';

const ALIASES = data.aliases;
const GRAY = data.removedPrimitives.gray;
const FAMILIES = data.removedPrimitives.families;

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/**
 * Token path → the name Chakra gives its CSS variable: dots become dashes and
 * camelCase segments are kebab-cased (`primary.fillStrong` → `primary-fill-strong`,
 * `grayDark.200` → `gray-dark-200`), as Chakra's own `dashCase` does. Used for
 * both the names we match and the names we write — see src/theme/cssVarNames.test.ts.
 */
const kebab = (s) =>
  s.replace(/\./g, '-').replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const keys = Object.keys(ALIASES).sort((a, b) => b.length - a.length);
const dotted = keys.map(esc).join('|');
const dashedToKey = new Map(keys.map((k) => [kebab(k), k]));
const dashed = [...dashedToKey.keys()]
  .sort((a, b) => b.length - a.length)
  .map(esc)
  .join('|');
const fam = FAMILIES.map(esc).join('|');
const famDashedToName = new Map(FAMILIES.map((f) => [kebab(f), f]));
const famDashed = [...famDashedToName.keys()]
  .sort((a, b) => b.length - a.length)
  .map(esc)
  .join('|');

// Same boundaries as eslint/rules/no-deprecated-tokens.js. A dotted name must
// not be part of a longer path (`foo.primary.light`, `primary.lighter`), with
// one exception: Chakra's own token references spell the path with a
// `colors.` prefix — `{colors.success.main}` in a value string,
// `token('colors.success.main')`, or a string that is exactly
// `'colors.success.main'`. So `colors.` is accepted (and kept) when it starts
// the string or follows `{`, a quote or `token(`.
const PREFIX = `(?:(?<=^|[{'"\`]|token\\()(colors\\.)|(?<![\\w.-]))`;
const ALIAS_RE = new RegExp(
  `${PREFIX}(${dotted})(?![\\w-])|--chakra-colors-(${dashed})(?![\\w-])`,
  'g'
);
const PRIMITIVE_RE = new RegExp(
  `${PREFIX}(${fam})\\.(\\d+)(?![\\w.-])|--chakra-colors-(${famDashed})-(\\d+)(?![\\w-])`,
  'g'
);

const LINK_ELEMENTS = new Set(['Link', 'a']);

/**
 * Rewrite one string. `ctx.linkColor` = it is the `color` attribute of a
 * <Link>/<a>. Returns { text, renamed: [[from,to]], primitives: [name] }.
 */
const rewrite = (text, ctx = {}) => {
  const renamed = [];
  const primitives = [];
  let out = text.replace(ALIAS_RE, (m, prefix, dot, dash) => {
    const key = dot || dashedToKey.get(dash);
    let to = ALIASES[key];
    if (key === 'fg.accent' && ctx.linkColor) to = 'fg.link';
    const repl = dot ? `${prefix || ''}${to}` : `--chakra-colors-${kebab(to)}`;
    renamed.push([m, repl]);
    return repl;
  });
  out = out.replace(PRIMITIVE_RE, (m, prefix, f1, s1, f2, s2) => {
    const family = f1 || famDashedToName.get(f2);
    const step = s1 || s2;
    if (family === 'gray' && GRAY[step]) {
      const to = GRAY[step];
      const repl = f1 ? `${prefix || ''}${to}` : `--chakra-colors-${kebab(to)}`;
      renamed.push([m, repl]);
      return repl;
    }
    primitives.push(m);
    return m;
  });
  return { text: out, renamed, primitives };
};

const isTypeLevel = (path) => {
  for (let p = path.parent; p; p = p.parent) {
    const t = p.node.type;
    if (t === 'TSLiteralType') return true;
    if (!t.startsWith('TS') && t !== 'TemplateLiteral') return false;
  }
  return false;
};

/** JSX attribute name + element name around a string, if any. */
const jsxContext = (path) => {
  let p = path.parent;
  if (p && p.node.type === 'JSXExpressionContainer') p = p.parent;
  if (!p || p.node.type !== 'JSXAttribute') return null;
  const attr = p.node.name && p.node.name.name;
  const opening = p.parent && p.parent.node;
  const el =
    opening && opening.name && opening.name.type === 'JSXIdentifier'
      ? opening.name.name
      : null;
  return { attr, el };
};

function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const reporter =
    (options && options.__reporter) || createReporter(api, file, NAME);
  let renames = 0;

  const reportPrimitives = (node, names) => {
    for (const name of names) {
      reporter.site({
        line: lineOf(node),
        component: '-',
        prop: name,
        kind: 'primitive',
        note: 'raw 4.x primitive removed in 5.0 — pick primary.*/neutral.N/status/category by use',
        source: textOf(j, file, node),
      });
    }
  };

  const handleString = (path, node, value, apply) => {
    if (typeof value !== 'string' || !value) return;
    if (isTypeLevel(path)) return;
    const parent = path.parent && path.parent.node;
    if (parent && parent.type === 'ImportDeclaration') return;
    const isKey =
      (parent &&
        (parent.type === 'ObjectProperty' ||
          parent.type === 'Property' ||
          parent.type === 'TSPropertySignature' ||
          parent.type === 'ClassProperty') &&
        parent.key === node) ||
      ((parent.type === 'MemberExpression' ||
        parent.type === 'OptionalMemberExpression') &&
        parent.computed &&
        parent.property === node);
    const ctx = jsxContext(path);
    const linkColor = !!(
      ctx &&
      ctx.attr === 'color' &&
      LINK_ELEMENTS.has(ctx.el)
    );
    const r = rewrite(value, { linkColor });
    if (isKey) {
      for (const [from, to] of r.renamed) {
        reporter.site({
          line: lineOf(node),
          component: '-',
          prop: from,
          kind: 'key',
          note: `object key / computed access not renamed (→ ${to}?)`,
          source: textOf(j, file, parent),
        });
      }
      reportPrimitives(node, r.primitives);
      return;
    }
    reportPrimitives(node, r.primitives);
    if (r.renamed.length) {
      apply(r.text);
      renames += r.renamed.length;
    }
  };

  // Collect before mutating: setStringLiteral turns nodes into `Literal`s.
  const babelStrings = root.find(j.StringLiteral).paths();
  // Other parsers (babel with estree, flow) yield ESTree `Literal`.
  const estreeStrings = root
    .find(j.Literal)
    .filter(
      (p) => p.node.type === 'Literal' && typeof p.node.value === 'string'
    )
    .paths();
  for (const path of [...babelStrings, ...estreeStrings]) {
    handleString(path, path.node, path.node.value, (t) =>
      setStringLiteral(path.node, t)
    );
  }
  root.find(j.TemplateElement).forEach((path) => {
    const node = path.node;
    // Rewrite `raw` (what is printed); recompute `cooked` from the same edit.
    const raw = node.value.raw;
    handleString(path, node, raw, (t) => {
      const cooked = rewrite(node.value.cooked || '', {}).text;
      node.value = { raw: t, cooked };
    });
  });

  if (!renames) return undefined;
  reporter.count('tokens renamed', renames);
  return root.toSource();
}

module.exports = transform;
module.exports.parser = 'tsx';
module.exports.rewrite = rewrite;
module.exports.kebab = kebab;
