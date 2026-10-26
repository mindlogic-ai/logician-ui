import { forwardRef, useId } from 'react';
import { chakra } from '@chakra-ui/react';

import { Overline } from '../Typography/Overline';
import { byOrientation, NAV_LIST_RAMP } from './NavList.styles';
import { NavListGroupProps } from './NavList.types';
import { useNavListContext } from './NavListContext';

/**
 * A run of rows under an optional title.
 *
 * Rendered as `<li>` → title + nested `<ul aria-labelledby={title}>`, so a
 * screen reader announces "목록, 공유 드라이브, 3개 항목" on entering it. The
 * title is overline text, not `<h*>`: which heading level a rail's group is
 * can only be known at the call site, and a typography default that decides
 * the outline is exactly the `Subtitle as="h6"` defect in `ACCESSIBILITY.md`.
 */
export const NavListGroup = forwardRef<HTMLLIElement, NavListGroupProps>(
  ({ title, children, ...rest }, ref) => {
    const { orientation } = useNavListContext();
    const titleId = useId();
    const hasTitle = title != null && title !== false;

    return (
      <chakra.li
        ref={ref}
        display="flex"
        flexDirection={byOrientation(orientation, 'column', 'row')}
        alignItems={byOrientation(orientation, 'stretch', 'center')}
        gap={0.5}
        flexShrink={0}
        minW={0}
        // Space before a group that follows other rows or groups, on the axis
        // they stack along.
        css={{
          '&:not(:first-child)': {
            marginTop: byOrientation(orientation, 3, 0),
            marginInlineStart: byOrientation(orientation, 0, 3),
          },
        }}
        {...rest}
      >
        {hasTitle && (
          <Overline
            as="span"
            id={titleId}
            display="block"
            color={NAV_LIST_RAMP.groupTitle}
            px={2.5}
            pt={byOrientation(orientation, 1, 0)}
            pb={byOrientation(orientation, 1, 0)}
            whiteSpace="nowrap"
          >
            {title}
          </Overline>
        )}
        <chakra.ul
          aria-labelledby={hasTitle ? titleId : undefined}
          listStyleType="none"
          m={0}
          p={0}
          display="flex"
          flexDirection={byOrientation(orientation, 'column', 'row')}
          alignItems={byOrientation(orientation, 'stretch', 'center')}
          gap={0.5}
          minW={0}
        >
          {children}
        </chakra.ul>
      </chakra.li>
    );
  }
);

NavListGroup.displayName = 'NavList.Group';
