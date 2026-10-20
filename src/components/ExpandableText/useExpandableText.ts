import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { MOTION_DURATION_MS } from '@/theme/motion';

/**
 * Whether the OS is asking for less movement, read when it matters rather than
 * subscribed to — this only decides how long to wait before tidying up, and a
 * member who flips the setting mid-click is not a case worth a listener for.
 */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Two frames, so React has committed the first value before the second lands. */
const afterPaint = (fn: () => void) =>
  requestAnimationFrame(() => requestAnimationFrame(fn));

/**
 * Collapsed/expanded state for text clipped to a number of lines.
 *
 * Both states render the same children and the clipping is a `max-height`, which
 * is what makes the change animatable at all — the previous character-count
 * version swapped one node tree for another, so there was never anything on the
 * page for a transition to reveal.
 *
 * ## Why not `-webkit-line-clamp`
 *
 * The clamp would give the cut line an ellipsis, but it takes the height with
 * it: under a clamp `scrollHeight` collapses to the clipped height, so there is
 * no way left to ask whether anything is hidden, and the link that opens the
 * text can never appear. A `max-height` of whole `lh` units cuts on the same
 * line boundary, keeps `scrollHeight` honest, and is the thing being animated
 * anyway.
 *
 * ## Why two commits per direction
 *
 * `max-height` only animates between two lengths, and each direction begins on a
 * value that is not one. Opening ends at `none` so a later reflow — a resize, a
 * font swap — is not trapped under a stale pixel count; closing therefore has to
 * pin the height it is leaving for one frame before releasing it.
 */
export const useExpandableText = (lineClamp: number) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [isExpanded, setIsExpanded] = useState(false);
  /** `undefined` means "rest at the line multiple" — see the component. */
  const [maxHeight, setMaxHeight] = useState<string>();
  /** Until we know something is hidden, no link is offered. */
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Only meaningful while collapsed; open, the two heights are equal.
    const check = () => {
      if (!isExpanded) setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    };
    check();

    // How many lines the text takes depends on width, so a resize can create or
    // remove the overflow entirely.
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [lineClamp, isExpanded]);

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const handleToggle = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const el = contentRef.current;
    if (!el) return;
    clearTimeout(settleTimer.current);

    const settle = prefersReducedMotion() ? 0 : MOTION_DURATION_MS.base;

    setIsExpanded((wasExpanded) => {
      if (wasExpanded) {
        setMaxHeight(`${el.scrollHeight}px`); // pin the height being left
        afterPaint(() => setMaxHeight(undefined)); // → line multiple; animates
        return false;
      }

      setMaxHeight(`${el.scrollHeight}px`); // full height; animates open
      settleTimer.current = setTimeout(() => setMaxHeight('none'), settle);
      return true;
    });
  }, []);

  return { contentRef, isExpanded, isOverflowing, maxHeight, handleToggle };
};
