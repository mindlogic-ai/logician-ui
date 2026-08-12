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
    /** Contact: a pointer going down. Shorter than `fast` so it reads as touch. */
    press: { value: '120ms' },
    /** The default for enters, leaves and reveals. */
    base: { value: '300ms' },
    /** Deliberate moves that carry the eye across the UI. */
    slow: { value: '500ms' },
    /** Count-ups that should feel earned. */
    slower: { value: '700ms' },
  },
};

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
   * Strokes a checkmark on instead of flashing it in, 60ms after the box fills.
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
        animation: `checkmark-draw var(--chakra-durations-motion-base) var(--chakra-easings-emphasized) 60ms both`,
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
 * The same curves as CSS strings, for the rare case where the `easings` token
 * cannot be reached (a keyframes string assembled outside a Chakra style
 * context). Prefer `var(--chakra-easings-emphasized)` where a variable resolves.
 */
export const MOTION_EASE_CSS: Record<MotionEaseToken, string> = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};
