import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  describeCompositionMatrix,
  getField,
  wrap,
} from '@/test-support/compositionScenarios';
import { FakeIme } from '@/test-support/ime';

import { Textarea } from './Textarea';

/**
 * Same defect, same fix as `Input` — `Textarea` mirrored its `value` prop into
 * state and synced it unconditionally, with no composition handling at all.
 * The shared matrix lives in `test-support/compositionScenarios.tsx`.
 */
describeCompositionMatrix('Textarea', Textarea);

describe('Textarea · multiline Korean', () => {
  it('composes across a line break with a lagging consumer', () => {
    vi.useFakeTimers();
    try {
      let shown = '';
      const onChange = vi.fn((e) => {
        const next = e.target.value;
        setTimeout(() => {
          shown = next;
          rerender(view());
        }, 100);
      });
      const view = () =>
        wrap(<Textarea aria-label="field" value={shown} onChange={onChange} />);
      const { rerender } = render(view());
      const el = getField();
      const ime = new FakeIme(el, 'blink');
      ime.onStep = () => vi.advanceTimersByTime(40);

      ime.compose(
        [
          ['ㅇ', '아', '안'],
          ['ㄴ', '녀', '녕'],
        ],
        {
          leaveLastOpen: true,
        }
      );
      // Enter commits `녕` and inserts the break in the same keystroke.
      ime.end({ tick: false });
      ime.typeText('\n');
      ime.compose([
        ['ㅎ', '하'],
        ['ㅅ', '세'],
        ['ㅇ', '요'],
      ]);
      vi.runAllTimers();

      expect(ime.interruptions).toEqual([]);
      expect(el.value).toBe('안녕\n하세요');
    } finally {
      vi.useRealTimers();
    }
  });

  it('composes in the middle of existing text', () => {
    const onChange = vi.fn();
    render(
      wrap(
        <Textarea
          aria-label="field"
          defaultValue={'첫 줄\n둘째 줄'}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    );
    const el = getField();
    const ime = new FakeIme(el, 'webkit');
    ime.start(2); // caret after `첫 `
    ime.update('ㅅ');
    ime.update('새');
    ime.end();

    expect(el.value).toBe('첫 새줄\n둘째 줄');
    expect(onChange.mock.calls.at(-1)?.[0]).toBe('첫 새줄\n둘째 줄');
  });
});
