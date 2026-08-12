import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The shape of one entry in a Chakra composition slot.
 *
 * Not `defineAnimationStyles`: that helper narrows values to the `animation*`
 * properties, and these presets are mostly `transition*`. Chakra offers three
 * composition slots — `textStyle`, `layerStyle`, `animationStyle` — and none is
 * typed for transitions, while the theme slot itself accepts any style object.
 * Typing it here keeps the values fully checked (conditions and nested selectors
 * included) without a cast.
 */
type MotionStyle = { value: SystemStyleObject };

/**
 * Motion tokens — the timing layer of the design system.
 *
 * Laid out like the type layer: a primitive scale ({@link durations},
 * {@link easings}) plus a named composition on top of it ({@link animationStyles}),
 * both registered in the theme. Component code names the intent and the timing
 * comes with it, the same way `textStyle="h3"` carries a family, size, weight,
 * leading and tracking.
 *
 * ```tsx
 * <Switch.Thumb animationStyle="spring" transitionProperty="translate" />
 * ```
 *
 * ## Why the durations carry a `motion.` prefix
 *
 * Chakra already ships a duration scale, and two of the names we want are taken
 * with *different* values — `slow` is 300ms there and 500ms here, `slower` is
 * 400ms there and 700ms here. Its `dialog`, `drawer` and `progress` recipes read
 * those, so redefining them would retime components we do not own. The easings
 * need no prefix: Chakra's are `ease-in` / `ease-out` / `ease-in-out` /
 * `ease-in-smooth`, so ours collide with nothing.
 *
 * 150ms and 200ms are deliberately absent — Chakra's `fast` and `moderate`
 * already are those numbers, and two names for one value is worse than a
 * prefix.
 */

/**
 * The duration scale. Pick a preset from {@link animationStyles} rather than one
 * of these directly; these are the raw material the presets are built from.
 */
export const durations = {
  // Nested rather than flat `'motion.base'` keys: both spellings give the same
  // `motion.base` token path, but a literal dot in the key is escaped into the
  // variable name (`--chakra-durations-motion\.base`), which is unusable in
  // hand-written CSS. Nesting flattens to a clean `--chakra-durations-motion-base`.
  motion: {
    /** No transition — the "off" value a reduced-motion guard swaps in. */
    instant: { value: '0ms' },
    /**
     * The gap that turns one event into two beats — the checkbox's tick waits
     * this long after the box fills, the radio's dot after its ring. Short
     * enough to read as one gesture, long enough that the second half is not
     * lost in the first. It was written as a literal `60ms` in two presets
     * before it had a name; a third would have invented a fourth number.
     */
    beat: { value: '60ms' },
    /** Contact: a pointer going down. Shorter than `fast` so it reads as touch. */
    press: { value: '120ms' },
    /** The default for enters, leaves and reveals. */
    base: { value: '300ms' },
    /** Deliberate moves that carry the eye across the UI. */
    slow: { value: '500ms' },
    /** Count-ups that should feel earned. */
    slower: { value: '700ms' },
    /**
     * Continuous motion. Three values rather than one, because a loop's period
     * is set by how far it travels: the spinner covers 360° in a 16px circle,
     * the shimmer crosses the full width of whatever it is laid on. One number
     * for both would leave the spinner leisurely or the sweep frantic.
     *
     * All three are well over the ~200ms of a finite transition. A loop is
     * ambient — it has to stay readable without asking to be watched, and
     * anything quick enough to be *noticed* in peripheral vision reads as
     * agitation.
     */
    loop: {
      /** One full rotation of a spinner. Preserves the 0.65s it was born with. */
      turn: { value: '650ms' },
      /** One breath of a placeholder pulsing in place. */
      ambient: { value: '1200ms' },
      /** One pass of something crossing its whole container. */
      sweep: { value: '1800ms' },
    },
    stagger: {
      /**
       * The gap between one list item arriving and the next. Nested a level
       * deeper than the rest of the scale so the token path flattens to
       * `--chakra-durations-motion-stagger-step`, which `staggerProps` can name
       * in a hand-written `calc()`.
       *
       * 35ms is the width of the window where a list reads as *dealt* rather
       * than as either one block (below ~20ms) or a queue the reader is waiting
       * on (above ~50ms).
       */
      step: { value: '35ms' },
    },
  },
};

