import * as chakraUI from '@chakra-ui/react';
import { describe, expect, it } from 'vitest';

import data from '../eslint/logician-exports.json';
import * as passthrough from './chakra';
import * as root from './index';

const rootExports = root as Record<string, unknown>;
const chakraExports = chakraUI as Record<string, unknown>;
const passExports = passthrough as Record<string, unknown>;

describe('Chakra pass-through re-exports (src/chakra.ts)', () => {
  it('re-exports exactly the allowlist recorded in eslint/logician-exports.json', () => {
    expect(Object.keys(passExports).sort()).toEqual(
      [...data.passthrough.values].sort()
    );
  });

  it.each(data.passthrough.values)(
    '%s resolves from the package root to the Chakra object',
    (name) => {
      expect(
        chakraExports[name],
        `${name} missing from @chakra-ui/react`
      ).toBeDefined();
      expect(passExports[name]).toBe(chakraExports[name]);
      expect(rootExports[name]).toBe(chakraExports[name]);
    }
  );

  it('does not shadow logician components that share a Chakra name', () => {
    for (const name of [
      'Text',
      'Button',
      'Input',
      'Popover',
      'Tabs',
      'Select',
    ]) {
      expect(rootExports[name], name).toBeDefined();
      expect(rootExports[name], name).not.toBe(chakraExports[name]);
    }
  });

  it('does not re-export DS-replaced or theme/provider names', () => {
    for (const name of [
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
      expect(rootExports[name], name).toBeUndefined();
    }
  });
});
