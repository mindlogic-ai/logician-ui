import { BoxProps } from '@chakra-ui/react';

export type BannerSize = 'sm' | 'md' | 'lg';

export interface BannerProps extends BoxProps {
  /**
   * Tone of the message.
   *
   * `info`/`success`/`warning`/`danger` all carry emphasis — a coloured field
   * and a matching accent that pull the eye. Use `neutral` for a message that
   * must be *read* but not *reacted to*: a state the member can't act on, or a
   * quiet aside next to content that should keep the focus. It borrows the
   * semantic surface tokens rather than a status palette, so it recedes in both
   * light and dark instead of competing with the content around it.
   */
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  hideIcon?: boolean;
  size?: BannerSize;
}
