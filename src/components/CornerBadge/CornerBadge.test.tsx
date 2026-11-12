import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { CornerBadge } from './CornerBadge';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('CornerBadge', () => {
  it('renders the icon and floats the badge in the same span', () => {
    wrap(
      <CornerBadge count={3} data-testid="b">
        <svg data-testid="icon" />
      </CornerBadge>
    );
    const icon = screen.getByTestId('icon');
    const badge = screen.getByTestId('b');
    expect(badge.textContent).toBe('3');
    expect(icon.parentElement?.tagName).toBe('SPAN');
    expect(icon.parentElement?.contains(badge)).toBe(true);
    // badge → Float span → wrapper span
    expect(badge.parentElement?.tagName).toBe('SPAN');
    expect(badge.parentElement?.parentElement).toBe(icon.parentElement);
  });

  it('keeps the icon and drops the badge at count 0', () => {
    const { container } = wrap(
      <CornerBadge count={0}>
        <svg data-testid="icon" />
      </CornerBadge>
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(container.querySelector('[data-count-badge]')).toBeNull();
    // The float left empty is hidden by its :empty rule
    const float = screen.getByTestId('icon').nextElementSibling;
    expect(float?.childElementCount).toBe(0);
    const css = Array.from(document.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('\n');
    const emptyRule = new RegExp(
      `\\.${float?.className.split(' ').at(-1)}:is\\(:empty, \\[data-empty\\]\\)\\s*\\{[^}]*display:\\s*none`
    );
    expect(css).toMatch(emptyRule);
  });

  it('keeps the icon and drops the dot when invisible', () => {
    const { container } = wrap(
      <CornerBadge dot invisible>
        <svg data-testid="icon" />
      </CornerBadge>
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(container.querySelector('[data-count-badge]')).toBeNull();
  });

  it('nests no div, so it is valid inside a button', () => {
    const { container } = wrap(
      <button type="button" aria-label="알림, 읽지 않음 3개">
        <CornerBadge count={3}>
          <svg />
        </CornerBadge>
      </button>
    );
    expect(container.querySelector('button div')).toBeNull();
  });
});
