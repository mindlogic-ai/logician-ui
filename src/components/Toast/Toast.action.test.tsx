import { ChakraProvider } from '@chakra-ui/react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { system } from '@/theme';

import { TOAST_ACTION_DURATION, TOAST_DEFAULT_DURATION } from './Toast.styles';
import type { UseToastOptions } from './Toast.types';
import { Toaster, toaster } from './Toaster';
import { useToast } from './useToast';

let showToast: ReturnType<typeof useToast>;

const Harness = () => {
  showToast = useToast();
  return null;
};

const renderToaster = () =>
  render(
    <ChakraProvider value={system}>
      <Toaster />
      <Harness />
    </ChakraProvider>
  );

const fire = (options: UseToastOptions) => {
  let id = '';
  act(() => {
    id = showToast(options);
  });
  return id;
};

afterEach(() => {
  act(() => {
    toaster.remove();
  });
  vi.restoreAllMocks();
});

describe('Toast action', () => {
  it('renders the action as a named button under the description', async () => {
    renderToaster();
    fire({
      status: 'error',
      description: '크레딧이 부족합니다.',
      action: { label: '크레딧 구매', onClick: () => {} },
    });

    const action = await screen.findByRole('button', { name: '크레딧 구매' });
    expect(action).toHaveAttribute('type', 'button');
    // Exactly one action besides the close ×.
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('calls onClick once and dismisses the toast', async () => {
    renderToaster();
    const onClick = vi.fn();
    fire({
      status: 'error',
      description: '크레딧이 부족합니다.',
      action: { label: '크레딧 구매', onClick },
    });

    const action = await screen.findByRole('button', { name: '크레딧 구매' });
    const root = action.closest('[data-scope="toast"][data-part="root"]');
    expect(root).toHaveAttribute('data-state', 'open');

    fireEvent.click(action);

    expect(onClick).toHaveBeenCalledTimes(1);
    // Dismissed: the root leaves the open state (exit animation follows).
    await waitFor(() => expect(root).toHaveAttribute('data-state', 'closed'));
  });

  it("accepts Chakra's own toaster.create({ action }) without double-calling", async () => {
    renderToaster();
    const onClick = vi.fn();
    act(() => {
      toaster.create({
        type: 'info',
        description: 'Exported.',
        action: { label: 'Open', onClick },
      });
    });

    fireEvent.click(await screen.findByRole('button', { name: 'Open' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders no action button when none is given', async () => {
    renderToaster();
    fire({ status: 'success', description: 'Saved.' });

    await screen.findByText('Saved.');
    expect(screen.getAllByRole('button')).toHaveLength(1); // close × only
  });
});

describe('useToast duration', () => {
  const durationOf = (options: UseToastOptions) => {
    const create = vi.spyOn(toaster, 'create');
    fire(options);
    return create.mock.calls.at(-1)?.[0].duration;
  };

  it('defaults to 5s without an action', () => {
    renderToaster();
    expect(durationOf({ description: 'Saved.' })).toBe(TOAST_DEFAULT_DURATION);
  });

  it('defaults to 8s with an action', () => {
    renderToaster();
    expect(
      durationOf({
        description: 'Deleted.',
        action: { label: 'Undo', onClick: () => {} },
      })
    ).toBe(TOAST_ACTION_DURATION);
  });

  it("keeps the caller's duration, including null", () => {
    renderToaster();
    const action = { label: 'Undo', onClick: () => {} };
    expect(durationOf({ description: 'a', action, duration: 3000 })).toBe(3000);
    expect(durationOf({ description: 'b', action, duration: null })).toBe(null);
  });
});
