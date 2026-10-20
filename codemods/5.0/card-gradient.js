/**
 * logician-ui 5.0 codemod — card-gradient
 *
 * 5.0 removes `<Card variant="gradient">` (BAZE has no gradient surfaces). The
 * attribute is removed (→ the default card), a TODO comment is left, and the
 * site is reported so a designer can pick `wash`/`elevated` or a custom bg.
 * A dynamic `variant={…}` on Card is reported too — it may evaluate to
 * 'gradient'.
 */
'use strict';

const {
  findElements,
  readAttr,
  removeAttrs,
  addTodo,
  textOf,
  lineOf,
  componentLabel,
  createReporter,
} = require('./lib/shared');

const NAME = 'card-gradient';

function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const reporter =
    (options && options.__reporter) || createReporter(api, file, NAME);
  let changed = 0;

  for (const p of findElements(j, root, 'Card')) {
    const opening = p.node;
    const label = componentLabel(opening);
    const v = readAttr(opening, 'variant');
    if (v.kind === 'dynamic') {
      reporter.site({
        line: lineOf(v.attr),
        component: label,
        prop: 'variant',
        kind: 'dynamic',
        note: "may be 'gradient', removed in 5.0",
        source: textOf(j, file, v.attr),
      });
      continue;
    }
    if (v.kind !== 'static' || v.value !== 'gradient') continue;
    const index = removeAttrs(opening, ['variant']);
    const anchor = opening.attributes[index] || opening.attributes[0];
    addTodo(
      j,
      opening,
      'Card variant="gradient" was removed; now the default card — choose wash/elevated or a bg',
      anchor
    );
    reporter.site({
      line: lineOf(opening),
      component: label,
      prop: 'variant',
      kind: 'todo',
      note: 'gradient removed',
      source: textOf(j, file, v.attr),
    });
    changed += 1;
  }
  if (!changed) return undefined;
  reporter.count('elements migrated', changed);
  return root.toSource();
}

module.exports = transform;
module.exports.parser = 'tsx';
