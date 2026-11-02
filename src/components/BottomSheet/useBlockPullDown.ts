import { useEffect, useRef } from 'react';

import { isScrolledAwayFromTop } from './useDisabledDrag';

/**
 * While `dragDisabled` is on, a finger pulling the sheet down moves nothing in
 * zag, so iOS Safari takes the swipe as a page overscroll: the page slides
 * down and, past its pull-to-refresh distance, reloads and drops whatever the
 * sheet was guarding. This cancels the touch's default from its first move
 * when that move is downward and nothing under the finger can scroll up.
 *
 * It needs a native `touchmove` listener with `passive: false`: React attaches
 * touch handlers as passive, so `preventDefault` there is ignored. The first
 * move decides, because once Safari starts scrolling it stops sending
 * cancelable moves. Text fields are not exempt here, unlike `onDisabledDrag`:
 * a downward pull from one would reload the page just the same.
 */
export const useBlockPullDown = (enabled: boolean) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    let start: { x: number; y: number; target: Element } | null = null;
    let decided = false;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      decided = false;
      start =
        event.touches.length === 1 && touch && event.target instanceof Element
          ? { x: touch.clientX, y: touch.clientY, target: event.target }
          : null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!start || decided || !touch || !event.cancelable) return;
      const dx = Math.abs(touch.clientX - start.x);
      const dy = touch.clientY - start.y;
      if (dx === 0 && dy === 0) return;
      decided = true;
      if (dy <= 0 || dy < dx) return;
      if (isScrolledAwayFromTop(start.target, el)) return;
      event.preventDefault();
    };

    const onTouchEnd = () => {
      start = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [enabled]);

  return ref;
};
