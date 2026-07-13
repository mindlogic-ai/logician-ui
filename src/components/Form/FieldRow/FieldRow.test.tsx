import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FieldRow } from './FieldRow';

// Expose the `invalid` value FieldRow computes onto the DOM so the derivation
// (error -> invalid, with an explicit `invalid` override winning) is assertable
// without a full Chakra Field/provider render. FieldRow now composes its label
// out of the design system's own FormControl/FormLabel/Typography modules, so
// mock those directly.
vi.mock('@/components/FormControl', () => ({
  FormControl: ({
    children,
    invalid,
  }: {
    children?: ReactNode;
    invalid?: boolean;
  }) => <div data-invalid={String(Boolean(invalid))}>{children}</div>,
}));

vi.mock('@/components/FormLabel', () => ({
  FormLabel: ({ children }: { children?: ReactNode }) => (
    <label>{children}</label>
  ),
}));

vi.mock('@/components/Typography', () => ({
  Subtext: ({ children }: { children?: ReactNode }) => <span>{children}</span>,
}));

vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  Flex: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  Field: {
    HelperText: ({ children }: { children?: ReactNode }) => (
      <p data-testid="helper">{children}</p>
    ),
    ErrorText: ({ children }: { children?: ReactNode }) => (
      <p data-testid="error">{children}</p>
    ),
  },
}));

const control = <input aria-label="name" />;

describe('FieldRow', () => {
  it('renders label, control, helper and error slots', () => {
    render(
      <FieldRow label="Display name" helperText="Up to 40 chars" error="Nope">
        {control}
      </FieldRow>,
    );
    expect(screen.getByText('Display name')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByTestId('helper')).toHaveTextContent('Up to 40 chars');
    expect(screen.getByTestId('error')).toHaveTextContent('Nope');
  });

  it('flips the field to invalid when an error is set', () => {
    const { container } = render(
      <FieldRow label="Name" error="Required">
        {control}
      </FieldRow>,
    );
    expect(container.querySelector('[data-invalid="true"]')).not.toBeNull();
  });

  it('is not invalid without an error', () => {
    const { container } = render(<FieldRow label="Name">{control}</FieldRow>);
    expect(container.querySelector('[data-invalid="false"]')).not.toBeNull();
    expect(screen.queryByTestId('error')).toBeNull();
  });

  it('lets an explicit invalid prop win over the error-derived value', () => {
    const { container } = render(
      <FieldRow label="Name" error="Required" invalid={false}>
        {control}
      </FieldRow>,
    );
    expect(container.querySelector('[data-invalid="false"]')).not.toBeNull();
  });

  it('omits the label row when there is no label or adornment', () => {
    const { container } = render(<FieldRow>{control}</FieldRow>);
    expect(container.querySelector('label')).toBeNull();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
  });
});
