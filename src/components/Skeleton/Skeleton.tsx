import { ForwardedRef, forwardRef } from 'react';
import {
  Skeleton as ChakraSkeleton,
  SkeletonCircle as ChakraSkeletonCircle,
  SkeletonText as ChakraSkeletonText,
} from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { surfaceStyles } from './Skeleton.styles';
import {
  SkeletonCircleProps,
  SkeletonProps,
  SkeletonTextProps,
} from './Skeleton.types';

/**
 * A placeholder block standing in for content that has not arrived.
 *
 * Wraps Chakra's Skeleton to take its layout behaviour — `loading={false}`
 * reveals the real children with a short fade, and a loading block hides its
 * own children while keeping their box, so the page does not reflow when the
 * data lands — while replacing its animation with the shared `shimmer` /
 * `pulse` presets. Chakra's own variants each carry a hardcoded duration; these
 * run on the motion scale and honour `prefers-reduced-motion` by going still.
 *
 * ```tsx
 * <Skeleton loading={isLoading} height="10">
 *   <Text>{data?.title}</Text>
 * </Skeleton>
 * ```
 */
export const Skeleton = forwardRef(
  (
    { animation = 'shimmer', css, ...rest }: SkeletonProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <ChakraSkeleton
      ref={ref}
      // Chakra's animation variants are turned off wholesale rather than
      // extended: `shine` and `pulse` set the paint and the clock in one
      // declaration, so keeping either would mean overriding half of it.
      variant="none"
      {...rest}
      css={mergeCss(surfaceStyles[animation], css)}
    />
  )
);
Skeleton.displayName = 'Skeleton';

/**
 * A round placeholder, for the avatar-shaped hole in a loading row.
 *
 * Defaults to `pulse`: the shimmer sweeps across the full width of whatever it
 * is laid on, and on something as narrow as an avatar the whole pass is over
 * before the eye resolves it as movement — it reads as a flicker.
 */
export const SkeletonCircle = forwardRef(
  (
    { animation = 'pulse', css, ...rest }: SkeletonCircleProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <ChakraSkeletonCircle
      ref={ref}
      variant="none"
      {...rest}
      css={mergeCss(surfaceStyles[animation], css)}
    />
  )
);
SkeletonCircle.displayName = 'SkeletonCircle';

/**
 * A stack of line-shaped placeholders standing in for a paragraph.
 *
 * The lines share one `animationStyle`, so they sweep in unison rather than
 * each starting its own cycle. That is deliberate: they represent one block of
 * text, and `staggerProps` is for lists whose items arrive separately.
 */
export const SkeletonText = forwardRef(
  (
    { animation = 'shimmer', css, ...rest }: SkeletonTextProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => (
    <ChakraSkeletonText
      ref={ref}
      variant="none"
      {...rest}
      css={mergeCss(surfaceStyles[animation], css)}
    />
  )
);
SkeletonText.displayName = 'SkeletonText';
