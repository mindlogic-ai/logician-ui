import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The `thinking` loader's three dots.
 *
 * Local to this component for the same reason `Spinner`'s turn is local to
 * `Spinner.styles.ts` (see `src/theme/claude.md` → Motion → Components): a
 * loop with one caller belongs next to that caller, not in the shared
 * `animationStyle` vocabulary of eight. The 1.2s period and 0.15s stagger are
 * fixed by the house spec for this exact loader — not a preference this
 * component is free to retune — so they are named constants here rather than
 * literals scattered across the JSX.
 *
 * Reduced motion drops the loop entirely (`_motionReduce`): unlike `Spinner`,
 * which slows rather than stops because a frozen spinner reads as a hung
 * request, three static coral dots still read as "thinking" without motion —
 * there is no "stopped" misreading to guard against.
 */
export const THINKING_DOT_DURATION = '1.2s';
export const THINKING_DOT_STAGGER = '0.15s';

export const thinkingDotAnimation: SystemStyleObject = {
  animationName: 'pulse',
  animationDuration: THINKING_DOT_DURATION,
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
  _motionReduce: { animation: 'none' },
};
