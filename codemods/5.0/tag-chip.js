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
 *     A converted Chip keeps Chip's pill shape — `borderRadius="xl"` (32px)
 *     `px={3} py={2} fontWeight="medium"`, what Chip.tsx renders — unless
 *     the call site already sets them.
 *  2. On every logician-ui Tag (incl. converted Chips), the runtime table of
 *     mapLegacyTagProps (src/components/Tag/Tag.styles.ts):
 *       colorPalette (Chip: colorScheme ?? colorPalette) × variant
 *       primary|secondary|neutral|—  × soft|—|outline → plain <Tag> (neutral)
 *       primary|secondary|neutral|—  × solid          → selected (reported:
 *                                      explicit `selected` is also a toggle)
 *       danger|success|warning       × soft|—         → tone="danger" …
 *       danger|success|warning       × solid          → tone (soft) + TODO
 *       danger|success|warning       × outline        → plain <Tag> + TODO
 *       unknown palette / variant                     → plain <Tag> + TODO
 *     colorPalette / colorScheme / variant are then removed. Defaults: Chip
 *     4.x was primary/soft, Tag 4.x neutral/soft. A Tag's `colorScheme` was
 *     never read (only Chip's), so it is removed with a TODO.
 *  Dynamic values are left alone and reported; so are Chip type imports
 *  (`ChipProps` …), which need a hand rename.
 */
'use strict';

const {
  luiImports,
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
        note: `renamed to ${tagLocal}; props passed here are not migrated and Chip's pill shape (borderRadius="xl" px={3} py={2} fontWeight="medium") is not added`,
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

/**
 * Port of mapLegacyTagProps (src/components/Tag/Tag.styles.ts) — the runtime
 * back-compat table, so a migrated call site renders as the unmigrated one
 * did. `palette` is what the runtime receives: Tag's `colorPalette`, or for a
 * Chip `colorScheme ?? colorPalette ?? 'primary'` (Chip.tsx); undefined means
 * Tag's 4.x default, neutral.
 * @returns {{ tone: string, selected?: boolean, needsHuman: boolean }}
 */
const mapLegacy = (palette, variant) => {
  const color = palette == null ? 'neutral' : palette;
  const v = variant == null ? 'soft' : variant;
  const plain = PLAIN.has(color);
  const status = TONES.has(color);
  if (!plain && !status) return { tone: 'neutral', needsHuman: true };
  switch (v) {
    case 'soft':
      return { tone: status ? color : 'neutral', needsHuman: false };
    case 'solid':
      return status
        ? { tone: color, needsHuman: true }
        : { tone: 'neutral', selected: true, needsHuman: false };
    case 'outline':
      return { tone: 'neutral', needsHuman: status };
    default:
      return { tone: 'neutral', needsHuman: true };
  }
};

/** Why a needs-human pair is lossy — the TODO text. */
const todoFor = (color, variant, r) => {
  if (!PLAIN.has(color) && !TONES.has(color))
    return `colorPalette="${color}" is not a 5.0 tone; now a plain Tag`;
  if (variant === 'solid')
    return `${color}/solid has no filled 5.0 Tag; now tone="${r.tone}" (soft)`;
  if (variant === 'outline')
    return `${color}/outline has no outlined 5.0 Tag; now a plain Tag — tone="${color}"?`;
  return `variant="${variant}" is not a Tag variant; now a plain Tag`;
};

/**
 * Chip.tsx renders its Tag with a pill shape so an unmigrated screen does not
 * shift; a migrated <Chip> keeps it. `xl` is the 32px radius token. A prop the
 * call site already sets (or a shorthand covering it) is left alone, and the
 * shape goes first, before any spread, as in Chip.tsx.
 */
const CHIP_SHAPE = [
  ['borderRadius', 'xl', ['borderRadius', 'rounded']],
  ['px', 3, ['px', 'paddingX', 'paddingInline', 'p', 'padding']],
  ['py', 2, ['py', 'paddingY', 'paddingBlock', 'p', 'padding']],
  ['fontWeight', 'medium', ['fontWeight']],
];

const addChipShape = (j, opening) => {
  const set = (opening.attributes || [])
    .filter((a) => a.type === 'JSXAttribute')
    .map((a) => a.name && a.name.name);
  const add = [];
  for (const [name, value, covers] of CHIP_SHAPE) {
    if (covers.some((c) => set.includes(c))) continue;
    add.push(
      typeof value === 'number'
        ? j.jsxAttribute(
            j.jsxIdentifier(name),
            j.jsxExpressionContainer(j.numericLiteral(value))
          )
        : stringAttr(j, name, value)
    );
  }
  opening.attributes = [...add, ...(opening.attributes || [])];
  return add.length > 0;
};

function migrateTag(j, file, reporter, opening, fromChip) {
  const label = fromChip
    ? `${componentLabel(opening)} (was Chip)`
    : componentLabel(opening);
  const shaped = fromChip && addChipShape(j, opening);
  const cp = readAttr(opening, 'colorPalette');
  const cs = readAttr(opening, 'colorScheme');
  const v = readAttr(opening, 'variant');
  const line = lineOf(opening);

  const sp = spreads(opening);
  if (sp.length) {
    reporter.site({
      line,
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
    return shaped;
  }
  if (cp.kind === 'absent' && cs.kind === 'absent' && v.kind === 'absent')
    return shaped;

  const stat = (a) => (a.kind === 'static' ? a.value : undefined);
  // What the runtime reads: Chip → colorScheme ?? colorPalette ?? 'primary';
  // Tag → colorPalette only (a colorScheme on a Tag never reached the mapping).
  const palette = fromChip ? (stat(cs) ?? stat(cp) ?? 'primary') : stat(cp);
  const variant = stat(v);
  const r = mapLegacy(palette, variant);
  const color = palette == null ? 'neutral' : palette;
  const shownVariant = variant == null ? 'soft' : variant;

  let todo = r.needsHuman ? todoFor(color, shownVariant, r) : null;
  if (!fromChip && cs.kind === 'static' && cp.kind === 'absent') {
    const note = `colorScheme="${cs.value}" was ignored by Tag (it reads colorPalette); removed`;
    todo = todo ? `${todo}; ${note}` : note;
  }

  const index = removeAttrs(opening, [
    'colorPalette',
    'colorScheme',
    'variant',
  ]);
  const at = index < 0 ? 0 : index;
  let anchor = null;
  // An explicit tone / selected wins over the mapping (Tag.tsx: `tone ??=`).
  if (r.tone !== 'neutral' && !hasAttr(opening, 'tone'))
    anchor = insertAttr(opening, stringAttr(j, 'tone', r.tone), at);
  if (r.selected && !hasAttr(opening, 'selected')) {
    anchor = insertAttr(opening, boolAttr(j, 'selected'), at);
    // The runtime mapping gives the selected *look* only; an explicit
    // `selected` prop also makes the tag a toggle (hover, pointer,
    // aria-pressed on a button) — Tag.tsx. No public prop gives the look
    // without that, so a human confirms it.
    reporter.site({
      line,
      component: label,
      prop: 'selected',
      kind: 'selected',
      note: `${color}/${shownVariant} → selected, which also makes the tag interactive (hover, pointer) — confirm it is a toggle`,
      source: `<${label} ${color}/${shownVariant}>`,
    });
  }
  if (todo) {
    addTodo(
      j,
      opening,
      todo,
      anchor || opening.attributes[at] || opening.attributes[0]
    );
    reporter.site({
      line,
      component: label,
      prop: 'colorPalette+variant',
      kind: 'todo',
      note: todo,
      source: `<${label} ${color}/${shownVariant}>`,
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
module.exports.mapLegacy = mapLegacy;
