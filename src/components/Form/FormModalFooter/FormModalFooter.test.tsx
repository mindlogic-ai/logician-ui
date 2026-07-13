import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormModalFooter } from './FormModalFooter';

// Surface the Button's type/disabled/loading onto the DOM so behavior is
// testable without a Chakra provider. The copy-agnostic footer owns no
// translations, so labels are passed explicitly by the caller.
vi.mock('@/components/Modal', () => ({
  ModalFooter: ({ children }: { children?: ReactNode }) => (
    <div data-testid="footer">{children}</div>
  ),
}));

vi.mock('@/components/Button', () => ({
  Button: ({
    children,
    onClick,
    type,
    disabled,
    loading,
  }: {
    children?: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
    loading?: boolean;
  }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-loading={loading ? 'true' : 'false'}
    >
      {children}
    </button>
  ),
}));

vi.mock('@/components/Icon', () => ({
  TrashIcon: () => <span data-testid="trash" />,
}));

const noop = () => {};

describe('FormModalFooter', () => {
  it('renders a Cancel + submit pair with the given labels', () => {
    render(
      <FormModalFooter
        onCancel={noop}
        onSubmit={noop}
        cancelLabel="Cancel"
        submitLabel="Save"
      />,
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    // No delete button unless onDelete is provided.
    expect(screen.queryByTestId('trash')).not.toBeInTheDocument();
  });

  it('routes cancel and submit clicks to their handlers', () => {
    const onCancel = vi.fn();
    const onSubmit = vi.fn();
    render(
      <FormModalFooter
        onCancel={onCancel}
        onSubmit={onSubmit}
        cancelLabel="Cancel"
        submitLabel="Save"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('is a type="submit" button inside a form (no onSubmit), type="button" with onSubmit', () => {
    const { rerender } = render(
      <FormModalFooter onCancel={noop} cancelLabel="Cancel" submitLabel="Save" />,
    );
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'submit',
    );
    rerender(
      <FormModalFooter
        onCancel={noop}
        onSubmit={noop}
        cancelLabel="Cancel"
        submitLabel="Save"
      />,
    );
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('renders the standard delete button and routes its click', () => {
    const onDelete = vi.fn();
    render(
      <FormModalFooter
        onCancel={noop}
        onSubmit={noop}
        cancelLabel="Cancel"
        submitLabel="Save"
        onDelete={onDelete}
        deleteLabel="Delete"
      />,
    );
    expect(screen.getByTestId('trash')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Delete/ }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('disables every button and shows the submit spinner while submitting', () => {
    render(
      <FormModalFooter
        onCancel={noop}
        onSubmit={noop}
        cancelLabel="Cancel"
        submitLabel="Save"
        onDelete={noop}
        deleteLabel="Delete"
        isSubmitting
      />,
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Delete/ })).toBeDisabled();
    const submit = screen.getByRole('button', { name: 'Save' });
    expect(submit).toBeDisabled();
    expect(submit).toHaveAttribute('data-loading', 'true');
  });

  it('disables only the submit button when submitDisabled is set', () => {
    render(
      <FormModalFooter
        onCancel={noop}
        onSubmit={noop}
        cancelLabel="Cancel"
        submitLabel="Save"
        submitDisabled
      />,
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).not.toBeDisabled();
  });
});
