import { ForwardedRef, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { boop } from './Boop.styles';
import { BoopProps } from './Boop.types';

/**
 * A hover that answers: the child leans, swells or hops while the pointer is
 * over it, and settles back when it leaves.
 *
 * The smallest motion in the set, and the only one tied to the pointer. For
 * icons that are already interactive — a sidebar rail, a message toolbar — and
 * for nothing else. It carries no information; it acknowledges.
 *
 * **One gesture per surface.** Three icons in a row that each boop differently
 * read as three unrelated controls rather than as one toolbar.
 *
 * **Not on anything that already moves on hover.** A button whose background
 * changes, a card that raises — those have answered already, and a second
 * answer on the same hover reads as a glitch.
 *
 * **Pointer only.** There is no keyboard equivalent and that is deliberate:
 * nothing here is conveyed, so a focus ring is the whole story for a keyboard
 * reader. Under reduced motion it is removed outright for the same reason —
 * the hover state (cursor, colour) says what this says, without moving.
 *
 * **Adds one `div` around `children`**, the way `Shake` does, and layout props
 * land on that wrapper. Animate the inner element instead of wrapping where the
 * parent needs its children directly — a `<tr>` needs `<td>`s, and Ark parts
 * walk their own children.
 *
 * ```tsx
 * <Boop gesture="lift">
 *   <IconButton aria-label="공유"><ShareIcon /></IconButton>
 * </Boop>
 * ```
 */
export const Boop = forwardRef(
  (
    { gesture = 'tilt', children, css, ...rest }: BoopProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <Box ref={ref} {...rest} css={mergeCss(boop(gesture), css)}>
      {children}
    </Box>
  )
);

Boop.displayName = 'Boop';
