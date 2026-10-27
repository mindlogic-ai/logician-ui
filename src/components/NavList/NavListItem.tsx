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
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import {
  Box,
  chakra,
  LocaleProvider,
  useLocaleContext,
  VisuallyHidden,
} from '@chakra-ui/react';

import { Tooltip } from '@/components/Tooltip';
import { useTranslate } from '@/hooks/useTranslate';
import { disabledText } from '@/utils/disabledControl';
import { focusRingInset } from '@/utils/focusRing';

import {
  byOrientation,
  inheritDirection,
  localeFor,
  NAV_LIST_RAMP,
  pressedFill,
} from './NavList.styles';
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
// Every selector below names the row by this attribute, not by `data-part`:
// the tooltip trigger's own `data-part="trigger"` lands on the same element.
const ROW = '[data-nav-list-row]';
const ACTION = '[data-part="trailing-action"]';
/** Touch screens: no hover to reveal on, and a finger needs the space kept. */
const NO_HOVER = '@media (hover: none), (pointer: coarse)';
/** The row, not the action beside it, is being pressed. */
const PRESSED = `&:has(${ROW}:active)`;

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
    const { orientation, isCollapsed, tooltipDir, revealCurrent } =
      useNavListContext();
    const translate = useTranslate(NavListTranslations);
    const labelRef = useRef<HTMLSpanElement>(null);
    const descriptionId = useId();
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    useEffect(() => {
      if (isCurrent) revealCurrent();
    }, [isCurrent, revealCurrent]);
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

    const inherited = useLocaleContext();
    const content = (
      <LocaleProvider locale={inherited.locale}>
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
        {/* One label element in both modes, so toggling the rail fades it
            instead of swapping it: collapsed it is transparent and 1px wide —
            the size VisuallyHidden uses, which every screen reader still
            reads — and stays the row's accessible name. */}
        <chakra.span
          ref={labelRef}
          data-part="label"
          flex={byOrientation(orientation, '1 1 auto', '0 0 auto')}
          minW={isCollapsed ? '1px' : 0}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          opacity={isCollapsed ? 0 : 1}
          animationStyle="feedback"
          transitionProperty="opacity"
        >
          {label}
        </chakra.span>
        {/* KWCAG 2.1 — a link that opens a new window says so in its name. */}
        {opensNewWindow && (
          <VisuallyHidden>{` (${translate('nav_list_opens_new_window')})`}</VisuallyHidden>
        )}
        {trailingVisual != null && (
          <chakra.span
            display="inline-flex"
            alignItems="center"
            flexShrink={0}
            ms="auto"
            color={isDisabled ? 'disabled.fg' : NAV_LIST_RAMP.trailing}
            fontWeight="normal"
            fontVariantNumeric="tabular-nums"
            // Fades with the label. `visibility` flips at the END of the fade
            // (it is discrete), which is when the count leaves the row's name.
            opacity={isCollapsed ? 0 : 1}
            visibility={isCollapsed ? 'hidden' : 'visible'}
            animationStyle="feedback"
            transitionProperty="opacity, visibility"
          >
            {trailingVisual}
          </chakra.span>
        )}
      </LocaleProvider>
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
    // A POINTER also waits for the label to finish fading when the rail is
    // toggled, so no tooltip flashes over a row that is still changing shape:
    // the label one only once the label is fully gone, the others only once
    // it is fully back. The next pointermove after the fade opens it. Focus
    // is never held back — a cancelled focus is not re-fired, so a row
    // focused mid-fade would never show its label.
    const isSettled = () => {
      const el = labelRef.current;
      if (!el) return true;
      const opacity = parseFloat(getComputedStyle(el).opacity);
      if (Number.isNaN(opacity)) return true;
      return isCollapsed ? opacity === 0 : opacity === 1;
    };
    const gate =
      (handler?: (e: SyntheticEvent) => void, waitForFade = true) =>
      (event: SyntheticEvent) => {
        if (
          (waitForFade && !isSettled()) ||
          (tooltipKind === 'overflow' && !isTruncated(labelRef.current))
        )
          event.preventDefault();
        handler?.(event);
      };
    const tooltipGate = {
      onPointerMove: gate(restHandlers.onPointerMove),
      onPointerOver: gate(restHandlers.onPointerOver),
      onFocus: gate(restHandlers.onFocus, false),
    };

    // The description is a visually hidden element of its own, referenced
    // all the time — not the tooltip, which zag only references while it is
    // open. A disabled row cannot take focus, so a description that existed
    // only while open would never reach a keyboard or screen-reader user,
    // which is exactly when "why is this disabled" matters. The tooltip
    // itself is then never a description (`aria-label` on its root takes its
    // id away), and while it is open the row's own value — the caller's ids,
    // or an empty list — outranks the dangling id zag would leave behind.
    const callerDescribedBy = (rest as { 'aria-describedby'?: string })[
      'aria-describedby'
    ];
    const describedBy =
      [callerDescribedBy, tooltip != null ? descriptionId : undefined]
        .filter(Boolean)
        .join(' ') || (isTooltipOpen ? '' : undefined);
    const describedByProps = { 'aria-describedby': describedBy };

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      // Belt and braces: a disabled `<button>` fires no click and a disabled
      // link has no `href`, so this only guards a caller who forces one.
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // `hover`: the action floats over the end of the label instead of keeping
    // its own column, so a resting row spends its full width on the label —
    // the app's HoverRevealedKebab. The row and the action share one grid
    // cell's row; the row spans both columns at rest and gives the second one
    // back to the action when it shows. Only the label's end moves: the row
    // is as tall as it ever was, so nothing below it shifts. Vertical only —
    // a horizontal row is as wide as its label, so there is nothing to give.
    const overlaysAction =
      trailingActionVisibility === 'hover' &&
      trailingAction != null &&
      !isCollapsed;

    // The fill lives on the `<li>`, not the row, so a trailing action sits on
    // the same surface: hovering the action keeps the row lit, and the current
    // row's fill runs under its action instead of stopping short of it.
    const rowStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flex: byOrientation(orientation, '1 1 auto', '0 0 auto'),
      minW: 0,
      // The same inline padding and start alignment in both modes, so the
      // icon does not move when the rail is toggled: at 2.5 a row is the
      // 40px square around an `sm` icon. The `<li>` is what narrows.
      minH: isCollapsed ? 10 : 9,
      px: 2.5,
      py: 2,
      // Clips the label and count while the rail narrows around them. Only
      // collapsed, so an expanded row never clips a badge or a dot that a
      // visual draws past its own box.
      overflow: isCollapsed ? 'hidden' : undefined,
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
      ...inheritDirection,
      ...(overlaysAction && { gridRow: 1, gridColumn: '1 / -1' }),
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
      'data-nav-list-row': '',
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
          {...describedByProps}
          {...tooltipGate}
        >
          {content}
        </chakra.button>
      );
    } else {
      const linkProps = {
        ref: ref as React.Ref<HTMLAnchorElement>,
        ...rowStyles,
        ...rest,
        ...describedByProps,
        ...tooltipGate,
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
                ...describedByProps,
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
    const tooltipContent =
      tooltipKind === 'description' ? (
        tooltip
      ) : isCollapsed && tooltip != null ? (
        <>
          {label}
          <Box>{tooltip}</Box>
        </>
      ) : (
        label
      );
    const labelText =
      typeof label === 'string' || typeof label === 'number'
        ? String(label)
        : undefined;
    const withTooltip = (
      <Tooltip
        content={tooltipContent}
        // Beside the icon, towards the content: the rail is on the right of
        // a right-to-left page. Popper placements are physical.
        placement={
          isCollapsed ? (tooltipDir === 'rtl' ? 'left' : 'right') : 'top'
        }
        onOpenChange={({ open }) => setIsTooltipOpen(open)}
        // Zag only checks that this is set — it takes the content's id and
        // role away, so the trigger is never described by the tooltip. Not
        // rendered anywhere. The description, if any, is `descriptionId`.
        aria-label={labelText ?? 'tooltip'}
        contentProps={{ 'aria-hidden': true }}
      >
        {row}
      </Tooltip>
    );

    const fills = isDisabled
      ? undefined
      : {
          // On the `<li>`, like the hover fill, so the press covers the
          // action's end of the row too — but only a press on the ROW: a
          // press on the action is the action's, and lights its own button.
          // No `>` inside `:has()`: jsdom's selector engine throws on a
          // relative selector, which would break every consumer's tests.
          [PRESSED]: pressedFill,
        };
    // Shown: hovered, focus anywhere in the row, or the action's menu open.
    const shown = [`&:hover > ${ACTION}`, `&:focus-within > ${ACTION}`].join(
      ', '
    );
    const revealOnHover =
      trailingActionVisibility === 'hover'
        ? {
            [`& > ${ACTION}`]: { opacity: 0 },
            [shown]: { opacity: 1 },
            // Its own rule: `:has()` is not forgiving, and a browser without
            // it would drop every selector listed beside it.
            [`& > ${ACTION}:has([aria-expanded="true"], [data-state="open"])`]:
              { opacity: 1 },
            // Touch: always shown, and with its space kept.
            [NO_HOVER]: {
              [`& > ${ACTION}`]: { opacity: 1 },
              ...(overlaysAction && { [`& > ${ROW}`]: { gridColumn: 1 } }),
            },
            ...(overlaysAction && {
              // The row gives the action its column back exactly when the
              // action shows, so the label ends before it.
              [`&:hover > ${ROW}, &:focus-within > ${ROW}`]: { gridColumn: 1 },
              [`&:has(${ACTION} [aria-expanded="true"], ${ACTION} [data-state="open"]) > ${ROW}`]:
                { gridColumn: 1 },
            }),
          }
        : undefined;

    return (
      <chakra.li
        display={
          overlaysAction ? byOrientation(orientation, 'grid', 'flex') : 'flex'
        }
        gridTemplateColumns={overlaysAction ? 'minmax(0, 1fr) auto' : undefined}
        alignItems="center"
        gap={0.5}
        flexShrink={0}
        minW={0}
        // Narrows to the square when the rail collapses, on the label's clock,
        // so the fill shrinks with the rail instead of snapping to 40px.
        maxW={isCollapsed ? 10 : byOrientation(orientation, '100%', 'none')}
        animationStyle="feedback"
        transitionProperty="max-width"
        borderRadius="md"
        bg={isCurrent ? NAV_LIST_RAMP.currentFill : 'transparent'}
        _hover={
          isDisabled
            ? undefined
            : {
                bg: NAV_LIST_RAMP.hoverFill,
                // Again inside hover: Chakra's hover rule is as specific as the
                // press rule and comes later, so a pointer press would lose.
                [PRESSED]: pressedFill,
              }
        }
        css={{ ...fills, ...revealOnHover }}
      >
        {/* Zag stamps `dir` on the portalled tooltip from Ark's locale (`ltr`
            unless a LocaleProvider says otherwise), so a tooltip in an RTL
            rail would set its text left to right. The list measures the
            direction after mount, and a tooltip only opens after that. The
            row lays out from CSS (`inheritDirection`), never from this; its
            content gets the caller's own locale back. */}
        <LocaleProvider locale={localeFor(inherited, tooltipDir)}>
          {withTooltip}
        </LocaleProvider>
        {tooltip != null && (
          // `hidden`, not visually hidden: a description reference still
          // reads hidden text, and browse mode does not read it a second time.
          <chakra.span id={descriptionId} hidden>
            {tooltip}
          </chakra.span>
        )}
        {trailingAction != null && !isCollapsed && (
          <chakra.span
            data-part="trailing-action"
            display="inline-flex"
            alignItems="center"
            flexShrink={0}
            pe={0.5}
            // Over the row's end, above its fill and its focus ring.
            {...(overlaysAction && {
              gridRow: 1,
              gridColumn: 2,
              position: 'relative',
              zIndex: 1,
            })}
          >
            {trailingAction}
          </chakra.span>
        )}
      </chakra.li>
    );
  }
);

NavListItem.displayName = 'NavList.Item';
