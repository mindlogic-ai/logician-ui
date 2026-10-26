import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import {
  chakra,
  Collapsible as ChakraCollapsible,
  LocaleProvider,
  useLocaleContext,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@/components/Icon';
import { Overline } from '@/components/Typography/Overline';
import { focusRingInset } from '@/utils/focusRing';

import {
  byOrientation,
  inheritDirection,
  listStyles,
  localeFor,
  NAV_LIST_RAMP,
  pressedFill,
} from './NavList.styles';
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
 * folds the titles away visually — a column of icons has no room for either.
 *
 * The rows open and close on Collapsible's own motion: Ark's collapsible
 * measures the list into `--height`, the recipe's `expand-height` /
 * `collapse-height` move it, and `animationStyle="presence"` sets the house
 * clock (300ms in, 150ms out) with a fade instead of the height under reduced
 * motion. Ark sets `hidden` once the close has finished, so closed rows are
 * out of the tab order and the accessibility tree; `inert` covers the 150ms
 * the list is still leaving, so a closing row cannot be tabbed into.
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
    const { orientation, isCollapsed, tooltipDir } = useNavListContext();
    const inherited = useLocaleContext();
    const titleId = useId();
    const listId = useId();
    const hasTitle = title != null && title !== false;
    const [isOpenState, setIsOpenState] = useState(defaultOpen);
    // The disclosure exists whenever the caller asked for one; a collapsed
    // rail only forces it open, so toggling the rail does not remount rows.
    const isDisclosure = isCollapsible && hasTitle;
    const canCollapse = isDisclosure && !isCollapsed;
    const isOpen = !canCollapse || (isOpenProp ?? isOpenState);
    const listRef = useRef<HTMLUListElement>(null);
    // A DOM property rather than the attribute: React 18 does not know
    // `inert`, and 19 reads it as a boolean.
    useEffect(() => {
      if (listRef.current) listRef.current.inert = !isOpen;
    }, [isOpen]);

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
    if (canCollapse) {
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
          _active={pressedFill}
          {...focusRingInset}
        >
          {titleText}
          <ChevronDownIcon
            aria-hidden
            boxSize={4}
            flexShrink={0}
            // Closed points to the inline end: right, or left on an RTL page.
            rotate={isOpen ? '0deg' : '-90deg'}
            _rtl={{ rotate: isOpen ? '0deg' : '90deg' }}
            // Turns with the list, on the same clock as its enter.
            animationStyle="travel"
            transitionProperty="rotate"
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
    // A collapsed rail has no room for titles. The title folds to no height
    // and fades on the rows' clock instead of being swapped out, so the rows
    // under it slide up with the rail rather than jumping. It stays in the
    // DOM either way: it is what names the group's list.
    if (heading) {
      heading = (
        <chakra.div
          display="grid"
          gridTemplateRows={isCollapsed ? '0fr' : '1fr'}
          opacity={isCollapsed ? 0 : 1}
          animationStyle="feedback"
          transitionProperty="grid-template-rows, opacity"
        >
          <chakra.div
            minH={0}
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            {heading}
          </chakra.div>
        </chakra.div>
      );
    }

    const listProps = {
      id: listId,
      'aria-labelledby': hasTitle ? titleId : undefined,
      ...listStyles(orientation),
      alignItems: byOrientation(orientation, 'stretch', 'center'),
      ...inheritDirection,
    } as const;

    const list = isDisclosure ? (
      <ChakraCollapsible.Content
        asChild
        animationStyle="presence"
        // `hidden` loses to the list's own `display: flex`.
        css={{ '&[hidden]': { display: 'none' } }}
      >
        <chakra.ul ref={listRef} {...listProps}>
          {children}
        </chakra.ul>
      </ChakraCollapsible.Content>
    ) : (
      <chakra.ul {...listProps}>{children}</chakra.ul>
    );

    const group = (
      <chakra.li
        ref={ref}
        display="flex"
        flexDirection={byOrientation(orientation, 'column', 'row')}
        alignItems={byOrientation(orientation, 'stretch', 'center')}
        gap={0.5}
        flexShrink={0}
        minW={0}
        css={{
          '&:not(:first-child)': gapBefore,
          '& + li': gapBefore,
        }}
        {...inheritDirection}
        {...rest}
      >
        <LocaleProvider locale={inherited.locale}>
          {heading}
          {list}
        </LocaleProvider>
      </chakra.li>
    );

    if (!isDisclosure) return group;
    // The title stays our own button, so `aria-expanded` flips on the click
    // rather than when the closing animation ends, and the rail can force the
    // group open without the button having a say.
    return (
      // Zag stamps `dir` on the group and its list; give it the measured
      // direction so the attributes agree with the layout after mount. The
      // layout does not read it (`inheritDirection`), and the rows inside get
      // the caller's own locale back.
      <LocaleProvider locale={localeFor(inherited, tooltipDir)}>
        <ChakraCollapsible.Root asChild open={isOpen} ids={{ content: listId }}>
          {group}
        </ChakraCollapsible.Root>
      </LocaleProvider>
    );
  }
);

NavListGroup.displayName = 'NavList.Group';
