import { forwardRef, useId, useState } from 'react';
import { chakra, VisuallyHidden } from '@chakra-ui/react';

import { ChevronDownIcon } from '@/components/Icon';
import { Overline } from '@/components/Typography/Overline';
import { focusRingInset } from '@/utils/focusRing';

import { byOrientation, listStyles, NAV_LIST_RAMP } from './NavList.styles';
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
 *
 * `isCollapsible` turns the title into a disclosure button
 * (`aria-expanded` + `aria-controls`); the list stays labelled by the title
 * text. A collapsed RAIL (`NavList isCollapsed`) shows every group's rows and
 * hides the titles visually — a column of icons has no room for either.
 */
export const NavListGroup = forwardRef<HTMLLIElement, NavListGroupProps>(
  (
    {
      title,
      children,
      isCollapsible = false,
      isOpen: isOpenProp,
      defaultOpen = true,
      onOpenChange,
      ...rest
    },
    ref
  ) => {
    const { orientation, isCollapsed } = useNavListContext();
    const titleId = useId();
    const listId = useId();
    const hasTitle = title != null && title !== false;
    const [isOpenState, setIsOpenState] = useState(defaultOpen);
    const canCollapse = isCollapsible && hasTitle && !isCollapsed;
    const isOpen = !canCollapse || (isOpenProp ?? isOpenState);

    const toggle = () => {
      const next = !isOpen;
      if (isOpenProp === undefined) setIsOpenState(next);
      onOpenChange?.(next);
    };

    // Space on the axis the rows stack along, on both sides of a group: before
    // it unless it opens the list, and before whatever row follows it, so the
    // row after a group does not read as one more member of it.
    const gapBefore = {
      marginTop: byOrientation(orientation, 3, 0),
      marginInlineStart: byOrientation(orientation, 0, 3),
    };

    const titleText = (
      <Overline
        as="span"
        id={titleId}
        display="block"
        color={NAV_LIST_RAMP.groupTitle}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {title}
      </Overline>
    );

    let heading = null;
    if (hasTitle && isCollapsed) {
      heading = <VisuallyHidden id={titleId}>{title}</VisuallyHidden>;
    } else if (canCollapse) {
      heading = (
        <chakra.button
          type="button"
          aria-expanded={isOpen}
          aria-controls={listId}
          onClick={toggle}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          minH={8}
          px={2.5}
          borderRadius="md"
          bg="transparent"
          border="none"
          cursor="pointer"
          color={NAV_LIST_RAMP.groupTitle}
          textAlign="start"
          _hover={{ bg: NAV_LIST_RAMP.hoverFill }}
          {...focusRingInset}
        >
          {titleText}
          <ChevronDownIcon
            aria-hidden
            boxSize={4}
            flexShrink={0}
            transform={isOpen ? undefined : 'rotate(-90deg)'}
          />
        </chakra.button>
      );
    } else if (hasTitle) {
      heading = (
        <chakra.span
          display="block"
          px={2.5}
          py={byOrientation(orientation, 1, 0)}
        >
          {titleText}
        </chakra.span>
      );
    }

    return (
      <chakra.li
        ref={ref}
        display="flex"
        flexDirection={byOrientation(orientation, 'column', 'row')}
        alignItems={
          isCollapsed
            ? 'center'
            : byOrientation(orientation, 'stretch', 'center')
        }
        gap={0.5}
        flexShrink={0}
        minW={0}
        css={{
          '&:not(:first-child)': gapBefore,
          '& + li': gapBefore,
        }}
        {...rest}
      >
        {heading}
        <chakra.ul
          id={listId}
          aria-labelledby={hasTitle ? titleId : undefined}
          hidden={!isOpen}
          {...listStyles(orientation)}
          // `hidden` alone loses to the list's own `display: flex`.
          display={isOpen ? 'flex' : 'none'}
          alignItems={
            isCollapsed
              ? 'center'
              : byOrientation(orientation, 'stretch', 'center')
          }
        >
          {children}
        </chakra.ul>
      </chakra.li>
    );
  }
);

NavListGroup.displayName = 'NavList.Group';
