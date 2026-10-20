import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormSection } from './FormSection';

// Stub the layout chrome and the collapsible delegate so the test asserts the
// flat-vs-collapsible branching and prop forwarding, not logician internals.
vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  Flex: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  VStack: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/Typography', () => ({
  H5: ({ children }: { children?: ReactNode }) => <h5>{children}</h5>,
  Subtext: ({ children }: { children?: ReactNode }) => <span>{children}</span>,
}));

vi.mock('@/components/Workflow', () => ({
  CollapsibleSection: ({
    label,
    hasError,
    children,
  }: {
    label: string;
    hasError?: boolean;
    children?: ReactNode;
  }) => (
    <div
      data-testid="collapsible"
      data-label={label}
      data-haserror={String(Boolean(hasError))}
    >
      {children}
    </div>
  ),
}));

describe('FormSection', () => {
  it('renders a flat section with title, description and children by default', () => {
    render(
      <FormSection title="Profile" description="How it introduces itself.">
        <div>field</div>
      </FormSection>
    );
    expect(
      screen.getByRole('heading', { name: 'Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('How it introduces itself.')).toBeInTheDocument();
    expect(screen.getByText('field')).toBeInTheDocument();
    expect(screen.queryByTestId('collapsible')).toBeNull();
  });

  it('delegates to CollapsibleSection when collapsible, forwarding title and hasError', () => {
    render(
      <FormSection title="Behavior" collapsible hasError>
        <div>field</div>
      </FormSection>
    );
    const collapsible = screen.getByTestId('collapsible');
    expect(collapsible).toHaveAttribute('data-label', 'Behavior');
    expect(collapsible).toHaveAttribute('data-haserror', 'true');
    expect(screen.getByText('field')).toBeInTheDocument();
  });

  it('stays flat when collapsible is set without a title', () => {
    render(
      <FormSection collapsible>
        <div>field</div>
      </FormSection>
    );
    expect(screen.queryByTestId('collapsible')).toBeNull();
    expect(screen.getByText('field')).toBeInTheDocument();
  });

  it('renders the inline title adornment in the flat section', () => {
    render(
      <FormSection
        title="Files"
        titleAdornment={<span data-testid="sprinkle">i</span>}
      >
        <div>field</div>
      </FormSection>
    );
    expect(screen.getByRole('heading', { name: 'Files' })).toBeInTheDocument();
    expect(screen.getByTestId('sprinkle')).toBeInTheDocument();
  });
});
