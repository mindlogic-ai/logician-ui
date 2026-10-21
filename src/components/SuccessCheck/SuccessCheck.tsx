import { ForwardedRef, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { successMarkDraw } from './SuccessCheck.styles';
import { SuccessCheckProps } from './SuccessCheck.types';

/**
 * A success mark that draws itself: the ring closes, then the tick is written
 * inside it.
 *
 * For the end of something the reader waited through — a report finished,
 * onboarding completed, an import that ran. Mount it when the work is done; it
 * draws once and stays.
 *
 * **Not for a state that can change back.** This is a full stop, and drawing
 * one spends 600ms of the reader's attention. A row that is currently valid, a
 * saved indicator that will say `unsaved` again in a minute, a checkbox — those
 * are states, and a state gets an icon rather than a ceremony. `Checkbox`
 * already owns the tick-draw for the state case.
 *
 * **It confirms; it does not say what happened.** Pair it with copy. `label` is
 * required for the same reason: a graphic with no text of its own announces
 * nothing without one.
 *
 * Colour comes from `currentColor`, so it inherits where it sits. Colour the
 * surrounding element with a semantic token rather than this one —
 * `success.main` for a plain confirmation, `accent.positive` for the one figure
 * on a screen that says *gained*.
 *
 * Under reduced motion the drawing is removed and the finished mark is simply
 * there. The confirmation survives; only the ceremony goes.
 *
 * **Adds one `div` around the drawing**, the way `Shake` does, because the
 * motion is applied to the shapes through it. Layout props land on that
 * wrapper.
 *
 * ```tsx
 * <Stack align="center" color="success.main">
 *   <SuccessCheck label="리포트 생성 완료" />
 *   <Text>리포트를 만들었어요</Text>
 * </Stack>
 * ```
 */
export const SuccessCheck = forwardRef(
  (
    { label, size = '48px', css, ...rest }: SuccessCheckProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      display="inline-flex"
      boxSize={size}
      color="currentColor"
      {...rest}
      css={mergeCss(successMarkDraw, css)}
    >
      <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-label={label}
      >
        <circle cx="12" cy="12" r="10.5" strokeWidth="1.5" />
        {/* Scaled to clear the ring's stroke: Chakra's own `20 6 9 17 4 12`
            puts its top-right tip 10 units from centre, which a 2-unit stroke
            pushes past r=10.5. Runs the same direction as Chakra's, so
            `tick-draw` reveals it end-first the way a tick is written. Moving
            these points means re-deriving `TICK_DASH`. */}
        <polyline points="17 8.5 10.5 15.5 7 12" strokeWidth="2" />
      </svg>
    </Box>
  )
);

SuccessCheck.displayName = 'SuccessCheck';
