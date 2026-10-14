import { ForwardedRef, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { appearIn } from './Appear.styles';
import { AppearProps } from './Appear.types';

/**
 * Brings an element in on mount — a fade, plus an optional scale (a *stamp*
 * landing on something) or vertical travel (content *arriving*).
 *
 * ## Which of the three entrances this is
 *
 * The library has three, and they are not interchangeable:
 *
 * - `animationStyle="presence"` — a part that **has both states**. Menus,
 *   popovers, modals: the node stays mounted and Chakra flips `_open` /
 *   `_closed`, so it can animate *out* as well as in.
 * - `staggerProps(index)` — items of **one list**, where the index is the
 *   cadence and the whole point is the rhythm between siblings.
 * - `Appear` — a **single element entering once**, on its own schedule, usually
 *   as a response to something the reader just did. The delay is hand-set per
 *   call site because there is no list to derive it from.
 *
 * The rule of thumb: if the element can close, use `presence`; if it has
 * siblings arriving with it, use `stagger`; otherwise this.
 *
 * ## What it does not do
 *
 * It does not animate out. CSS cannot animate an element that is being removed
 * from the DOM, which is exactly the gap `presence` fills by keeping the node
 * mounted. FactChat's version accepts an `exit` too, but only inside an
 * `AnimatePresence` ancestor — standalone it is a no-op there as well, so
 * nothing that actually ran is lost in the port.
 *
 * ## What it puts in the DOM
 *
 * **One `div` around `children`**, and layout props land on that wrapper rather
 * than on the child. Usually the same result — but the child is no longer a
 * *direct* child of what surrounds it, so animate the inner element instead of
 * wrapping when the parent needs its children directly: a `<tr>` needs `<td>`s,
 * and Ark parts (`Menu.List`, `Tree`) walk their own children for focus and
 * typeahead.
 *
 * ```tsx
 * <Appear scaleFrom={0.5}>✓</Appear>
 * <Appear rise={6} delayMs={120}>정답입니다</Appear>
 * ```
 */
export const Appear = forwardRef(
  (
    {
      scaleFrom,
      rise,
      delayMs,
      durationMs,
      children,
      css,
      ...rest
    }: AppearProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      {...rest}
      css={mergeCss(
        appearIn,
        // Omitted props leave the keyframe's identity defaults in place, so one
        // keyframe serves a plain fade, a stamp, an arrival, or all three.
        scaleFrom === undefined ? undefined : { '--appear-scale': scaleFrom },
        rise === undefined ? undefined : { '--appear-rise': `${rise}px` },
        delayMs === undefined ? undefined : { animationDelay: `${delayMs}ms` },
        durationMs === undefined
          ? undefined
          : { animationDuration: `${durationMs}ms` },
        css
      )}
    >
      {children}
    </Box>
  )
);

Appear.displayName = 'Appear';
