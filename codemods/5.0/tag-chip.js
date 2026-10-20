/**
 * logician-ui 5.0 codemod — tag-chip
 *
 * 5.0 merges Chip into Tag and drops Tag's colour × fill grid:
 *
 *  1. `<Chip>` → `<Tag>`. The import specifier is rewritten (or dropped when
 *     the file already imports Tag — the import is merged, TagLabel & co. are
 *     kept). Aliases (`Chip as C`) and namespace use (`<L.Chip>`) are followed.
 *     If the file already binds `Tag` to something else, `Tag as LuiTag` is
 *     imported. Non-JSX references (`styled(Chip)`) are renamed and reported.
 *  2. On every logician-ui Tag (incl. converted Chips):
 *       colorPalette|colorScheme × variant
 *       primary|secondary|neutral|—  × soft|—|outline → plain <Tag> (neutral)
 *       danger|success|warning       × soft|—|outline → tone="danger" …
 *       primary                      × solid          → selected
 *       other × solid / unknown values                → TODO comment + report
 *     colorPalette / colorScheme / variant are then removed. Defaults: Chip
 *     4.x was primary/soft, Tag 4.x neutral/soft.
 *  Dynamic values are left alone and reported; so are Chip type imports
 *  (`ChipProps` …), which need a hand rename.
 */
'use strict';

const {
  luiImports,
  findElements,
  readAttr,
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
  isLuiSource,
} = require('./lib/shared');

const NAME = 'tag-chip';
const PLAIN = new Set(['primary', 'secondary', 'neutral']);
const TONES = new Set(['danger', 'success', 'warning']);
const CHIP_TYPES = new Set([
  'ChipProps',
  'ChipOwnProps',
  'ChipVariant',
  'ChipColorScheme',
]);

/** Names bound at module level (imports, declarations) — to avoid shadowing. */
const boundNames = (j, root) => {
  const names = new Set();
  root.find(j.ImportDeclaration).forEach((p) => {
    for (const s of p.node.specifiers || [])
      if (s.local) names.add(s.local.name);
  });
  root.find(j.VariableDeclarator).forEach((p) => {
    if (p.node.id.type === 'Identifier') names.add(p.node.id.name);
  });
  root
    .find(j.FunctionDeclaration)
    .forEach((p) => p.node.id && names.add(p.node.id.name));
  root
    .find(j.ClassDeclaration)
    .forEach((p) => p.node.id && names.add(p.node.id.name));
  return names;
};

/** Chip → Tag rename. Returns the set of opening-element nodes that were Chips. */
function renameChips(j, root, file, reporter) {
  const chipOpenings = new Set();
  const decls = luiImports(j, root).paths();

  // Type-only imports / type specifiers of Chip* are reported, not rewritten.
  root
    .find(j.ImportDeclaration)
    .filter((p) => isLuiSource(p.node.source.value))
    .forEach((p) => {
      for (const s of p.node.specifiers || []) {
        if (s.type === 'ImportSpecifier' && CHIP_TYPES.has(s.imported.name)) {
          reporter.site({
            line: lineOf(s),
            component: 'Chip',
            prop: s.imported.name,
            kind: 'type',
            note: 'Chip types merged into Tag (TagProps …) — rename by hand',
            source: textOf(j, file, s),
          });
        }
      }
    });

  const chipLocals = [];
  let namespaceUse = false;
  let tagLocal = null;
  for (const p of decls) {
    for (const s of p.node.specifiers || []) {
      if (s.type === 'ImportNamespaceSpecifier') namespaceUse = true;
      if (s.type !== 'ImportSpecifier' || s.importKind === 'type') continue;
      if (s.imported.name === 'Chip') chipLocals.push(s.local.name);
      if (s.imported.name === 'Tag') tagLocal = s.local.name;
    }
  }

  // Namespace form: <L.Chip> → <L.Tag>.
  if (namespaceUse) {
    const nsNames = new Set();
    for (const p of decls)
      for (const s of p.node.specifiers || [])
        if (s.type === 'ImportNamespaceSpecifier') nsNames.add(s.local.name);
    const fix = (n) =>
      n &&
      n.type === 'JSXMemberExpression' &&
      n.object.type === 'JSXIdentifier' &&
      nsNames.has(n.object.name) &&
      n.property.name === 'Chip';
    root.find(j.JSXElement).forEach((p) => {
      const { openingElement: o, closingElement: c } = p.node;
      if (fix(o.name)) {
        o.name.property.name = 'Tag';
        if (c && fix(c.name)) c.name.property.name = 'Tag';
        chipOpenings.add(o);
      }
    });
  }

  if (!chipLocals.length) return chipOpenings;

  let importTag = false;
  if (!tagLocal) {
    const bound = boundNames(j, root);
    tagLocal = bound.has('Tag') ? 'LuiTag' : 'Tag';
    importTag = true;
  }

  // Rewrite import specifiers: the first Chip specifier becomes Tag (unless Tag
  // is already imported), the rest are dropped; empty declarations go away.
  for (const p of decls) {
    const specs = p.node.specifiers || [];
    const next = [];
    for (const s of specs) {
      if (
        s.type === 'ImportSpecifier' &&
        s.importKind !== 'type' &&
        s.imported.name === 'Chip'
      ) {
        if (importTag) {
          next.push(
            tagLocal === 'Tag'
              ? j.importSpecifier(j.identifier('Tag'))
              : j.importSpecifier(j.identifier('Tag'), j.identifier(tagLocal))
          );
          importTag = false;
        }
        continue;
      }
      next.push(s);
    }
    p.node.specifiers = next;
    if (next.length === 0) j(p).remove();
  }

  const locals = new Set(chipLocals);
  root.find(j.JSXElement).forEach((p) => {
    const { openingElement: o, closingElement: c } = p.node;
    if (o.name.type === 'JSXIdentifier' && locals.has(o.name.name)) {
      o.name.name = tagLocal;
      if (c && c.name.type === 'JSXIdentifier') c.name.name = tagLocal;
      chipOpenings.add(o);
    }
  });

  // Non-JSX references (styled(Chip), `const X = Chip`, typeof Chip …).
  root
    .find(j.Identifier)
    .filter((p) => {
      if (!locals.has(p.node.name)) return false;
      const parent = p.parent && p.parent.node;
      if (!parent) return false;
      if (parent.type === 'ImportSpecifier') return false;
      if (
        (parent.type === 'MemberExpression' ||
          parent.type === 'OptionalMemberExpression') &&
        parent.property === p.node &&
        !parent.computed
      )
        return false;
      if (
        (parent.type === 'ObjectProperty' || parent.type === 'Property') &&
        parent.key === p.node &&
        !parent.computed &&
        !parent.shorthand
      )
        return false;
      if (parent.type === 'TSQualifiedName' && parent.right === p.node)
        return false;
      return true;
    })
    .forEach((p) => {
      reporter.site({
        line: lineOf(p.node),
        component: 'Chip',
        prop: '(reference)',
        kind: 'reference',
        note: `renamed to ${tagLocal}; props passed here are not migrated`,
        source: textOf(j, file, p.parent.node),
      });
      const parent = p.parent.node;
      if (
        (parent.type === 'ObjectProperty' || parent.type === 'Property') &&
        parent.shorthand
      ) {
        parent.shorthand = false;
        parent.value = j.identifier(tagLocal);
      } else {
        p.node.name = tagLocal;
      }
    });

  return chipOpenings;
}

