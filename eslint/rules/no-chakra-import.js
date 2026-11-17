/**
 * logician-ui/no-chakra-import
 *
 * Disallows importing from `@chakra-ui/react` directly. Everything a consumer
 * needs comes from `@mindlogic-ai/logician-ui`:
 *
 *  - names logician-ui implements itself (Text, Button, Popover, Tabs, …) —
 *    importing the Chakra one silently bypasses the design system;
 *  - raw Chakra pass-throughs (Box, Flex, Stack, useDisclosure, …) that
 *    logician-ui re-exports unchanged from src/chakra.ts;
 *  - anything else has no DS export yet: add it to the pass-through list or
 *    use the DS equivalent.
 *
 * The name sets are read from eslint/logician-exports.json, which
 * scripts/eslint/generate-exports.cjs generates from src/index.ts with the
 * TypeScript checker; `yarn check-exports` fails if it is stale.
 *
 * Type imports (`import type { X }`, `import { type X }`, or a plain
 * `import { X }` of a name Chakra exports only as a type) are reported only
 * when logician-ui exports that name; a Chakra type with no logician export
 * (e.g. `TabsListProps`) is left alone.
 *
 * Options: [{ allow: string[] }] — glob patterns (`*`, `**`, `?`) of files
 * where direct Chakra imports are fine: the theme, the provider, test support.
 * Matched against the path relative to the ESLint cwd (and the absolute path).
 *
 *   'logician/no-chakra-import': ['error', {
 *     allow: ['src/theme/**', 'src/providers/**', 'src/test-support/**'],
 *   }]
 */
'use strict';

const path = require('path');

const data = require('../logician-exports.json');

const SOURCE = '@chakra-ui/react';
const PKG = '@mindlogic-ai/logician-ui';

const OWN = new Set([...data.own.values, ...data.own.types]);
const PASS = new Set([...data.passthrough.values, ...data.passthrough.types]);
// Chakra's type-only exports, so `import { TabsListProps }` (no `type`
// keyword) is still recognised as a type import.
const CHAKRA_TYPES = new Set(data.chakraTypes || []);

/**
 * Chakra names with a DS equivalent under a different name. Checked against
 * the generated sets at load time: a hint pointing at a name logician-ui no
 * longer exports would be worse than none.
 */
const HINTS = {
  Dialog: ['Modal'],
  Field: ['FieldRow', 'FormControl'],
  NativeSelect: ['Select'],
  ProgressCircle: ['RadialProgress'],
};
for (const [from, to] of Object.entries(HINTS)) {
  for (const t of to) {
    if (!OWN.has(t)) {
      throw new Error(
        `no-chakra-import: hint ${from} → ${t} names something logician-ui does not export`
      );
    }
  }
}
const formatHint = (names) => names.map((n) => `\`${n}\``).join(' / ');

function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        // `**/` matches zero or more directories; a trailing `**` matches anything.
        if (glob[i + 2] === '/') {
          re += '(?:.*/)?';
          i += 2;
        } else {
          re += '.*';
          i += 1;
        }
      } else {
        re += '[^/]*';
      }
    } else if (c === '?') {
      re += '[^/]';
    } else {
      re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
    }
  }
  return new RegExp(`^${re}$`);
}

const toPosix = (p) => p.split(path.sep).join('/');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `Disallow importing from ${SOURCE} directly; import from ${PKG}`,
      url: 'https://github.com/mindlogic-ai/logician-ui/blob/dev/src/chakra.ts',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      own: '`{{name}}` from @chakra-ui/react bypasses the design system: use `{{name}}` from @mindlogic-ai/logician-ui.',
      passthrough:
        'import `{{name}}` from @mindlogic-ai/logician-ui (re-exported), not @chakra-ui/react.',
      passthroughHint:
        'import `{{name}}` from @mindlogic-ai/logician-ui (re-exported), not @chakra-ui/react — or use the DS {{hint}} instead.',
      mapped:
        'no DS export for `{{name}}`: use {{hint}} from @mindlogic-ai/logician-ui instead.',
      missing:
        "no DS export for `{{name}}`: add it to logician-ui's pass-through list (src/chakra.ts) or use the DS equivalent.",
      namespace:
        "don't import @chakra-ui/react as a whole: import the names you need from @mindlogic-ai/logician-ui.",
    },
  },
  create(context) {
    const opts = context.options[0] || {};
    const allow = (opts.allow || []).map(globToRegExp);
    if (allow.length) {
      const filename = context.filename || context.getFilename();
      const cwd =
        context.cwd || (context.getCwd && context.getCwd()) || process.cwd();
      const abs = toPosix(path.resolve(cwd, filename));
      const rel = toPosix(path.relative(cwd, abs));
      if (allow.some((re) => re.test(rel) || re.test(abs))) return {};
    }

    const reportName = (node, name, isType) => {
      if (OWN.has(name)) {
        context.report({ node, messageId: 'own', data: { name } });
      } else if (PASS.has(name)) {
        if (HINTS[name]) {
          context.report({
            node,
            messageId: 'passthroughHint',
            data: { name, hint: formatHint(HINTS[name]) },
          });
        } else {
          context.report({ node, messageId: 'passthrough', data: { name } });
        }
      } else if (isType || CHAKRA_TYPES.has(name)) {
        // A Chakra type logician-ui does not re-export: nothing to switch to.
      } else if (HINTS[name]) {
        context.report({
          node,
          messageId: 'mapped',
          data: { name, hint: formatHint(HINTS[name]) },
        });
      } else {
        context.report({ node, messageId: 'missing', data: { name } });
      }
    };

    const nameOf = (id) => (id.type === 'Literal' ? String(id.value) : id.name);

    return {
      ImportDeclaration(node) {
        if (node.source.value !== SOURCE) return;
        const declType = node.importKind === 'type';
        if (node.specifiers.length === 0) {
          // `import '@chakra-ui/react'` — a side-effect import; nothing to rename.
          return;
        }
        for (const spec of node.specifiers) {
          if (spec.type === 'ImportSpecifier') {
            reportName(
              spec,
              nameOf(spec.imported),
              declType || spec.importKind === 'type'
            );
          } else if (!declType) {
            // default or namespace import
            context.report({ node: spec, messageId: 'namespace' });
          }
        }
      },
      ExportNamedDeclaration(node) {
        if (!node.source || node.source.value !== SOURCE) return;
        const declType = node.exportKind === 'type';
        for (const spec of node.specifiers) {
          reportName(
            spec,
            nameOf(spec.local),
            declType || spec.exportKind === 'type'
          );
        }
      },
      ExportAllDeclaration(node) {
        if (node.source.value !== SOURCE || node.exportKind === 'type') return;
        context.report({ node, messageId: 'namespace' });
      },
    };
  },
};
