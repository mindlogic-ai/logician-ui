import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef(({ sx, ...rest }: CheckboxProps, ref) => {
  return (
    <ChakraCheckbox
      ref={ref}
      {...rest}
      sx={{
        '.chakra-checkbox__control': {
          borderRadius: '4px',
          borderColor: 'gray.400',
          _checked: {
            bg: 'primary.main',
            borderColor: 'primary.main',
          },
          _indeterminate: {
            bg: 'primary.main',
            borderColor: 'primary.main',
          },
        },
      }}
    />
  );
});

Checkbox.displayName = 'Checkbox';
