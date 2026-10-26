import {
  AriaAttributes,
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  MouseEvent,
  MouseEventHandler,
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
type RouterChildProps = {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  'aria-current'?: AriaAttributes['aria-current'];
};

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
      // Belt and braces: a disabled `<button>` fires no click and a disabled
      // link has no `href`, so this only guards a caller who forces one.
      if (isDisabled) {
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
    if (!isLink) {
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
    } else {
      const child = asChild ? Children.only(children) : null;
      if (asChild && !isValidElement<RouterChildProps>(child)) {
        throw new Error(
          'NavList.Item with asChild needs exactly one element child'
        );
      }
      const routerChild = child as ReactElement<RouterChildProps> | null;
      const label = routerChild ? routerChild.props.children : children;
      const linkProps = {
        ref: ref as React.Ref<HTMLAnchorElement>,
        ...rowStyles,
        ...rest,
      };

      if (isDisabled) {
        // A disabled link has no destination, so it is not rendered as one —
        // not even the router link, which would keep its href for middle-click,
        // "open in new tab" and prefetch. Still announced as a link, with
        // `aria-disabled`, the same way whether or not `asChild` was used. With
        // no `href` it is out of the tab order.
        row = (
          <chakra.a
            role="link"
            aria-disabled="true"
            aria-current={isCurrent ? 'page' : undefined}
            {...linkProps}
          >
            {content(label)}
          </chakra.a>
        );
      } else if (routerChild) {
        // Our state goes on the CHILD's props, not on the slot: Chakra's
        // `asChild` merge lets the child's own props win, so a router NavLink
        // that sets its own `aria-current` would otherwise contradict
        // `isCurrent`. The child's own click handler still runs, after ours.
        row = (
          <chakra.a asChild {...linkProps}>
            {cloneElement(
              routerChild,
              {
                'aria-current': isCurrent ? 'page' : undefined,
                onClick: (event: MouseEvent<HTMLElement>) => {
                  handleClick(event);
                  routerChild.props.onClick?.(event);
                },
              },
              content(label)
            )}
          </chakra.a>
        );
      } else {
        row = (
          <chakra.a
            href={href}
            aria-current={isCurrent ? 'page' : undefined}
            onClick={handleClick}
            {...linkProps}
          >
            {content(label)}
          </chakra.a>
        );
      }
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
