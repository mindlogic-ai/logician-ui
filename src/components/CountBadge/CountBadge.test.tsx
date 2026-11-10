import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { CountBadge } from '.';
import { CountBadge } from './CountBadge';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('CountBadge', () => {
  it('renders the count as text', () => {
    wrap(<CountBadge count={5} data-testid="b" />);
    expect(screen.getByTestId('b').textContent).toBe('5');
  });

  it('caps above max (default 99) as "99+"', () => {
    wrap(<CountBadge count={120} data-testid="b" />);
    expect(screen.getByTestId('b').textContent).toBe('99+');
  });

  it('honours a custom max', () => {
    wrap(<CountBadge count={12} max={9} data-testid="b" />);
    expect(screen.getByTestId('b').textContent).toBe('9+');
  });

  it('renders nothing for 0 unless showZero', () => {
    const { container } = wrap(<CountBadge count={0} />);
    expect(container.querySelector('[data-count-badge]')).toBeNull();

    wrap(<CountBadge count={0} showZero data-testid="z" />);
    expect(screen.getByTestId('z').textContent).toBe('0');
  });

  it('reads the label instead of the bare number', () => {
    wrap(<CountBadge count={120} label="읽지 않은 알림 120개" />);
    expect(screen.getByText('읽지 않은 알림 120개')).toBeTruthy();
    expect(screen.getByText('99+').getAttribute('aria-hidden')).toBe('true');
  });

  it('dot mode renders a hidden dot with no number', () => {
    wrap(<CountBadge dot count={3} data-testid="d" />);
    const dot = screen.getByTestId('d');
    expect(dot.textContent).toBe('');
    expect(dot.getAttribute('aria-hidden')).toBe('true');
  });

  it('dot mode with a label is a named image', () => {
    wrap(<CountBadge dot label="새 소식" />);
    expect(screen.getByRole('img', { name: '새 소식' })).toBeTruthy();
  });

  it('dot mode hides at count 0', () => {
    const { container } = wrap(<CountBadge dot count={0} />);
    expect(container.querySelector('[data-count-badge]')).toBeNull();
  });

  it('keeps CountBadge as a deprecated alias', () => {
    expect(CountBadge).toBe(CountBadge);
  });

  describe('wrapping an icon (children)', () => {
    it('renders the icon and floats the badge in the same span', () => {
      wrap(
        <CountBadge count={3} data-testid="b">
          <svg data-testid="icon" />
        </CountBadge>
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
        <CountBadge count={0}>
          <svg data-testid="icon" />
        </CountBadge>
      );
      expect(screen.getByTestId('icon')).toBeTruthy();
      expect(container.querySelector('[data-count-badge]')).toBeNull();
    });

    it('keeps the icon and drops the dot when invisible', () => {
      const { container } = wrap(
        <CountBadge dot invisible>
          <svg data-testid="icon" />
        </CountBadge>
      );
      expect(screen.getByTestId('icon')).toBeTruthy();
      expect(container.querySelector('[data-count-badge]')).toBeNull();
    });

    it('nests no div, so it is valid inside a button', () => {
      const { container } = wrap(
        <button type="button" aria-label="알림, 읽지 않음 3개">
          <CountBadge count={3}>
            <svg />
          </CountBadge>
        </button>
      );
      expect(container.querySelector('button div')).toBeNull();
    });
  });

  it('invisible hides an inline badge too', () => {
    const { container } = wrap(<CountBadge count={5} invisible />);
    expect(container.querySelector('[data-count-badge]')).toBeNull();
  });
});
