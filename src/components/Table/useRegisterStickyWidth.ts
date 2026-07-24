import { RefObject, useEffect } from 'react';

import { StickyDirection } from './Table.styles';

interface UseRegisterStickyWidthOptions {
  isSticky: boolean;
  direction: StickyDirection;
  index: number;
  register: (direction: StickyDirection, index: number, width: number) => void;
}

/**
 * Keep a sticky cell's measured width registered with the table context.
 *
 * Unlike a mount-only measurement, this observes the cell with a
 * `ResizeObserver`, so the width stays correct through later layout changes —
 * a web-font swap that reflows the text, a window/sidebar resize, or the
 * columns shrinking when the table goes from fitting its container to
 * overflowing it. Without this, the cumulative sticky offsets are computed once
 * from stale widths and the pinned columns visibly detach (an empty gap opens
 * between them and neighbouring columns collapse).
 *
 * `getBoundingClientRect().width` is read inside the callback so the value is
 * always the border-box width the offset maths expects.
 */
export function useRegisterStickyWidth(
  ref: RefObject<HTMLTableCellElement | null>,
  { isSticky, direction, index, register }: UseRegisterStickyWidthOptions
) {
  useEffect(() => {
    const node = ref.current;
    if (!isSticky || !node) return;

    register(direction, index, node.getBoundingClientRect().width);

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      register(direction, index, node.getBoundingClientRect().width);
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, isSticky, direction, index, register]);
}
