import type { ReactNode } from 'react';
import type { BoxProps, FloatProps } from '@chakra-ui/react';

export type NotificationBadgeSize = 'sm' | 'md' | 'lg';

export type NotificationBadgeProps = Omit<BoxProps, 'children'> & {
  /**
   * The number to show. In numeric mode a count of 0 (or less, or missing)
   * renders nothing unless `showZero`. In dot mode a count is optional — pass
   * one to hide the dot when it reaches 0.
   */
  count?: number;
  /**
   * Largest number shown as-is; anything above renders as `"{max}+"`.
   * @default 99
   */
  max?: number;
  /** Dot mode: a small circle with no number ("something new"). */
  dot?: boolean;
  /** Render `0` (numeric) / the dot (dot mode) even when `count` is 0. */
  showZero?: boolean;
  /**
   * Accessible name. In numeric mode it is read INSTEAD of the bare number
   * (e.g. "읽지 않은 알림 120개" rather than "99+"); in dot mode it is what
   * makes the dot visible to assistive tech at all — without it the dot is
   * `aria-hidden`. `aria-label` is accepted as an alias.
   *
   * Inside an element that has its own `aria-label` (an icon-only button) it
   * is never announced — that `aria-label` replaces the subtree. Put the
   * count in the button's `aria-label` there instead.
   */
  label?: string;
  /** @default 'md' */
  size?: NotificationBadgeSize;
  /**
   * The icon or avatar the badge sits on. When given, the badge wraps it in a
   * `position: relative` span and floats at its top-end corner, so the app
   * does not place it by hand. Without children the badge renders inline, as
   * before (next to a nav item's text, in a list row).
   *
   * The wrapper is a `<span>`, so it is valid inside a `<button>`.
   */
  children?: ReactNode;
  /**
   * Colour of a 2px ring drawn OUTSIDE the badge (`outline`), so the badge
   * keeps its full size. Pass the colour behind the badge (`bg.canvas`,
   * `bg.panel`) to cut it out of the icon or avatar underneath.
   */
  ringColor?: string;
  /**
   * Hide the badge but keep `children`. Use it for a dot with no count; a
   * numeric badge already hides at 0.
   */
  invisible?: boolean;
  /**
   * How far the badge centre is pulled in from the corner when it wraps
   * `children`. Defaults to `'0.5'` for a dot (sits on the icon's edge) and
   * `'0'` for a number (centred on the corner).
   */
  floatOffset?: FloatProps['offset'];
};
