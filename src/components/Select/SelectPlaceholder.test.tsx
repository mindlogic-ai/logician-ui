import { render } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { LogicianProvider } from '@/components/LogicianProvider';

import { SelectField } from '.';

beforeAll(() => {
  // Chakra's color-mode and responsive machinery calls it on mount; jsdom has
  // no implementation.
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
});

const options = [
  { label: '사과', value: 'apple' },
  { label: '배', value: 'pear' },
];

/**
 * The italic empty value (R30 2차 QA #8) hangs on two things Zag owns: the
 * trigger carries `data-placeholder-shown` while nothing is selected, and the
 * placeholder text sits in the `value-text` part inside it. If either moves,
 * the recipe selector in theme/recipes/controls.ts silently stops matching.
 */
describe('Select placeholder hooks', () => {
  const trigger = (container: HTMLElement) =>
    container.querySelector(
      '[data-scope=select][data-part=trigger]'
    ) as HTMLElement;

  it('empty: trigger is marked and holds the placeholder value-text', () => {
    const { container } = render(
      <LogicianProvider>
        <SelectField options={options} placeholder="과일 선택" />
      </LogicianProvider>
    );
    const t = trigger(container);
    expect(t).toHaveAttribute('data-placeholder-shown');
    expect(t.querySelector('[data-part=value-text]')).toHaveTextContent(
      '과일 선택'
    );
  });

  it('selected: the mark is gone', () => {
    const { container } = render(
      <LogicianProvider>
        <SelectField options={options} value="apple" placeholder="과일 선택" />
      </LogicianProvider>
    );
    expect(trigger(container)).not.toHaveAttribute('data-placeholder-shown');
  });
});
