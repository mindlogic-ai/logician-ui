import type {
  PointerEvent as ReactPointerEvent,
  TouchEvent as ReactTouchEvent,
} from 'react';
import { useRef } from 'react';

/**
 * How far a press has to travel before it counts as a swipe: down at least
 * this far, and more down than sideways. Shorter is a tap.
 */
export const DISABLED_DRAG_THRESHOLD = 10;

// zag's own slack values (`@zag-js/drawer` drawer-session): a scroll offset
// under SCROLL_GATE is the top, and an element only scrolls when its content
// overflows by more than SCROLL_EPSILON.
const SCROLL_GATE = 0.5;
const SCROLL_EPSILON = 1;
const NO_DRAG_SELECTOR = '[data-no-drag]';

type Gesture = {
  x: number;
  y: number;
  target: Element;
  decided: boolean;
};

const scrollsVertically = (el: Element) => {
  const { overflowY } = getComputedStyle(el);
  if (overflowY !== 'auto' && overflowY !== 'scroll' && overflowY !== 'overlay')
    return false;
  return el.scrollHeight > el.clientHeight + SCROLL_EPSILON;
};

/**
 * The same test zag's `preventDragOnScroll` applies before it starts a drag:
 * a swipe down inside a list that is scrolled away from its top scrolls the
 * list back, it is not a drag.
 */
export const isScrolledAwayFromTop = (target: Element, container: Element) => {
  let scrolled = 0;
  let el: Element | null = target;
  while (el) {
    if (scrollsVertically(el)) scrolled += el.scrollTop;
    if (el === container) break;
    el = el.parentElement;
  }
  return scrolled > SCROLL_GATE;
};

const hasCaret = (input: HTMLInputElement) => {
  try {
    return input.selectionStart !== null;
  } catch {
    return false;
  }
};

/**
 * Where zag never starts a drag either (its `isDragExemptElement`): inside
 * `data-no-drag`, a text field, a select, editable content, and a range or
 * file input.
 */
const isDragExempt = (target: Element) => {
  if (target.closest(NO_DRAG_SELECTOR)) return true;
  if (target.closest('textarea, select')) return true;
  if (target instanceof HTMLElement && target.isContentEditable) return true;
  if (target.closest('[contenteditable=""], [contenteditable="true"]'))
    return true;
  const input = target.closest('input');
  if (!input) return false;
  return hasCaret(input) || input.type === 'range' || input.type === 'file';
};

/**
 * Pointer and touch handlers for the sheet content while `dragDisabled` is on.
 * zag ignores a disabled sheet, so these watch the press themselves and call
 * `onDisabledDrag` once per press, as soon as it becomes a swipe down. The
 * sheet itself never moves.
 *
 * Touch presses are read from touch events: the content has no
 * `touch-action: none`, so once the browser takes the swipe as a scroll it
 * cancels the pointer events but keeps sending touchmove.
 */
type Handler<E> = ((event: E) => void) | undefined;
type ContentHandlers = {
  onPointerDown?: Handler<ReactPointerEvent<HTMLDivElement>>;
  onPointerMove?: Handler<ReactPointerEvent<HTMLDivElement>>;
  onPointerUp?: Handler<ReactPointerEvent<HTMLDivElement>>;
  onPointerCancel?: Handler<ReactPointerEvent<HTMLDivElement>>;
  onTouchStart?: Handler<ReactTouchEvent<HTMLDivElement>>;
  onTouchMove?: Handler<ReactTouchEvent<HTMLDivElement>>;
  onTouchEnd?: Handler<ReactTouchEvent<HTMLDivElement>>;
  onTouchCancel?: Handler<ReactTouchEvent<HTMLDivElement>>;
};

/** Runs the caller's handler first, so passing one doesn't drop ours. */
const chain =
  <E>(theirs: Handler<E>, ours: (event: E) => void) =>
  (event: E) => {
    theirs?.(event);
    ours(event);
  };

export const useDisabledDrag = ({
  onDisabledDrag,
  enabled,
  props,
}: {
  onDisabledDrag: (() => void) | undefined;
  enabled: boolean;
  /** The caller's own handlers, chained before ours. */
  props: ContentHandlers;
}): ContentHandlers => {
  const gesture = useRef<Gesture | null>(null);

  const start = (x: number, y: number, target: EventTarget | null) => {
    gesture.current =
      target instanceof Element && !isDragExempt(target)
        ? { x, y, target, decided: false }
        : null;
  };

  const move = (x: number, y: number, container: Element) => {
    const current = gesture.current;
    if (!current || current.decided) return;
    const dx = Math.abs(x - current.x);
    const dy = y - current.y;
    if (dx < DISABLED_DRAG_THRESHOLD && Math.abs(dy) < DISABLED_DRAG_THRESHOLD)
      return;
    // One decision per press: a swipe that went sideways or up first stays
    // that, even if it turns down later.
    current.decided = true;
    if (dy < DISABLED_DRAG_THRESHOLD || dy <= dx) return;
    if (isScrolledAwayFromTop(current.target, container)) return;
    onDisabledDrag?.();
  };

  const end = () => {
    gesture.current = null;
  };

  if (!enabled || !onDisabledDrag) return {};

  return {
    onPointerDown: chain(props.onPointerDown, (event) => {
      if (event.pointerType === 'touch' || event.button !== 0) return;
      start(event.clientX, event.clientY, event.target);
    }),
    onPointerMove: chain(props.onPointerMove, (event) => {
      if (event.pointerType === 'touch') return;
      move(event.clientX, event.clientY, event.currentTarget);
    }),
    onPointerUp: chain(props.onPointerUp, end),
    onPointerCancel: chain(props.onPointerCancel, end),
    onTouchStart: chain(props.onTouchStart, (event) => {
      const touch = event.touches[0];
      if (event.touches.length !== 1 || !touch) return end();
      start(touch.clientX, touch.clientY, event.target);
    }),
    onTouchMove: chain(props.onTouchMove, (event) => {
      const touch = event.touches[0];
      if (event.touches.length !== 1 || !touch) return end();
      move(touch.clientX, touch.clientY, event.currentTarget);
    }),
    onTouchEnd: chain(props.onTouchEnd, end),
    onTouchCancel: chain(props.onTouchCancel, end),
  };
};
