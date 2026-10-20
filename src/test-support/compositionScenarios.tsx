/**
 * The IME composition matrix shared by `Input` and `Textarea`.
 *
 * Every scenario drives a real component through {@link FakeIme}, which
 * reproduces what a real browser does when `node.value` is written while a
 * composition is open (the syllable detaches: `학사ㅈ지원`). "No
 * interruptions" therefore means "React never wrote onto the node while the
 * IME was composing" — the property the fix exists for.
 *
 * Consumers modelled:
 * - `Controlled`  — `useState` + `setValue(e.target.value)`; the common case.
 * - `FormLike`    — a react-hook-form `Controller`-style external store with
 *                   `field.value` / `field.onChange(event)` / `reset()`.
 * - `Lagging`     — every emitted value comes back as `value` some time later
 *                   (debounce → URL → props, an async store). The shape that
 *                   actually breaks composition.
 * - `DebouncedSearch` — hears every keystroke, searches 300ms after the last
 *                   one, with a 2-character minimum (FactChat's member search).
 */
import {
  ChangeEvent,
  ComponentType,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { system } from '../theme';
import { EngineOrder, FakeIme, HAKSA_JIWON } from './ime';

type FieldElement = HTMLInputElement | HTMLTextAreaElement;
type AnyChange = ChangeEvent<FieldElement>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldComponent = ComponentType<any>;

export const ENGINES: EngineOrder[] = ['blink', 'webkit', 'gecko'];

export const wrap = (ui: ReactNode) => (
  <ChakraProvider value={system}>{ui}</ChakraProvider>
);

export interface Handle {
  /** The consumer's own idea of the value. */
  value: () => string;
  /** Write a value from outside (form reset, clear button, popstate). */
  set: (value: string) => void;
}

export interface ConsumerProps {
  Field: FieldComponent;
  initial?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  fieldProps?: Record<string, unknown>;
}

export const Controlled = forwardRef<Handle, ConsumerProps>(
  ({ Field, initial = '', onChange, onBlur, fieldProps }, ref) => {
    const [value, setValue] = useState(initial);
    const latest = useRef(value);
    latest.current = value;
    useImperativeHandle(ref, () => ({
      value: () => latest.current,
      set: setValue,
    }));
    return (
      <Field
        aria-label="field"
        value={value}
        onChange={(e: AnyChange) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onBlur={onBlur}
        {...fieldProps}
      />
    );
  }
);
Controlled.displayName = 'Controlled';

/** A react-hook-form `Controller`-shaped store: synchronous, external. */
const createFormStore = (initial: string) => {
  let value = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set: (next: string) => {
      value = next;
      listeners.forEach((l) => l());
    },
    subscribe: (l: () => void) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
};

export const FormLike = forwardRef<Handle, ConsumerProps>(
  ({ Field, initial = '', onChange, onBlur, fieldProps }, ref) => {
    const store = useRef(createFormStore(initial)).current;
    const value = useSyncExternalStore(store.subscribe, store.get);
    useImperativeHandle(ref, () => ({ value: store.get, set: store.set }));
    // field = { value, onChange, onBlur, name } as Controller hands it out
    const field = {
      name: 'title',
      value,
      onChange: (e: AnyChange) => {
        store.set(e.target.value);
        onChange?.(e.target.value);
      },
      onBlur,
    };
    return <Field aria-label="field" {...field} {...fieldProps} />;
  }
);
FormLike.displayName = 'FormLike';

/** Emissions come back as `value` after `latency` ms, in order. */
export const Lagging = forwardRef<Handle, ConsumerProps & { latency: number }>(
  ({ Field, initial = '', onChange, onBlur, fieldProps, latency }, ref) => {
    const [shown, setShown] = useState(initial);
    const truth = useRef(initial);
    useImperativeHandle(ref, () => ({
      value: () => truth.current,
      set: (v) => {
        truth.current = v;
        setShown(v);
      },
    }));
    return (
      <Field
        aria-label="field"
        value={shown}
        onChange={(e: AnyChange) => {
          const next = e.target.value;
          truth.current = next;
          onChange?.(next);
          setTimeout(() => setShown(next), latency);
        }}
        onBlur={onBlur}
        {...fieldProps}
      />
    );
  }
);
Lagging.displayName = 'Lagging';

/** Hears every keystroke; searches 300ms after the last, min 2 chars. */
export const DebouncedSearch = ({
  Field,
  onSearch,
}: {
  Field: FieldComponent;
  onSearch: (term: string) => void;
}) => {
  const [draft, setDraft] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  return (
    <Field
      aria-label="field"
      value={draft}
      onChange={(e: AnyChange) => {
        const term = e.target.value;
        setDraft(term);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          if (term.length >= 2) onSearch(term);
        }, 300);
      }}
    />
  );
};

