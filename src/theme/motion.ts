/**
 * Motion tokens — the timing layer of the design system.
 *
 * Durations and easing curves live here (not inline per animation) so every
 * animated surface shares one vocabulary and one feel — the same reason colors
 * and radii are tokens. Consume these instead of hardcoding a `0.25s` or a
 * `cubic-bezier(...)`.
 *
 * ## Why the durations carry a `motion.` prefix
 *
 * Chakra already ships a duration scale, and three of the names we want are
 * already taken with *different* values:
 *
 * | name     | Chakra | ours  |
 * | -------- | ------ | ----- |
 * | `fast`   | 150ms  | 150ms |
 * | `slow`   | 300ms  | 500ms |
 * | `slower` | 400ms  | 700ms |
 *
 * Redefining `slow`/`slower` would silently retime every Chakra component that
 * references them — `dialog`, `drawer` and `progress` all do — so a Modal's
 * backdrop would start fading over 500ms because we wanted a *reward flight* to
 * take that long. Prefixing keeps our scale and Chakra's side by side, and the
 * one thing a shared library must not do is change the meaning of a token it
 * did not define.
 *
 * The easings need no prefix: Chakra's are `ease-in` / `ease-out` /
 * `ease-in-out` / `ease-in-smooth`, so `standard` / `emphasized` / `overshoot`
 * collide with nothing.
 *
 * ## The two gaps we do NOT fill
 *
 * 150ms and 200ms are deliberately absent from {@link durations} — Chakra's
 * `fast` (150ms) and `moderate` (200ms) already cover them exactly. Adding
 * `motion.fast` next to `fast` would be two names for one number.
 *
 * ## Reduced motion
 *
 * Not handled here — it's a runtime concern. CSS transitions should pair with
 * `_motionReduce`, and animations built on other tech gate on their own
 * `prefers-reduced-motion` read.
 *
 * @example Chakra props
 * ```tsx
 * <Box transitionDuration="motion.base" transitionTimingFunction="emphasized" />
 * ```
 *
 * @example emotion / raw CSS
 * ```ts
 * css={{ animation: `pop var(--chakra-durations-motion-slow) var(--chakra-easings-emphasized)` }}
 * ```
 *
 * @example framer-motion — needs raw numbers, not CSS variables
 * ```tsx
 * <motion.div transition={{ duration: MOTION_DURATION_S.base, ease: MOTION_EASE.emphasized }} />
 * ```
 */

/**
 * Duration tokens, prefixed to sit alongside Chakra's own scale rather than
 * overwrite it. Pick by intent, not by number:
 *
 * - `motion.instant` — no transition; the "off" value for a token slot
 * - `motion.press`   — the physical response to a pointer going down: a sink, a
 *                      colour flip under the finger. Shorter than Chakra's
 *                      `fast` because it has to feel like *contact* rather than
 *                      like an animation
 * - `motion.base`    — the default for most transitions (enter/leave, reveals)
 * - `motion.slow`    — deliberate moves that carry the eye across the UI
 * - `motion.slower`  — count-ups that should feel earned, not instant
 *
 * For 150ms use Chakra's `fast`; for 200ms use Chakra's `moderate`.
 */
export const durations = {
  // Nested rather than flat `'motion.base'` keys: both spellings give the same
  // `motion.base` token path, but a literal dot in the key is escaped into the
  // variable name (`--chakra-durations-motion\.base`), which is unusable in
  // hand-written CSS. Nesting flattens to a clean `--chakra-durations-motion-base`.
  motion: {
    instant: { value: '0ms' },
    press: { value: '120ms' },
    base: { value: '300ms' },
    slow: { value: '500ms' },
    slower: { value: '700ms' },
  },
};

/**
 * Named easing curves.
 *
 * - `standard`   — symmetric, unremarkable; for utilitarian transitions
 * - `emphasized` — decisive ease-out; the house curve for enters and reveals.
 *                  Covers ~96% of the distance in the first half of its
 *                  duration, so it reads as *arriving then settling*
 * - `overshoot`  — springs slightly past then settles; reserved for celebratory
 *                  pops and for toggles that should feel physical. Because it
 *                  reverses direction it stays legible even over a few pixels,
 *                  which `standard` ↔ `emphasized` does not
 */
