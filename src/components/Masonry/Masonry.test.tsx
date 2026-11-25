import { ChakraProvider } from '@chakra-ui/react';
import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { Masonry } from './Masonry';

/**
 * Masonry places items by their measured height. These tests check that the
 * measured layout is in the DOM synchronously, with no timer or animation
 * frame in between, because anything deferred is painted first as a wrong
 * layout (R30 QA 「모델 로딩 전, 후 UI 상이함」: the model menu's groups
 * jumped columns when the popover opened).
 */

// jsdom never calls a ResizeObserver, so this one lets a test fire it.
class FakeResizeObserver {
  static instances: FakeResizeObserver[] = [];
  observed = new Set<Element>();
  constructor(private callback: ResizeObserverCallback) {
    FakeResizeObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observed.add(el);
  }
  unobserve(el: Element) {
    this.observed.delete(el);
  }
  disconnect() {
    this.observed.clear();
  }
  fire() {
    this.callback([], this as unknown as ResizeObserver);
  }
}
const liveObservers = () =>
  FakeResizeObserver.instances.filter((o) => o.observed.size > 0);

// jsdom has no layout. `hidden` stands for an ancestor with display: none:
// every height reads 0 and no item has an offsetParent.
type FakeLayout = { hidden: boolean; heights: Record<string, number> };
const mockLayout = (layout: FakeLayout) => {
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(
    function (this: HTMLElement) {
      return layout.hidden ? 0 : (layout.heights[this.textContent ?? ''] ?? 0);
    }
  );
  vi.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockImplementation(
    () => (layout.hidden ? null : document.body)
  );
};

const columnTexts = (container: HTMLElement) =>
  [...container.querySelector('[data-testid="masonry"]')!.children].map((col) =>
    [...col.children].map((item) => item.textContent)
  );

const masonry = (items: string[]) => (
  <ChakraProvider value={system}>
    <Masonry data-testid="masonry" numCols={2} gap={2}>
      {items.map((t) => (
        <div key={t}>{t}</div>
      ))}
    </Masonry>
  </ChakraProvider>
);
const renderMasonry = (items = ['a', 'b', 'c', 'd']) => render(masonry(items));
const fireObservers = () =>
  act(() => {
    liveObservers().forEach((o) => o.fire());
  });

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  FakeResizeObserver.instances = [];
});

describe('Masonry', () => {
  it('has the measured layout right after the first render, without waiting', () => {
    // a is tall, the rest are short. Round-robin would give [a, c] and [b, d].
    mockLayout({ hidden: false, heights: { a: 300, b: 50, c: 50, d: 50 } });
    const { container } = renderMasonry();
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']]);
  });

  it('re-lays out inside the ResizeObserver callback when a hidden Masonry becomes visible', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    const layout = { hidden: true, heights: { a: 300, b: 50, c: 50, d: 50 } };
    mockLayout(layout);
    const { container } = renderMasonry();
    expect(columnTexts(container)).toEqual([
      ['a', 'c'],
      ['b', 'd'],
    ]);

    // The container is shown: real heights, and the observer fires.
    layout.hidden = false;
    fireObservers();
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']]);
  });

  it('keeps the measured layout while it is hidden', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    const layout = { hidden: false, heights: { a: 300, b: 50, c: 50, d: 50 } };
    mockLayout(layout);
    const { container } = renderMasonry();
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']]);

    // The container is hidden: heights read 0, and the observer fires.
    layout.hidden = true;
    fireObservers();
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']]);
  });

  it('lays out a list that changed while hidden once it is shown again', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    const layout = {
      hidden: false,
      heights: { a: 300, b: 50, c: 50, d: 50, e: 400 } as Record<
        string,
        number
      >,
    };
    mockLayout(layout);
    const { container, rerender } = renderMasonry();

    layout.hidden = true;
    fireObservers();
    rerender(masonry(['e', 'b', 'c', 'd', 'a']));

    layout.hidden = false;
    fireObservers();
    // e (400) alone in the first column until b, c, d (50 each) and a (300)
    // have filled the second.
    expect(columnTexts(container)).toEqual([['e'], ['b', 'c', 'd', 'a']]);
  });
});
