import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { Button } from './Button';

/**
 * `lift` is opt-in emphasis, and the two ways it can go wrong are both invisible
 * in review: it can quietly become the default for every button, and its shadow
 * can eat the keyboard focus ring — Chakra emits `:hover` *after*
 * `:focus-visible`, so a `box-shadow` on hover wins over the ring on a button
 * that is both. That is why the shadow is a `filter`, which cannot collide.
 */
const setup = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

const emittedCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('');

const cssClass = (el: Element) =>
  (el.getAttribute('class') ?? '')
    .split(' ')
    .find((c) => c.startsWith('css-')) ?? '';

/** The declarations of every rule keyed on this element's class. */
const rulesFor = (el: Element) =>
  [
    ...emittedCss().matchAll(
      new RegExp(`\\.${cssClass(el)}([^{]*)\\{([^{}]*)\\}`, 'g')
    ),
  ].map(([, selector, declarations]) => ({ selector, declarations }));

/**
 * Every hover declaration, joined — not the first match. Chakra's own recipe
 * layer also emits `:hover` rules for this class, so picking one finds theirs.
 */
const rulesMatching = (el: Element, pseudo: string) =>
  rulesFor(el)
    .filter((r) => r.selector.includes(pseudo))
    .map((r) => r.declarations)
    .join(' ');

const hoverRule = (el: Element) => rulesMatching(el, ':hover');

describe('Button lift', () => {
  it('does nothing unless asked for', () => {
    const { getByRole } = setup(<Button colorPalette="primary">A</Button>);
    expect(hoverRule(getByRole('button'))).not.toContain('translate');
  });

  it('raises the button and shadows it on hover', () => {
    const { getByRole } = setup(
      <Button colorPalette="primary" lift>
        A
      </Button>
    );
    const rule = hoverRule(getByRole('button'));
    expect(rule).toContain('translate:0 -1px');
    expect(rule).toContain('drop-shadow');
  });

  it('never puts a box-shadow on hover, which would outrank the focus ring', () => {
    const { getByRole } = setup(
      <Button colorPalette="primary" lift>
        A
      </Button>
    );
    // The ring is a box-shadow and `:hover` is emitted later, so this is the
    // assertion that keeps a focused-and-hovered button visibly focused.
    expect(hoverRule(getByRole('button'))).not.toContain('box-shadow');

    expect(rulesMatching(getByRole('button'), ':focus-visible')).toContain(
      'box-shadow'
    );
  });

  it('keeps the variant colours it was merged into', () => {
    const { getByRole } = setup(
      <Button colorPalette="primary" variant="solid" lift>
        A
      </Button>
    );
    // Spreading over `_hover` instead of merging would have dropped this.
    expect(hoverRule(getByRole('button'))).toContain('background');
  });

  it('animates what it moves', () => {
    const { getByRole } = setup(<Button lift>A</Button>);
    const base = rulesFor(getByRole('button'))
      .map((r) => r.declarations)
      .join(' ');
    expect(base).toContain('translate var(--chakra-durations-fast)');
    expect(base).toContain('filter var(--chakra-durations-fast)');
  });
});
