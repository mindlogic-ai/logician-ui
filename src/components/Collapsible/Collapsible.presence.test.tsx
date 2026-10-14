import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { CollapsibleContent } from './CollapsibleContent';
import { CollapsibleRoot } from './CollapsibleRoot';

/**
 * `presence` declares a clock and no `animation-name`, which is the one thing
 * that lets a single preset sit on six unrelated parts. Collapsible is where
 * that would break first and most visibly: it does not fade or scale, it
 * interpolates the `--height` Ark measures, so a preset that also named an
 * animation would silently turn its expansion into a fade.
 *
 * Asserting on the emitted rules rather than on computed style because jsdom
 * does not run animations — what is being checked is which declarations reach
 * the element, which is exactly where this can go wrong.
 */
const setup = () =>
  render(
    <ChakraProvider value={system}>
      <CollapsibleRoot defaultOpen>
        <CollapsibleContent>content</CollapsibleContent>
      </CollapsibleRoot>
    </ChakraProvider>
  );

const rulesFor = (el: Element) => {
  const css = Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');
  return (
    el.className
      .split(' ')
      .filter((c) => c.startsWith('css-'))
      // `[^{]*` rather than a bare `{`: these declarations live behind the
      // `_open` / `_closed` conditions, so the class never ends the selector.
      .flatMap((c) => [
        ...css.matchAll(new RegExp(`\\.${c}[^{]*\\{([^}]*)\\}`, 'g')),
      ])
      .map((m) => m[1])
      .join('\n')
  );
};

describe('Collapsible presence timing', () => {
  it('runs the enter on the house clock, not the recipe 200ms', () => {
    const { container } = setup();
    const rules = rulesFor(container.querySelector('[data-part="content"]')!);

    expect(rules).toContain(
      'animation-duration:var(--chakra-durations-motion-base)'
    );
    expect(rules).toContain(
      'animation-timing-function:var(--chakra-easings-emphasized)'
    );
  });

  it('leaves in half that, on the neutral curve', () => {
    const { container } = setup();
    const rules = rulesFor(container.querySelector('[data-part="content"]')!);

    expect(rules).toContain('animation-duration:var(--chakra-durations-fast)');
    expect(rules).toContain(
      'animation-timing-function:var(--chakra-easings-standard)'
    );
  });

  it('never names an animation, so the height keyframes survive', () => {
    // The failing version of this change reads identically at the call site:
    // `animationStyle="presence"` either way, and the panel still opens — just
    // by fading, with no height to interpolate, which is the bug.
    const applied = system.css({ animationStyle: 'presence' });
    const declarations = JSON.stringify(applied);

    expect(declarations).not.toContain('expand-height');
    expect(declarations.match(/"animationName"/g) ?? []).toHaveLength(
      // Only the two under reduced motion, where losing the height is the point.
      2
    );
  });
});
