import type { ElementType } from 'react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';
import type { ButtonOwnProps } from '../Button/Button.types';

/**
 * SeeMoreButton always renders the ghost Button recipe, so it takes Button's
 * props minus the role (`variant` / `isDestructive`).
 */
export type SeeMoreButtonOwnProps = Omit<
  ButtonOwnProps,
  'variant' | 'isDestructive'
> & {
  /**
   * How many items the list shows now. Printed as the first number of
   * `더보기 (currentCount/maxCount)`.
   */
  currentCount: number;
  /**
   * How many items there are in total. The button does not disable or hide
   * itself when `currentCount` reaches this; the caller does.
   */
  maxCount: number;
};

/**
 * Props for `SeeMoreButton`, typed for whatever element `as` renders.
 * Defaults to `'button'`, so the bare type is unchanged.
 */
export type SeeMoreButtonProps<TElement extends ElementType = 'button'> =
  PolymorphicProps<TElement, SeeMoreButtonOwnProps>;
