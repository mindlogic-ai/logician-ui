import { createRef } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Formik } from 'formik';
import { describe, expect, it, vi } from 'vitest';

import { PasswordInput } from '@/components/PasswordInput';
import {
  Controlled,
  describeCompositionMatrix,
  getField,
  Handle,
  wrap,
} from '@/test-support/compositionScenarios';
import { FakeIme, HAKSA_JIWON } from '@/test-support/ime';

import { Input } from './Input';

/**
 * Typing Korean (or any IME language) into `Input` must never lose or break
 * the last syllable when `value` is also written from outside, or when the
 * composition is cut by blur / a window switch — and must not make `onChange`
 * lag a syllable behind. The shared matrix lives in
 * `test-support/compositionScenarios.tsx`; this file adds what only `Input`
 * has (Enter, maskNumber, trimWhiteSpace, noSpaces, Formik, ref).
 */
describeCompositionMatrix('Input', Input);

const mountInput = (props: Record<string, unknown> = {}) => {
  const handle = { current: null as Handle | null };
  const onChange = vi.fn();
  render(
    wrap(
      <Controlled
        ref={(h) => {
          handle.current = h;
        }}
        Field={Input}
        onChange={onChange}
        fieldProps={props}
      />
    )
  );
  const el = getField() as HTMLInputElement;
  return { el, handle, onChange, ime: new FakeIme(el, 'blink') };
};

