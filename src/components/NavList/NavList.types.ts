import type { MouseEventHandler, ReactNode } from 'react';
import type { HTMLChakraProps } from '@chakra-ui/react';

export type NavListOrientation = 'vertical' | 'horizontal';

type NavListBreakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * One orientation, or one per breakpoint. The media-template rails and the
 * Drive source rail lie down into a sideways-scrolling row below `md`:
 *
 * ```tsx
 * <NavList orientation={{ base: 'horizontal', md: 'vertical' }} />
 * ```
 *
 * The switch is pure CSS (one rule per breakpoint), so it never renders the
 * wrong axis first and corrects itself after hydration.
 */
export type NavListResponsiveOrientation =
  | NavListOrientation
  | Partial<Record<NavListBreakpoint, NavListOrientation>>;

export type NavListProps = Omit<HTMLChakraProps<'ul'>, 'children'> & {
  children?: ReactNode;
  /**
   * `vertical` is a rail; `horizontal` is a single row that scrolls sideways
   * instead of wrapping. Accepts a per-breakpoint object.
   * @default 'vertical'
   */
  orientation?: NavListResponsiveOrientation;
  /**
   * Naming the list makes it a `<nav>` landmark around the list. Leave it off
   * when the list already sits inside a named landmark (the app sidebar) — a
   * second, unnamed `nav` is noise in the landmark menu.
   */
  'aria-label'?: string;
  /** As `aria-label`, pointing at a visible heading. Also makes it a `<nav>`. */
  'aria-labelledby'?: string;
};

export type NavListItemProps = Omit<
  HTMLChakraProps<'a'>,
  'children' | 'onClick' | 'aria-current' | 'asChild'
> & {
  /**
   * The label. With `asChild`, the single link element (e.g. `next/link`)
   * whose own children are the label.
   */
  children?: ReactNode;
  /** Renders an `<a>`. Without `href` (and without `asChild`) the row is a `<button>`. */
  href?: string;
  /**
   * Merge the row onto the one child element instead of rendering an `<a>` —
   * for a router link: `<NavList.Item asChild><NextLink href="/x">X</NextLink></NavList.Item>`.
   * The row is treated as a link.
   */
  asChild?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  /**
   * This row is where the user is: `aria-current="page"` on a link,
   * `aria-current="true"` on a button (the active filter of a rail). Shown as
   * an ink label, bold, on a `bg.emphasized` fill.
   */
  isCurrent?: boolean;
  /**
   * A button becomes `disabled`. A link — `asChild` included — is rendered
   * as an `<a role="link" aria-disabled="true">` with no `href`: still
   * announced as a link, out of the tab order, and nothing to open in a new tab.
   */
  isDisabled?: boolean;
  /** Icon before the label. Decorative — the label names the row. */
  leadingVisual?: ReactNode;
  /** Count or badge after the label, in muted text. Read as part of the row's name. */
  trailingVisual?: ReactNode;
  /**
   * A separate control beside the row (more-menu, remove), e.g. an
   * `IconButton` with its own `aria-label`. It is a sibling of the row, never
   * inside it, so there is no interactive element nested in another.
   */
  trailingAction?: ReactNode;
};

export type NavListGroupProps = Omit<
  HTMLChakraProps<'li'>,
  'children' | 'title'
> & {
  children?: ReactNode;
  /**
   * Text above the group's rows, in overline style. Not interactive and not a
   * heading element — it names the group's list (`aria-labelledby`), so it
   * does not add a level to the page outline.
   */
  title?: ReactNode;
};
