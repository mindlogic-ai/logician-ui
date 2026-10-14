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
 * ## One element, and the children are yours
 *
 * Two rules this has to keep, both learned by breaking them:
 *
 * **It renders a single box.** Everything the caller passes lands on the element
 * that actually animates, so a wrapper told to fill — `display="flex" flex={1}
 * minH={0}`, the shape a full-height pane needs — still fills. An earlier
 * version stacked the two states in a grid cell and put the children one level
 * further in; the sizing props stopped reaching them, and a pane that should
 * have filled its column collapsed to content height with the action bar riding
 * up under it. The two states are mutually exclusive anyway — only ever one of
 * them is on screen — so the cell they were sharing bought nothing.
 *
 * **It renders `children` directly, never a copy.** The same earlier version
 * held the subtree in state and rendered that instead, refreshing it from an
 * effect keyed on `transitionKey` — so content that changed *without* a new key
 * never reached the screen. A radio that was picked stayed unpicked, and the
 * interface read as dead. A component that stands between a caller and its own
 * children has to be transparent to every render that is not a swap.
 *
 * What it does keep is one snapshot of the outgoing subtree, for as long as the
 * exit takes. That is unavoidable without an animation library: React has
 * already been told to render the new content, and the old content still has to
 * leave. It is fifteen lines and one `setTimeout`, and it is the only reason
 * `framer-motion` looked necessary for this file.
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
    const [phase, setPhase] = useState<{
      key: string | number;
      leaving: ReactNode | null;
      // Counts plays rather than reusing the key, so swapping A → B → A still
      // animates the second arrival at A.
      play: number;
    }>({ key: transitionKey, leaving: null, play: animateInitial ? 1 : 0 });

    // The subtree as last committed, held only to hand to the exit. It is never
    // rendered in place of `children` — see the note above.
    const committed = useRef<ReactNode>(children);

    // Derived during render rather than in an effect, deliberately: the exit has
    // to begin in the same commit the key changed, or the incoming content
    // paints for a frame before the outgoing has started to leave.
    if (phase.key !== transitionKey) {
      setPhase({
        key: transitionKey,
        leaving: committed.current,
        play: phase.play + 1,
      });
    }

    // No dependency array: this has to see every commit, because the snapshot it
    // keeps is "whatever was on screen last", not "whatever was there when the
    // key last changed".
    useEffect(() => {
      if (phase.leaving === null) {
        committed.current = children;
        return;
      }
      const timer = setTimeout(
        () => setPhase((p) => ({ ...p, leaving: null })),
        SWAP_OUT_MS
      );
      return () => clearTimeout(timer);
    });

    const exiting = phase.leaving !== null;

    return (
      <Box
        ref={ref}
        {...rest}
        // Unkeyed on purpose. The animation restarts because the *name* changes
        // — `swap-out` and `swap-in` always alternate, since every key change
        // plays an exit before its enter — so there is no need to remount, and
        // the caller keeps a stable DOM node and a stable ref across swaps.
        aria-hidden={exiting || undefined}
        pointerEvents={exiting ? 'none' : undefined}
        css={mergeCss(
          { '--swap-distance': `${distance}px` },
          exiting ? swapOut : phase.play === 0 ? undefined : swapIn,
          css
        )}
      >
        {exiting ? phase.leaving : children}
      </Box>
    );
  }
);

SwapTransition.displayName = 'SwapTransition';
