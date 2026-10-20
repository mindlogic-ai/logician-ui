/**
 * logician-ui 5.0 codemod — badge-variants
 *
 * <Badge> from '@mindlogic-ai/logician-ui': 5.0 keeps status variants and makes
 * the plain badge neutral (the default). 4.x `primary` (blue) and `secondary`
 * (violet) have no colour of their own any more.
 *
 *   variant neutral | primary | secondary  → attribute removed (neutral default)
 *   variant success | warning | danger | info → unchanged
 *   variant={expr}                         → untouched, reported
 *   any other static value                 → removed + TODO comment, reported
 */
'use strict';

const {
  findElements,
  readAttr,
  spreads,
  removeAttrs,
  addTodo,
  textOf,
  lineOf,
  componentLabel,
  createReporter,
} = require('./lib/shared');

const NAME = 'badge-variants';
const DROP = new Set(['neutral', 'primary', 'secondary']);
const KEEP = new Set(['success', 'warning', 'danger', 'info']);

function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const reporter =
    (options && options.__reporter) || createReporter(api, file, NAME);
  let changed = 0;

  for (const p of findElements(j, root, 'Badge')) {
    const opening = p.node;
    const label = componentLabel(opening);
    const v = readAttr(opening, 'variant');
    const sp = spreads(opening);
    if (sp.length && v.kind === 'absent') {
      reporter.site({
        line: lineOf(opening),
        component: label,
        prop: '{...spread}',
        kind: 'spread',
        note: 'may carry variant — check by hand',
        source: sp.map((s) => textOf(j, file, s)).join(' '),
      });
    }
    if (v.kind === 'dynamic') {
      reporter.site({
        line: lineOf(v.attr),
        component: label,
        prop: 'variant',
        kind: 'dynamic',
        note: 'not migrated; primary/secondary → neutral',
        source: textOf(j, file, v.attr),
      });
      continue;
    }
    if (v.kind !== 'static' || KEEP.has(v.value)) continue;
    const index = removeAttrs(opening, ['variant']);
    changed += 1;
    if (!DROP.has(v.value)) {
      const anchor = opening.attributes[index] || opening.attributes[0];
      addTodo(
        j,
        opening,
        `Badge variant="${v.value}" is not a 5.0 variant; removed (neutral)`,
        anchor
      );
      reporter.site({
        line: lineOf(opening),
        component: label,
        prop: 'variant',
        kind: 'todo',
        note: `variant="${v.value}" removed`,
        source: textOf(j, file, v.attr),
      });
    }
  }
  if (!changed) return undefined;
  reporter.count('elements migrated', changed);
  return root.toSource();
}

module.exports = transform;
module.exports.parser = 'tsx';
