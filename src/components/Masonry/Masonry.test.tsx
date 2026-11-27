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

  it('has re-laid out by the time the ResizeObserver callback returns', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    const layout = { hidden: true, heights: { a: 300, b: 50, c: 50, d: 50 } };
    mockLayout(layout);
    const { container } = renderMasonry();

    // Fired without act(), as the browser does. act() would flush a scheduled
    // update before the assertion and hide a callback that only schedules
    // one, which is what paints the stale layout for a frame.
    layout.hidden = false;
    liveObservers().forEach((o) => o.fire());
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']]);
  });

  it('observes the items that a re-layout moved to another column', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    const layout = { hidden: true, heights: { a: 300, b: 50, c: 50, d: 50 } };
    mockLayout(layout);
    const { container } = renderMasonry();

    // c moves from the first column to the second. React mounts a new
    // element for it, which no observer has seen yet.
    layout.hidden = false;
    fireObservers();
    const items = [
      ...container.querySelectorAll('[data-testid="masonry"] > * > *'),
    ];
    const observed = new Set(liveObservers().flatMap((o) => [...o.observed]));
    expect(items.filter((item) => !observed.has(item))).toEqual([]);
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

  it('renders when an item height depends on the column it lands in', () => {
    // i1 and i2 are 300 tall next to w and 50 otherwise, so every re-layout
    // changes a height. Measuring again after each one never settled and
    // React threw "Maximum update depth exceeded".
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(
      function (this: HTMLElement) {
        const text = this.textContent ?? '';
        if (text === 'w') return 40;
        const siblings = [...(this.parentElement?.children ?? [])];
        return siblings.some((s) => s.textContent === 'w') ? 300 : 50;
      }
    );
    vi.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockImplementation(
      () => document.body
    );

    const { container } = renderMasonry(['i1', 'i2', 'w']);
    expect(columnTexts(container).flat().sort()).toEqual(['i1', 'i2', 'w']);
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
