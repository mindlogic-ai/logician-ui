import { act, fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { LogicianProvider } from '@/components/LogicianProvider';

import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetCloseButton,
  BottomSheetContent,
  BottomSheetHeader,
  type BottomSheetProps,
} from '.';

beforeAll(() => {
  // Chakra's color-mode and responsive machinery calls it on mount, and the
  // presence parts read `prefers-reduced-motion`; jsdom has no implementation.
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
});

const Sheet = (props: Partial<BottomSheetProps>) => (
  <LogicianProvider>
    <BottomSheet {...props}>
      <BottomSheetContent data-testid="content">
        <BottomSheetHeader>노드 추가</BottomSheetHeader>
        <BottomSheetCloseButton />
        <BottomSheetBody>본문</BottomSheetBody>
      </BottomSheetContent>
    </BottomSheet>
  </LogicianProvider>
);

const backdrop = () =>
  document.querySelector('[data-scope="drawer"][data-part="backdrop"]');

describe('BottomSheet', () => {
  it('renders nothing while closed', () => {
    render(<Sheet open={false} />);
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    expect(screen.queryByText('본문')).not.toBeInTheDocument();
  });

  it('renders its content, named by the header, when open', () => {
    render(<Sheet open />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBe(screen.getByTestId('content'));
    expect(screen.getByText('본문')).toBeVisible();
    // The header's children are the title, and the title names the sheet.
    expect(dialog).toHaveAccessibleName('노드 추가');
  });

  it('fires onOpenChange({ open: false }) from the close button', async () => {
    const onOpenChange = vi.fn();
    render(<Sheet open onOpenChange={onOpenChange} />);
    const close = screen.getByRole('button', { name: '닫기' });
    await act(async () => {
      fireEvent.click(close);
    });
    expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: false })
    );
  });

  it('renders an overlay when modal (the default)', () => {
    render(<Sheet open />);
    expect(backdrop()).toBeInTheDocument();
  });

  it('renders no overlay when modal={false}', () => {
    render(<Sheet open modal={false} />);
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(backdrop()).not.toBeInTheDocument();
  });

  it('renders the grabber by default and drops it with showGrabber={false}', () => {
    const grabber = () =>
      document.querySelector('[data-scope="drawer"][data-part="grabber"]');

    const { unmount } = render(<Sheet open />);
    expect(grabber()).toBeInTheDocument();
    unmount();

    render(
      <LogicianProvider>
        <BottomSheet open>
          <BottomSheetContent showGrabber={false}>
            <BottomSheetBody>본문</BottomSheetBody>
          </BottomSheetContent>
        </BottomSheet>
      </LogicianProvider>
    );
    expect(grabber()).not.toBeInTheDocument();
  });
});

describe('BottomSheet — axe', () => {
  it('an open sheet with a header and a close button has no violations', async () => {
    render(<Sheet open />);
    // The structural rules a11y.kwcag.test.tsx runs, plus the dialog's name.
    // The sheet portals to <body>, so it is scanned there, not in `container`.
    const results = await axe.run(document.body, {
      runOnly: {
        type: 'rule',
        values: [
          'aria-allowed-attr',
          'aria-allowed-role',
          'aria-dialog-name',
          'aria-required-attr',
          'aria-valid-attr-value',
          'button-name',
          'duplicate-id',
          'nested-interactive',
        ],
      },
      resultTypes: ['violations'],
    });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
