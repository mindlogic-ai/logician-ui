import { forwardRef } from 'react';
import { Text } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { TypographyOwnProps } from './Typography.types';

/**
 * Supporting text under a heading — a subtitle by role in the page, not by
 * document structure.
 *
 * Renders a paragraph. It used to render `<h6>`, which made every call site a
 * level-6 heading in the document outline: a sentence of helper copy under an
 * `<h1>` announced as a heading to a screen reader, and a jump from level 1 to
 * level 6 in the heading list (KWCAG 2.1 5.2.4.2 제목 제공 / axe `heading-order`).
 * A component chosen for its type scale should not decide the outline.
 *
 * A subtitle that genuinely IS the next heading level still says so at the call
 * site, which is where that is known:
 *
 * ```tsx
 * <Subtitle as="h2">{sectionTitle}</Subtitle>
 * ```
 */
const SubtitleImpl = forwardRef<HTMLParagraphElement, TypographyOwnProps>(
  (props, ref) => {
    const { fontSize, ...rest } = props;

    return (
      <Text
        ref={ref}
        textStyle={fontSize ? undefined : 'subtitle'}
        fontSize={fontSize}
        color="fg.muted"
        wordBreak="keep-all"
        {...rest}
      />
    );
  }
);

SubtitleImpl.displayName = 'Subtitle';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Subtitle = polymorphic<TypographyOwnProps, 'p'>(SubtitleImpl);
