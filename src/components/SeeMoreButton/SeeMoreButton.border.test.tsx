import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { SeeMoreButton } from './SeeMoreButton';
import { seeMoreButtonStyles } from './SeeMoreButton.styles';

/**
 * SeeMoreButton's only border is a top hairline. Button draws a 1px border on
 * every side and the ghost recipe's `_disabled` makes it transparent, so the
 * "all shown" (disabled) state used to lose the hairline while the other three
 * sides kept invisible 1px borders.
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

const borders = (el: HTMLElement) => {
  const cs = getComputedStyle(el);
  return {
    top: cs.borderTopWidth,
    right: cs.borderRightWidth,
    bottom: cs.borderBottomWidth,
    left: cs.borderLeftWidth,
    topColor: cs.borderTopColor,
  };
};

describe('SeeMoreButton border', () => {
  it.each([
    ['enabled', false],
    ['disabled (all shown)', true],
  ])('%s: top hairline only, divider colour', (_state, disabled) => {
    wrap(<SeeMoreButton currentCount={10} maxCount={10} disabled={disabled} />);
    const b = borders(screen.getByRole('button'));
    expect(b.top).toBe('1px');
    expect(b.right).toBe('0px');
    expect(b.bottom).toBe('0px');
    expect(b.left).toBe('0px');
    expect(b.topColor).toContain('border-subtle');
  });

  it('keeps the hairline colour under _disabled', () => {
    // jsdom does not expand the `border-color` shorthand the ghost recipe's
    // `_disabled` sets, so the colour override is checked on the style object:
    // it must be a top-only longhand, applied after the recipe's shorthand.
    expect(seeMoreButtonStyles._disabled).toEqual({
      borderTopColor: 'border.subtle',
    });
  });
});
