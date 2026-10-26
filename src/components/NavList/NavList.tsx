import { forwardRef } from 'react';
import { chakra } from '@chakra-ui/react';

import { byOrientation } from './NavList.styles';
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
 */
const NavListRoot = forwardRef<HTMLElement, NavListProps>(
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

    const listStyles = {
      listStyleType: 'none',
      m: 0,
      p: 0,
      display: 'flex',
      gap: 0.5,
      minW: 0,
      flexDirection: byOrientation(orientation, 'column', 'row'),
      alignItems: byOrientation(orientation, 'stretch', 'center'),
      // A row never wraps: a strip that grows to three lines as items are
      // added eats the content it navigates. It scrolls sideways instead.
      flexWrap: 'nowrap',
      overflowX: byOrientation(orientation, 'visible', 'auto'),
      overflowY: byOrientation(orientation, 'visible', 'hidden'),
    } as const;

    const list = isLandmark ? (
      <chakra.ul {...listStyles}>{children}</chakra.ul>
    ) : (
      <chakra.ul
        ref={ref as React.Ref<HTMLUListElement>}
        {...listStyles}
        {...rest}
      >
        {children}
      </chakra.ul>
    );

    return (
      <NavListContext.Provider value={{ orientation }}>
        {isLandmark ? (
          <chakra.nav
            ref={ref}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            minW={0}
            {...(rest as React.ComponentProps<typeof chakra.nav>)}
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
