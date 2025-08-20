import { ForwardedRef, forwardRef } from 'react';
import { FormControl as ChakraFormControl } from '@chakra-ui/react';

import { FormControlProps } from './FormControl.types';

export const FormControl = forwardRef(
  ({ ...rest }: FormControlProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraFormControl noValidate {...rest} ref={ref} />;
  },
);

FormControl.displayName = 'FormControl';
