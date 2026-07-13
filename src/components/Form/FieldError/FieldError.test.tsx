import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FieldError } from './FieldError';

// Field.ErrorText needs a Field.Root + invalid context to render; stub it to a
// passthrough so the test isolates FieldError's own null-when-empty guard.
vi.mock('@chakra-ui/react', () => ({
  Field: {
    ErrorText: ({ children }: { children?: ReactNode }) => (
      <span data-testid="error-text">{children}</span>
    ),
  },
}));

describe('FieldError', () => {
  it('renders nothing when empty (safe to mount unconditionally)', () => {
    const { rerender } = render(<FieldError />);
    expect(screen.queryByTestId('error-text')).toBeNull();

    rerender(<FieldError>{''}</FieldError>);
    expect(screen.queryByTestId('error-text')).toBeNull();

    rerender(<FieldError>{false}</FieldError>);
    expect(screen.queryByTestId('error-text')).toBeNull();
  });

  it('renders the message when present', () => {
    render(<FieldError>Display name is required.</FieldError>);
    expect(screen.getByText('Display name is required.')).toBeInTheDocument();
  });
});
