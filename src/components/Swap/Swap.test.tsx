import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Swap } from './Swap';

/**
 * The point of this component is that the box does not resize, and the way it
 * achieves that is structural: every case is rendered, all of them share one
 * grid cell, and the inactive ones are hidden without being removed. Drop any
 * one of those three and the width lock silently stops working — the component
 * still renders, it just starts moving again.
 */
const setup = (value: string) =>
  render(
    <ChakraProvider value={system}>
      <Swap value={value} data-testid="swap">
        <Swap.Case value="idle">복사</Swap.Case>
        <Swap.Case value="done">복사 완료</Swap.Case>
      </Swap>
    </ChakraProvider>
  );

const cssFor = (el: Element) => {
  const sheet = Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('');
  const cls = (el.getAttribute('class') ?? '')
    .split(' ')
    .find((c) => c.startsWith('css-'));
  return [...sheet.matchAll(new RegExp(`\\.${cls}\\{([^{}]*)\\}`, 'g'))]
    .map((m) => m[1])
    .join(' ');
};

describe('Swap', () => {
  it('keeps every case mounted, which is what holds the width', () => {
    const { getByText } = setup('idle');
    // The inactive one is what stops the box shrinking to the active label.
    expect(getByText('복사')).toBeInTheDocument();
    expect(getByText('복사 완료')).toBeInTheDocument();
  });

  it('stacks the cases in one grid cell', () => {
    const { getByText, getByTestId } = setup('idle');
    expect(cssFor(getByTestId('swap'))).toContain('grid');
    ['복사', '복사 완료'].forEach((label) => {
      expect(cssFor(getByText(label)), label).toContain('grid-area:1/1');
    });
  });

  it('shows only the matching case, and hides the rest from everyone', () => {
    const { getByText } = setup('done');
    const idle = getByText('복사');
    const done = getByText('복사 완료');

    expect(cssFor(done)).toContain('opacity:1');
    expect(cssFor(idle)).toContain('opacity:0');
    // Invisible is not enough — it is still on screen, so it must not take
    // clicks meant for the button, and must not be read out twice.
    expect(cssFor(idle)).toContain('pointer-events:none');
    expect(idle).toHaveAttribute('aria-hidden', 'true');
    expect(done).not.toHaveAttribute('aria-hidden');
  });

  it('carries the reduced-motion guard from the vocabulary', () => {
    const { getByText } = setup('idle');
    expect(cssFor(getByText('복사'))).toContain('transition:opacity');
    expect(
      Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent ?? '')
        .join('')
    ).toContain('@media (prefers-reduced-motion: reduce)');
  });
});

/**
 * Direction is the part that makes a three-step sequence read as progress. Both
 * the case that just left and the case still to come are invisible, so nothing
 * on screen distinguishes them — only the sign of the offset does, and getting
 * it wrong looks like two labels bouncing past each other rather than a queue
 * advancing.
 */
describe('Swap direction', () => {
  const threeStates = (value: string) =>
    render(
      <ChakraProvider value={system}>
        <Swap value={value}>
          <Swap.Case value="idle">저장</Swap.Case>
          <Swap.Case value="saving">저장 중</Swap.Case>
          <Swap.Case value="saved">완료</Swap.Case>
        </Swap>
      </ChakraProvider>
    );

  it('sends past cases up and keeps future cases below', () => {
    const { getByText } = threeStates('saving');

    // Declared before the active one — already happened, so it left upward.
    expect(cssFor(getByText('저장'))).toContain('translate:0 -8px');
    expect(cssFor(getByText('저장 중'))).toContain('translate:0 0');
    // Declared after — has not happened yet, so it waits below.
    expect(cssFor(getByText('완료'))).toContain('translate:0 8px');
  });

  it('moves a case from below to above as the sequence passes it', () => {
    const first = threeStates('idle');
    expect(cssFor(first.getByText('저장 중'))).toContain('translate:0 8px');
    first.unmount();

    const last = threeStates('saved');
    expect(cssFor(last.getByText('저장 중'))).toContain('translate:0 -8px');
  });
});