describe('Input · Enter and composition', () => {
  it('Enter while composing commits the syllable and does not submit', () => {
    const onKeyDown = vi.fn();
    const { el, ime } = mountInput({ onKeyDown });
    ime.start();
    ime.update('한');
    const notCancelled = fireEvent.keyDown(el, { key: 'Enter' });

    expect(onKeyDown).not.toHaveBeenCalled();
    expect(notCancelled).toBe(false);
  });

  it('Enter after the commit submits', () => {
    const onKeyDown = vi.fn();
    const { el, ime } = mountInput({ onKeyDown });
    ime.compose([['ㅎ', '하', '한']]);
    fireEvent.keyDown(el, { key: 'Enter' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('Chrome: the Enter keydown flagged isComposing is swallowed', () => {
    const onKeyDown = vi.fn();
    const { el } = mountInput({ onKeyDown });
    fireEvent.keyDown(el, { key: 'Enter', isComposing: true });
    expect(onKeyDown).not.toHaveBeenCalled();
  });

  it('Safari: the Enter keydown that arrives after compositionend (keyCode 229) is swallowed', () => {
    const onKeyDown = vi.fn();
    const { el, ime } = mountInput({ onKeyDown });
    ime.compose([['ㅎ', '하', '한']]);
    fireEvent.keyDown(el, { key: 'Enter', keyCode: 229 });
    expect(onKeyDown).not.toHaveBeenCalled();

    fireEvent.keyDown(el, { key: 'Enter', keyCode: 13 });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});

describe('Input · existing transforms still behave', () => {
  it('maskNumber formats with commas and emits the raw number', () => {
    const { el, ime, handle } = mountInput({
      maskNumber: true,
      type: 'number',
    });
    ['1', '2', '3', '4'].forEach((d) => ime.typeText(d));

    expect(el.value).toBe('1,234');
    expect(handle.current!.value()).toBe('1234');
  });

  it('maskNumber reformats an outside value; a consumer onBlur gets the event as before', () => {
    const onBlur = vi.fn();
    const { el, handle } = mountInput({
      maskNumber: true,
      type: 'number',
      onBlur,
    });
    act(() => handle.current!.set('1234567'));
    expect(el.value).toBe('1,234,567');

    fireEvent.blur(el);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur.mock.calls[0][0].target).toBe(el);
  });

  it('trimWhiteSpace trims a paste and clears whitespace-only input', () => {
    const { el, handle } = mountInput({ trimWhiteSpace: true });
    fireEvent.input(el, { target: { value: '  학사지원  ' } });
    expect(handle.current!.value()).toBe('학사지원');
    expect(el.value).toBe('학사지원');

    fireEvent.input(el, { target: { value: '   ' } });
    expect(handle.current!.value()).toBe('');
  });

  it('trimWhiteSpace blocks a leading space on an empty field', () => {
    const { el } = mountInput({ trimWhiteSpace: true });
    expect(fireEvent.keyDown(el, { key: ' ' })).toBe(false);
  });

  it('noSpaces strips pasted spaces and blocks the space key', () => {
    const { el, handle } = mountInput({ noSpaces: true });
    fireEvent.input(el, { target: { value: 'a b c' } });
    expect(handle.current!.value()).toBe('abc');
    expect(el.value).toBe('abc');
    expect(fireEvent.keyDown(el, { key: ' ' })).toBe(false);
  });

  it('noSpaces + Chinese pinyin: the spaced reading is not rewritten mid-composition', () => {
    // macOS pinyin shows `ni hao` while composing. Stripping that space onto
    // the node would itself be a mid-composition write. The node keeps the
    // raw reading; the consumer already gets it without spaces; the rule is
    // applied to the finished text.
    const { el, ime, handle, onChange } = mountInput({ noSpaces: true });
    ime.start();
    ['n', 'ni', 'ni h', 'ni ha', 'ni hao'].forEach((s) => ime.update(s));

    expect(ime.interruptions).toEqual([]);
    expect(el.value).toBe('ni hao');
    expect(handle.current!.value()).toBe('nihao');
    expect(onChange.mock.calls.every(([v]) => !/\s/.test(v))).toBe(true);

    ime.end({ final: '你 好' });
    expect(el.value).toBe('你好');
    expect(handle.current!.value()).toBe('你好');
  });

  it('trimWhiteSpace + Japanese: a trailing full-width space is trimmed only after the commit', () => {
    const { el, ime, handle } = mountInput({ trimWhiteSpace: true });
    ime.start();
    ime.update('か');
    ime.update('か　');

    expect(ime.interruptions).toEqual([]);
    expect(el.value).toBe('か　');
    expect(handle.current!.value()).toBe('か');

    ime.end();
    expect(el.value).toBe('か');
  });

  it('maskNumber: a composition is not reformatted until it ends', () => {
    const { el, ime, handle } = mountInput({
      maskNumber: true,
      type: 'number',
    });
    ['1', '2', '3'].forEach((d) => ime.typeText(d));
    ime.start();
    ime.update('4');

    expect(ime.interruptions).toEqual([]);
    expect(handle.current!.value()).toBe('1234');

    ime.end();
    expect(el.value).toBe('1,234');
  });
});

describe('Input · integration', () => {
  it('Formik: composing `학사지원` and cutting it by window switch lands in values', () => {
    const onSubmit = vi.fn();
    let formik: { values: { title: string }; resetForm: () => void } | null =
      null;
    render(
      wrap(
        <Formik
          initialValues={{ title: '' }}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(f) => {
            formik = f;
            return (
              <Input
                aria-label="field"
                name="title"
                value={f.values.title}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
              />
            );
          }}
        </Formik>
      )
    );
    const ime = new FakeIme(getField(), 'blink');
    ime.compose(HAKSA_JIWON, { leaveLastOpen: true });
    ime.switchWindow();

    expect(formik!.values.title).toBe('학사지원');
    expect(ime.interruptions).toEqual([]);
  });

  it('Formik: resetForm() mid-composition is applied at compositionend', async () => {
    let formik: { values: { title: string }; resetForm: () => void } | null =
      null;
    render(
      wrap(
        <Formik
          initialValues={{ title: '' }}
          onSubmit={() => {}}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(f) => {
            formik = f;
            return (
              <Input
                aria-label="field"
                name="title"
                value={f.values.title}
                onChange={f.handleChange}
              />
            );
          }}
        </Formik>
      )
    );
    const ime = new FakeIme(getField(), 'blink');
    ime.compose([['ㄱ', '가']]);
    ime.start();
    ime.update('ㄴ');
    await act(async () => formik!.resetForm());
    expect(ime.interruptions).toEqual([]);

    ime.end();
    expect(getField().value).toBe('');
    expect(formik!.values.title).toBe('');
  });

  it('forwards the ref to the input node', () => {
    const ref = createRef<HTMLInputElement>();
    render(wrap(<Input aria-label="field" ref={ref} />));
    expect(ref.current).toBe(getField());
  });

  it('PasswordInput (uncontrolled) still hears every keystroke', () => {
    const onChange = vi.fn();
    render(
      wrap(
        <PasswordInput
          aria-label="field"
          onChange={(e) => onChange(e.target.value)}
        />
      )
    );
    const ime = new FakeIme(getField(), 'blink');
    ime.compose([['ㅂ', '비', '빔']]);
    ime.typeText('1');

    expect(onChange.mock.calls.map(([v]) => v)).toEqual([
      'ㅂ',
      '비',
      '빔',
      '빔1',
    ]);
  });
});
