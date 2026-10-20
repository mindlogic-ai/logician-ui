import {
  ChangeEvent,
  CompositionEvent,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * Keeps a controlled `Input`/`Textarea` safe to type Korean (or Japanese,
 * Chinese, Vietnamese…) into while its `value` is also written from outside.
 * Internal — shared by `Input` and `Textarea`, not part of the public API.
 *
 * ## The bug
 *
 * A controlled field is a promise that `node.value` equals `props.value`, and
 * React keeps it by writing the prop onto the node whenever a commit finds the
 * two disagreeing. Writing `.value` while an IME composition is open ends that
 * composition: the half-built jamo is left behind as literal text and the IME
 * commits the finished syllable on top of it — `학사지원` typed, `학사ㅈ지원`
 * on screen. A plain `setX(e.target.value)` consumer never triggers it (prop
 * and node stay in step); a *lagging* one does — a debounced term, a URL
 * round-trip, a store update that lands a keystroke late carrying text from
 * before the syllable in flight. Reported by 충북대 (inquiry #1389).
 *
 * ## What this does — and what it deliberately does NOT do
 *
 * **The guard is inward only.** While a composition is open the field stops
 * adopting outside values, so React's commit finds `props.value` already equal
 * to the node and never touches it. **Outward it stays transparent**: every
 * `input` event reaches the caller's `onChange`, composing or not.
 *
 * 🚨 Suppressing `onChange` until `compositionend` (logician-ui #183, and the
 * first shape of factchat-nextjs's `useCompositionSafeValue`, reverted after a
 * 2026-08-31 report) is a bug, not extra safety. A Hangul IME keeps the LAST
 * syllable composing until something commits it (space, a caret move, blur),
 * so a consumer that only hears committed syllables is always one syllable
 * stale: `김민` searched `김`; under a 2-character minimum, no search at all.
 *
 * ## The rules
 *
 * - Outside value while composing → remembered, not shown. At `compositionend`
 *   it is applied if it is a genuine outside change (form reset, clear,
 *   popstate). It is NOT applied when it is
 *   - one of our own emissions still coming back (`inFlight` — a lagging
 *     consumer echoes values from several keystrokes, even several syllables,
 *     ago; Chrome/Windows Hangul IMEs open one composition per syllable), or
 *   - equal to what the value was when the composition opened (a round-trip
 *     arriving with the pre-syllable text).
 *   The cost of the heuristic: an outside change that happens to restore one
 *   of those exact texts mid-composition is read as lag and ignored.
 * - At `compositionend` the node's own text is read and emitted (deduped) —
 *   a Japanese/Chinese conversion replaces the reading wholesale, and a blur /
 *   window switch commits with no trailing `input` at all.
 * - The trailing `input` some engines fire after `compositionend` (WebKit,
 *   iOS) is deduped so the consumer does not hear the same text twice.
 * - Adopting an outside value also moves `lastEmitted`, otherwise retyping the
 *   exact text after `reset()` would be swallowed by that dedupe.
 * - Between compositions an outside value is adopted as usual — except a
 *   stale echo: one of our emissions older than the latest one, i.e. the
 *   consumer still catching up. Adopting that would rewind the field, and the
 *   next syllable would be composed onto the rewound text.
 * - A blur that arrives while the field still believes it is composing (an
 *   Android keyboard that never sent `compositionend`) finishes the
 *   composition, so the field cannot stay deaf to outside values forever.
 *
 * ## Transforms (`normalize`)
 *
 * `Input` filters/formats (`trimWhiteSpace`, `noSpaces`, `maskNumber`). While
 * composing, the **display keeps the raw node text** — writing a transformed
 * string onto the node is itself a mid-composition write and would break the
 * IME — but the **emitted value is already normalized**, so the consumer's
 * value never violates the rule it asked for (no spaces means no spaces, even
 * mid-syllable). The emitted value differing from the node is safe: the echo
 * that comes back is in `inFlight` and is not adopted while composing. At
 * `compositionend` the transform is applied to the finished text and written
 * onto the node, which is now safe.
 *
 * ## Limits
 *
 * - Echo detection assumes the consumer hands values back unchanged and in
 *   order. A consumer that transforms them, or delivers them out of order
 *   (racing async writes), is treated as making outside changes. Fix such a
 *   write-back at its source.
 * - A genuine outside change that lands while an Android keyboard holds a
 *   whole-word composition open *with focus kept* is applied at the next
 *   `compositionend` or blur, not immediately.
 */

export type CompositionFieldElement = HTMLInputElement | HTMLTextAreaElement;
export type CompositionFieldValue =
  | string
  | number
  | readonly string[]
  | undefined;

/** How many of our own emissions may still be on their way back. */
const IN_FLIGHT_LIMIT = 64;

const asText = (value: CompositionFieldValue | null): string => {
  if (value === undefined || value === null) return '';
  if (Array.isArray(value)) return value.join(',');
  return String(value);
};

const identity = <T>(value: T) => value;

export interface UseCompositionSafeValueOptions<
  E extends CompositionFieldElement,
> {
  /** The `value` prop, exactly as the consumer passed it. */
  value: CompositionFieldValue;
  /**
   * Turns the node's raw text into the value handed to the consumer
   * (filters, number unformatting). Must be pure. Defaults to identity.
   */
  normalize?: (raw: string) => string;
  /**
   * Turns a value (an outside prop, or a normalized one) into what the node
   * should show when no composition is open. Defaults to identity.
   */
  toDisplay?: (value: CompositionFieldValue) => CompositionFieldValue;
  /**
   * Hands a value to the consumer. On `compositionend` (or a blur that
   * finishes a stuck composition) `event` is that event, cast; its
   * `target`/`currentTarget` is still the field node.
   */
  emit: (event: ChangeEvent<E>, value: string) => void;
  onCompositionStart?: (event: CompositionEvent<E>) => void;
  onCompositionEnd?: (event: CompositionEvent<E>) => void;
}

export interface CompositionSafeValue<E extends CompositionFieldElement> {
  /** What to pass as the node's `value`. */
  value: CompositionFieldValue;
  /** Overwrite the display (e.g. number formatting on blur). */
  setValue: (value: CompositionFieldValue) => void;
  /** Whether a composition is open right now. */
  isComposing: () => boolean;
  onChange: (event: ChangeEvent<E>) => void;
  onCompositionStart: (event: CompositionEvent<E>) => void;
  onCompositionEnd: (event: CompositionEvent<E>) => void;
  /** Call first thing in the field's `onBlur`. */
  finishOnBlur: (event: FocusEvent<E>) => void;
}

export const useCompositionSafeValue = <E extends CompositionFieldElement>(
  options: UseCompositionSafeValueOptions<E>
): CompositionSafeValue<E> => {
  // Handlers read the latest options; the components are not memoized and
  // their transforms close over props that can change between renders.
  const latest = useRef(options);
  latest.current = options;

  const { value } = options;
  const [display, setDisplay] = useState<CompositionFieldValue>(() =>
    (options.toDisplay ?? identity)(value)
  );

  const composing = useRef(false);
  /** The latest outside value, including one that arrived mid-composition. */
  const external = useRef(value);
  /** What the outside value was when the current composition opened. */
  const externalAtStart = useRef(value);
  /** The last text handed to the consumer. */
  const lastEmitted = useRef(asText(value));
  /**
   * Our emissions, oldest first, that the consumer may still echo back. A
   * value coming back drops everything emitted before it (deliveries arrive in
   * order), so this is the window of what is genuinely still in flight; a
   * genuine outside change clears it.
   */
  const inFlight = useRef<string[]>([]);
  /** Set at `compositionend`: the next `input` may be its trailing echo. */
  const dedupeNextChange = useRef(false);

  useEffect(() => {
    external.current = value;
    const text = asText(value);
    const at = inFlight.current.indexOf(text);
    if (at !== -1) inFlight.current = inFlight.current.slice(at);
    // The whole fix: never write onto the node while an IME is composing.
    if (composing.current) return;
    // An echo of something we emitted *before* our latest emission is the
    // consumer catching up, not a decision — adopting it would rewind the
    // field (and the next composition would open on the rewound text).
    if (at !== -1 && inFlight.current.length > 1) return;
    if (at === -1) inFlight.current = [];
    setDisplay((latest.current.toDisplay ?? identity)(value));
    // The consumer holds `value` now; compare the next keystroke against it,
    // or retyping the same text after a reset would be swallowed as a dupe.
    lastEmitted.current = text;
  }, [value]);

  const send = (event: ChangeEvent<E>, text: string, dedupe: boolean) => {
    if (dedupe && text === lastEmitted.current) return;
    lastEmitted.current = text;
    inFlight.current.push(text);
    if (inFlight.current.length > IN_FLIGHT_LIMIT) inFlight.current.shift();
    latest.current.emit(event, text);
  };

  const normalize = (raw: string) =>
    (latest.current.normalize ?? identity)(raw);
  const toDisplay = (v: CompositionFieldValue) =>
    (latest.current.toDisplay ?? identity)(v);

  const finish = (event: CompositionEvent<E> | FocusEvent<E>) => {
    composing.current = false;
    dedupeNextChange.current = true;
    const outside = external.current;
    const outsideText = asText(outside);
    const startText = asText(externalAtStart.current);
    externalAtStart.current = outside;

    if (outsideText !== startText && !inFlight.current.includes(outsideText)) {
      // Something outside moved the value while the syllable was in flight —
      // a form reset, a clear. Refusing it during the composition was about
      // not breaking the IME, not about ignoring it.
      inFlight.current = [];
      lastEmitted.current = outsideText;
      setDisplay(toDisplay(outside));
      return;
    }

    // Read the node, not the last `input`: a conversion (漢字) or a commit by
    // blur can land with no `input` event of its own.
    const text = normalize(event.currentTarget.value);
    setDisplay(toDisplay(text));
    send(event as unknown as ChangeEvent<E>, text, true);
  };

  const onChange = (event: ChangeEvent<E>) => {
    const raw = event.target.value;
    if (composing.current) {
      // Show exactly what the IME put there, so React has nothing to write
      // back — but tell the consumer right away (normalized), per keystroke.
      setDisplay(raw);
      send(event, normalize(raw), true);
      return;
    }
    const text = normalize(raw);
    setDisplay(toDisplay(text));
    const dedupe = dedupeNextChange.current;
    dedupeNextChange.current = false;
    send(event, text, dedupe);
  };

  const onCompositionStart = (event: CompositionEvent<E>) => {
    composing.current = true;
    dedupeNextChange.current = false;
    externalAtStart.current = external.current;
    latest.current.onCompositionStart?.(event);
  };

  const onCompositionEnd = (event: CompositionEvent<E>) => {
    // Idempotent: if a blur already finished this composition, this only
    // emits whatever the commit itself changed.
    finish(event);
    latest.current.onCompositionEnd?.(event);
  };

  const finishOnBlur = (event: FocusEvent<E>) => {
    if (composing.current) finish(event);
  };

  return {
    value: display,
    setValue: setDisplay,
    isComposing: () => composing.current,
    onChange,
    onCompositionStart,
    onCompositionEnd,
    finishOnBlur,
  };
};
