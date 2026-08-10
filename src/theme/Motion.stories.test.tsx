import { Box, ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { ProgressBar } from '../components/ProgressBar';
import { SegmentedControl } from '../components/SegmentedControl';
import { Switch } from '../components/Switch';
import { system } from '.';
import { BEFORE, Changed } from './Motion.stories';

/**
 * The `Changed` story's left column renders the **real** components with their
 * pre-change values restored by a wrapper rule. That only works if two things
 * hold, and neither is visible from reading the code:
 *
 * 1. The override object actually compiles to a nested selector. Chakra treats a
 *    key without `&` as a *condition*, not a selector, and emits
 *    `--transition-duration{[data-part="indicator"]:150ms}` — syntactically
 *    dead CSS that no browser applies and no type-check catches. The story then
 *    shows two identical columns while claiming they differ.
 * 2. The resulting rule outranks the component's own. A Chakra style prop lands
 *    on the element's single class, (0,1,0); a descendant of the wrapper's class
 *    is (0,2,0) or better. Both are unlayered, so specificity decides.
 *
 * These tests check the emitted stylesheet for both, per case.
 */

const emittedCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('');

/**
 * The `css-*` class Chakra generated for an element. Read via `getAttribute`
 * rather than `className`, which on an SVG node is an SVGAnimatedString.
 */
const cssClass = (el: Element) =>
  (el.getAttribute('class') ?? '')
    .split(' ')
    .find((c) => c.startsWith('css-')) ?? '';

/** The declaration block of the rule `.<wrapperClass> <suffix>`, if emitted. */
const wrapperRule = (wrapper: Element, suffix: string) => {
  const match = emittedCss().match(
    new RegExp(
      `\\.${cssClass(wrapper)} ${suffix.replace(/[[\]().*+?^$|\\]/g, '\\$&')}\\{([^{}]*)\\}`
    )
  );
  return match?.[1] ?? null;
};

/** The declaration blocks of every rule keyed on an element's own class alone. */
const ownRules = (el: Element) =>
  [
    ...emittedCss().matchAll(
      new RegExp(`\\.${cssClass(el)}\\{([^{}]*)\\}`, 'g')
    ),
  ]
    .map((m) => m[1])
    .join('\n');

/**
 * Rough CSS specificity — enough for the selectors used here, which have no ids
 * and no `:not()`. Classes, attribute selectors and pseudo-classes share a
 * column; element names sit below them.
 */
const specificity = (selector: string): [number, number] => [
  (selector.match(/\.[\w-]+|\[[^\]]*\]|(?<!:):[\w-]+(?!:)/g) ?? []).length,
  (selector.match(/(?:^|[\s>+~])([a-z][\w-]*)/g) ?? []).length,
];

const beats = (a: string, b: string) => {
  const [ac, ae] = specificity(a);
  const [bc, be] = specificity(b);
  return ac !== bc ? ac > bc : ae > be;
};

