import { Accordion as ChakraAccordion, ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Accordion } from './Accordion';

/**
 * Accordion content runs the same height animation as Collapsible, so it gets
 * the same clock (300 in / 150 out) instead of Chakra's symmetric 200 / 200,
 * and keeps the recipe's own `expand-height` name.
 */
const rulesFor = (el: Element) => {
  const css = Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');
  return el.className
    .split(' ')
    .filter((c) => c.startsWith('css-'))
    .flatMap((c) => [
      ...css.matchAll(new RegExp(`\\.${c}[^{]*\\{([^}]*)\\}`, 'g')),
    ])
    .map((m) => m[1])
    .join('\n');
};

describe('Accordion presence timing', () => {
  it('opens on motion.base and closes on fast, keeping the height keyframes', () => {
    const { container } = render(
      <ChakraProvider value={system}>
        <Accordion defaultValue={['a']}>
          <ChakraAccordion.Item value="a">
            <ChakraAccordion.ItemTrigger>A</ChakraAccordion.ItemTrigger>
            <ChakraAccordion.ItemContent>
              <ChakraAccordion.ItemBody>body</ChakraAccordion.ItemBody>
            </ChakraAccordion.ItemContent>
          </ChakraAccordion.Item>
        </Accordion>
      </ChakraProvider>
    );
    const rules = rulesFor(
      container.querySelector('[data-part="item-content"]')!
    );

    expect(rules).toContain(
      'animation-duration:var(--chakra-durations-motion-base)'
    );
    expect(rules).toContain('animation-duration:var(--chakra-durations-fast)');
    expect(rules).not.toContain(
      'animation-duration:var(--chakra-durations-moderate)'
    );
    expect(rules).toContain('expand-height');
  });
});
