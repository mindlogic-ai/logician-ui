/**
 * logician-ui/no-deprecated-tokens
 *
 * Warns on 4.x colour token names that 5.0 keeps only as deprecated aliases
 * (`primary.lightest`, `danger.main`, `slate.800`, `var(--chakra-colors-slate-300)` …)
 * and on the 4.x raw primitives 5.0 removed (`blue.500`, `gray.300`, …), and
 * names the replacement. The aliases are removed in 6.0.
 *
 * The mapping is read from src/theme/deprecatedColorTokens.json — the same
 * file the theme builds its aliases from and the 5.0 codemod renames with — so
 * the three cannot disagree.
 *
 * Options: [{ removedPrimitives: boolean }] (default true).
 */
'use strict';

const data = require('../../src/theme/deprecatedColorTokens.json');

const ALIASES = data.aliases;
const GRAY = data.removedPrimitives.gray;
const FAMILIES = data.removedPrimitives.families;

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const keys = Object.keys(ALIASES).sort((a, b) => b.length - a.length);
const dotted = keys.map(esc).join('|');
const dashed = keys.map((k) => esc(k.replace(/\./g, '-'))).join('|');
// A name must not be part of a longer path: `primary.light` ≠ `primary.lighter`,
// `slate.100` ≠ `slate.1000`, `fg.default` is not touched.
const ALIAS_RE = new RegExp(
  `(?<![\\w.-])(${dotted})(?![\\w-])|--chakra-colors-(${dashed})(?![\\w-])`,
  'g'
);
const PRIMITIVE_RE = new RegExp(
  `(?<![\\w.-])(${FAMILIES.map(esc).join('|')})\\.(\\d+)(?![\\w.-])|--chakra-colors-(${FAMILIES.map(
    esc
  ).join('|')})-(\\d+)(?![\\w-])`,
  'g'
);

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow logician-ui 4.x colour token names that are deprecated or removed in 5.0',
      url: 'https://github.com/mindlogic-ai/logician-ui/blob/dev/MIGRATION-5.0.md',
    },
    schema: [
      {
        type: 'object',
        properties: { removedPrimitives: { type: 'boolean' } },
        additionalProperties: false,
      },
    ],
    messages: {
      deprecated:
        "'{{name}}' is a deprecated logician-ui 4.x token (removed in 6.0). Use '{{replacement}}'. Run the 5.0 codemod to migrate.",
      primitive:
        "'{{name}}' is a 4.x raw primitive that logician-ui 5.0 removed — it now falls through to Chakra's default palette. {{hint}}",
    },
  },
  create(context) {
    const opts = context.options[0] || {};
    const checkPrimitives = opts.removedPrimitives !== false;

    const check = (node, text) => {
      if (typeof text !== 'string' || text.length === 0) return;
      for (const m of text.matchAll(ALIAS_RE)) {
        const key = m[1] || keys.find((k) => k.replace(/\./g, '-') === m[2]);
        const replacement = m[1]
          ? ALIASES[key]
          : `var(--chakra-colors-${ALIASES[key].replace(/\./g, '-')})`;
        context.report({
          node,
          messageId: 'deprecated',
          data: { name: m[0], replacement },
        });
      }
      if (!checkPrimitives) return;
      for (const m of text.matchAll(PRIMITIVE_RE)) {
        const family = m[1] || m[3];
        const step = m[2] || m[4];
        const hint =
          family === 'gray' && GRAY[step]
            ? `Use '${GRAY[step]}'.`
            : 'Use a semantic token (primary.*, neutral.N, a status family, category.*) — see MIGRATION-5.0.md.';
        context.report({
          node,
          messageId: 'primitive',
          data: { name: m[0], hint },
        });
      }
    };

    return {
      Literal(node) {
        // Type-level unions (`type T = 'slate.800' | …`) are not style usages.
        if (node.parent && node.parent.type === 'TSLiteralType') return;
        if (typeof node.value === 'string') check(node, node.value);
      },
      TemplateElement(node) {
        const p = node.parent && node.parent.parent;
        if (p && p.type === 'TSLiteralType') return;
        check(node, node.value && node.value.cooked);
      },
    };
  },
};
