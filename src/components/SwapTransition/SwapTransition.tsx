import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { SWAP_OUT_MS, swapIn, swapOut } from './SwapTransition.styles';
import { SwapTransitionProps } from './SwapTransition.types';

/**
 * Swaps one piece of content for another with a directional slide — the house
 * gesture for moving between steps of a sequence, or between records in the
 * same frame.
 *
 * The outgoing content leaves *against* the travel direction, so the pair reads
 * as one movement rather than as two things passing each other.
 *
 * ## The one primitive here that needs React to hold state
 *
 * The others are CSS: a keyframe plays on mount, or a changed `key` replays one.
 * This cannot be, because the outgoing content has to stay on screen long enough
 * to leave, and React has already been told to render the new content. So this
 * keeps the previous children in state for exactly one exit, then swaps.
 *
 * That is a smaller thing than an animation library, and it is the *whole*
 * reason `framer-motion` looked necessary for this file — `AnimatePresence` is a
 * general answer to the same problem. Here the problem is one element and one
 * exit, so the general answer costs more than it returns.
 *
 * ```tsx
 * <SwapTransition transitionKey={step}>
 *   {STEPS[step]}
 * </SwapTransition>
 * ```
 */
export const SwapTransition = forwardRef(
  (
    {
      transitionKey,
      distance = 24,
      animateInitial = false,
      children,
      css,
      ...rest
    }: SwapTransitionProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const [shown, setShown] = useState<{
      key: string | number;
      node: ReactNode;
      // Counts plays rather than reusing the key, so swapping A → B → A still
      // animates the second arrival at A.
      play: number;
    }>({ key: transitionKey, node: children, play: animateInitial ? 1 : 0 });

    const [leaving, setLeaving] = useState<ReactNode>(null);

    // Read inside the effect rather than depended upon: `children` is a new
    // object every render, and listing it would restart the swap continuously.
    const latest = useRef(children);
    latest.current = children;

    useEffect(() => {
      if (transitionKey === shown.key) {
        // Same content, re-rendered — update in place without replaying.
        setShown((s) => ({ ...s, node: latest.current }));
        return;
      }

      setLeaving(shown.node);
      const timer = setTimeout(() => {
        setLeaving(null);
        setShown((s) => ({
          key: transitionKey,
          node: latest.current,
          play: s.play + 1,
        }));
      }, SWAP_OUT_MS);

      return () => clearTimeout(timer);
      // `shown` is deliberately absent from the deps: the effect *sets* it, and
      // depending on it would start a second swap out of the first one's own
      // result.
    }, [transitionKey]);

    return (
      <Box
        ref={ref}
        display="grid"
        {...rest}
        css={mergeCss({ '--swap-distance': `${distance}px` }, css)}
      >
        {/* Both live in one grid cell so the outgoing content does not push the
            incoming one down for the frames they overlap. */}
        {leaving !== null && (
          <Box gridArea="1 / 1" css={swapOut} aria-hidden pointerEvents="none">
            {leaving}
          </Box>
        )}
        {leaving === null && (
          <Box
            gridArea="1 / 1"
            key={shown.play}
            css={shown.play === 0 ? undefined : swapIn}
          >
            {shown.node}
          </Box>
        )}
      </Box>
    );
  }
);

SwapTransition.displayName = 'SwapTransition';
