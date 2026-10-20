import type { ElementType } from 'react';
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

export type SeeMoreButtonOwnProps = Omit<ChakraButtonProps, 'as'> & {
  currentCount: number;
  maxCount: number;
};

/**
 * Props for `SeeMoreButton`, typed for whatever element `as` renders.
 * Defaults to `'button'`, so the bare type is unchanged.
 */
export type SeeMoreButtonProps<TElement extends ElementType = 'button'> =
  PolymorphicProps<TElement, SeeMoreButtonOwnProps>;
