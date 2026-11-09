import { NotificationBadge } from './NotificationBadge';
import type {
  NotificationBadgeProps,
  NotificationBadgeSize,
} from './NotificationBadge.types';

export { NotificationBadge };
export type { NotificationBadgeProps, NotificationBadgeSize };

/** @deprecated Renamed to `NotificationBadge`. Removed in 6.0. */
export const CountBadge = NotificationBadge;
/** @deprecated Renamed to `NotificationBadgeProps`. Removed in 6.0. */
export type CountBadgeProps = NotificationBadgeProps;
/** @deprecated Renamed to `NotificationBadgeSize`. Removed in 6.0. */
export type CountBadgeSize = NotificationBadgeSize;
