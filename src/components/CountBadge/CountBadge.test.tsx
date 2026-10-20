import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
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
});
