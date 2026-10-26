import { forwardRef, useMemo } from 'react';
import { chakra } from '@chakra-ui/react';

import { byOrientation, listStyles } from './NavList.styles';
import { NavListProps } from './NavList.types';
import { NavListContext } from './NavListContext';
import { NavListGroup } from './NavListGroup';
import { NavListItem } from './NavListItem';

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
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    },
    ref
  ) => {
    const isLandmark = ariaLabel != null || ariaLabelledBy != null;
    const context = useMemo(() => ({ orientation }), [orientation]);

    const list = (
      <chakra.ul
        ref={ref}
        {...listStyles(orientation)}
        overflowX={byOrientation(orientation, 'visible', 'auto')}
        overflowY={byOrientation(orientation, 'visible', 'hidden')}
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
});
