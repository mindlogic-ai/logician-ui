import React, { forwardRef } from 'react';
import { Text as ChakraText } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { omitUndefined } from '../../utils/omitUndefined';
import { TypographyOwnProps } from './Typography.types';

const TextImpl = forwardRef<HTMLParagraphElement, TypographyOwnProps>(
  (props, ref) => {
    // Pull fontSize out: when it is set, textStyle is dropped so the size wins
    const { fontSize, ...rest } = props;

    return (
      <ChakraText
        ref={ref}
        as="p"
        // If fontSize is provided, disable textStyle to allow fontSize override
        textStyle={fontSize ? undefined : 'p'}
        fontSize={fontSize}
        color="fg.default"
        {...omitUndefined(rest)}
      />
    );
  }
);

TextImpl.displayName = 'Text';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Text = polymorphic<TypographyOwnProps, 'p'>(TextImpl);
