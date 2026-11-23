import { defaultSystem } from '@chakra-ui/react';
import { describe, expect, it } from 'vitest';

import { globalCss } from './global';
import { system } from './index';

/** R30 2nd-round QA #8: italic placeholders, colour untouched. */
describe('placeholder style', () => {
  it('native ::placeholder is italic globally', () => {
    expect(globalCss['*::placeholder']).toEqual({ fontStyle: 'italic' });
  });

  it('does not target [data-placeholder] or other non-native placeholders', () => {
    for (const selector of Object.keys(globalCss)) {
      expect(selector).not.toMatch(/data-placeholder|placeholder\]/);
    }
  });

  it('Select empty value is italic, colour still Chakra’s', () => {
    const shipped = system.getSlotRecipe('select').base?.trigger as Record<
      string,
      any
    >;
    const chakra = defaultSystem.getSlotRecipe('select').base
      ?.trigger as Record<string, any>;
    expect(shipped._placeholderShown).toMatchObject({
      '& [data-part=value-text]': { fontStyle: 'italic' },
    });
    // Only the value text slants — never the trigger itself.
    expect(shipped._placeholderShown.fontStyle).toBeUndefined();
    expect(shipped._placeholderShown.color).toBe(
      chakra._placeholderShown.color
    );
  });
});
