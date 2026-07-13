import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormSectionHeader } from './FormSectionHeader';

// Stub the layout chrome and typography so the test asserts FormSectionHeader's
// own conditional slots (title / adornment / description / action), not
// Chakra/logician internals.
vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  Flex: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/Typography', () => ({
  H5: ({ children }: { children?: ReactNode }) => <h5>{children}</h5>,
  Subtext: ({ children }: { children?: ReactNode }) => (
    <span data-testid="description">{children}</span>
  ),
}));

describe('FormSectionHeader', () => {
  it('renders the title as a heading with a description below it', () => {
    render(
      <FormSectionHeader
        title="Collaboration"
        description="Grant access to work on this assistant."
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Collaboration' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('description')).toHaveTextContent(
      'Grant access to work on this assistant.'
    );
  });

  it('renders the inline title adornment next to the heading', () => {
    render(
      <FormSectionHeader
        title="Files"
        titleAdornment={<span data-testid="sprinkle">i</span>}
      />
    );
    expect(screen.getByRole('heading', { name: 'Files' })).toBeInTheDocument();
    expect(screen.getByTestId('sprinkle')).toBeInTheDocument();
  });

  it('renders the right-aligned action', () => {
    render(
      <FormSectionHeader
        title="Connectors"
        action={<button type="button">Add</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('omits the heading row entirely when there is no title or adornment', () => {
    render(<FormSectionHeader description="Standalone description." />);
    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.getByTestId('description')).toHaveTextContent(
      'Standalone description.'
    );
  });

  it('renders a bare heading with no description when none is given', () => {
    render(<FormSectionHeader title="Visibility" />);
    expect(
      screen.getByRole('heading', { name: 'Visibility' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('description')).toBeNull();
  });
});
