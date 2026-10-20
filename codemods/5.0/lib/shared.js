/**
 * Shared helpers for the logician-ui 5.0 codemods.
 *
 * Plain CommonJS on purpose: jscodeshift loads it without a build step, and the
 * package ships `codemods/` as-is (package.json "files").
 */
'use strict';

const fs = require('fs');

const PKG = '@mindlogic-ai/logician-ui';
const TODO = 'TODO(logician-ui 5.0)';

/** `@mindlogic-ai/logician-ui` and its subpaths (`/dist`, …). */
const isLuiSource = (value) =>
  typeof value === 'string' && (value === PKG || value.startsWith(`${PKG}/`));

/** Value import declarations from logician-ui (type-only imports skipped). */
const luiImports = (j, root) =>
  root
    .find(j.ImportDeclaration)
    .filter(
      (p) => isLuiSource(p.node.source.value) && p.node.importKind !== 'type'
    );

/**
 * Local binding names of a logician-ui export — respects aliases
 * (`import { Button as LButton }`) and namespace imports (`import * as L`).
 * Returns `{ names: Set<string>, namespaces: Set<string> }`.
 */
const localNamesFor = (j, root, exported) => {
  const names = new Set();
  const namespaces = new Set();
  luiImports(j, root).forEach((p) => {
    for (const s of p.node.specifiers || []) {
      if (s.type === 'ImportNamespaceSpecifier') namespaces.add(s.local.name);
      if (
        s.type === 'ImportSpecifier' &&
        s.importKind !== 'type' &&
        s.imported.name === exported
      ) {
        names.add((s.local || s.imported).name);
      }
    }
  });
  return { names, namespaces };
};

/** Does this JSX element name refer to the logician-ui export? */
const nameMatches = (nameNode, locals) => {
  if (!nameNode) return false;
  if (nameNode.type === 'JSXIdentifier') return locals.names.has(nameNode.name);
  if (
    nameNode.type === 'JSXMemberExpression' &&
    nameNode.object.type === 'JSXIdentifier' &&
    locals.namespaces.has(nameNode.object.name)
  ) {
    return locals.lookup === nameNode.property.name;
  }
  return false;
};

/**
 * All JSX opening elements (as paths) of a logician-ui component.
 * Each result also carries `.componentLabel` for reporting.
 */
const findElements = (j, root, exported) => {
  const locals = localNamesFor(j, root, exported);
  locals.lookup = exported;
  if (locals.names.size === 0 && locals.namespaces.size === 0) return [];
  return root
    .find(j.JSXOpeningElement)
    .filter((p) => nameMatches(p.node.name, locals))
    .paths();
};

const attrName = (a) =>
  a && a.type === 'JSXAttribute' && a.name && a.name.type === 'JSXIdentifier'
    ? a.name.name
    : null;

/** The string value of a static attribute value node, else undefined. */
const staticString = (valueNode) => {
  if (!valueNode) return undefined;
  if (valueNode.type === 'StringLiteral') return valueNode.value;
  if (valueNode.type === 'Literal' && typeof valueNode.value === 'string')
    return valueNode.value;
  if (valueNode.type === 'JSXExpressionContainer') {
    const e = valueNode.expression;
    if (e.type === 'StringLiteral') return e.value;
    if (e.type === 'Literal' && typeof e.value === 'string') return e.value;
    if (e.type === 'TemplateLiteral' && e.expressions.length === 0)
      return e.quasis.map((q) => q.value.cooked).join('');
  }
  return undefined;
};

/**
 * Read one attribute. The last occurrence wins, like React.
 *  { kind: 'absent' } | { kind: 'static', value, attr } | { kind: 'dynamic', attr }
 * A bare boolean (`<Button variant>`) counts as dynamic: it has no mapping.
 */
const readAttr = (opening, name) => {
  let found = null;
  for (const a of opening.attributes || []) if (attrName(a) === name) found = a;
  if (!found) return { kind: 'absent' };
  const value = staticString(found.value);
  if (value === undefined) return { kind: 'dynamic', attr: found };
  return { kind: 'static', value, attr: found };
};

const hasAttr = (opening, name) =>
  (opening.attributes || []).some((a) => attrName(a) === name);

const spreads = (opening) =>
  (opening.attributes || []).filter((a) => a.type === 'JSXSpreadAttribute');

/** Remove every attribute with one of the names; returns the first index removed (or -1). */
const removeAttrs = (opening, names) => {
  let first = -1;
  const keep = [];
  (opening.attributes || []).forEach((a, i) => {
    if (names.includes(attrName(a))) {
      if (first === -1) first = keep.length;
      return;
    }
    keep.push(a);
    void i;
  });
  opening.attributes = keep;
  return first;
};