export const getField = () => screen.getByLabelText('field') as FieldElement;

/** Values handed to the consumer, in order. */
const emitted = (spy: ReturnType<typeof vi.fn>) =>
  spy.mock.calls.map((c) => c[0] as string);

const noConsecutiveDupes = (values: string[]) =>
  values.every((v, i) => i === 0 || v !== values[i - 1]);

const mount = (
  Consumer: typeof Controlled | typeof FormLike,
  Field: FieldComponent,
  order: EngineOrder,
  props: Partial<ConsumerProps> = {}
) => {
  const handle = { current: null as Handle | null };
  const onChange = vi.fn();
  const onBlur = vi.fn();
  render(
    wrap(
      <Consumer
        ref={(h) => {
          handle.current = h;
        }}
        Field={Field}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
    )
  );
  const ime = new FakeIme(getField(), order);
  return { ime, handle, onChange, onBlur, el: getField() };
};

const mountLagging = (
  Field: FieldComponent,
  order: EngineOrder,
  { latency = 100, keyGap = 40, initial = '' } = {}
) => {
  const handle = { current: null as Handle | null };
  const onChange = vi.fn();
  render(
    wrap(
      <Lagging
        ref={(h) => {
          handle.current = h;
        }}
        Field={Field}
        latency={latency}
        initial={initial}
        onChange={onChange}
      />
    )
  );
  const ime = new FakeIme(getField(), order);
  ime.onStep = () => act(() => void vi.advanceTimersByTime(keyGap));
  return { ime, handle, onChange, el: getField() };
};

const flushTimers = () => act(() => void vi.runAllTimers());

/**
 * Registers the shared matrix for one component.
 */
