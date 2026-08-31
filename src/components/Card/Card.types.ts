import type { ElementType } from 'react';
import { CardRootProps as ChakraCardRootProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

export type CardVariant = 'default' | 'gradient' | 'elevated';

export type CardOwnProps = Omit<ChakraCardRootProps, 'as'> & {
  clickable?: boolean;
  variant?: CardVariant;
};

/**
 * Props for `Card`, typed for whatever element `as` renders.
 *
 * A `clickable` card is the case that needs this: the whole card is one target,
 * so it should BE the link rather than contain one. Defaults to `'div'`, so
 * bare `CardProps` is unchanged.
 *
 * ```tsx
 * <Card clickable as={NextLink} href={`/courses/${id}`}>…</Card>
 * ```
 */
export type CardProps<TElement extends ElementType = 'div'> = PolymorphicProps<
  TElement,
  CardOwnProps
>;
