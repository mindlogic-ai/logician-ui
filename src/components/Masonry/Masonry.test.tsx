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

const mockHeights = (heights: Record<string, number>) =>
  vi
    .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
    .mockImplementation(function (this: HTMLElement) {
      return heights[this.textContent ?? ''] ?? 0;
    });

const columnTexts = (container: HTMLElement) =>
  [...container.querySelector('[data-testid="masonry"]')!.children].map((col) =>
    [...col.children].map((item) => item.textContent)
  );

const renderMasonry = () =>
  render(
    <ChakraProvider value={system}>
      <Masonry data-testid="masonry" numCols={2} gap={2}>
        {['a', 'b', 'c', 'd'].map((t) => (
          <div key={t}>{t}</div>
        ))}
      </Masonry>
    </ChakraProvider>
  );

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  FakeResizeObserver.instances = [];
});

describe('Masonry', () => {
  it('has the measured layout right after the first render, without waiting', () => {
    // a is tall, the rest are short. Round-robin would give [a, c] and [b, d].
    mockHeights({ a: 300, b: 50, c: 50, d: 50 });
    const { container } = renderMasonry();
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']]);
  });

  it('re-lays out inside the ResizeObserver callback when a hidden Masonry becomes visible', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    // Rendered under display: none, every height reads 0.
    const heights: Record<string, number> = {};
    mockHeights(heights);
    const { container } = renderMasonry();
    expect(columnTexts(container)).toEqual([
      ['a', 'c'],
      ['b', 'd'],
    ]);

    // The container is shown: real heights, and the observer fires.
    Object.assign(heights, { a: 300, b: 50, c: 50, d: 50 });
    act(() => {
      liveObservers().forEach((o) => o.fire());
    });
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']]);
  });
});
