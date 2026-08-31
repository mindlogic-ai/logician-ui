import { forwardRef } from 'react';
import { Text } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { TypographyOwnProps } from './Typography.types';

/**
 * Small, uppercase, letter-spaced label used as a section "eyebrow" or category
 * heading (e.g. an "EXECUTION MODE" eyebrow above a panel heading, or a
 * "RECENT" group label).
 *
 * Part of the typography scale alongside `Subtext` — it shares the subtext size
 * but adds the baked-in overline styling (`textStyle="overline"`: uppercase,
 * wider tracking, medium weight). Every aspect stays one Chakra prop away, so
 * brand/status variants are a single override (e.g. `color="primary.main"`,
 * `fontWeight="extrabold"`).
 */
const OverlineImpl = forwardRef<HTMLParagraphElement, TypographyOwnProps>(
  (props, ref) => {
    const { fontSize, ...rest } = props;

    return (
      <Text
        ref={ref}
        // If fontSize is provided, disable textStyle to allow the override
        textStyle={fontSize ? undefined : 'overline'}
        fontSize={fontSize}
        color="slate.800"
        wordBreak="keep-all"
        {...rest}
      />
    );
  }
);

OverlineImpl.displayName = 'Overline';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Overline = polymorphic<TypographyOwnProps, 'p'>(OverlineImpl);
