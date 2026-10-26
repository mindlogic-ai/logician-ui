import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { chakra, mergeRefs } from '@chakra-ui/react';

import { byOrientation, listStyles } from './NavList.styles';
import { NavListProps } from './NavList.types';
import { NavListContext } from './NavListContext';
import { NavListGroup } from './NavListGroup';
import { NavListItem } from './NavListItem';
import { NavListSkeleton } from './NavListSkeleton';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Bring the current row into a sideways-scrolling list's visible range, by
 * moving that list's own `scrollLeft` only — never `scrollIntoView`, which
 * also scrolls the page and every scrolling ancestor. A no-op when the list
 * does not scroll sideways (a vertical rail) or the row is already in view.
 */
const revealCurrentHorizontally = (
  list: HTMLUListElement,
  current: Element
) => {
  if (list.scrollWidth <= list.clientWidth) return;
  const listBox = list.getBoundingClientRect();
  const rowBox = (current.closest('li') ?? current).getBoundingClientRect();
  // Inside a closed group the row has no box; there is nothing to show.
  if (rowBox.width === 0) return;
  if (rowBox.left < listBox.left) {
    list.scrollLeft -= listBox.left - rowBox.left;
  } else if (rowBox.right > listBox.right) {
    list.scrollLeft += rowBox.right - listBox.right;
  }
};

/**
 * A vertical list of rows for side navigation and in-page filter rails.
 *
 * Not tabs: there is no tablist, no `aria-selected` and no roving tabindex.
 * Every row is its own link or button in the tab order, and the current one
 * says so with `aria-current`.
 *
 * Named (`aria-label` / `aria-labelledby`), it is a `<nav>` landmark around
 * the list; unnamed, it is just the list. A landmark should have a name once a
 * page has more than one `nav`, and a list inside the app sidebar is already
 * inside one — so the name is what decides whether this is a landmark of its
 * own, rather than a flag the caller has to remember next to it.
 *
 * The ref and every other prop land on the `<ul>` either way — it is the flex
 * and scroll container, so `gap`, `onScroll` and `ref.current.scrollLeft` mean
 * the same thing whether or not the list is named.
 */
const NavListRoot = forwardRef<HTMLUListElement, NavListProps>(
  (
    {
      orientation = 'vertical',
      isCollapsed = false,
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    },
    ref
  ) => {
    const isLandmark = ariaLabel != null || ariaLabelledBy != null;
    // A collapsed rail is a column of icons; it has no sideways form.
    const axis = isCollapsed ? 'vertical' : orientation;
    const listRef = useRef<HTMLUListElement>(null);
    const mergedRef = useMemo(() => mergeRefs(ref, listRef), [ref]);

    // Reveal the current row when it CHANGES (a row reports it from its own
    // effect, so this works even when only that row re-rendered) and when the
    // list is resized — a strip that just laid down at a breakpoint. Not on
    // every render: a re-render must not snap back a strip the user scrolled.
    const lastRevealed = useRef<Element | null>(null);
    const reveal = useCallback((force = false) => {
      const list = listRef.current;
      const current = list?.querySelector('[data-current]');
      if (!list || !current) return;
      if (!force && current === lastRevealed.current) return;
      lastRevealed.current = current;
      revealCurrentHorizontally(list, current);
    }, []);
    useEffect(() => {
      const list = listRef.current;
      reveal();
      if (!list || typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(() => reveal(true));
      observer.observe(list);
      return () => observer.disconnect();
    }, [reveal]);

    // Zag stamps `dir` on every tooltip trigger — the rows — from Ark's
    // locale, which is `ltr` unless an Ark LocaleProvider says otherwise. Read
    // the direction the list actually inherits and hand it to the rows, or a
    // rail inside `dir="rtl"` lays its rows out left to right.
    const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
    useIsomorphicLayoutEffect(() => {
      const list = listRef.current;
      if (!list) return;
      const next = getComputedStyle(list).direction === 'rtl' ? 'rtl' : 'ltr';
      if (next !== dir) setDir(next);
    });

    const context = useMemo(
      () => ({ orientation: axis, isCollapsed, dir, revealCurrent: reveal }),
      [axis, isCollapsed, dir, reveal]
    );

    const list = (
      <chakra.ul
        ref={mergedRef}
        {...listStyles(axis)}
        alignItems={
          isCollapsed ? 'center' : byOrientation(axis, 'stretch', 'center')
        }
        overflowX={byOrientation(axis, 'visible', 'auto')}
        overflowY={byOrientation(axis, 'visible', 'hidden')}
        {...rest}
      >
        {children}
      </chakra.ul>
    );

    return (
      <NavListContext.Provider value={context}>
        {isLandmark ? (
          <chakra.nav
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            minW={0}
          >
            {list}
          </chakra.nav>
        ) : (
          list
        )}
      </NavListContext.Provider>
    );
  }
);

NavListRoot.displayName = 'NavList';

export const NavList = Object.assign(NavListRoot, {
  Item: NavListItem,
  Group: NavListGroup,
  Skeleton: NavListSkeleton,
});
