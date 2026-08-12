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