export const easings = {
  standard: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  emphasized: { value: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  overshoot: { value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
};

/**
 * Turning motion off for someone who asked for less of it.
 *
 * `prefers-reduced-motion` is an OS accessibility setting, not a preference in
 * our app. For people with a vestibular disorder, on-screen movement causes
 * dizziness and nausea — it is not a matter of taste. Zeroing the duration keeps
 * the *result* (the switch still flips, the colour still changes) and removes
 * only the travel between states.
 *
 * Spread into every preset below rather than written per component, because
 * "anything that animates must honour this" is a policy, not a decision a
 * component gets to make. Written 13 separate times, the 14th component forgets.
 */
const REDUCED = { _motionReduce: { transitionDuration: 'motion.instant' } };

/**
 * The transition presets — pick by intent, and the timing comes with it.
 *
 * Each takes the property (or properties) to animate, because that part *is*
 * per-element: the Switch moves its thumb, the ProgressBar its width. Naming it
 * is also not optional — CSS defaults `transition-property` to `all`, so a
 * duration on its own quietly animates every property on the element, which is
 * how `Button` ended up transitioning the width and padding a consumer set on
 * hover.
 *
 * These four are what eight components actually converged on. Before the
 * presets the same "a colour changes on hover" was written with four different
 * easings (`ease-out`, `ease-in`, `ease`, and none at all) across four files.
 *
 * @example
 * ```tsx
 * <SegmentGroup.Indicator {...transitions.travel('left, width')} />
 * <ChakraSwitch.Thumb {...transitions.spring('translate')} />
 * ```
 */
export const transitions = {
  /**
   * The physical response to a pointer going down. Shorter than everything else
   * because it has to feel like contact rather than like an animation — at
   * 250ms the finger is gone and the control is still sinking.
   */
  press: (property = 'scale') => ({
    transitionProperty: property,
    transitionDuration: 'motion.press',
    transitionTimingFunction: 'standard',
    ...REDUCED,
  }),

  /**
   * Hover and state feedback: a fill, a border, a shadow, an overlay. Quick,
   * because it answers something the member just did and then gets out of the
   * way.
   */
  feedback: (property: string) => ({
    transitionProperty: property,
    transitionDuration: 'fast',
    transitionTimingFunction: 'standard',
    ...REDUCED,
  }),

  /**
   * Something moves or grows to a new position — an indicator sliding between
   * segments, a bar filling. `emphasized` covers most of the distance
   * immediately and settles, which reads as arriving at a value that already
   * changed rather than accelerating from rest.
   */
  travel: (property: string) => ({
    transitionProperty: property,
    transitionDuration: 'motion.base',
    transitionTimingFunction: 'emphasized',
    ...REDUCED,
  }),

  /**
   * A physical state flip, or two things crossing over each other — a switch
   * thumb, an icon morphing into another. `overshoot` passes the target and
   * comes back, and because it reverses direction it stays legible even over a
   * few pixels, which `standard` ↔ `emphasized` does not.
   */
  /**
   * For the rare element that needs two clocks at once, so a single
   * duration cannot express it — `Button` presses on `motion.press` while its
   * colour and shadow run on `fast`. Pass the composed shorthand; the
   * reduced-motion guard comes with it, which is the whole reason this lives
   * here rather than being hand-written beside the string.
   */
  composite: (transition: string) => ({
    transition,
    _motionReduce: { transition: 'none' },
  }),

  spring: (property: string) => ({
    transitionProperty: property,
    transitionDuration: 'motion.base',
    transitionTimingFunction: 'overshoot',
    ...REDUCED,
  }),
};

/**
 * Dash length for {@link keyframes}' `checkmark-draw`, exported so the consuming
 * component sets `stroke-dasharray` from the same number the keyframe animates
 * to — two places, one value.
 */
export const CHECKMARK_DASH = 24;

/**
 * Drawing Chakra's checkmark on, as a style object rather than four lines
 * copied per call site.
 *
 * This is an `animation`, not a transition, and it does **not** turn off the
 * same way. Killing the animation alone would leave `stroke-dashoffset` parked
 * at its start value and the tick invisible, so the reduced-motion branch has to
 * undo `stroke-dasharray` as well — exactly the kind of per-case detail that
 * goes wrong when it is re-derived by hand.
 */
export const checkmarkDraw = {
  '& polyline, & path': {
    strokeDasharray: CHECKMARK_DASH,
    animation: `checkmark-draw var(--chakra-durations-motion-base) var(--chakra-easings-emphasized) 60ms both`,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& polyline, & path': { animation: 'none', strokeDasharray: 'none' },
  },
};

/**
 * Keyframes owned by the motion layer.
 *
 * `checkmark-draw` strokes Chakra's default checkmark on instead of flashing it
 * in. The icon is already stroke-based (`fill: none`, `stroke: currentColor`,
 * `polyline points="20 6 9 17 4 12"`), so a dash offset is all it takes; the
 * polyline measures ~22.6 user units, and 24 clears it with room to spare.
 */
export const keyframes = {
  'checkmark-draw': {
    from: { strokeDashoffset: '24' },
    to: { strokeDashoffset: '0' },
  },
};

/**
 * The duration scale in milliseconds, for animation tech that cannot read a CSS
 * variable — framer-motion, `Element.animate`, `setTimeout`-driven sequences.
 *
 * Includes `fast` (150) and `moderate` (200), which have no `motion.*` token
 * because Chakra already provides them: a JS consumer still needs the numbers,
 * and reading them from two places would be worse than listing them once here.
 */
export const MOTION_DURATION_MS = {
  instant: 0,
  press: 120,
  fast: 150,
  moderate: 200,
  base: 300,
  slow: 500,
  slower: 700,
} as const;

export type MotionDurationToken = keyof typeof MOTION_DURATION_MS;

/** The same scale in seconds — framer-motion's `transition.duration` unit. */
export const MOTION_DURATION_S = {
  instant: 0,
  press: 0.12,
  fast: 0.15,
  moderate: 0.2,
  base: 0.3,
  slow: 0.5,
  slower: 0.7,
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
 * The same curves as CSS `transition-timing-function` / `animation` strings,
 * for the rare case where the `easings` token cannot be reached (a keyframes
 * string assembled outside a Chakra style context).
 *
 * Prefer `var(--chakra-easings-emphasized)` where a CSS variable will resolve.
 */
export const MOTION_EASE_CSS: Record<MotionEaseToken, string> = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};
