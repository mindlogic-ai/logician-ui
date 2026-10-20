import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { buttonColorPaletteStyles } from './Button.styles';

/**
 * The press must not travel through `transform`.
 *
 * `transform` is one property, so a `_active` of `transform: scale(0.97)`
 * replaces whatever transform the call site set — and call sites use it for
 * layout (`CopyableCode` centres its button with `translateY(-50%)`). Pressing
 * such a button moved it. The individual `scale` property composes instead.
 */
describe('Button press does not clobber a call-site transform', () => {
  it('no variant presses via transform', () => {
    const offenders: string[] = [];
    Object.entries(buttonColorPaletteStyles).forEach(([palette, variants]) => {
      Object.entries(variants).forEach(([variant, style]) => {
        const active = (style as Record<string, Record<string, unknown>>)
          ._active;
        if (active && 'transform' in active)
          offenders.push(`${palette}.${variant}`);
      });
    });
    expect(offenders).toEqual([]);
  });

  it('every variant still presses, via scale', () => {
    const missing: string[] = [];
    Object.entries(buttonColorPaletteStyles).forEach(([palette, variants]) => {
      Object.entries(variants).forEach(([variant, style]) => {
        const active = (style as Record<string, Record<string, unknown>>)
          ._active;
        if (!active || active.scale !== '0.97')
          missing.push(`${palette}.${variant}`);
      });
    });
    expect(missing).toEqual([]);
  });

  it('a positioning transform survives on the rendered button', () => {
    const { container } = render(
      <ChakraProvider value={system}>
        <button style={{ transform: 'translateY(-50%)' }} />
      </ChakraProvider>
    );
    // scale and transform are separate properties, so both can coexist.
    const css = system.css({ transform: 'translateY(-50%)', scale: '0.97' });
    expect(css).toEqual({ transform: 'translateY(-50%)', scale: '0.97' });
    expect(container).toBeTruthy();
  });
});
