import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { ErrorFallback } from './ErrorFallback';

/**
 * The "try again" button used a hand-rolled `_hover` with `boxShadow: 'lg'`.
 * The focus ring is a box-shadow and Chakra emits `:hover` after
 * `:focus-visible`, so a focused-and-hovered button lost its ring. It now uses
 * Button's `lift`, whose shadow is a `filter`.
 */
const emittedCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('');

const hoverDeclarations = (el: Element) => {
  const cls =
    (el.getAttribute('class') ?? '')
      .split(' ')
      .find((c) => c.startsWith('css-')) ?? '';
  return [
    ...emittedCss().matchAll(new RegExp(`\\.${cls}([^{]*)\\{([^{}]*)\\}`, 'g')),
  ]
    .filter(([, selector]) => selector.includes(':hover'))
    .map(([, , declarations]) => declarations)
    .join(' ');
};

describe('ErrorFallback primary action', () => {
  it('lifts without a hover box-shadow that would hide the focus ring', () => {
    const { container } = render(
      <ChakraProvider value={system}>
        <ErrorFallback error={new Error('boom')} onErrorReset={() => {}} />
      </ChakraProvider>
    );
    const primary = container.querySelector('button[data-variant="primary"]');
    expect(primary).not.toBeNull();
    const hover = hoverDeclarations(primary!);
    expect(hover).toContain('drop-shadow');
    expect(hover).not.toMatch(/box-shadow/);
  });
});
