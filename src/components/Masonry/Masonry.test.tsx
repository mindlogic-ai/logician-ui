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

afterEach(() => {
  vi.restoreAllMocks();
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
