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
  SyntheticEvent,
  useRef,
} from 'react';
import { chakra, VisuallyHidden } from '@chakra-ui/react';

import { Tooltip } from '@/components/Tooltip';
import { useTranslate } from '@/hooks/useTranslate';
import { disabledText } from '@/utils/disabledControl';
import { focusRingInset } from '@/utils/focusRing';

import { byOrientation, NAV_LIST_RAMP } from './NavList.styles';
import NavListTranslations from './NavList.translations.json';
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
  target?: string;
  'aria-current'?: AriaAttributes['aria-current'];
};

/** The label span is cut off by its ellipsis. */
const isTruncated = (el: HTMLElement | null) =>
  el != null && el.scrollWidth > el.clientWidth + 1;

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
      trailingActionVisibility = 'always',
      tooltip,
      ...rest
    },
    ref
  ) => {
    const { orientation, isCollapsed } = useNavListContext();
    const translate = useTranslate(NavListTranslations);
    const labelRef = useRef<HTMLSpanElement>(null);
    const isLink = asChild || href != null;

    const child = isLink && asChild ? Children.only(children) : null;
    if (asChild && !isValidElement<RouterChildProps>(child)) {
      throw new Error(
        'NavList.Item with asChild needs exactly one element child'
      );
    }
    const routerChild = child as ReactElement<RouterChildProps> | null;
    const label = routerChild ? routerChild.props.children : children;
    const opensNewWindow =
      !isDisabled &&
      isLink &&
      (routerChild?.props.target ?? (rest as { target?: string }).target) ===
        '_blank';

    const content = (
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
        {isCollapsed ? (
          <VisuallyHidden>{label}</VisuallyHidden>
        ) : (
          <chakra.span
            ref={labelRef}
            flex={byOrientation(orientation, '1 1 auto', '0 0 auto')}
            minW={0}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {label}
          </chakra.span>
        )}
        {/* KWCAG 2.1 — a link that opens a new window says so in its name. */}
        {opensNewWindow && (
          <VisuallyHidden>{` (${translate('nav_list_opens_new_window')})`}</VisuallyHidden>
        )}
        {trailingVisual != null && !isCollapsed && (
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

    // One tooltip per row, three jobs. Collapsed: the label, beside the icon.
    // `tooltip`: the caller's description. Otherwise: the label again, only
    // while the ellipsis is actually cutting it off.
    const tooltipKind = isCollapsed
      ? 'label'
      : tooltip != null
        ? 'description'
        : 'overflow';

    // The overflow tooltip is gated at the trigger: zag skips opening when the
    // event that would open it was `defaultPrevented`, and the row's own
    // handlers run before zag's. A controlled `open` cannot do this — zag
    // enters its open state first and only re-syncs when the prop CHANGES.
    const restHandlers = rest as {
      onPointerMove?: (e: SyntheticEvent) => void;
      onPointerOver?: (e: SyntheticEvent) => void;
      onFocus?: (e: SyntheticEvent) => void;
    };
    const gate =
      (handler?: (e: SyntheticEvent) => void) => (event: SyntheticEvent) => {
        if (!isTruncated(labelRef.current)) event.preventDefault();
        handler?.(event);
      };
    const overflowGate =
      tooltipKind === 'overflow'
        ? {
            onPointerMove: gate(restHandlers.onPointerMove),
            onPointerOver: gate(restHandlers.onPointerOver),
            onFocus: gate(restHandlers.onFocus),
          }
        : undefined;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      // Belt and braces: a disabled `<button>` fires no click and a disabled
      // link has no `href`, so this only guards a caller who forces one.
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // The fill lives on the `<li>`, not the row, so a trailing action sits on
    // the same surface: hovering the action keeps the row lit, and the current
    // row's fill runs under its action instead of stopping short of it.
    const rowStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isCollapsed ? 'center' : undefined,
      gap: 2,
      flex: isCollapsed
        ? '0 0 auto'
        : byOrientation(orientation, '1 1 auto', '0 0 auto'),
      minW: 0,
      minH: isCollapsed ? 10 : 9,
      w: isCollapsed ? 10 : undefined,
      px: isCollapsed ? 0 : 2.5,
      py: isCollapsed ? 0 : 2,
      borderRadius: 'md',
      border: 'none',
      bg: 'transparent',
      textAlign: 'start',
      textDecoration: 'none',
      textStyle: 'p',
      cursor: 'pointer',
      color: isCurrent ? NAV_LIST_RAMP.currentLabel : NAV_LIST_RAMP.label,
      fontWeight: isCurrent ? 'bold' : 'normal',
      _hover: { textDecoration: 'none' },
      _disabled: { ...disabledText, cursor: 'not-allowed' },
      // Inset: rows sit 2px apart and a horizontal rail scrolls, so the
      // outward ring would land on the neighbour or be clipped.
      ...focusRingInset,
    } as const;

    // Both state attributes go on the element that carries the role, and on
    // the router child's own props when there is one (its props win the
    // `asChild` merge). `data-current` is the hook for scroll-to-current.
    const stateProps = {
      'aria-current': isCurrent ? (isLink ? 'page' : 'true') : undefined,
      'data-current': isCurrent ? '' : undefined,
    } as const;

    let row: ReactElement;
    if (!isLink) {
      row = (
        <chakra.button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={isDisabled}
          {...stateProps}
          onClick={handleClick}
          {...rowStyles}
          // The prop type is the anchor's; the global attributes and style
          // props it carries are the same on a button.
          {...(rest as unknown as React.ComponentProps<typeof chakra.button>)}
          {...overflowGate}
        >
          {content}
        </chakra.button>
      );
    } else {
      const linkProps = {
        ref: ref as React.Ref<HTMLAnchorElement>,
        ...rowStyles,
        ...rest,
        ...overflowGate,
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
            {...stateProps}
            {...linkProps}
            target={undefined}
          >
            {content}
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
                ...stateProps,
                onClick: (event: MouseEvent<HTMLElement>) => {
                  handleClick(event);
                  routerChild.props.onClick?.(event);
                },
              },
              content
            )}
          </chakra.a>
        );
      } else {
        row = (
          <chakra.a
            href={href}
            {...stateProps}
            onClick={handleClick}
            {...linkProps}
          >
            {content}
          </chakra.a>
        );
      }
    }

    // The two label tooltips name the tooltip itself (`aria-label`), which
    // takes it out of the trigger's description — the row is already called that.
    const tooltipContent = tooltipKind === 'description' ? tooltip : label;
    const labelText =
      typeof label === 'string' || typeof label === 'number'
        ? String(label)
        : undefined;
    const withTooltip = (
      <Tooltip
        content={tooltipContent}
        placement={isCollapsed ? 'right' : 'top'}
        // Zag only checks that this is set; it is not rendered anywhere.
        aria-label={
          tooltipKind === 'description' ? undefined : (labelText ?? 'label')
        }
        contentProps={
          tooltipKind === 'description' ? undefined : { 'aria-hidden': true }
        }
      >
        {row}
      </Tooltip>
    );

    const hoverFill = isDisabled ? undefined : { bg: NAV_LIST_RAMP.hoverFill };
    const revealOnHover =
      trailingActionVisibility === 'hover'
        ? {
            '& > [data-part="trailing-action"]': { opacity: 0 },
            '&:hover > [data-part="trailing-action"], &:focus-within > [data-part="trailing-action"], & > [data-part="trailing-action"]:has([aria-expanded="true"], [data-state="open"])':
              { opacity: 1 },
            '@media (hover: none)': {
              '& > [data-part="trailing-action"]': { opacity: 1 },
            },
          }
        : undefined;

    return (
      <chakra.li
        display="flex"
        alignItems="center"
        gap={0.5}
        flexShrink={0}
        minW={0}
        borderRadius="md"
        bg={isCurrent ? NAV_LIST_RAMP.currentFill : 'transparent'}
        _hover={hoverFill}
        css={revealOnHover}
      >
        {withTooltip}
        {trailingAction != null && !isCollapsed && (
          <chakra.span
            data-part="trailing-action"
            display="inline-flex"
            alignItems="center"
            flexShrink={0}
            pe={0.5}
          >
            {trailingAction}
          </chakra.span>
        )}
      </chakra.li>
    );
  }
);

NavListItem.displayName = 'NavList.Item';
