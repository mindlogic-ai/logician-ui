import { ChakraProvider } from '@chakra-ui/react';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { system } from '../../theme';

const shiki = vi.hoisted(() => ({
  createHighlighter: vi.fn(),
  dispose: vi.fn(),
}));

// The real Shiki compiles grammars through WASM, which is slow in jsdom and
// not what these tests are about. The fake marks highlighted output with a
// class so a test can tell highlighted text from the plain-text fallback.
vi.mock('shiki', () => ({
  createHighlighter: shiki.createHighlighter,
}));

const fakeHighlighter = {
  codeToHtml: (code: string) =>
    `<pre><code><span class="test-highlighted">${code}</span></code></pre>`,
  dispose: shiki.dispose,
};

// shikiAdapter caches the highlighter at module level. Re-import Code per test
// so each one starts with an empty cache.
const loadCode = async () => (await import('./Code')).Code;

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

beforeEach(() => {
  vi.resetModules();
  shiki.createHighlighter.mockReset();
  shiki.createHighlighter.mockResolvedValue(fakeHighlighter);
  shiki.dispose.mockReset();
});

describe('Code highlighter', () => {
  it('creates one highlighter for many code blocks', async () => {
    const Code = await loadCode();
    const { container } = wrap(
      <>
        {Array.from({ length: 20 }, (_, i) => (
          <Code key={i} language="javascript">{`const n = ${i};`}</Code>
        ))}
      </>
    );

    await waitFor(() =>
      expect(container.querySelectorAll('.test-highlighted')).toHaveLength(20)
    );
    expect(shiki.createHighlighter).toHaveBeenCalledTimes(1);
  });

  it('keeps highlighting the other blocks when one block unmounts', async () => {
    const Code = await loadCode();
    const Blocks = ({ showFirst }: { showFirst: boolean }) => (
      <>
        {showFirst && <Code language="javascript">first</Code>}
        <Code language="javascript">second</Code>
      </>
    );
    const { container, rerender } = wrap(<Blocks showFirst />);
    await waitFor(() =>
      expect(container.querySelectorAll('.test-highlighted')).toHaveLength(2)
    );

    rerender(
      <ChakraProvider value={system}>
        <Blocks showFirst={false} />
      </ChakraProvider>
    );

    expect(shiki.dispose).not.toHaveBeenCalled();
    expect(container.querySelectorAll('.test-highlighted')).toHaveLength(1);

    // A block mounted later reuses the same highlighter.
    rerender(
      <ChakraProvider value={system}>
        <Blocks showFirst />
      </ChakraProvider>
    );
    await waitFor(() =>
      expect(container.querySelectorAll('.test-highlighted')).toHaveLength(2)
    );
    expect(shiki.createHighlighter).toHaveBeenCalledTimes(1);
  });

  it('retries on the next mount when loading fails', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    shiki.createHighlighter.mockRejectedValueOnce(new Error('load failed'));
    const Code = await loadCode();

    const first = wrap(<Code language="javascript">a</Code>);
    await waitFor(() =>
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('Failed to load the Shiki highlighter'),
        expect.any(Error)
      )
    );
    // The failed block falls back to plain text instead of throwing.
    expect(first.container).toHaveTextContent('a');
    expect(first.container.querySelector('.test-highlighted')).toBeNull();
    first.unmount();

    const { container } = wrap(<Code language="javascript">b</Code>);
    await waitFor(() =>
      expect(container.querySelectorAll('.test-highlighted')).toHaveLength(1)
    );
    expect(shiki.createHighlighter).toHaveBeenCalledTimes(2);
    consoleError.mockRestore();
  });
});
