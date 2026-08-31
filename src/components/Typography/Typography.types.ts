import type { ElementType } from 'react';
import {
  HeadingProps as ChakraHeadingProps,
  TextProps,
} from '@chakra-ui/react';

// Relative, NOT `@/types/*`. Path aliases survive into the emitted `.d.ts` and
// resolve against the CONSUMER's tsconfig, which silently degrades the type to
// `any`. See `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

export type TypographyOwnProps = Omit<TextProps, 'as'>;

/**
 * Props for the body-text scale (`Text`, `Subtitle`, `Subtext`, `Caption`,
 * `Overline`), typed for whatever element `as` renders. Defaults to `'p'`, so
 * the bare type means exactly what it meant before.
 *
 * The scale is a *type* scale, not a document outline — which is why `as` is
 * the documented escape hatch on these. A subtitle that genuinely is the next
 * heading says so at the call site, where that is known:
 *
 * ```tsx
 * <Subtitle as="h2">{sectionTitle}</Subtitle>
 * <Text as="label" htmlFor="email">이메일</Text>
 * ```
 *
 * The second line is the reason this needs to be polymorphic and not merely
 * permitted: `as="label"` already compiled, but `htmlFor` did not come with it.
 */
export type TypographyProps<TElement extends ElementType = 'p'> =
  PolymorphicProps<TElement, TypographyOwnProps>;

export type HeadingOwnProps = Omit<ChakraHeadingProps, 'as'>;

/**
 * Props for `H1`–`H5`, typed for whatever element `as` renders.
 *
 * Each defaults to its own tag, so the bare type is unchanged. `as` is how a
 * call site keeps the type scale while fixing the document outline — KWCAG
 * 제목 제공 grades the heading LEVEL, not the size:
 *
 * ```tsx
 * <H3 as="h2">{sectionTitle}</H3>
 * ```
 */
export type HeadingProps<TElement extends ElementType = 'h1'> =
  PolymorphicProps<TElement, HeadingOwnProps>;
