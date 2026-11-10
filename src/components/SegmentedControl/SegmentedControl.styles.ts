import type { SystemStyleObject } from '@chakra-ui/react';

import {
  controlHeightVar,
  type ControlSize,
  controlSizes,
} from '@/theme/controlSizes';

/**
 * `travel`, but delivered through custom properties.
 *
 * Ark writes this part's `transition-*` **inline**, and an inline declaration
 * beats any class, so the ordinary preset never reaches the indicator. The two
 * halves it does leave reachable are the duration and the timing function, both
 * read from custom properties — which is the only seam available.
 *
 * Local rather than shared for the same reason it exists at all: it is a
 * workaround for one library part, not a motion anyone should be choosing.
 * If a second Ark part turns out to need the identical hatch, that is the
 * moment to promote it.
 */
export const indicatorTravel: SystemStyleObject = {
  '--transition-duration': 'var(--chakra-durations-motion-base)',
  '--transition-timing-function': 'var(--chakra-easings-emphasized)',
  _motionReduce: {
    '--transition-duration': 'var(--chakra-durations-motion-instant)',
  },
};

/**
 * The root's padding in px (see `rootPadding` in SegmentedControl.tsx for
 * why px), per size. Shared with the item-height calc so the two cannot
 * disagree.
 *
 * 4px from `sm` up; 2px at `xs` / `2xs`. A fixed 4px left an `xs` item 20px
 * tall (28 − 8) inside a 16px `ScaledContext`, shorter than its own 14px type's
 * 21px line, and the label read squeezed against the indicator (FactChat
 * coding-agent toolbar, 박상현 2026-11-10). At 2px the item is 24px.
 */
export const segmentRootPaddingPx = (size: unknown): number =>
  size === 'xs' || size === '2xs' ? 2 : 4;

/**
 * Item height so that the OUTER height (item + 2 × root padding) equals the
 * Button height for the same size — `controlSizes[size].height`, i.e. 28 /
 * 31.5 / 35 / 38.5px for xs / sm / md / lg at the 14px root, and 36 / 40 / 44
 * for sm / md / lg inside a 16px `ScaledContext`.
 *
 * A `calc()` on the height token rather than a smaller token: the root padding
 * is a fixed px value while the sizes tokens are rem (em inside a
 * ScaledContext), so no single token equals "Button height − padding" at every
 * font size. The old one-token-smaller table (`6`/`7`/`8`/`9`) was written for
 * a 16px rem and came out 1px taller than Button at the real 14px root.
 */
export const segmentItemHeight = (size: unknown): string =>
  `calc(${controlHeightVar(
    (typeof size === 'string' && size in controlSizes
      ? size
      : 'md') as ControlSize
  )} - ${segmentRootPaddingPx(size) * 2}px)`;
