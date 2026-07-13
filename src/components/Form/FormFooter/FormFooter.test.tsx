import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormFooter } from './FormFooter';

// Surface the layout-driving props (justify / position) onto the DOM so the
// slot layout and sticky behavior are assertable without a Chakra provider.
vi.mock('@chakra-ui/react', () => ({
  Flex: ({
    children,
    justify,
    position,
  }: {
    children?: ReactNode;
    justify?: string;
    position?: string;
  }) => (
    <div data-justify={justify ?? ''} data-position={position ?? ''}>
      {children}
    </div>
  ),
}));

const outer = (container: HTMLElement) => container.firstChild as HTMLElement;

describe('FormFooter', () => {
  it('renders start, meta and action slots', () => {
    render(
      <FormFooter
        start={<button>Delete</button>}
        meta={<span>Updated now</span>}
        action={<button>Save</button>}
      />,
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Updated now')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('justifies space-between when a start slot is present', () => {
    const { container } = render(
      <FormFooter
        start={<button>Delete</button>}
        action={<button>Save</button>}
      />,
    );
    expect(outer(container)).toHaveAttribute('data-justify', 'space-between');
  });

  it('justifies flex-end when there is no start slot (media full-width action)', () => {
    const { container } = render(
      <FormFooter action={<button>Generate</button>} />,
    );
    expect(outer(container)).toHaveAttribute('data-justify', 'flex-end');
  });

  it('is sticky by default and drops sticky when disabled', () => {
    const { container, rerender } = render(
      <FormFooter action={<button>Save</button>} />,
    );
    expect(outer(container)).toHaveAttribute('data-position', 'sticky');

    rerender(<FormFooter action={<button>Save</button>} sticky={false} />);
    expect(outer(container)).toHaveAttribute('data-position', '');
  });
});
