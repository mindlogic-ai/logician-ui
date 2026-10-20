/**
 * logician-ui 5.0 codemod — button-variants
 *
 * <Button>/<IconButton> from '@mindlogic-ai/logician-ui': the 4.x
 * `colorPalette × variant` grid becomes one role `variant` (+ `isDestructive`).
 *
 * The mapping is the runtime back-compat table in
 * src/components/Button/Button.legacy.ts, so a call site renders the same
 * whether or not the codemod ran. Combinations outside the migration table in
 * MIGRATION-5.0.md (secondary/solid, warning/solid, success/outline, unknown
 * variant names, …) are still converted so the code compiles, but get a
 * `TODO(logician-ui 5.0)` comment and a report line.
 *
 * Dynamic `variant` / `colorPalette` / `colorScheme` values are not touched and
 * are reported. Spreads (`{...props}`) are migrated around but reported, since
 * the spread may carry the old props.
 */
'use strict';

const {
  findElements,
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
} = require('./lib/shared');

const NAME = 'button-variants';

const NEW_BUTTON = new Set([
  'primary',
  'action',
  'secondary',
  'subtle',
  'ghost',
  'danger',
]);
const NEW_ICON = new Set(['ghost', 'secondary', 'primary', 'danger', 'action']);

/**
 * The combinations the 5.0 migration table maps with confidence
 * (palette "" = prop absent, variant "" = prop absent).
 */
const BUTTON_OK = {
  solid: ['', 'primary', 'neutral', 'danger'],
  outline: ['', 'neutral', 'primary', 'secondary', 'danger'],
  ghost: ['', 'neutral', 'primary', 'danger'],
  soft: ['', 'neutral', 'primary', 'secondary', 'danger'],
  '': ['', 'neutral', 'primary', 'secondary', 'danger'],
};
const ICON_OK = {
  solid: ['', 'neutral', 'primary', 'danger'],
  outline: ['', 'neutral'],
  ghost: ['', 'neutral', 'primary', 'warning', 'danger'],
  soft: ['neutral', 'primary', 'danger'],
  '': ['', 'neutral', 'primary', 'danger'],
};

/**
 * Port of resolveLegacyButtonVariant (Button.legacy.ts).
 * @returns {{ variant: string, isDestructive: boolean, confident: boolean }}
 */
const resolve = (kind, palette, variant) => {
  const isDanger = palette === 'danger';
  const v = variant || (kind === 'icon' ? 'ghost' : 'soft');
  const okTable = kind === 'icon' ? ICON_OK : BUTTON_OK;
  const confident = (okTable[variant || ''] || []).includes(palette || '');
  const valid = kind === 'icon' ? NEW_ICON : NEW_BUTTON;

  if (valid.has(v) && v !== 'ghost') {
    const capable = v === 'secondary' || v === 'subtle' || v === 'ghost';
    return { variant: v, isDestructive: isDanger && capable, confident };
  }
  switch (v) {
    case 'solid':
      return {
        variant: isDanger ? 'danger' : 'primary',
        isDestructive: false,
        confident,
      };
    case 'outline':
      return { variant: 'secondary', isDestructive: isDanger, confident };
    case 'ghost':
      return { variant: 'ghost', isDestructive: isDanger, confident };
    case 'soft':
      return {
        variant: kind === 'icon' ? 'ghost' : 'subtle',
        isDestructive: isDanger,
        confident,
      };
    default:
      // Unknown variant (Chakra's `link`/`plain`/`surface`, a typo): what the
      // runtime renders — the component default — and leave it to a human.
      return {
        variant: kind === 'icon' ? 'ghost' : 'subtle',
        isDestructive: isDanger,
        confident: false,
      };
  }
};

function migrateElement(j, file, reporter, opening, kind) {
  const label = componentLabel(opening);
  const cp = readAttr(opening, 'colorPalette');
  const cs = readAttr(opening, 'colorScheme');
  const v = readAttr(opening, 'variant');
  const line = lineOf(opening);

  // Spreads may carry the old props; we migrate the static ones, a human checks.
  const sp = spreads(opening);
  if (sp.length) {
    reporter.site({
      line,
      component: label,
      prop: '{...spread}',
      kind: 'spread',
      note: 'may carry colorPalette/variant — check by hand',
      source: sp.map((s) => textOf(j, file, s)).join(' '),
    });
  }

  const dynamic = [
    ['colorPalette', cp],
    ['colorScheme', cs],
    ['variant', v],
  ].filter(([, a]) => a.kind === 'dynamic');
  if (dynamic.length) {
    for (const [prop, a] of dynamic) {
      reporter.site({
        line: lineOf(a.attr),
        component: label,
        prop,
        kind: 'dynamic',
        note: 'not migrated',
        source: textOf(j, file, a.attr),
      });
    }
    return false;
  }

  const paletteAttr = cp.kind === 'static' ? cp : cs;
  const palette = paletteAttr.kind === 'static' ? paletteAttr.value : '';
  const variant = v.kind === 'static' ? v.value : '';

  // Already 5.0: a role variant and no colour axis.
  const valid = kind === 'icon' ? NEW_ICON : NEW_BUTTON;
  if (!palette && cp.kind === 'absent' && cs.kind === 'absent') {
    if (variant && valid.has(variant)) return false;
    // IconButton with nothing set is already the 5.0 default (ghost).
    if (kind === 'icon' && !variant) return false;
  }

  const r = resolve(kind, palette, variant);
  const index = removeAttrs(opening, [
    'colorPalette',
    'colorScheme',
    'variant',
  ]);

  let anchor = null;
  if (!(kind === 'icon' && r.variant === 'ghost')) {
    // Before any spread when there was no attribute to replace, so a spread
    // keeps the precedence it had over the (absent) old variant.
    anchor = insertAttr(
      opening,
      stringAttr(j, 'variant', r.variant),
      index < 0 ? 0 : index
    );
  }
  if (r.isDestructive && !hasAttr(opening, 'isDestructive')) {
    const at = anchor
      ? opening.attributes.indexOf(anchor) + 1
      : index < 0
        ? 0
        : index;
    const d = insertAttr(opening, boolAttr(j, 'isDestructive'), at);
    anchor = anchor || d;
  }

  if (!r.confident) {
    const was = `colorPalette=${palette ? `"${palette}"` : '—'} variant=${
      variant ? `"${variant}"` : '—'
    }`;
    const now = `variant="${r.variant}"${r.isDestructive ? ' isDestructive' : ''}`;
    addTodo(
      j,
      opening,
      `${was} has no exact 5.0 role; set to ${now} — pick one`,
      anchor
    );
    reporter.site({
      line,
      component: label,
      prop: 'colorPalette+variant',
      kind: 'todo',
      note: `${was} → ${now}`,
      source: `<${label} ${was}>`,
    });
  }
  return true;
}

function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const reporter =
    (options && options.__reporter) || createReporter(api, file, NAME);
  let changed = 0;

  for (const [exported, kind] of [
    ['Button', 'button'],
    ['IconButton', 'icon'],
  ]) {
    for (const p of findElements(j, root, exported)) {
      if (migrateElement(j, file, reporter, p.node, kind)) changed += 1;
    }
  }
  if (!changed) return undefined;
  reporter.count('elements migrated', changed);
  return root.toSource();
}

module.exports = transform;
module.exports.parser = 'tsx';
module.exports.resolve = resolve;
