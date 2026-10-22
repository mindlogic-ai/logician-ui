import type { ElementType } from 'react';
import { CardRootProps as ChakraCardRootProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

export type CardVariant = 'default' | 'wash' | 'elevated';

export type CardOwnProps = Omit<ChakraCardRootProps, 'as'> & {
  /**
   * The whole card is one target: pointer cursor, and on hover the ground
   * steps to `bg.subtle` and the border to `border.strong`. Styling only —
   * render it as the control with `as` (`as={NextLink}`, `as="button"`).
   */
  clickable?: boolean;
  /**
   * `default`: `bg.surface` with a `border.subtle` hairline — most content.
   * `wash`: `bg.muted`, no border — a block that summarises or concludes (an
   * AI summary, a purchase total). `elevated`: a soft `sm` shadow — a
   * standalone card that should read as a raised object.
   * @default 'default'
   */
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
