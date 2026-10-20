/**
 * A scripted IME for jsdom.
 *
 * jsdom has no input method, so tests drive composition by hand. This models
 * the parts of a real IME that the `Input`/`Textarea` composition bug depends
 * on, in the event orders real engines use:
 *
 * - `blink`  (Chrome, Edge, Android WebView/Chrome):
 *            compositionupdate → input(isComposing) … compositionend
 *            (no `input` after the end).
 * - `webkit` (Safari macOS, every iOS browser):
 *            compositionupdate → input(isComposing) … compositionend → input
 *            (a trailing, non-composing `input` carries the committed text).
 * - `gecko`  (Firefox): like blink, but a commit whose text differs from the
 *            last update (a conversion) is announced by one more
 *            compositionupdate + input before the end.
 *
 * ### What a mid-composition write does
 *
 * The real bug is that writing `node.value` while a composition is open
 * detaches it: the text written stays as literal characters, and the IME —
 * which still believes it is composing — keeps inserting its syllable after
 * it. `학사지` composing `지`, a late write of `학사ㅈ` lands, the IME carries
 * on → `학사ㅈ지`, then `학사ㅈ지원`. This model reproduces exactly that: any
 * write that does not come from the IME itself becomes the new prefix, and is
 * recorded in {@link FakeIme.interruptions}.
 *
 * Writes by the IME go through the prototype setter (the same trick
 * testing-library uses), so React's value tracker sees them as user edits and
 * fires `onChange`. Writes by React go through the instance property React's
 * tracker installs, which this class wraps to count them.
 */
import { fireEvent } from '@testing-library/react';

export type EngineOrder = 'blink' | 'webkit' | 'gecko';

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const protoSetter = (el: FieldElement) =>
  Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')!.set!;

/** Writes `value` the way the browser itself would (not via React). */
export const setNativeValue = (el: FieldElement, value: string) =>
  protoSetter(el).call(el, value);

export class FakeIme {
  /** Values written onto the node from outside while a composition was open. */
  readonly interruptions: string[] = [];
  /** Every value written onto the node by React (composing or not). */
  readonly writes: string[] = [];

  private composing = false;
  private prefix = '';
  private suffix = '';
  private text = '';
  private writingFromIme = false;
  /** Runs after every IME step — tests use it to let time pass between keys. */
  onStep: (() => void) | null = null;

  constructor(
    readonly el: FieldElement,
    readonly order: EngineOrder = 'blink'
  ) {
    const own = Object.getOwnPropertyDescriptor(el, 'value');
    const base =
      own ??
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')!;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ime = this;
    Object.defineProperty(el, 'value', {
      configurable: true,
      get() {
        return base.get!.call(this);
      },
      set(value: string) {
        base.set!.call(this, value);
        if (ime.writingFromIme) return;
        ime.writes.push(String(value));
        if (ime.composing) {
          // The composition detaches: what was written stays as text, and
          // the IME keeps inserting its syllable after it.
          ime.interruptions.push(String(value));
          ime.prefix = String(value);
          ime.suffix = '';
        }
      },
    });
  }

  get isComposing() {
    return this.composing;
  }

  private write(value: string) {
    this.writingFromIme = true;
    try {
      setNativeValue(this.el, value);
    } finally {
      this.writingFromIme = false;
    }
  }

  /** compositionstart at the caret (end of text unless `caret` given). */
  start(caret = this.el.value.length) {
    const value = this.el.value;
    this.prefix = value.slice(0, caret);
    this.suffix = value.slice(caret);
    this.text = '';
    this.composing = true;
    fireEvent.compositionStart(this.el, { data: '' });
  }

  /** The composing text becomes `text` (a keystroke, a candidate pick). */
  update(text: string, tick = true) {
    if (!this.composing) this.start();
    this.text = text;
    fireEvent.compositionUpdate(this.el, { data: text });
    // React's onChange fires for `input`; the IME edits the DOM first.
    this.write(this.prefix + text + this.suffix);
    fireEvent.input(this.el, {
      isComposing: true,
      inputType: 'insertCompositionText',
      data: text,
    });
    if (tick) this.onStep?.();
  }

  /**
   * Commits. `final` defaults to the current composing text; a different
   * value models a conversion (かんじ → 漢字). `trailingInput: false` models a
   * commit by blur/window switch, which no engine follows with `input`.
   */
  end({
    final = this.text,
    trailingInput = this.order === 'webkit',
    tick = true,
  }: { final?: string; trailingInput?: boolean; tick?: boolean } = {}) {
    if (!this.composing) return;
    const committed = this.prefix + final + this.suffix;
    if (final !== this.text) {
      if (this.order === 'gecko') {
        this.update(final, false);
      } else {
        // Blink/WebKit put the converted text into the DOM with the end.
        this.text = final;
        this.write(committed);
      }
    }
    this.composing = false;
    fireEvent.compositionEnd(this.el, { data: final });
    if (trailingInput) {
      // Only fires a React onChange if the DOM differs from what React last
      // saw — exactly as in a browser.
      this.write(this.el.value);
      fireEvent.input(this.el, {
        isComposing: false,
        inputType: 'insertFromComposition',
        data: final,
      });
    }
    if (tick) this.onStep?.();
  }

  /**
   * Types a sequence of compositions, e.g. 2-beolsik Hangul one syllable per
   * composition: `[['ㅎ','하','학','핛'], ['사','샂'], ['지','징'], ['우','워','원']]`
   * — each inner array is one composition's states; the composition is
   * committed with its last state, or with `commit` when the IME settles on
   * something else (`핛` + `ㅏ` commits `학` and opens `사`).
   *
   * A commit and the start of the next syllable happen in the same keystroke
   * (ㅏ ends `학` and opens `사`), so no time passes between them.
   */
  compose(
    syllables: Array<string[] | { states: string[]; commit: string }>,
    { leaveLastOpen = false }: { leaveLastOpen?: boolean } = {}
  ) {
    syllables.forEach((s, i) => {
      const { states, commit } = Array.isArray(s)
        ? { states: s, commit: s[s.length - 1] }
        : s;
      this.start();
      states.forEach((state) => this.update(state));
      const last = i === syllables.length - 1;
      if (!(last && leaveLastOpen)) this.end({ final: commit, tick: last });
    });
  }

  /** Plain, non-IME typing of one character (or a paste) at the end. */
  typeText(text: string) {
    this.write(this.el.value + text);
    fireEvent.input(this.el, { inputType: 'insertText', data: text });
    this.onStep?.();
  }

  /** The window/tab loses focus: the engine commits, then the field blurs. */
  switchWindow() {
    this.end({ trailingInput: false });
    fireEvent.blur(this.el);
  }
}

/**
 * 2-beolsik keystrokes for `학사지원`, one composition per syllable, the way
 * macOS/Windows Hangul IMEs report them. `핛`→`학`+`사`: the ㅅ that briefly
 * sat as a final consonant moves to the next syllable when ㅏ arrives.
 */
export const HAKSA_JIWON: Array<
  string[] | { states: string[]; commit: string }
> = [
  { states: ['ㅎ', '하', '학', '핛'], commit: '학' },
  { states: ['사', '샂'], commit: '사' },
  { states: ['지', '징'], commit: '지' },
  ['우', '워', '원'],
];
