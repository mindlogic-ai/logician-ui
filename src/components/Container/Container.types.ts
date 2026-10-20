import type { ElementType } from 'react';
import { ContainerProps as ChakraContainerProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

export type ContainerOwnProps = Omit<ChakraContainerProps, 'as'> & {
  /** Skip the responsive `minWidth` this component otherwise applies. */
  disableResponsive?: boolean;
};

/**
 * Props for `Container`, typed for whatever element `as` renders.
 *
 * Defaults to `'div'`, so the bare type is unchanged. A page container is
 * often a landmark — `as="main"` / `as="section"` / `as="nav"` is how it says
 * so, and KWCAG 반복 영역 건너뛰기 grades that structure.
 */
export type ContainerProps<TElement extends ElementType = 'div'> =
  PolymorphicProps<TElement, ContainerOwnProps>;