/** Insert an attribute at `index` (or append when index < 0). */
const insertAttr = (opening, attr, index) => {
  const attrs = opening.attributes || (opening.attributes = []);
  if (index < 0 || index > attrs.length) attrs.push(attr);
  else attrs.splice(index, 0, attr);
  return attr;
};

const stringAttr = (j, name, value) =>
  j.jsxAttribute(j.jsxIdentifier(name), j.stringLiteral(value));

const boolAttr = (j, name) => j.jsxAttribute(j.jsxIdentifier(name), null);

/**
 * Attach a `/* TODO(logician-ui 5.0): … *\/` block comment in front of an
 * attribute (valid JSX in any position; Prettier keeps it). With no attribute
 * to hang it on, the element name gets a trailing comment.
 */
const addTodo = (j, opening, message, anchorAttr) => {
  const comment = j.commentBlock(` ${TODO}: ${message} `, true, false);
  const target = anchorAttr || (opening.attributes || [])[0];
  if (target) {
    target.comments = [...(target.comments || []), comment];
  } else {
    const c = j.commentBlock(` ${TODO}: ${message} `, false, true);
    opening.name.comments = [...(opening.name.comments || []), c];
  }
};

/** Original source text of a node (falls back to printing it). */
const textOf = (j, file, node) => {
  let s;
  if (typeof node.start === 'number' && typeof node.end === 'number') {
    s = file.source.slice(node.start, node.end);
  } else {
    s = j(node).toSource();
  }
  s = s.replace(/\s+/g, ' ').trim();
  return s.length > 140 ? `${s.slice(0, 137)}...` : s;
};

const lineOf = (node) => (node && node.loc ? node.loc.start.line : 0);

const componentLabel = (opening) => {
  const n = opening.name;
  if (n.type === 'JSXIdentifier') return n.name;
  if (n.type === 'JSXMemberExpression')
    return `${n.object.name}.${n.property.name}`;
  return '?';
};

/**
 * Reporter for one transform × one file.
 *
 * Every site goes three ways:
 *  - `api.report(msg)` → jscodeshift prints ` REP <file> <msg>` per site;
 *  - `api.stats(name)` → counted in jscodeshift's end-of-run stats (`--dry` only;
 *    jscodeshift drops stats in write mode);
 *  - appended as JSON lines to `$LUI5_CODEMOD_REPORT` when set — the
 *    `node index.js` runner sets it and prints the summary table from it.
 * `sites` keeps them in memory for tests.
 */
const createReporter = (api, file, transform) => {
  const sites = [];
  const outPath = process.env.LUI5_CODEMOD_REPORT;
  const site = (entry) => {
    const e = { transform, file: file.path, ...entry };
    sites.push(e);
    const msg = `[${transform}] L${e.line} <${e.component}> ${e.prop} — ${e.kind}${
      e.note ? ` (${e.note})` : ''
    }: ${e.source}`;
    if (api && typeof api.report === 'function') api.report(msg);
    if (api && typeof api.stats === 'function')
      api.stats(`${transform} · needs human · ${e.kind}`);
    if (outPath) {
      try {
        fs.appendFileSync(outPath, `${JSON.stringify(e)}\n`);
      } catch (_) {
        /* reporting must never fail the transform */
      }
    }
  };
  const count = (name, quantity = 1) => {
    if (api && typeof api.stats === 'function')
      api.stats(`${transform} · ${name}`, quantity);
    if (outPath) {
      try {
        fs.appendFileSync(
          outPath,
          `${JSON.stringify({ transform, file: file.path, migrated: name, quantity })}\n`
        );
      } catch (_) {
        /* ignore */
      }
    }
  };
  return { site, count, sites };
};

/**
 * Set a string literal's value, keeping its original quote style.
 *
 * Recast reprints a changed Babel `StringLiteral` with the global `quote`
 * option and ignores `extra.raw`; an ESTree `Literal` honours its raw text.
 * So the node is turned into a `Literal` carrying the re-quoted raw.
 */
const setStringLiteral = (node, value) => {
  const raw = (node.extra && node.extra.raw) || node.raw;
  const q = raw && raw[0] === "'" ? "'" : '"';
  const escaped = value.replace(/\\/g, '\\\\').split(q).join(`\\${q}`);
  const newRaw = `${q}${escaped}${q}`;
  node.type = 'Literal';
  node.value = value;
  node.raw = newRaw;
  node.extra = { rawValue: value, raw: newRaw };
};

module.exports = {
  PKG,
  TODO,
  isLuiSource,
  luiImports,
  localNamesFor,
  findElements,
  attrName,
  staticString,
  readAttr,
  hasAttr,
  spreads,
  removeAttrs,
  insertAttr,
  stringAttr,
  boolAttr,
  addTodo,
  textOf,
  lineOf,
  componentLabel,
  createReporter,
  setStringLiteral,
};
