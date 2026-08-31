import { forwardRef } from 'react';
import { Text } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { TypographyOwnProps } from './Typography.types';

/**
 * The smallest tier in the body type scale (`textStyle="caption"`, ~11–12px),
 * one step below {@link Subtext}. Use it for de-emphasised metadata — message
 * timestamps, counts, statuses, helper microcopy, table sub-values — text that
 * supports the content without competing with it.
 *
 * Scale: `Text` (p, 14–16px) → `Subtext` (12.88–14px) → `Caption` (11–12px).
 *
 * Defaults to `fg.muted` since captions are secondary by nature; every aspect
 * stays one Chakra prop away, so a brand/status variant is a single override
 * (e.g. `color="danger.main"`). Passing `fontSize` opts out of the baked-in
 * `textStyle` so an explicit size wins.
 */
const CaptionImpl = forwardRef<HTMLParagraphElement, TypographyOwnProps>(
  (props, ref) => {
    const { fontSize, ...rest } = props;

    return (
      <Text
        ref={ref}
        // If fontSize is provided, disable textStyle to allow the override
        textStyle={fontSize ? undefined : 'caption'}
        fontSize={fontSize}
        color="fg.muted"
        wordBreak="keep-all"
        {...rest}
      />
    );
  }
);

CaptionImpl.displayName = 'Caption';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Caption = polymorphic<TypographyOwnProps, 'p'>(CaptionImpl);