const setup = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('the Changed story rebuilds "before" on the real components', () => {
  it("A05 SegmentedControl — puts Ark's 150ms default back on the indicator", () => {
    const { container } = setup(
      <Box css={BEFORE.segmented} data-testid="wrap">
        <SegmentedControl
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ]}
        />
      </Box>
    );
    const wrap = container.querySelector('[data-testid="wrap"]')!;
    const indicator = container.querySelector('[data-part="indicator"]')!;

    expect(wrapperRule(wrap, '[data-part="indicator"]')).toContain(
      '--transition-duration:150ms'
    );
    // ...and the component still asks for the house timing, so the two columns
    // genuinely run on different numbers.
    expect(ownRules(indicator)).toContain('--chakra-durations-motion-base');
    expect(
      beats(`.wrap [data-part="indicator"]`, `.${cssClass(indicator)}`)
    ).toBe(true);
  });

  it('A04 Switch — puts fast/ease back on the thumb', () => {
    const { container } = setup(
      <Box css={BEFORE.switch} data-testid="wrap">
        <Switch>
          <Switch.Control />
        </Switch>
      </Box>
    );
    const wrap = container.querySelector('[data-testid="wrap"]')!;
    const thumb = container.querySelector('[data-part="thumb"]')!;

    expect(wrapperRule(wrap, '[data-part="thumb"]')).toContain(
      'transition-duration:150ms'
    );
    expect(ownRules(thumb)).toContain('--chakra-easings-overshoot');
    expect(beats(`.wrap [data-part="thumb"]`, `.${cssClass(thumb)}`)).toBe(
      true
    );
  });

  it('A03 Checkbox — undoes the tick draw, dash pattern included', () => {
    const { container } = setup(
      <Box css={BEFORE.checkbox} data-testid="wrap">
        <Checkbox defaultChecked>
          <Checkbox.Control />
          <Checkbox.Label>x</Checkbox.Label>
        </Checkbox>
      </Box>
    );
    const wrap = container.querySelector('[data-testid="wrap"]')!;
    const indicator = container.querySelector('[data-part="control"] svg')!;

    const rule = wrapperRule(wrap, '[data-part="control"] svg polyline');
    expect(rule).toContain('animation:none');
    // Killing the animation alone would park stroke-dashoffset at its start and
    // leave the tick invisible — the "before" has no dash pattern at all.
    expect(rule).toContain('stroke-dasharray:none');
    expect(emittedCss()).toContain(
      `.${cssClass(indicator)} polyline,.${cssClass(indicator)} path{stroke-dasharray:24`
    );
    expect(
      beats(
        `.wrap [data-part="control"] svg polyline`,
        `.${cssClass(indicator)} polyline`
      )
    ).toBe(true);
  });

  it('A20 ProgressBar — puts the hardcoded ease-in-out back on the range', () => {
    const { container } = setup(
      <Box css={BEFORE.progress} data-testid="wrap">
        <ProgressBar value={40} />
      </Box>
    );
    const wrap = container.querySelector('[data-testid="wrap"]')!;
    const range = container.querySelector('[data-part="range"]')!;

    expect(wrapperRule(wrap, '[data-part="range"]')).toContain(
      'transition:width 0.3s ease-in-out'
    );
    expect(ownRules(range)).toContain('--chakra-easings-emphasized');
    expect(beats(`.wrap [data-part="range"]`, `.${cssClass(range)}`)).toBe(
      true
    );
  });

  it('A01 Button — presses via transform again, so it clobbers a positioning transform', () => {
    const { container } = setup(
      <Box css={BEFORE.button} data-testid="wrap">
        <Button transform="translateY(-3px)">x</Button>
      </Box>
    );
    const wrap = container.querySelector('[data-testid="wrap"]')!;
    const button = container.querySelector('button')!;

    expect(wrapperRule(wrap, 'button')).toContain(
      'transition:all 0.25s ease-in-out'
    );
    const pressed = wrapperRule(wrap, 'button:active')!;
    expect(pressed).toContain('transform:scale(0.97)');
    // Pinning `scale` is what makes the old behaviour reappear: without it the
    // current recipe's `scale: 0.97` would still apply alongside.
    expect(pressed).toContain('scale:1');
    expect(beats(`.wrap button:active`, `.${cssClass(button)}:active`)).toBe(
      true
    );
  });

  it('Card — reproduces the dropped declaration as the 0s it resolved to', () => {
    const { container } = setup(
      <Box css={BEFORE.card} data-testid="wrap">
        <Card clickable>c</Card>
      </Box>
    );
    const wrap = container.querySelector('[data-testid="wrap"]')!;
    const card = container.querySelector('.chakra-card__root')!;

    expect(wrapperRule(wrap, '.chakra-card__root')).toContain(
      'transition-duration:0s'
    );
    expect(ownRules(card)).toContain('--chakra-durations-fast');
    expect(beats(`.wrap .chakra-card__root`, `.${cssClass(card)}`)).toBe(true);
  });

  it('renders every case with both columns present', () => {
    const Story = Changed.render as React.FC;
    const { container } = setup(<Story />);

    // Each case that uses a real component appears twice — once reverted, once
    // current — so a column silently failing to render is visible here.
    expect(
      container.querySelectorAll(
        '[data-scope="segment-group"][data-part="root"]'
      )
    ).toHaveLength(2);
    expect(container.querySelectorAll('[data-part="thumb"]')).toHaveLength(2);
    expect(
      container.querySelectorAll('[data-scope="checkbox"][data-part="root"]')
    ).toHaveLength(2);
    expect(container.querySelectorAll('[data-part="range"]')).toHaveLength(2);
    expect(
      container.querySelectorAll('.chakra-card__root').length
    ).toBeGreaterThanOrEqual(6);
  });
});
