import { RefObject, useEffect } from 'react';

import { StickyDirection } from './Table.styles';

interface UseRegisterStickyWidthOptions {
  isSticky: boolean;
  direction: StickyDirection;
  index: number;
  register: (direction: StickyDirection, index: number, width: number) => void;
  /**
   * Whether some cell has already measured this column. Body cells use it to
   * skip; header cells ignore it (they are the authority).
   */
  hasWidth: (direction: StickyDirection, index: number) => boolean;
  /**
   * `header` — one cell per column, mounted for the table's lifetime. It owns
   * the measurement and keeps a `ResizeObserver` so the width follows later
   * layout changes.
   *
   * `body` — one cell per column *per row*. It measures only when no width is
   * known yet (a table with no header row) and never observes.
   */
  role: 'header' | 'body';
}

/**
 * Keep a sticky column's measured width registered with the table context, so
 * the cumulative sticky offsets stay correct across layout changes — a web-font
 * swap that reflows the text, a window/sidebar resize, or the columns shrinking
 * when the table goes from fitting its container to overflowing it. Without a
 * live measurement the offsets are computed once from stale widths and the
 * pinned columns visibly detach (a gap opens and neighbours collapse).
 *
 * **A column's width is one number, so it is measured once — by the header.**
 * Every cell used to measure itself and attach its own `ResizeObserver`. In a
 * static table that is merely redundant; in a virtualised one it is the
 * dominant cost of scrolling, because rows mount and unmount continuously and
 * each mount forces a synchronous layout.
 *
 * Measured on a 12,000-row admin table (production build, 10 scroll steps):
 * 680 `getBoundingClientRect` calls and 280 `ResizeObserver`s created — 68
 * measurements and 28 observers per scroll step, for three sticky columns whose
 * widths never changed. `getBoundingClientRect` alone was 11.9% of profiled CPU.
 *
 * Body cells still measure when nothing else has: a table with sticky columns
 * and no header row would otherwise get zero offsets. In that case the first
 * body cell to mount supplies the width and the rest skip.
 */
export function useRegisterStickyWidth(
  ref: RefObject<HTMLTableCellElement | null>,
  {
    isSticky,
    direction,
    index,
    register,
    hasWidth,
    role,
  }: UseRegisterStickyWidthOptions
) {
  useEffect(() => {
    const node = ref.current;
    if (!isSticky || !node) return;

    if (role === 'body') {
      // Header already measured this column (the usual case) — nothing to do,
      // and crucially no observer to attach and tear down on every scroll.
      if (hasWidth(direction, index)) return;
      register(direction, index, node.getBoundingClientRect().width);
      return;
    }

    register(direction, index, node.getBoundingClientRect().width);

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      register(direction, index, node.getBoundingClientRect().width);
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, isSticky, direction, index, register, hasWidth, role]);
}
