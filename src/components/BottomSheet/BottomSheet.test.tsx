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

const Sheet = ({
  dragDisabled,
  onDisabledDrag,
  ...props
}: Partial<BottomSheetProps> & {
  dragDisabled?: boolean;
  onDisabledDrag?: () => void;
}) => (
  // Korean copy, so the built-in close label is 닫기 (it follows `language`).
  <LogicianProvider language="ko">
    <BottomSheet {...props}>
      <BottomSheetContent
        data-testid="content"
        dragDisabled={dragDisabled}
        onDisabledDrag={onDisabledDrag}
      >
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

describe('BottomSheet — dragDisabled', () => {
  const grabber = () =>
    document.querySelector<HTMLElement>(
      '[data-scope="drawer"][data-part="grabber"]'
    )!;

  it('keeps the grabber painted and takes it off the pointer', () => {
    const { unmount } = render(<Sheet open />);
    expect(getComputedStyle(grabber()).pointerEvents).not.toBe('none');
    unmount();

    render(<Sheet open dragDisabled />);
    expect(grabber()).toBeInTheDocument();
    expect(getComputedStyle(grabber()).pointerEvents).toBe('none');
  });

  it('the close button still asks to close', async () => {
    const onOpenChange = vi.fn();
    render(<Sheet open dragDisabled onOpenChange={onOpenChange} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '닫기' }));
    });
    expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: false })
    );
  });
});

describe('BottomSheet — onDisabledDrag', () => {
  beforeAll(() => {
    // jsdom has no PointerEvent; without one fireEvent drops pointerType and
    // the coordinates, so a mouse press could not be told apart from a touch.
    if (!('PointerEvent' in window)) {
      class PointerEvent extends MouseEvent {
        pointerType: string;
        constructor(type: string, init: PointerEventInit = {}) {
          super(type, init);
          this.pointerType = init.pointerType ?? 'mouse';
        }
      }
      Object.assign(window, { PointerEvent });
    }
  });

  const grabber = () =>
    document.querySelector<HTMLElement>(
      '[data-scope="drawer"][data-part="grabber"]'
    )!;

  /** A one-finger press at (100, 100) that moves to (100 + dx, 100 + dy). */
  const swipe = (el: HTMLElement, dx: number, dy: number) => {
    fireEvent.touchStart(el, { touches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchMove(el, {
      touches: [{ clientX: 100 + dx, clientY: 100 + dy }],
    });
    fireEvent.touchEnd(el, { touches: [] });
  };

  it('calls it once when a press on the body swipes down', () => {
    const onDisabledDrag = vi.fn();
    render(<Sheet open dragDisabled onDisabledDrag={onDisabledDrag} />);
    const body = screen.getByText('본문');
    fireEvent.touchStart(body, { touches: [{ clientX: 100, clientY: 100 }] });
    for (const y of [104, 112, 140, 300]) {
      fireEvent.touchMove(body, { touches: [{ clientX: 100, clientY: y }] });
    }
    fireEvent.touchEnd(body, { touches: [] });
    expect(onDisabledDrag).toHaveBeenCalledTimes(1);

    // The next press is a new gesture.
    swipe(body, 0, 40);
    expect(onDisabledDrag).toHaveBeenCalledTimes(2);
  });

  it('calls it for a swipe that starts on the grabber', () => {
    const onDisabledDrag = vi.fn();
    render(<Sheet open dragDisabled onDisabledDrag={onDisabledDrag} />);
    // The grabber takes no pointer, so the press lands on the content around it.
    swipe(grabber(), 0, 40);
    expect(onDisabledDrag).toHaveBeenCalledTimes(1);
  });

  it('calls it for a mouse drag down', () => {
    const onDisabledDrag = vi.fn();
    render(<Sheet open dragDisabled onDisabledDrag={onDisabledDrag} />);
    const header = screen.getByText('노드 추가');
    fireEvent.pointerDown(header, { button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(header, { clientX: 100, clientY: 160 });
    fireEvent.pointerUp(header);
    expect(onDisabledDrag).toHaveBeenCalledTimes(1);
  });

  it('counts from 10px down: 9px is a tap, 10px is a swipe', () => {
    const onDisabledDrag = vi.fn();
    render(<Sheet open dragDisabled onDisabledDrag={onDisabledDrag} />);
    const body = screen.getByText('본문');
    swipe(body, 0, 0);
    swipe(body, 0, 9);
    expect(onDisabledDrag).not.toHaveBeenCalled();
    swipe(body, 0, 10);
    expect(onDisabledDrag).toHaveBeenCalledTimes(1);
  });

  it('ignores sideways and upward swipes', () => {
    const onDisabledDrag = vi.fn();
    render(<Sheet open dragDisabled onDisabledDrag={onDisabledDrag} />);
    const body = screen.getByText('본문');
    swipe(body, 40, 0);
    swipe(body, 30, 30); // as far sideways as down
    swipe(body, 0, -40);
    expect(onDisabledDrag).not.toHaveBeenCalled();
  });

  it('is not called while dragDisabled is off', () => {
    const onDisabledDrag = vi.fn();
    render(<Sheet open onDisabledDrag={onDisabledDrag} />);
    swipe(screen.getByText('본문'), 0, 40);
    expect(onDisabledDrag).not.toHaveBeenCalled();
  });

  it('is not called for a swipe down in a list scrolled away from its top', () => {
    const onDisabledDrag = vi.fn();
    render(
      <LogicianProvider language="ko">
        <BottomSheet open>
          <BottomSheetContent dragDisabled onDisabledDrag={onDisabledDrag}>
            <BottomSheetBody data-testid="list" overflowY="auto">
              <p>항목</p>
            </BottomSheetBody>
          </BottomSheetContent>
        </BottomSheet>
      </LogicianProvider>
    );
    const list = screen.getByTestId('list');
    list.style.overflowY = 'auto';
    Object.defineProperty(list, 'scrollHeight', { value: 600 });
    Object.defineProperty(list, 'clientHeight', { value: 200 });

    list.scrollTop = 120;
    swipe(screen.getByText('항목'), 0, 40);
    expect(onDisabledDrag).not.toHaveBeenCalled();

    // Back at the top, the same swipe would have dragged the sheet.
    list.scrollTop = 0;
    swipe(screen.getByText('항목'), 0, 40);
    expect(onDisabledDrag).toHaveBeenCalledTimes(1);
  });

  it('is not called for a swipe that starts in a text field', () => {
    const onDisabledDrag = vi.fn();
    render(
      <LogicianProvider language="ko">
        <BottomSheet open>
          <BottomSheetContent dragDisabled onDisabledDrag={onDisabledDrag}>
            <input aria-label="이름" />
          </BottomSheetContent>
        </BottomSheet>
      </LogicianProvider>
    );
    swipe(screen.getByLabelText('이름'), 0, 40);
    expect(onDisabledDrag).not.toHaveBeenCalled();
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
