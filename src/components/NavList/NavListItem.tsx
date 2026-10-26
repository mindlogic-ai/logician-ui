import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { chakra } from '@chakra-ui/react';

import { disabledText } from '@/utils/disabledControl';
import { focusRingInset } from '@/utils/focusRing';

import { byOrientation, NAV_LIST_RAMP } from './NavList.styles';
import { NavListItemProps } from './NavList.types';
import { useNavListContext } from './NavListContext';

/**
 * One row: a link (`href`, or `asChild` around a router link) or, with only
 * `onClick`, a `<button type="button">`.
 *
 * Both are native, so activation is the platform's: Enter follows a link,
 * Enter and Space press a button, and Tab moves between rows. There is no
 * arrow-key handling on purpose — a rail of links is not a composite widget,
 * and roving focus would hide every row but one from the tab order.
 */
export const NavListItem = forwardRef<HTMLElement, NavListItemProps>(
  (
    {
      children,
      href,
      asChild = false,
      onClick,
      isCurrent = false,
      isDisabled = false,
      leadingVisual,
      trailingVisual,
      trailingAction,
      ...rest
    },
    ref
  ) => {
    const { orientation } = useNavListContext();
    const isLink = asChild || href != null;

    const content = (label: ReactNode) => (
      <>
        {leadingVisual != null && (
          <chakra.span
            aria-hidden
            display="inline-flex"
            alignItems="center"
            flexShrink={0}
          >
            {leadingVisual}
          </chakra.span>
        )}
        <chakra.span
          flex={byOrientation(orientation, '1 1 auto', '0 0 auto')}
          minW={0}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {label}
        </chakra.span>
        {trailingVisual != null && (
          <chakra.span
            display="inline-flex"
            alignItems="center"
            flexShrink={0}
            ms="auto"
            color={isDisabled ? 'disabled.fg' : NAV_LIST_RAMP.trailing}
            fontWeight="normal"
            fontVariantNumeric="tabular-nums"
          >
            {trailingVisual}
          </chakra.span>
        )}
      </>
    );

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        // Only reachable on a link: a disabled `<button>` fires no click. An
        // `asChild` router link keeps its href, so cancel the navigation here.
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const rowStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flex: byOrientation(orientation, '1 1 auto', '0 0 auto'),
      minW: 0,
      minH: 9,
      px: 2.5,
      py: 2,
      borderRadius: 'md',
      border: 'none',
      textAlign: 'start',
      textDecoration: 'none',
      textStyle: 'p',
      cursor: 'pointer',
      color: isCurrent ? NAV_LIST_RAMP.currentLabel : NAV_LIST_RAMP.label,
      bg: isCurrent ? NAV_LIST_RAMP.currentFill : 'transparent',
      fontWeight: isCurrent ? 'bold' : 'normal',
      // No hover change while disabled, and none on the current row either —
      // its fill is already the hover fill.
      _hover: isDisabled
        ? undefined
        : { bg: NAV_LIST_RAMP.hoverFill, textDecoration: 'none' },
      _disabled: { ...disabledText, cursor: 'not-allowed' },
      // Inset: rows sit 2px apart and a horizontal rail scrolls, so the
      // outward ring would land on the neighbour or be clipped.
      ...focusRingInset,
    } as const;

    let row: ReactElement;
    if (asChild) {
      const child = Children.only(children);
      if (!isValidElement<{ children?: ReactNode }>(child)) {
        throw new Error(
          'NavList.Item with asChild needs exactly one element child'
        );
      }
      row = (
        <chakra.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          asChild
          aria-current={isCurrent ? 'page' : undefined}
          aria-disabled={isDisabled || undefined}
          tabIndex={isDisabled ? -1 : undefined}
          onClick={handleClick}
          {...rowStyles}
          {...rest}
        >
          {cloneElement(child, undefined, content(child.props.children))}
        </chakra.a>
      );
    } else if (isLink) {
      row = (
        <chakra.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          // A disabled link has no destination: without `href` it is not a
          // link, so it leaves the tab order and cannot be opened in a new tab.
          href={isDisabled ? undefined : href}
          aria-current={isCurrent ? 'page' : undefined}
          aria-disabled={isDisabled || undefined}
          onClick={handleClick}
          {...rowStyles}
          {...rest}
        >
          {content(children)}
        </chakra.a>
      );
    } else {
      row = (
        <chakra.button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={isDisabled}
          aria-current={isCurrent ? 'true' : undefined}
          onClick={handleClick}
          {...rowStyles}
          // The prop type is the anchor's; the global attributes and style
          // props it carries are the same on a button.
          {...(rest as unknown as React.ComponentProps<typeof chakra.button>)}
        >
          {content(children)}
        </chakra.button>
      );
    }

    return (
      <chakra.li
        display="flex"
        alignItems="center"
        gap={0.5}
        flexShrink={0}
        minW={0}
      >
        {row}
        {trailingAction != null && (
          <chakra.span display="inline-flex" alignItems="center" flexShrink={0}>
            {trailingAction}
          </chakra.span>
        )}
      </chakra.li>
    );
  }
);

NavListItem.displayName = 'NavList.Item';
