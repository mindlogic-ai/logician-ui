import React, { forwardRef } from 'react';
import { Radio as ChakraRadio } from '@chakra-ui/react';

import { RadioProps } from './Radio.types';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ChakraRadio
        ref={ref}
        _checked={{
          bg: 'primary.main',
          borderColor: 'primary.main',
          position: 'relative',
          _before: {
            content: '""',
            bg: 'white',
            w: '50%',
            h: '50%',
            borderRadius: 'full',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        {...rest}
      >
        {children}
      </ChakraRadio>
    );
  }
);

Radio.displayName = 'Radio';
