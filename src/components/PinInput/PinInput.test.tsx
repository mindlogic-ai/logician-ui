import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { PinInput } from './PinInput';

/**
 * iOS Safari zooms the page when focus lands on an input under 16px, and
 * `inputmode="number"` is not a valid value, so the phone showed the full text
 * keyboard for a numeric code.
 */
describe('PinInput on mobile', () => {
  const setup = (props: Partial<React.ComponentProps<typeof PinInput>> = {}) =>
    render(
      <ChakraProvider value={system}>
        <PinInput length={4} value="" onChange={() => {}} {...props} />
      </ChakraProvider>
    ).container.querySelectorAll('input');

  it('asks for the numeric keypad', () => {
    setup().forEach((input) =>
      expect(input.getAttribute('inputmode')).toBe('numeric')
    );
  });

  it('keeps the text at 16px so focusing a box does not zoom the page', () => {
    setup().forEach((input) => expect(input.style.fontSize).toBe('16px'));
  });

  it('still lets the call site pick another size', () => {
    setup({ inputStyle: { fontSize: '20px' } }).forEach((input) =>
      expect(input.style.fontSize).toBe('20px')
    );
  });
});
