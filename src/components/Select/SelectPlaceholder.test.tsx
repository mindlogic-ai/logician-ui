import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LogicianProvider } from '@/components/LogicianProvider';

import { SelectField } from '.';

const options = [
  { label: '사과', value: 'apple' },
  { label: '배', value: 'pear' },
];

/** Zag hooks the italic Select empty value (theme/recipes/controls.ts) relies on. */
describe('Select placeholder hooks', () => {
  const trigger = (container: HTMLElement) =>
    container.querySelector<HTMLElement>(
      '[data-scope=select][data-part=trigger]'
    )!;

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
