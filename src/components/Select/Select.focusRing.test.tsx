import { ChakraProvider, createListCollection } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { FieldTrigger } from '../FieldTrigger';
import { Input } from '../Input';
import { Combobox } from './Combobox';
import { Select } from './Select';

const wrap = (ui: React.ReactNode) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
  ],
});

const FOCUS = ':is(:focus, [data-focus])';
const FOCUS_VISIBLE = ':is(:focus-visible, [data-focus-visible])';
const INVALID =
  ':is([data-invalid], [aria-invalid=true], [data-state=invalid])';
const RING = 'box-shadow:0 0 0 1px var(--chakra-colors-primary-main)';

/**
 * The unlayered rules emotion emitted for `el`'s own class, keyed by the
 * selector after the class (`''` for the base rule). These are the
 * design-system deltas; Chakra's recipe sits in `@layer recipes` underneath.
 */
const rulesBySelector = (el: Element) => {
  const cls = [...el.classList].find((c) => c.startsWith('css-'));
  const text = [...document.querySelectorAll('style')]
    .flatMap((s) => (s.textContent ?? '').split('\n'))
    .filter((line) => line.includes(`.${cls}`) && !line.startsWith('@'))
    .join('');
  const rules = new Map<string, string>();
  for (const [, selector, body] of text.matchAll(
    new RegExp(`\\.${cls}([^{}]*)\\{([^}]*)\\}`, 'g')
  )) {
    rules.set(selector, (rules.get(selector) ?? '') + body);
  }
  return rules;
};

/** A button-like trigger rings on keyboard focus only, and keeps red when invalid. */
const expectKeyboardRing = (el: Element) => {
  const rules = rulesBySelector(el);
  expect(rules.get(FOCUS_VISIBLE)).toContain(RING);
  expect(rules.get(FOCUS_VISIBLE)).toContain(
    'border-color:var(--chakra-colors-primary-main)'
  );
  // Nothing draws the ring on a plain (mouse) focus.
  expect(rules.get(FOCUS) ?? '').not.toContain('box-shadow');
  expect(rules.get(FOCUS) ?? '').not.toContain('primary-main');
  // Invalid keeps its red border on any focus; it outranks the ring's border.
  expect(rules.get(`${INVALID}${FOCUS}`)).toContain(
    'border-color:var(--chakra-colors-danger-solid)'
  );
};

describe('focus ring', () => {
  it('Select trigger: ring on keyboard focus and while open, not on any focus', () => {
    wrap(
      <Select.Root collection={collection}>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="고르기" />
          </Select.Trigger>
        </Select.Control>
      </Select.Root>
    );
    const trigger = screen.getByRole('combobox');
    expectKeyboardRing(trigger);
    expect(
      rulesBySelector(trigger).get(
        ':is([open], [data-open], [data-state=open])'
      )
    ).toContain(RING);
  });

  it('FieldTrigger: same as the Select trigger', () => {
    wrap(<FieldTrigger placeholder="이벤트" />);
    expectKeyboardRing(screen.getByRole('button', { name: '이벤트' }));
  });

  it('Combobox input: a text field, rings on any focus', () => {
    wrap(
      <Combobox.Root collection={collection}>
        <Combobox.Control>
          <Combobox.Input aria-label="프레임워크" />
        </Combobox.Control>
      </Combobox.Root>
    );
    const rules = rulesBySelector(screen.getByRole('combobox'));
    expect(rules.get(FOCUS)).toContain(RING);
    expect(rules.get(`${INVALID}${FOCUS}`)).toContain(
      'border-color:var(--chakra-colors-danger-solid)'
    );
  });

  it('Input: rings on any focus', () => {
    wrap(<Input aria-label="이메일" />);
    expect(rulesBySelector(screen.getByRole('textbox')).get(FOCUS)).toContain(
      RING
    );
  });
});
