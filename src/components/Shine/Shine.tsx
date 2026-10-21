import { ForwardedRef, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { shineHost } from './Shine.styles';
import { ShineProps } from './Shine.types';

/**
 * A band of light that crosses the surface, rests, and crosses again.
 *
 * For the one thing on a screen that should keep asking — an upgrade CTA, a
 * trial banner. Wrap the surface; the band rides on the wrapper's `::after`, so
 * nothing inside it moves.
 *
 * **One per screen, and only where the ask is the point.** This is ambient
 * motion with no end state, which is the most expensive kind: it is in the
 * reader's periphery the whole time they are on the page. A second one turns
 * the screen into a slot machine.
 *
 * **Never the only signal.** It is removed entirely under reduced motion, so
 * for some readers the surface simply sits there. Whatever the shine is drawing
 * attention to has to be legible without it — in the copy, the colour, the
 * placement.
 *
 * **Not on anything being read.** A band crossing a paragraph is a distraction
 * with no upside; this belongs on a control.
 *
 * `periodMs` raises the gap between passes. The default is the house loop,
 * 1800ms, which is often too eager next to reading content.
 *
 * ```tsx
 * <Shine periodMs={3200} borderRadius="lg">
 *   <Button variant="primary">업그레이드</Button>
 * </Shine>
 * ```
 */
export const Shine = forwardRef(
  (
    { periodMs, colour, children, css, ...rest }: ShineProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      display="inline-flex"
      {...rest}
      css={mergeCss(
        shineHost,
        // Omitted props leave the style's own defaults in place, the way
        // `Appear` does it.
        periodMs === undefined
          ? undefined
          : { '&::after': { animationDuration: `${periodMs}ms` } },
        colour === undefined ? undefined : { '--shine-colour': colour },
        css
      )}
    >
      {children}
    </Box>
  )
);

Shine.displayName = 'Shine';
