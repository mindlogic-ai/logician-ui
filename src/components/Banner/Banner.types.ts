import { BoxProps } from '@chakra-ui/react';

export type BannerSize = 'sm' | 'md' | 'lg';

/**
 * Banner variants (5.0).
 *
 * - `info` (default): a system fact the reader should know before acting
 *   (a setting that is locked, where a value comes from). Nothing is wrong.
 * - `success`: something finished and the result stays relevant on this
 *   screen.
 * - `warning`: it still works, but read this first (irreversible step,
 *   something expiring).
 * - `danger`: it failed or is blocked, and the reader has to do something.
 * - `neutral`: a brand notice with no status (`primary.main` accent bar).
 */
export type BannerVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export interface BannerProps extends BoxProps {
  /**
   * Meaning of the message. Status variants only for a status every reader
   * shares; `neutral` for a notice with none.
   * @default 'info'
   */
  variant?: BannerVariant;
  /** Hide the leading status icon. The text must still say the status. */
  hideIcon?: boolean;
  /**
   * `sm` = subtext, `md` = body text, `lg` = h5 text style.
   * @default 'md'
   */
  size?: BannerSize;
}
