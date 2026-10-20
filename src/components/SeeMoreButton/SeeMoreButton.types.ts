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
  currentCount: number;
  maxCount: number;
};

/**
 * Props for `SeeMoreButton`, typed for whatever element `as` renders.
 * Defaults to `'button'`, so the bare type is unchanged.
 */
export type SeeMoreButtonProps<TElement extends ElementType = 'button'> =
  PolymorphicProps<TElement, SeeMoreButtonOwnProps>;
