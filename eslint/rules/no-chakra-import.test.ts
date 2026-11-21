/**
 * RuleTester suite for logician-ui/no-chakra-import, plus the drift check
 * between eslint/logician-exports.json and the package's real exports.
 *
 * Run: npx vitest run --config codemods/vitest.config.ts
 */
import { createRequire } from 'module';
import path from 'path';
import { afterAll, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const { RuleTester } = require('eslint');
const rule = require('./no-chakra-import');
const data = require('../logician-exports.json');

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

const own = (name: string) => ({ messageId: 'own', data: { name } });
const pass = (name: string) => ({ messageId: 'passthrough', data: { name } });
const missing = (name: string) => ({ messageId: 'missing', data: { name } });
const mapped = (name: string, hint: string) => ({
  messageId: 'mapped',
  data: { name, hint },
});

const cwd = process.cwd();
const file = (rel: string) => path.join(cwd, rel);
const allow = [
  { allow: ['src/theme/**', '**/test-support/**', 'src/providers/*.tsx'] },
];

tester.run('no-chakra-import', rule, {
  valid: [
    "import { Box, Flex, Text } from '@mindlogic-ai/logician-ui';",
    "import { css } from '@emotion/react';",
    "import { Box } from '@chakra-ui/react-other';",
    // Type-only import of a Chakra type logician-ui does not export
    "import type { TabsListProps } from '@chakra-ui/react';",
    "import { type InputGroupProps } from '@chakra-ui/react';",
    "export type { TabsListProps } from '@chakra-ui/react';",
    // ...also without the `type` keyword: Chakra exports it only as a type
    "import { TabsListProps, InputGroupProps } from '@chakra-ui/react';",
    "export type * from '@chakra-ui/react';",
    // Side-effect import: nothing to rename
    "import '@chakra-ui/react';",
    // allow globs
    {
      code: "import { ChakraProvider, createSystem } from '@chakra-ui/react';",
      filename: file('src/theme/system.ts'),
      options: allow,
    },
    {
      code: "import { Box } from '@chakra-ui/react';",
      filename: file('src/app/test-support/render.tsx'),
      options: allow,
    },
    {
      code: "import { ChakraProvider } from '@chakra-ui/react';",
      filename: file('src/providers/Providers.tsx'),
      options: allow,
    },
  ],
  invalid: [
    // A name logician-ui implements itself
    {
      code: "import { Text, Button } from '@chakra-ui/react';",
      errors: [own('Text'), own('Button')],
    },
    {
      code: "import type { TextProps } from '@chakra-ui/react';",
      errors: [own('TextProps')],
    },
    // Pass-through names
    {
      code: "import { Box, Flex, useDisclosure, chakra } from '@chakra-ui/react';",
      errors: [
        pass('Box'),
        pass('Flex'),
        pass('useDisclosure'),
        pass('chakra'),
      ],
    },
    {
      code: "import type { BoxProps } from '@chakra-ui/react';",
      errors: [pass('BoxProps')],
    },
    {
      code: "import { type FlexProps, Stack as S } from '@chakra-ui/react';",
      errors: [pass('FlexProps'), pass('Stack')],
    },
    {
      code: "import { ProgressCircle } from '@chakra-ui/react';",
      errors: [
        {
          messageId: 'passthroughHint',
          data: { name: 'ProgressCircle', hint: '`RadialProgress`' },
        },
      ],
    },
    // Mapped DS equivalents
    {
      code: "import { Dialog, Field, NativeSelect } from '@chakra-ui/react';",
      errors: [
        mapped('Dialog', '`Modal`'),
        mapped('Field', '`FieldRow` / `FormControl`'),
        mapped('NativeSelect', '`Select`'),
      ],
    },
    // No DS export at all
    {
      code: "import { ChakraProvider, Icon } from '@chakra-ui/react';",
      errors: [missing('ChakraProvider'), missing('Icon')],
    },
    // allow globs only exempt matching files
    {
      code: "import { Box } from '@chakra-ui/react';",
      filename: file('src/app/page.tsx'),
      options: allow,
      errors: [pass('Box')],
    },
    {
      code: "import { ChakraProvider } from '@chakra-ui/react';",
      filename: file('src/providers/nested/Providers.tsx'),
      options: allow,
      errors: [missing('ChakraProvider')],
    },
    // Whole-module imports and re-exports
    {
      code: "import * as C from '@chakra-ui/react';",
      errors: [{ messageId: 'namespace' }],
    },
    {
      code: "export * from '@chakra-ui/react';",
      errors: [{ messageId: 'namespace' }],
    },
    {
      code: "export { Box, Text } from '@chakra-ui/react';",
      errors: [pass('Box'), own('Text')],
    },
  ],
});

describe('logician-exports.json', () => {
  it('is up to date with src/index.ts and src/chakra.ts', () => {
    const {
      checked,
      generate,
    } = require('../../scripts/eslint/generate-exports.cjs');
    expect(checked(data)).toEqual(checked(generate()));
  });

  it('records Chakra type-only names so unmarked type imports are not reported', () => {
    expect(data.chakraTypes).toContain('TabsListProps');
    expect(data.chakraTypes).not.toContain('Box');
  });

  it('keeps pass-through and own sets disjoint', () => {
    const ownNames = new Set([...data.own.values, ...data.own.types]);
    const overlap = [
      ...data.passthrough.values,
      ...data.passthrough.types,
    ].filter((n: string) => ownNames.has(n));
    expect(overlap).toEqual([]);
  });

  it('never passes through names with a DS equivalent or theme/provider bits', () => {
    const passNames = new Set([
      ...data.passthrough.values,
      ...data.passthrough.types,
    ]);
    for (const n of [
      'Dialog',
      'Field',
      'NativeSelect',
      'ChakraProvider',
      'createSystem',
      'defaultConfig',
      'defineConfig',
      'mergeConfigs',
      'defaultSystem',
    ]) {
      expect(passNames.has(n), n).toBe(false);
    }
  });
});
