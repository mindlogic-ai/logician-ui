import {
  SkeletonCircleProps as ChakraSkeletonCircleProps,
  SkeletonProps as ChakraSkeletonProps,
  SkeletonTextProps as ChakraSkeletonTextProps,
} from '@chakra-ui/react';

/**
 * Which loop runs on the placeholder.
 *
 * - `shimmer` — a highlight sweeps across the block. The default: it travels,
 *   so it reads as *this is loading* rather than as a UI element that happens
 *   to be grey.
 * - `pulse` — the block breathes in place. For a skeleton narrower than the
 *   sweep is wide (an avatar, a chip), where a highlight crossing 24px is a
 *   flicker.
 * - `none` — a static block. For a placeholder that will be on screen long
 *   enough to become furniture, or one already inside something that moves.
 */
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

/** Chakra's `variant` is replaced by `animation`, which names our loop presets. */
type WithAnimation<T> = Omit<T, 'variant'> & {
  animation?: SkeletonAnimation;
};

export type SkeletonProps = WithAnimation<ChakraSkeletonProps>;
export type SkeletonCircleProps = WithAnimation<ChakraSkeletonCircleProps>;
export type SkeletonTextProps = WithAnimation<ChakraSkeletonTextProps>;
