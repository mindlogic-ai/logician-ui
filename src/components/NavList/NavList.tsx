import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { chakra } from '@chakra-ui/react';

import { byOrientation, listStyles } from './NavList.styles';
import { NavListProps } from './NavList.types';
import { NavListContext } from './NavListContext';
import { NavListGroup } from './NavListGroup';
import { NavListItem } from './NavListItem';
import { NavListSkeleton } from './NavListSkeleton';

/**
 * Bring the current row into a sideways-scrolling list's visible range, by
 * moving that list's own `scrollLeft` only — never `scrollIntoView`, which
 * also scrolls the page and every scrolling ancestor. A no-op when the list
 * does not scroll sideways (a vertical rail) or the row is already in view.
 */
const revealCurrentHorizontally = (list: HTMLUListElement | null) => {
  if (!list || list.scrollWidth <= list.clientWidth) return;
  const current = list.querySelector<HTMLElement>('[data-current]');
  if (!current) return;
  const listBox = list.getBoundingClientRect();
  const rowBox = (current.closest('li') ?? current).getBoundingClientRect();
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
    const context = useMemo(
      () => ({ orientation: axis, isCollapsed }),
      [axis, isCollapsed]
    );
    const listRef = useRef<HTMLUListElement>(null);
    useImperativeHandle(ref, () => listRef.current as HTMLUListElement);

    // After every render — the current row may have changed, or the list may
    // have just laid down into a strip at a breakpoint — and on resize.
    const reveal = useCallback(
      () => revealCurrentHorizontally(listRef.current),
      []
    );
    useEffect(reveal);
    useEffect(() => {
      const list = listRef.current;
      if (!list || typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(reveal);
      observer.observe(list);
      return () => observer.disconnect();
    }, [reveal]);

    const list = (
      <chakra.ul
        ref={listRef}
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