function migrateTag(j, file, reporter, opening, fromChip) {
  const label = fromChip
    ? `${componentLabel(opening)} (was Chip)`
    : componentLabel(opening);
  const cp = readAttr(opening, 'colorPalette');
  const cs = readAttr(opening, 'colorScheme');
  const v = readAttr(opening, 'variant');

  const sp = spreads(opening);
  if (sp.length) {
    reporter.site({
      line: lineOf(opening),
      component: label,
      prop: '{...spread}',
      kind: 'spread',
      note: 'may carry colorPalette/colorScheme/variant — check by hand',
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
        note: 'not migrated (5.0: tone="danger|success|warning", selected)',
        source: textOf(j, file, a.attr),
      });
    }
    return false;
  }
  if (cp.kind === 'absent' && cs.kind === 'absent' && v.kind === 'absent')
    return false;

  const color =
    (cp.kind === 'static' ? cp.value : cs.kind === 'static' ? cs.value : '') ||
    (fromChip ? 'primary' : 'neutral');
  const variant = (v.kind === 'static' ? v.value : '') || 'soft';

  let tone = null;
  let selected = false;
  let todo = null;
  if (variant === 'soft' || variant === 'outline') {
    if (TONES.has(color)) tone = color;
    else if (!PLAIN.has(color))
      todo = `colorPalette="${color}" is not a 5.0 tone; now a plain Tag`;
  } else if (variant === 'solid') {
    if (color === 'primary') selected = true;
    else if (TONES.has(color)) {
      tone = color;
      todo = `${color}/solid has no filled 5.0 Tag; now tone="${color}" (soft)`;
    } else
      todo = `${color}/solid has no 5.0 equivalent; now a plain Tag — use selected?`;
  } else {
    if (TONES.has(color)) tone = color;
    todo = `variant="${variant}" is not a Tag variant; removed`;
  }

  const index = removeAttrs(opening, [
    'colorPalette',
    'colorScheme',
    'variant',
  ]);
  const at = index < 0 ? 0 : index;
  let anchor = null;
  if (tone) anchor = insertAttr(opening, stringAttr(j, 'tone', tone), at);
  if (selected) anchor = insertAttr(opening, boolAttr(j, 'selected'), at);
  if (todo) {
    addTodo(
      j,
      opening,
      todo,
      anchor || opening.attributes[at] || opening.attributes[0]
    );
    reporter.site({
      line: lineOf(opening),
      component: label,
      prop: 'colorPalette+variant',
      kind: 'todo',
      note: todo,
      source: `<${label} ${color}/${variant}>`,
    });
  }
  return true;
}

function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const reporter =
    (options && options.__reporter) || createReporter(api, file, NAME);

  const chipOpenings = renameChips(j, root, file, reporter);
  let changed = chipOpenings.size;
  if (changed) reporter.count('Chip → Tag', changed);

  // Tag elements (after the rename, Chips are Tags too).
  const seen = new Set();
  let migrated = 0;
  for (const p of findElements(j, root, 'Tag')) {
    seen.add(p.node);
    if (migrateTag(j, file, reporter, p.node, chipOpenings.has(p.node)))
      migrated += 1;
  }
  // Chips renamed to a newly imported Tag are found above; namespace ones too.
  for (const o of chipOpenings) {
    if (!seen.has(o) && migrateTag(j, file, reporter, o, true)) migrated += 1;
  }
  if (migrated) reporter.count('elements migrated', migrated);
  changed += migrated;
  if (!changed) return undefined;
  return root.toSource();
}

module.exports = transform;
module.exports.parser = 'tsx';
