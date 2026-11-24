import { ChakraProvider } from '@chakra-ui/react';
import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';
import { Masonry } from './Masonry';

/**
 * FactChat's model menu renders Masonry inside a closed popover
 * (`display: none`). Measuring `offsetHeight` there reads 0 for every group,
 * so the groups were dealt round-robin and reshuffled when the popover opened
 * (R30 QA 「모델 로딩 전, 후 UI 상이함」). jsdom reports `offsetHeight` 0 for
 * everything, which is that closed state.
 */
const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

// The model menu: OPENAI 7 models, CLAUDE 6, GEMINI 7, X-AI 4, GEMMA 1, …
// Weight = models + 1 heading row.
const GROUPS = [
  ['OPENAI', 8],
  ['CLAUDE', 7],
  ['GEMINI', 8],
  ['X-AI', 5],
  ['GEMMA', 2],
  ['META', 2],
] as const;

const columnTexts = (container: HTMLElement) =>
  [...container.querySelector('[data-testid="masonry"]')!.children].map((col) =>
    [...col.children].map((item) => item.textContent)
  );

// jsdom never calls a ResizeObserver, so this one records what is observed
// and lets a test fire the callback itself.
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

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  FakeResizeObserver.instances = [];
});

describe('Masonry with itemWeights', () => {
  it('lays out from the weights on the first render, with every offsetHeight 0', () => {
    const { container } = wrap(
      <Masonry
        data-testid="masonry"
        numCols={3}
        gap={2}
        itemWeights={GROUPS.map(([, w]) => w)}
      >
        {GROUPS.map(([name]) => (
          <div key={name}>{name}</div>
        ))}
      </Masonry>
    );
    expect(columnTexts(container)).toEqual([
      ['OPENAI', 'GEMMA'],
      ['CLAUDE', 'X-AI'],
      ['GEMINI', 'META'],
    ]);
  });

  it('does not measure or observe the items', () => {
    const observe = vi.spyOn(globalThis.ResizeObserver.prototype, 'observe');
    const offsetHeight = vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get');
    wrap(
      <Masonry data-testid="masonry" numCols={2} itemWeights={[1, 1]}>
        <div>a</div>
        <div>b</div>
      </Masonry>
    );
    expect(observe).not.toHaveBeenCalled();
    expect(offsetHeight).not.toHaveBeenCalled();
  });

  it('does not add gap to a weight, so a column of many small items is not overcounted', () => {
    // Left column: one item of 8. Right column: three items of 2 (sum 6).
    // The fifth item belongs in the right column. Adding gap (2) per item
    // would count 10 against 12 and send it left.
    const { container } = wrap(
      <Masonry
        data-testid="masonry"
        numCols={2}
        gap={2}
        itemWeights={[8, 2, 2, 2, 1]}
      >
        {['a', 'b', 'c', 'd', 'e'].map((t) => (
          <div key={t}>{t}</div>
        ))}
      </Masonry>
    );
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd', 'e']]);
  });

  it('counts a missing weight as 0', () => {
    const { container } = wrap(
      <Masonry data-testid="masonry" numCols={2} itemWeights={[5]}>
        {['a', 'b', 'c'].map((t) => (
          <div key={t}>{t}</div>
        ))}
      </Masonry>
    );
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c']]);
  });

  it('counts a NaN weight as 0 instead of throwing', () => {
    // e.g. `rows + 1` where `rows` is undefined for one group.
    const { container } = wrap(
      <Masonry data-testid="masonry" numCols={2} itemWeights={[NaN, 5, 1, 1]}>
        {['a', 'b', 'c', 'd'].map((t) => (
          <div key={t}>{t}</div>
        ))}
      </Masonry>
    );
    expect(columnTexts(container)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
});

describe('Masonry without itemWeights', () => {
  it('still measures the items and places them by height', async () => {
    // Heights by text: a is tall, the rest are short.
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(
      function (this: HTMLElement) {
        return this.textContent === 'a' ? 300 : 50;
      }
    );
    const { container } = wrap(
      <Masonry data-testid="masonry" numCols={2} gap={2}>
        {['a', 'b', 'c', 'd'].map((t) => (
          <div key={t}>{t}</div>
        ))}
      </Masonry>
    );
    // Round-robin would give [a, c] and [b, d]. Measured, b, c and d all fit
    // beside the tall a.
    await waitFor(() =>
      expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']])
    );
  });
});

describe('Masonry when itemWeights changes', () => {
  // The same element array on every render, as a memoized parent passes it.
  const ITEMS = ['a', 'b', 'c', 'd'].map((t) => <div key={t}>{t}</div>);
  const ui = (itemWeights?: number[]) => (
    <ChakraProvider value={system}>
      <Masonry
        data-testid="masonry"
        numCols={2}
        gap={2}
        itemWeights={itemWeights}
      >
        {ITEMS}
      </Masonry>
    </ChakraProvider>
  );

  it('creates no observer while itemWeights is given', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    render(ui([1, 1, 1, 1]));
    expect(FakeResizeObserver.instances).toHaveLength(0);
  });

  it('lays out again when only the weights change', () => {
    const { container, rerender } = render(ui([8, 1, 1, 1]));
    expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']]);
    rerender(ui([1, 1, 1, 8]));
    expect(columnTexts(container)).toEqual([
      ['a', 'c'],
      ['b', 'd'],
    ]);
  });

  it('starts measuring when itemWeights is removed', async () => {
    mockHeights({ a: 300, b: 50, c: 50, d: 50 });
    const { container, rerender } = render(ui([1, 1, 1, 1]));
    expect(columnTexts(container)).toEqual([
      ['a', 'c'],
      ['b', 'd'],
    ]);
    rerender(ui(undefined));
    await waitFor(() =>
      expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']])
    );
  });

  it('observes the items again when itemWeights is removed after a measured layout', async () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    const heights: Record<string, number> = { a: 300, b: 50, c: 50, d: 50 };
    mockHeights(heights);
    const { container, rerender } = render(ui(undefined));
    await waitFor(() =>
      expect(columnTexts(container)).toEqual([['a'], ['b', 'c', 'd']])
    );
    rerender(ui([1, 1, 1, 1]));
    expect(liveObservers()).toHaveLength(0);

    // Heights are the same as before, so only the effect's own dependency on
    // itemWeights brings the observer back.
    rerender(ui(undefined));
    await waitFor(() => expect(liveObservers()).toHaveLength(1));
    expect(liveObservers()[0].observed.size).toBe(4);

    Object.assign(heights, { a: 50, b: 300 });
    liveObservers()[0].fire();
    await waitFor(() =>
      expect(columnTexts(container)).toEqual([['a', 'c', 'd'], ['b']])
    );
  });
});
