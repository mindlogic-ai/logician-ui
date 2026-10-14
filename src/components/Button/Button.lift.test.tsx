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

/**
 * A call site that adds one line to `_active` used to replace the whole object,
 * so the variant's pressed colour and the press `scale` both vanished and the
 * button stopped reading as pressed. FactChat's quiz footer does exactly this
 * (a 2px press ledge on the submit button), which is how it was found.
 */
describe('a call site that presses too', () => {
  const pressed = (el: Element) => rulesMatching(el, ':active');

  it('keeps the variant press when the call site adds its own', () => {
    const { getByRole } = setup(
      <Button
        colorPalette="primary"
        variant="solid"
        _active={{ transform: 'translateY(2px)' }}
      >
        제출
      </Button>
    );
    const rule = pressed(getByRole('button'));
    expect(rule).toContain('transform:translateY(2px)'); // theirs
    expect(rule).toContain('scale:0.97'); // ours, previously erased
    expect(rule).toContain('background-color'); // and the pressed colour
  });

  it('does the same for hover', () => {
    const { getByRole } = setup(
      <Button
        colorPalette="primary"
        variant="solid"
        _hover={{ outline: '1px' }}
      >
        A
      </Button>
    );
    const rule = rulesMatching(getByRole('button'), ':hover');
    expect(rule).toContain('outline');
    expect(rule).toContain('background');
  });

  it('transitions a transform the call site sets, which `all` used to cover', () => {
    // Nothing in this component sets `transform` — the press uses `scale` so it
    // cannot clobber a call site — but naming the properties dropped the call
    // site's own transform out of the transition and left it snapping.
    const { getByRole } = setup(<Button>A</Button>);
    const base = rulesFor(getByRole('button'))
      .map((r) => r.declarations)
      .join(' ');
    expect(base).toContain('transform var(--chakra-durations-fast)');
  });
});
