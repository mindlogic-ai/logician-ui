import { ForwardedRef, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { revealOpen } from './Reveal.styles';
import { RevealProps } from './Reveal.types';

/**
 * Opens a block out of zero height instead of inserting it — for content that
 * arrives *underneath* something the reader is already looking at: an answer's
 * rationale, a validation message under a field, a details panel.
 *
 * The problem it solves is a layout jump. Rendering the block directly moves
 * everything below it in one frame, and if the reader's eye is on the element
 * the content belongs to, that frame reads as the page breaking rather than as
 * content arriving.
 *
 * The caller owns mounting — render it when the content should appear, the same
 * contract `FlyTo` uses. It does not animate closed; a block that opens *and*
 * closes is a Collapsible, which keeps its node mounted and can therefore use
 * `presence`.
 *
 * ⚠️ **Costs layout on every frame**, unlike the transform-only primitives here.
 * Inherent to opening to content-height. Keep it on small blocks — not a long
 * list, a table, or anything with nested scroll.
 *
 * ```tsx
 * {showRationale && <Reveal><Text>{rationale}</Text></Reveal>}
 * ```
 */
export const Reveal = forwardRef(
  (
    { durationMs, children, css, ...rest }: RevealProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      {...rest}
      css={mergeCss(
        revealOpen,
        durationMs === undefined
          ? undefined
          : { animationDuration: `${durationMs}ms` },
        css
      )}
    >
      {/* The grid track animates; this holds the content and clips it while the
          track is shorter than the content is tall. */}
      <div>{children}</div>
    </Box>
  )
);

Reveal.displayName = 'Reveal';
