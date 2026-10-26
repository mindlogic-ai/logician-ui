import { forwardRef } from 'react';
import { chakra, Skeleton } from '@chakra-ui/react';

import { byOrientation, listStyles } from './NavList.styles';
import { NavListSkeletonProps } from './NavList.types';

/** Widths that vary row to row, so the placeholder does not read as a table. */
const WIDTHS = ['72%', '56%', '84%', '64%', '48%', '76%'];

/**
 * Placeholder rows while a rail's entries load, with the same row height,
 * radius and gap as the real list, so nothing moves when it swaps in.
 *
 * Render it INSTEAD of the `NavList`, not inside it. It is `aria-hidden`: a
 * column of grey bars says nothing to a screen reader, and "loading" belongs
 * to the region that is loading (`aria-busy`, or a status message) rather
 * than to one of its placeholders.
 *
 * Counts that are still loading are not this — leave `trailingVisual` unset
 * until they arrive, and the row keeps its label.
 */
export const NavListSkeleton = forwardRef<
  HTMLUListElement,
  NavListSkeletonProps
>(({ count = 5, orientation = 'vertical', ...rest }, ref) => (
  <chakra.ul ref={ref} aria-hidden {...listStyles(orientation)} {...rest}>
    {Array.from({ length: count }, (_, i) => (
      <chakra.li
        key={i}
        display="flex"
        alignItems="center"
        flexShrink={0}
        // The row's own box: `minH`, padding and one line of `p` text, so
        // the placeholder is exactly as tall as the row that replaces it.
        minH={9}
        px={2.5}
        py={2}
        textStyle="p"
        w={byOrientation(orientation, 'auto', '96px')}
      >
        <Skeleton
          h={4}
          w={byOrientation(orientation, WIDTHS[i % WIDTHS.length], 'full')}
          borderRadius="sm"
          // A placeholder that stops pulsing is still a placeholder; there
          // is no progress for the motion to carry.
          _motionReduce={{ animation: 'none' }}
        />
        <chakra.span w={0} overflow="hidden">
          {'\u00A0'}
        </chakra.span>
      </chakra.li>
    ))}
  </chakra.ul>
));

NavListSkeleton.displayName = 'NavList.Skeleton';
