import React, { forwardRef } from 'react';
import { Text } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { TypographyOwnProps } from './Typography.types';

const SubtextImpl = forwardRef<HTMLParagraphElement, TypographyOwnProps>(
  (props, ref) => {
    const { fontSize, ...rest } = props;

    return (
      <Text
        ref={ref}
        textStyle={fontSize ? undefined : 'subtext'}
        fontSize={fontSize}
        color="fg.default"
        wordBreak="keep-all"
        {...rest}
      />
    );
  }
);

SubtextImpl.displayName = 'Subtext';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Subtext = polymorphic<TypographyOwnProps, 'p'>(SubtextImpl);