export const describeCompositionMatrix = (
  name: string,
  Field: FieldComponent
) => {
  describe(`${name} · IME composition matrix`, () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    describe('충북대: the composition is cut by blur / a window switch', () => {
      describe.each(ENGINES)('%s', (order) => {
        it.each([
          ['useState', Controlled],
          ['react-hook-form Controller', FormLike],
        ] as const)(
          'keeps the last syllable in the node and in the %s consumer',
          (_, Consumer) => {
            const { ime, handle, onBlur, el } = mount(Consumer, Field, order);
            ime.compose(HAKSA_JIWON, { leaveLastOpen: true });
            expect(el.value).toBe('학사지원');

            ime.switchWindow(); // compositionend, no trailing input, blur

            expect(el.value).toBe('학사지원');
            expect(handle.current!.value()).toBe('학사지원');
            expect(onBlur).toHaveBeenCalledTimes(1);
            expect(ime.interruptions).toEqual([]);
          }
        );

        it('keeps the last syllable with a lagging consumer', () => {
          const { ime, handle, el } = mountLagging(Field, order);
          ime.compose(HAKSA_JIWON, { leaveLastOpen: true });
          ime.switchWindow();
          flushTimers();

          expect(ime.interruptions).toEqual([]);
          expect(el.value).toBe('학사지원');
          expect(handle.current!.value()).toBe('학사지원');
        });
      });

      it('a keyboard that never sends compositionend still settles on blur', () => {
        // Seen on Android keyboards: the field loses focus with the
        // composition still formally open.
        const { ime, handle, el } = mount(Controlled, Field, 'blink');
        ime.start();
        ime.update('안');
        ime.update('안녕');
        fireEvent.blur(el);

        expect(handle.current!.value()).toBe('안녕');
        // …and the field listens to outside values again.
        act(() => handle.current!.set(''));
        expect(el.value).toBe('');
      });
    });

    describe('onChange fires per keystroke while composing (the #183 regression)', () => {
      it('`김민` with the last syllable still open reaches the consumer as `김민`', () => {
        const { ime, handle, onChange } = mount(Controlled, Field, 'blink');
        ime.compose(
          [
            ['ㄱ', '기', '김'],
            ['ㅁ', '미', '민'],
          ],
          {
            leaveLastOpen: true,
          }
        );

        expect(ime.isComposing).toBe(true);
        expect(handle.current!.value()).toBe('김민');
        expect(emitted(onChange)).toEqual([
          'ㄱ',
          '기',
          '김',
          '김ㅁ',
          '김미',
          '김민',
        ]);
      });

      it('a 2-character-minimum search fires for `김민` without committing', () => {
        const onSearch = vi.fn();
        render(wrap(<DebouncedSearch Field={Field} onSearch={onSearch} />));
        const ime = new FakeIme(getField(), 'blink');
        ime.compose(
          [
            ['ㄱ', '기', '김'],
            ['ㅁ', '미', '민'],
          ],
          {
            leaveLastOpen: true,
          }
        );
        act(() => void vi.advanceTimersByTime(300));

        expect(onSearch).toHaveBeenCalledWith('김민');
      });
    });

    describe('a lagging consumer does not break the composition', () => {
      it.each(ENGINES)('%s: `학사지원` stays `학사지원`', (order) => {
        const { ime, handle, el } = mountLagging(Field, order);
        ime.compose(HAKSA_JIWON);
        flushTimers();

        expect(ime.interruptions).toEqual([]);
        expect(el.value).toBe('학사지원');
        expect(handle.current!.value()).toBe('학사지원');
      });

      it('a stale `학사ㅈ` arriving while `지` is composing does not produce `학사ㅈ지원`', () => {
        // The reported shape, step by step: the consumer echoes `학사ㅈ` (its
        // value from one keystroke ago) after the IME has already moved on.
        const onChange = vi.fn();
        const { rerender } = render(
          wrap(<Field aria-label="field" value="" onChange={onChange} />)
        );
        const el = getField();
        const ime = new FakeIme(el, 'blink');
        const setProp = (value: string) =>
          rerender(
            wrap(<Field aria-label="field" value={value} onChange={onChange} />)
          );

        ime.compose([{ states: ['ㅎ', '하', '학', '핛'], commit: '학' }]);
        setProp('학');
        ime.compose([{ states: ['사', '샂'], commit: '사' }]);
        setProp('학사');
        ime.start();
        ime.update('ㅈ');
        ime.update('지');
        setProp('학사ㅈ'); // the late echo
        ime.update('징');
        ime.end({ final: '지' });
        ime.compose([['우', '워', '원']]);
        setProp('학사지원');

        expect(ime.interruptions).toEqual([]);
        expect(el.value).toBe('학사지원');
      });

      it('a lag that spans several syllables is still recognised as our own echo', () => {
        // One composition per syllable: the echo arriving during `원` was
        // emitted during `지` — a different composition.
        const { ime, handle, el } = mountLagging(Field, 'blink', {
          latency: 400,
          keyGap: 30,
        });
        ime.compose(HAKSA_JIWON);
        flushTimers();

        expect(ime.interruptions).toEqual([]);
        expect(el.value).toBe('학사지원');
        expect(handle.current!.value()).toBe('학사지원');
      });
    });

    describe('outside writes during a composition', () => {
      it.each(ENGINES)(
        '%s: a reset/clear is applied at compositionend, not mid-syllable',
        (order) => {
          const { ime, handle, el } = mount(FormLike, Field, order, {
            initial: '이전',
          });
          ime.start();
          ime.update('ㄱ');
          ime.update('기');
          act(() => handle.current!.set('')); // reset() mid-syllable

          expect(ime.interruptions).toEqual([]);
          expect(el.value).toBe('이전기');

          ime.end();
          expect(el.value).toBe('');
          expect(handle.current!.value()).toBe('');
        }
      );

      it('a value loaded mid-composition (draft restore) wins at compositionend', () => {
        const { ime, handle, el } = mount(Controlled, Field, 'blink');
        ime.start();
        ime.update('ㅇ');
        act(() => handle.current!.set('불러온 초안'));
        expect(ime.interruptions).toEqual([]);
        ime.end();
        expect(el.value).toBe('불러온 초안');
      });

      it.each([
        ['Korean', [['ㄱ', '기', '김']]],
        // One keystroke, one state: the first `input` of the new composition
        // is byte-identical to the last thing emitted before the clear.
        ['Korean ㅋ', [['ㅋ']]],
        ['Japanese あ', [['あ']]],
      ])('retyping the same text after reset() is heard (%s)', (_, keys) => {
        const { ime, handle, onChange, el } = mount(FormLike, Field, 'blink');
        ime.compose(keys);
        const typed = el.value;
        act(() => handle.current!.set(''));
        expect(el.value).toBe('');

        onChange.mockClear();
        ime.compose(keys);

        expect(emitted(onChange).at(-1)).toBe(typed);
        expect(handle.current!.value()).toBe(typed);
      });

      it('retyping the same text after a mid-composition reset is heard', () => {
        const { ime, handle, onChange, el } = mount(FormLike, Field, 'webkit', {
          initial: '이전',
        });
        ime.start();
        ime.update('ㄱ');
        ime.update('기');
        ime.update('김');
        act(() => handle.current!.set('')); // reset() while `김` is open
        ime.end();
        expect(el.value).toBe('');
        expect(handle.current!.value()).toBe('');

        onChange.mockClear();
        ime.compose([['ㄱ', '기', '김']]);
        expect(handle.current!.value()).toBe('김');
        expect(emitted(onChange)).toContain('김');
      });

      it('outside values are adopted normally between compositions', () => {
        const { handle, el } = mount(Controlled, Field, 'blink');
        act(() => handle.current!.set('바깥 값'));
        expect(el.value).toBe('바깥 값');
      });
    });

    describe('no double emit around compositionend', () => {
      it.each(ENGINES)('%s: one emission per distinct text', (order) => {
        const { ime, onChange } = mount(Controlled, Field, order);
        ime.compose([
          ['ㅎ', '하', '한'],
          ['ㄱ', '그', '글'],
        ]);

        expect(emitted(onChange)).toEqual([
          'ㅎ',
          '하',
          '한',
          '한ㄱ',
          '한그',
          '한글',
        ]);
      });

      it.each(ENGINES)(
        '%s: a commit that changes the text (핛 → 학 + 사) is emitted exactly once',
        (order) => {
          const { ime, onChange, el } = mount(Controlled, Field, order);
          ime.compose(HAKSA_JIWON);
          const values = emitted(onChange);

          expect(el.value).toBe('학사지원');
          expect(noConsecutiveDupes(values)).toBe(true);
          // `학` twice is right: typed, then `핛`, then `학` again at commit.
          expect(values).toEqual([
            'ㅎ',
            '하',
            '학',
            '핛',
            '학',
            '학사',
            '학샂',
            '학사',
            '학사지',
            '학사징',
            '학사지',
            '학사지우',
            '학사지워',
            '학사지원',
          ]);
        }
      );
    });

    describe('mobile keyboards', () => {
      it('Android Gboard: whole-word composition with autocorrect, committed by space', () => {
        const { ime, handle, onChange, el } = mount(Controlled, Field, 'blink');
        ime.start();
        ['h', 'he', 'hel', 'helo'].forEach((s) => ime.update(s));
        ime.update('hello'); // autocorrect replaces the word wholesale
        ime.end();
        ime.typeText(' ');

        expect(el.value).toBe('hello ');
        expect(handle.current!.value()).toBe('hello ');
        expect(emitted(onChange)).toEqual([
          'h',
          'he',
          'hel',
          'helo',
          'hello',
          'hello ',
        ]);
      });

      it('Android Gboard: autocorrect applied at commit time (no update) is emitted', () => {
        const { ime, handle, el } = mount(Controlled, Field, 'blink');
        ime.start();
        ['t', 'te', 'teh'].forEach((s) => ime.update(s));
        ime.end({ final: 'the' });

        expect(el.value).toBe('the');
        expect(handle.current!.value()).toBe('the');
      });

      it('Android Samsung keyboard: one composition spans the Korean word, with a lagging consumer', () => {
        const { ime, handle, el } = mountLagging(Field, 'blink');
        ime.start();
        ['ㅇ', '아', '안', '안ㄴ', '안녀', '안녕'].forEach((s) =>
          ime.update(s)
        );
        ime.end();
        flushTimers();

        expect(ime.interruptions).toEqual([]);
        expect(el.value).toBe('안녕');
        expect(handle.current!.value()).toBe('안녕');
      });

      it('iOS Safari Korean: compositionend before the final input', () => {
        const { ime, handle, onChange, el } = mount(
          Controlled,
          Field,
          'webkit'
        );
        ime.compose(HAKSA_JIWON);

        expect(el.value).toBe('학사지원');
        expect(handle.current!.value()).toBe('학사지원');
        expect(noConsecutiveDupes(emitted(onChange))).toBe(true);
      });

      it('iOS Safari Korean with a lagging consumer', () => {
        const { ime, el } = mountLagging(Field, 'webkit');
        ime.compose(HAKSA_JIWON, { leaveLastOpen: true });
        ime.switchWindow();
        flushTimers();
        expect(ime.interruptions).toEqual([]);
        expect(el.value).toBe('학사지원');
      });
    });

    describe('languages', () => {
      it.each(ENGINES)(
        '%s: Japanese romaji → hiragana → kanji, candidate re-selected, then committed',
        (order) => {
          const { ime, handle, onChange, el } = mountLagging(Field, order);
          ime.start();
          ['k', 'か', 'かn', 'かん', 'かんj', 'かんじ'].forEach((s) =>
            ime.update(s)
          );
          ime.update('漢字'); // Space: conversion
          ime.update('感じ'); // Space again: next candidate
          ime.end();
          flushTimers();

          expect(ime.interruptions).toEqual([]);
          expect(el.value).toBe('感じ');
          expect(handle.current!.value()).toBe('感じ');
          expect(emitted(onChange)).toContain('かんじ');
          expect(emitted(onChange).at(-1)).toBe('感じ');
        }
      );

      it.each(ENGINES)(
        '%s: Japanese conversion that lands only with compositionend',
        (order) => {
          const { ime, handle, el } = mount(Controlled, Field, order);
          ime.start();
          ['n', 'に', 'にh', 'にほ', 'にほn', 'にほん'].forEach((s) =>
            ime.update(s)
          );
          ime.end({ final: '日本' });

          expect(el.value).toBe('日本');
          expect(handle.current!.value()).toBe('日本');
        }
      );

      it.each(ENGINES)('%s: Chinese pinyin letters, then hanzi', (order) => {
        const { ime, handle, el } = mountLagging(Field, order);
        ime.start();
        ['n', 'ni', 'ni h', 'ni ha', 'ni hao'].forEach((s) => ime.update(s));
        ime.end({ final: '你好' });
        flushTimers();

        expect(ime.interruptions).toEqual([]);
        expect(el.value).toBe('你好');
        expect(handle.current!.value()).toBe('你好');
      });

      it('Vietnamese Telex through composition (macOS input source)', () => {
        const { ime, handle, el } = mountLagging(Field, 'blink');
        ime.start();
        ['V', 'Vi', 'Vie', 'Viê', 'Viêt', 'Việt'].forEach((s) => ime.update(s));
        ime.end();
        flushTimers();

        expect(ime.interruptions).toEqual([]);
        expect(el.value).toBe('Việt');
        expect(handle.current!.value()).toBe('Việt');
      });

      it('Vietnamese Telex without composition (Unikey-style replacement)', () => {
        const { ime, handle, onChange, el } = mount(Controlled, Field, 'blink');
        ime.typeText('V');
        ime.typeText('i');
        ime.typeText('e');
        // `e` again: the IME replaces the vowel in place with `ê`.
        fireEvent.input(el, { target: { value: 'Viê' } });
        ime.typeText('t');
        fireEvent.input(el, { target: { value: 'Việt' } });

        expect(handle.current!.value()).toBe('Việt');
        expect(emitted(onChange).at(-1)).toBe('Việt');
      });

      it('plain Latin and emoji never touch the composition path', () => {
        const { ime, handle, onChange, el } = mount(Controlled, Field, 'blink');
        ['H', 'i', ' ', '👍', '🇰🇷'].forEach((c) => ime.typeText(c));

        expect(el.value).toBe('Hi 👍🇰🇷');
        expect(handle.current!.value()).toBe('Hi 👍🇰🇷');
        expect(emitted(onChange)).toEqual([
          'H',
          'Hi',
          'Hi ',
          'Hi 👍',
          'Hi 👍🇰🇷',
        ]);
      });

      it('Latin typed right after a Korean commit is not mistaken for its echo', () => {
        const { ime, handle, onChange } = mount(Controlled, Field, 'webkit');
        ime.compose([['ㅎ', '하', '한']]);
        ime.typeText('A');
        ime.compose([['ㄱ', '그', '글']]);

        expect(handle.current!.value()).toBe('한A글');
        expect(emitted(onChange)).toContain('한A');
      });
    });

    describe('consumer hooks', () => {
      it('still calls the consumer composition handlers', () => {
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const { ime } = mount(Controlled, Field, 'blink', {
          fieldProps: { onCompositionStart, onCompositionEnd },
        });
        ime.compose([['ㅎ', '하', '한']]);

        expect(onCompositionStart).toHaveBeenCalledTimes(1);
        expect(onCompositionEnd).toHaveBeenCalledTimes(1);
      });

      it('works uncontrolled (no value prop)', () => {
        const onChange = vi.fn();
        render(
          wrap(
            <Field
              aria-label="field"
              onChange={(e: AnyChange) => onChange(e.target.value)}
            />
          )
        );
        const ime = new FakeIme(getField(), 'blink');
        ime.compose(HAKSA_JIWON, { leaveLastOpen: true });
        ime.switchWindow();

        expect(getField().value).toBe('학사지원');
        expect(emitted(onChange).at(-1)).toBe('학사지원');
      });
    });
  });
};