/**
 * How many steps of {@link durations}`.motion.stagger.step` a list may accrue
 * before the delay stops growing.
 *
 * The cap is the whole reason the stagger is usable. Without it the delay is
 * linear in the index, so a 40-row list finishes arriving 1.4s after the first
 * row — the last rows are not staggered, they are *late*, and any list long
 * enough to be worth staggering is long enough to feel broken. Six steps is
 * 210ms, which is under the ~250ms at which a delay stops reading as rhythm and
 * starts reading as lag; everything past the sixth item arrives together, which
 * nobody notices because by then the eye is at the top of the list.
 */
export const MOTION_STAGGER_MAX = 6;

/**
 * The easing curves.
 *
 * - `standard` — symmetric and unremarkable; utilitarian transitions
 * - `emphasized` — decisive ease-out, the house curve for arriving at a value.
 *   Covers ~96% of the distance in the first half of its duration
 * - `overshoot` — passes the target and settles back. Because it reverses
 *   direction it stays legible over a few pixels, which the other two do not
 */
export const easings = {
  standard: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  emphasized: { value: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  overshoot: { value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
};

/**
 * Reduced motion, applied once per preset rather than per component.
 *
 * `prefers-reduced-motion` is an OS accessibility setting, not a taste — for
 * someone with a vestibular disorder on-screen movement causes nausea. Zeroing
 * the duration keeps the *result* (the switch still flips, the colour still
 * changes) and removes only the travel between states.
 *
 * It lives inside the presets because "anything that animates must honour this"
 * is a policy, not a per-component decision.
 */
const REDUCED = { _motionReduce: { transitionDuration: 'motion.instant' } };

/**
 * Enter and exit are not the same length, and that is a policy rather than a
 * per-component taste.
 *
 * An enter has to be *read* — something new arrived and the reader has to find
 * it — so it gets the full `motion.base` and the `emphasized` curve that covers
 * most of the distance early and settles. An exit has already been decided:
 * the reader dismissed the thing and is looking at what is behind it, so every
 * millisecond the leaving element still owns the screen is a millisecond of
 * waiting. Half the time, on the neutral curve.
 *
 * Only the *clock* is here, never `animation-name`. Each Chakra recipe already
 * names the right movement for its part — the menu slides from its trigger,
 * the popover scales from its origin, the collapsible interpolates the `--height`
 * Ark measures — and those names are the one thing a shared policy must not
 * overwrite. Declaring the timing and nothing else lets the same preset sit on
 * six unrelated parts: our longhands land in the `styles` layer and beat the
 * recipe's per property, while `animation-name`, which we never declare, falls
 * through untouched. A preset that also set the name would have flattened the
 * collapsible's height animation into a fade.
 *
 * Reduced motion keeps a plain fade rather than zeroing the duration, for the
 * reason the Modal already had one: a surface that appears with no transition
 * at all reads as a page swap. The movement is what has to go, not the fact
 * that something changed.
 */
const PRESENCE_TIMING = {
  _open: {
    animationDuration: 'motion.base',
    animationTimingFunction: 'emphasized',
  },
  _closed: {
    animationDuration: 'fast',
    animationTimingFunction: 'standard',
  },
  _motionReduce: {
    _open: { animationName: 'fade-in' },
    _closed: { animationName: 'fade-out' },
  },
} as const;

/**
 * Reduced motion for a **loop** is not `duration: 0`.
 *
 * A finite transition can be zeroed because its job is to connect two states
 * and the end state survives. A loop has no end state: zeroing it either
 * freezes the element mid-cycle — a spinner stuck at some arbitrary angle,
 * which reads as a hung request rather than a working one — or removes the only
 * thing on screen saying work is happening. So each loop preset decides for
 * itself what "still meaningful, but not moving at you" is, and the four
 * answers are genuinely different: the spinner slows down and keeps turning
 * because it *is* the signal; the shimmer, the pulse and the indeterminate bar
 * stop, because what they signal ("this is a placeholder") is carried by the
 * shape, not the movement.
 *
 * This is also where WCAG 2.2.2 (Pause, Stop, Hide) lands. It applies to motion
 * that starts automatically, runs more than five seconds and is presented
 * alongside other content — which is exactly a skeleton screen during a slow
 * request, the one case these presets exist for. There is no pause control on a
 * placeholder, so honouring `prefers-reduced-motion` by actually *stopping* is
 * how the loops stay on the right side of it.
 */
const LOOP = { animationIterationCount: 'infinite' } as const;

/**
 * Dash length for the `checkmark-draw` keyframe. Declared once so the pattern
 * the tick is hidden behind and the offset the keyframe animates away are the
 * same number. Chakra's polyline measures ~22.6 user units; 24 clears it.
 */
const CHECKMARK_DASH = 24;

/**
 * The motion vocabulary — four intents, plus two escape hatches.
 *
 * Applied as `animationStyle="<name>"`, the same shape as `textStyle="h3"`, so
 * a consuming app can remap one in its own config without forking anything.
 *
 * Each transition preset leaves `transition-property` at `none` and expects the
 * call site to name what moves, because that part genuinely varies per element —
 * the Switch moves its thumb, the ProgressBar its width. `none` rather than an
 * omission is deliberate: CSS defaults `transition-property` to `all`, so a
 * preset with no property would quietly animate every property on the element
 * (this is how Button once animated a consumer's width and padding on hover).
 * Forgetting the prop now means *nothing* moves, which is visible, instead of
 * *everything* moving, which is not.
 *
 * ```tsx
 * <SegmentGroup.Indicator animationStyle="travel" transitionProperty="left, width" />
 * ```
 */
export const animationStyles = {
  press: {
    value: {
      // The one preset with a real default: a press is a scale, always.
      transitionProperty: 'scale',
      transitionDuration: 'motion.press',
      transitionTimingFunction: 'standard',
      ...REDUCED,
    },
  },

  feedback: {
    value: {
      transitionProperty: 'none',
      transitionDuration: 'fast',
      transitionTimingFunction: 'standard',
      ...REDUCED,
    },
  },

  travel: {
    value: {
      transitionProperty: 'none',
      transitionDuration: 'motion.base',
      transitionTimingFunction: 'emphasized',
      ...REDUCED,
    },
  },

  spring: {
    value: {
      transitionProperty: 'none',
      transitionDuration: 'motion.base',
      transitionTimingFunction: 'overshoot',
      ...REDUCED,
    },
  },

  /**
   * For an element that needs two clocks at once, which a single duration cannot
   * express — `Button` presses on `motion.press` while its colour and shadow run
   * on `fast`. Write the composed `transition` shorthand yourself and take the
   * reduced-motion guard from here.
   */
  composite: {
    value: { _motionReduce: { transition: 'none' } },
  },

  /**
   * `travel`, delivered through custom properties instead of style props.
   *
   * Ark writes some parts' `transition-*` declarations **inline**, and an inline
   * declaration beats any class rule, so the presets above never reach them.
   * What Ark leaves open are the custom properties its inline `var()`s read:
   * `transition-duration: var(--transition-duration, 150ms)` and
   * `transition-timing-function: var(--transition-timing-function)`. Setting
   * those is the only way in.
   *
   * `SegmentGroup.Indicator` is the one such part in this library. Its property
   * list stays Ark's (`left, top, width, height`) — already right, and the one
   * thing written inline that cannot be changed.
   */
  arkTravel: {
    value: {
      '--transition-duration': 'var(--chakra-durations-motion-base)',
      '--transition-timing-function': 'var(--chakra-easings-emphasized)',
      _motionReduce: {
        '--transition-duration': 'var(--chakra-durations-motion-instant)',
      },
    },
  },

  /**
   * The enter/exit clock, for any part that has an open and a closed state.
   *
   * Applied as `animationStyle="presence"` to a Chakra or Ark presence part —
   * menu content, popover, tooltip, select content, collapsible content — it
   * retimes what that part already does without touching *what* it does. See
   * {@link PRESENCE_TIMING} for why the ratio is what it is and why the preset
   * deliberately declares no `animation-name`.
   *
   * Not every surface with an open state is reachable this way. Chakra's toast
   * moves on a `transition` shorthand rather than a keyframe animation, so an
   * `animation-*` clock lands on it and does nothing at all — retiming that one
   * means rewriting the shorthand, which is a `composite` job and a separate
   * decision.
   */
  presence: {
    value: { ...PRESENCE_TIMING },
  },

  /**
   * The Modal's own enter and exit, on one element via `_open` / `_closed`.
   *
   * Chakra's `motionPreset: "scale"` already gets the ratio right — 200ms in,
   * 100ms out — but scales from a flat 0.95 with no vertical travel and no
   * named curve. This enters from slightly lower and smaller so the dialog
   * reads as coming toward the reader, and leaves by shrinking a little without
   * the travel, because an exit only has to get out of the way.
   *
   * The two keyframes stay bespoke — no other surface enters by rising toward
   * the reader — but the clock is now `presence`'s, spread in rather than
   * restated. The numbers were already identical; the point is that they can no
   * longer drift apart, and that the asymmetry test below reaches this preset
   * as well.
   */
  modal: {
    value: {
      _open: { animationName: 'modal-in', ...PRESENCE_TIMING._open },
      _closed: { animationName: 'modal-out', ...PRESENCE_TIMING._closed },
      _motionReduce: PRESENCE_TIMING._motionReduce,
    },
  },

  /**
   * The spinner's turn.
   *
   * `linear`, and this is the one preset where the curve is not a preference:
   * an eased rotation decelerates into 360° and accelerates out of 0°, but
   * those are the same position, so the eye sees a stutter once per turn. A
   * loop that returns to its own start has no seam only if the rate is
   * constant.
   *
   * Under reduced motion it keeps turning, at roughly half speed. A spinner is
   * the only thing on screen asserting that the request is still alive; freezing
   * it says the opposite. Slower movement is the concession — see {@link LOOP}.
   */
  spin: {
    value: {
      // Chakra's `spin` keyframe (0deg → 360deg) rather than one of ours: it is
      // already exactly right, and redefining a keyframe we did not author would
      // silently retime every Chakra component that reaches for it — the same
      // trap the `motion.` duration prefix exists to avoid.
      animationName: 'spin',
      animationDuration: 'motion.loop.turn',
      animationTimingFunction: 'linear',
      ...LOOP,
      _motionReduce: { animationDuration: 'motion.loop.sweep' },
    },
  },

  /**
   * A placeholder breathing in place — opacity only, no travel.
   *
   * Stops flat under reduced motion. What a pulse communicates is "this box is
   * not content yet", and the box goes on saying that while perfectly still.
   */
  pulse: {
    value: {
      // Chakra's `pulse` keyframe (50% { opacity: 0.5 }), for the same reason
      // `spin` reuses its rotation.
      animationName: 'pulse',
      animationDuration: 'motion.loop.ambient',
      animationTimingFunction: 'standard',
      ...LOOP,
      _motionReduce: { animationName: 'none' },
    },
  },

  /**
   * A highlight sweeping across a placeholder. The call site owns the gradient;
   * this preset only slides it, because the background is the part that varies
   * (a skeleton's wash is not a progress bar's).
   *
   * Static under reduced motion — a horizontal wipe is the loop most likely to
   * provoke the vestibular response the media query is asking us to avoid.
   */
  shimmer: {
    value: {
      animationName: 'shimmer',
      animationDuration: 'motion.loop.sweep',
      animationTimingFunction: 'standard',
      ...LOOP,
      _motionReduce: { animationName: 'none' },
    },
  },

  /**
   * A bar sliding across its track for work of unknown length — the
   * determinate bar's counterpart, where there is no percentage to show.
   *
   * `linear`, like `spin`: this one also restarts from its own start, and an
   * eased sweep pauses at the edge of the track every cycle, which reads as the
   * request having stalled there.
   *
   * Under reduced motion the bar stops travelling and simply sits in the track.
   * That loses the "still working" signal, which is the cost — but a bar
   * repeatedly crossing the viewport is the highest-risk motion of the four,
   * and the surrounding UI (a disabled control, a status line) is where that
   * signal belongs anyway.
   */
  indeterminate: {
    value: {
      animationName: 'indeterminate',
      animationDuration: 'motion.loop.sweep',
      animationTimingFunction: 'linear',
      ...LOOP,
      _motionReduce: { animationName: 'none' },
    },
  },

  /**
   * List items arriving one after another instead of all at once.
   *
   * Applied through {@link staggerProps}, which supplies the per-item
   * `--stagger-index`; this preset supplies everything else, including the cap.
   *
   * **An animation, not a `transition-delay`.** A transition needs a previous
   * value to interpolate from, and a list item that has just mounted has none,
   * so the delay would have nothing to delay. Worse, `transition-delay` is
   * unconditional: it applies to *every* later property change on that element,
   * so a hover would wait its index out, and a filter keystroke that re-renders
   * the list would re-delay all of it. An `animation` runs once, when the
   * element mounts — which is precisely the enter, and only the enter.
   *
   * For a part that stays mounted while closed (Ark keeps menu and select
   * content in the DOM after the first open), mounting is not enough on its own,
   * so the closed branch parks `animation-name` at `none`. Reopening flips the
   * name back and a changed `animation-name` restarts the animation — the same
   * gate, expressed in the only vocabulary CSS has for "again".
   */
  stagger: {
    value: {
      '--stagger-max': String(MOTION_STAGGER_MAX),
      animationName: 'stagger-in',
      animationDuration: 'motion.base',
      animationTimingFunction: 'emphasized',
      // `both` so the item holds the keyframe's opening frame through its
      // delay. Without it every item is fully painted first and then jumps back
      // to invisible when its turn comes.
      animationFillMode: 'both',
      animationDelay:
        'calc(min(var(--stagger-index, 0), var(--stagger-max)) * var(--chakra-durations-motion-stagger-step))',
      // The ancestor's closed state, not the item's — a list item has no
      // open/closed state of its own.
      '[data-state="closed"] &': { animationName: 'none' },
      // Not `animationName: none` alone: dropping the delay is the point, and
      // the item still has to end up visible, which `both` + a live name would
      // otherwise decide. Killing the name does that in one.
      _motionReduce: { animationName: 'none', animationDelay: '0ms' },
    },
  },

  /**
   * The radio's mark: the ring fills, then the dot springs in one `motion.beat` later — the
   * same two beats as the checkbox, "pressed" then "confirmed".
   *
   * An animation rather than a transition, for the same reason the checkmark is
   * one: Chakra only mounts `.dot` once the item is checked, so there is no
   * previous value for a transition to interpolate from. Scale is the only thing
   * a dot can do, and `overshoot` is what makes 8px of growth legible — it
   * reverses direction, which the other curves do not.
   *
   * Unlike `checkmarkDraw`, the reduced-motion branch only has to switch the
   * animation off: the recipe already declares the dot's resting `scale: 0.4`,
   * so removing the animation lands it exactly where it belongs. The checkmark
   * has to undo its dash pattern as well, because that one is only correct
   * *while* the animation runs.
   *
   * The fill transition lives here too rather than in `feedback`, because this
   * element is both the ring that fills and the dot's parent, and it can only
   * carry one `animationStyle`.
   */
  dotPop: {
    value: {
      transitionProperty: 'background-color, border-color',
      transitionDuration: 'fast',
      transitionTimingFunction: 'standard',
      '& .dot': {
        animation: `dot-pop var(--chakra-durations-motion-base) var(--chakra-easings-overshoot) var(--chakra-durations-motion-beat) both`,
      },
      _motionReduce: {
        transitionDuration: 'motion.instant',
        '& .dot': { animation: 'none' },
      },
    },
  },

  /**
   * Strokes a checkmark on instead of flashing it in, one `motion.beat` after the box fills.
   *
   * **Not general.** Unlike the four intents, this one is sized to one icon: the
   * dash is {@link CHECKMARK_DASH} user units, which covers Chakra's ~22.6-unit
   * checkmark in a 24 viewBox and nothing longer. Applied to a longer path the
   * far end would never be revealed; applied to a filled (non-stroke) icon
   * nothing happens at all, because there is no stroke to dash. Another icon
   * that wants to be drawn on needs its own preset with its own dash length —
   * measure the path, do not reuse this number.
   *
   * This is an `animation`, not a transition, and it does not turn off the same
   * way: killing the animation alone would park `stroke-dashoffset` at its start
   * value and leave the tick invisible, so the reduced-motion branch has to undo
   * the dash pattern as well.
   */
  checkmarkDraw: {
    value: {
      '& polyline, & path': {
        strokeDasharray: CHECKMARK_DASH,
        animation: `checkmark-draw var(--chakra-durations-motion-base) var(--chakra-easings-emphasized) var(--chakra-durations-motion-beat) both`,
      },
      _motionReduce: {
        '& polyline, & path': { animation: 'none', strokeDasharray: 'none' },
      },
    },
  },
} satisfies Record<string, MotionStyle>;

/** Every name `animationStyle` accepts from this theme. */
export type MotionStyleToken = keyof typeof animationStyles;

/**
 * Keyframes owned by the motion layer.
 *
 * Chakra's checkmark is already stroke-based (`fill: none`,
 * `stroke: currentColor`, `polyline points="20 6 9 17 4 12"`), so a dash offset
 * draws it without swapping in a custom icon.
 */
export const keyframes = {
  // Enter from slightly below and smaller; leave by shrinking in place. The
  // exit deliberately drops the translate — travelling away draws the eye to
  // something that is leaving.
  'modal-in': {
    from: { opacity: '0', scale: '0.94', translate: '0 10px' },
    to: { opacity: '1', scale: '1', translate: '0 0' },
  },
  'modal-out': {
    from: { opacity: '1', scale: '1' },
    to: { opacity: '0', scale: '0.97' },
  },
  // The dot only mounts on check, so it grows from nothing. `0.4` is where
  // Chakra's radiomark recipe rests it; ending anywhere else would make the dot
  // jump the moment the animation hands back.
  'dot-pop': {
    from: { scale: '0' },
    to: { scale: '0.4' },
  },
  'checkmark-draw': {
    // Negative, not positive. Chakra's polyline runs `20 6 → 9 17 → 4 12`, so
    // its *start* is the long stroke's top-right tip. A positive offset reveals
    // from the path start, which draws the tick backwards — right tip down to
    // the left one. A negative offset reveals from the path *end* instead, so
    // the stroke grows out of the short left tip and up to the right, the way a
    // tick is written.
    from: { strokeDashoffset: String(-CHECKMARK_DASH) },
    to: { strokeDashoffset: '0' },
  },

  // `spin` and `pulse` are deliberately absent: Chakra already defines both
  // (0deg→360deg, and 50% { opacity: 0.5 }), and its own Spinner and Skeleton
  // read them by name. Re-declaring a keyframe under a name we did not author
  // replaces it everywhere, so two identical definitions today become a silent
  // retime of someone else's component the day one of them is edited. The
  // `spin` and `pulse` *presets* above name Chakra's keyframes and own only the
  // timing, which is the part we actually have an opinion about.

  // A highlight crossing a gradient the call site owns. Moves the background
  // position rather than a pseudo-element, so it composites on the GPU and
  // needs no extra node inside every skeleton block. Right-to-left over a
  // 400%-wide gradient — the direction a sweep is read in, and wide enough that
  // the bright band is off-screen at both ends instead of parked at the edge.
  shimmer: {
    from: { backgroundPosition: '200% 0' },
    to: { backgroundPosition: '-200% 0' },
  },
  // A bar of unknown length crossing its track. Starts fully off the left edge
  // and ends fully off the right, so neither end of the cycle shows the bar
  // sitting still at a boundary — the frame that makes an indeterminate bar
  // look stalled rather than working.
  indeterminate: {
    from: { translate: '-100% 0' },
    to: { translate: '250% 0' },
  },
  // Deliberately small: 6px, not the 10px the modal rises. A staggered list
  // plays this once per item, so travel that reads as purposeful on one dialog
  // reads as the whole list swimming when it happens eight times in sequence.
  'stagger-in': {
    from: { opacity: '0', translate: '0 6px' },
    to: { opacity: '1', translate: '0 0' },
  },
};

/**
 * The duration scale in milliseconds, for animation tech that cannot read a CSS
 * variable — framer-motion, `Element.animate`, `setTimeout`-driven sequences.
 *
 * Includes `fast` (150) and `moderate` (200), which have no `motion.*` token
 * because Chakra already provides them: a JS consumer still needs the numbers.
 */
export const MOTION_DURATION_MS = {
  instant: 0,
  beat: 60,
  press: 120,
  fast: 150,
  moderate: 200,
  base: 300,
  slow: 500,
  slower: 700,
  loopTurn: 650,
  loopAmbient: 1200,
  loopSweep: 1800,
  staggerStep: 35,
} as const;

export type MotionDurationToken = keyof typeof MOTION_DURATION_MS;

/** The same scale in seconds — framer-motion's `transition.duration` unit. */
export const MOTION_DURATION_S = {
  instant: 0,
  beat: 0.06,
  press: 0.12,
  fast: 0.15,
  moderate: 0.2,
  base: 0.3,
  slow: 0.5,
  slower: 0.7,
  loopTurn: 0.65,
  loopAmbient: 1.2,
  loopSweep: 1.8,
  staggerStep: 0.035,
} as const;

/**
 * The curves as `[x1, y1, x2, y2]` tuples — the shape framer-motion's `ease`
 * prop accepts directly.
 */
export const MOTION_EASE = {
  standard: [0.4, 0, 0.2, 1],
  emphasized: [0.22, 1, 0.36, 1],
  overshoot: [0.34, 1.56, 0.64, 1],
} as const;

export type MotionEaseToken = keyof typeof MOTION_EASE;

/**
 * The same curves as CSS strings, for the rare case where the `easings` token
 * cannot be reached (a keyframes string assembled outside a Chakra style
 * context). Prefer `var(--chakra-easings-emphasized)` where a variable resolves.
 */
export const MOTION_EASE_CSS: Record<MotionEaseToken, string> = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};
