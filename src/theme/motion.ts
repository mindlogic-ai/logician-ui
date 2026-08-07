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
