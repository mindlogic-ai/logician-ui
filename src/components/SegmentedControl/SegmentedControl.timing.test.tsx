import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { SegmentedControl } from './SegmentedControl';

/**
 * Ark writes this part's `transition-*` declarations **inline**, and an inline
 * declaration beats any class rule — so the ordinary preset props never reach
 * the indicator, and a change made that way looks identical to `dev`. Retiming
 * has to go through the custom properties Ark's inline `var()`s read.
 *
 * These tests exist because that failure is invisible: the code reads as though
 * it applied, the component still animates (on Ark's 150ms default), and only a
 * side-by-side comparison gives it away.
 */
const setup = () =>
  render(
    <ChakraProvider value={system}>
      <SegmentedControl
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    </ChakraProvider>
  );

const rulesFor = (el: Element) => {
  const css = Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');
  return el.className
    .split(' ')
    .filter((c) => c.startsWith('css-'))
    .flatMap((c) => [...css.matchAll(new RegExp(`\\.${c}\\{([^}]*)\\}`, 'g'))])
    .map((m) => m[1])
    .join('\n');
};

describe('SegmentedControl indicator timing', () => {
  it('Ark still reads the duration from a custom property', () => {
    const { container } = setup();
    const inline =
      container
        .querySelector('[data-part="indicator"]')
        ?.getAttribute('style') ?? '';
    // If Ark ever inlines a concrete duration instead, our override stops
    // working and this is the line that says so.
    expect(inline).toContain('var(--transition-duration');
    expect(inline).not.toMatch(/transition-duration:\s*\d/);
  });

  it('we define that custom property, so the indicator runs on our timing', () => {
    const { container } = setup();
    const el = container.querySelector('[data-part="indicator"]')!;
    const rules = rulesFor(el);
    expect(rules).toContain(
      '--transition-duration:var(--chakra-durations-motion-base)'
    );
    expect(rules).toContain(
      '--transition-timing-function:var(--chakra-easings-emphasized)'
    );
  });

  it('and drops to instant under reduced motion', () => {
    const { container } = setup();
    const rules = rulesFor(container.querySelector('[data-part="indicator"]')!);
    expect(rules).toContain(
      '--transition-duration:var(--chakra-durations-motion-instant)'
    );
  });
});
