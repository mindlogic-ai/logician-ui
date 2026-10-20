import { ChakraProvider } from '@chakra-ui/react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { system } from '@/theme';

import type { UseToastOptions, UseToastUpdateOptions } from './Toast.types';
import { Toaster, toaster } from './Toaster';
import { useToast } from './useToast';

/**
 * `useToast` renders from `meta.status`, so an `update(id, { status | type })`
 * that left `meta.status` (and the status styles baked into `meta.styles`)
 * behind kept the old colours and icon.
 */
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

const update = (id: string, options: UseToastUpdateOptions) =>
  act(() => {
    showToast.update(id, options);
  });

const rootOf = (text: string) =>
  screen
    .getByText(text)
    .closest<HTMLElement>('[data-scope="toast"][data-part="root"]')!;

const background = (el: HTMLElement) =>
  getComputedStyle(el).getPropertyValue('background');

afterEach(() => {
  act(() => {
    toaster.remove();
  });
});

describe('useToast update', () => {
  it('status changes the colours', async () => {
    renderToaster();
    const id = fire({ status: 'info', description: 'Working', duration: null });
    await screen.findByText('Working');
    expect(background(rootOf('Working'))).toContain('--chakra-colors-info-bg');

    update(id, { status: 'success', description: 'Done' });
    await screen.findByText('Done');
    await waitFor(() =>
      expect(background(rootOf('Done'))).toContain('--chakra-colors-success-bg')
    );
  });

  it("Chakra's `type` changes the colours too", async () => {
    renderToaster();
    const id = fire({ status: 'info', description: 'Working', duration: null });
    await screen.findByText('Working');

    update(id, { type: 'error', description: 'Failed' });
    await screen.findByText('Failed');
    expect(background(rootOf('Failed'))).toContain('--chakra-colors-danger-bg');
  });

  it('a raw toaster.update({ type }) on a useToast toast changes the status', async () => {
    renderToaster();
    const id = fire({ description: 'Neutral', duration: null });
    await screen.findByText('Neutral');
    expect(rootOf('Neutral').querySelectorAll('svg')).toHaveLength(1);

    act(() => {
      toaster.update(id, { type: 'warning', description: 'Careful' });
    });
    await screen.findByText('Careful');
    // Status icon + close ×.
    expect(rootOf('Careful').querySelectorAll('svg')).toHaveLength(2);
  });

  it('updating to neutral drops the status icon', async () => {
    renderToaster();
    const id = fire({
      status: 'success',
      description: 'Saved',
      duration: null,
    });
    await screen.findByText('Saved');

    update(id, { status: 'neutral', description: 'Plain' });
    await screen.findByText('Plain');
    expect(rootOf('Plain').querySelectorAll('svg')).toHaveLength(1);
  });

  it('keeps the action across an update that does not mention it', async () => {
    renderToaster();
    const id = fire({
      status: 'info',
      description: 'Working',
      duration: null,
      action: { label: 'Undo', onClick: () => {} },
    });
    await screen.findByRole('button', { name: 'Undo' });

    update(id, { status: 'success', description: 'Done' });
    await screen.findByText('Done');
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });
});
