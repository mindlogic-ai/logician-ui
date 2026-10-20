/**
 * RuleTester suite for logician-ui/no-deprecated-tokens.
 *
 * Run: npx vitest run --config codemods/vitest.config.ts
 * (that config includes eslint/**\/*.test.ts — Node-only, like the codemods).
 */
import { createRequire } from 'module';
import { afterAll, describe, it } from 'vitest';

const require = createRequire(import.meta.url);
const { RuleTester } = require('eslint');
const rule = require('./no-deprecated-tokens');

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.afterAll = afterAll;

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
});

const deprecated = (name: string, replacement: string) => ({
  messageId: 'deprecated',
  data: { name, replacement },
});

tester.run('no-deprecated-tokens', rule, {
  valid: [
    // 5.0 names
    "const a = 'primary.wash';",
    "const a = 'var(--chakra-colors-primary-wash-active)';",
    "const a = '{colors.success.solid}';",
    // Neighbours that only look like a deprecated name
    "const a = 'primary.lighter2';",
    "const a = 'slate.8000';",
    "const a = 'foo.primary.light';",
    "const a = 'theme.colors.primary.light';",
    "const a = 'x colors.primary.light';",
    "const a = 'var(--chakra-colors-slate-3000)';",
    "const a = 'fg.default';",
    // Type-level literals are not style usages
    "type T = 'slate.800' | 'primary.light';",
    'type T = `primary.lighter`;',
    // removedPrimitives: false turns primitive warnings off
    { code: "const a = 'blue.500';", options: [{ removedPrimitives: false }] },
  ],
  invalid: [
    {
      code: "const a = 'primary.lightest';",
      errors: [deprecated('primary.lightest', 'primary.wash')],
    },
    {
      code: '<Box bg="slate.800" />',
      errors: [deprecated('slate.800', 'neutral.9')],
    },
    // Dashed CSS variable: matched kebab-case, replacement suggested kebab-case
    {
      code: "const a = 'var(--chakra-colors-primary-lighter)';",
      errors: [
        deprecated(
          '--chakra-colors-primary-lighter',
          'var(--chakra-colors-primary-wash-active)'
        ),
      ],
    },
    {
      code: "const a = 'var(--chakra-colors-primary-fill-strong)';",
      errors: [
        deprecated(
          '--chakra-colors-primary-fill-strong',
          'var(--chakra-colors-primary-hover)'
        ),
      ],
    },
    // Chakra token references with a colors. prefix keep the prefix
    {
      code: "const a = '{colors.success.main}';",
      errors: [deprecated('colors.success.main', 'colors.success.solid')],
    },
    {
      code: "const a = 'color-mix(in oklab, {colors.warning.fill} 70%, black)';",
      errors: [deprecated('colors.warning.fill', 'colors.warning.solid')],
    },
    {
      code: "const a = token('colors.danger.main');",
      errors: [deprecated('colors.danger.main', 'colors.danger.solid')],
    },
    {
      code: "const a = '{colors.grayDark.200}';",
      errors: [{ messageId: 'primitive' }],
    },
    {
      code: "const a = 'var(--chakra-colors-gray-dark-200)';",
      errors: [{ messageId: 'primitive' }],
    },
    {
      code: "const a = '{colors.gray.300}';",
      errors: [
        {
          messageId: 'primitive',
          data: {
            name: 'colors.gray.300',
            hint: "Use 'colors.neutral.5'.",
          },
        },
      ],
    },
    // Template literal quasis
    {
      code: 'const a = `1px solid var(--chakra-colors-slate-300) ${x} {colors.danger.main}`;',
      errors: [
        deprecated(
          '--chakra-colors-slate-300',
          'var(--chakra-colors-neutral-5)'
        ),
        deprecated('colors.danger.main', 'colors.danger.solid'),
      ],
    },
    {
      code: "const a = 'blue.500';",
      errors: [{ messageId: 'primitive' }],
    },
  ],
});
