import type { BoxProps } from '@chakra-ui/react';

export interface SuccessCheckProps extends Omit<BoxProps, 'translate'> {
  /**
   * What the mark is confirming, for a screen reader. Required: the mark is a
   * graphic with no text of its own, so without this it announces nothing and
   * the confirmation reaches sighted readers only.
   *
   * Say what finished, not what is on screen — `"리포트 생성 완료"`, never
   * `"체크 표시"`.
   */
  label: string;
  /**
   * Edge of the square the mark draws in. Any CSS length or Chakra sizing
   * token. Defaults to `48px`, which is the size the mark reads as a
   * confirmation rather than as an icon.
   */
  size?: BoxProps['boxSize'];
}
