import { ForwardedRef, forwardRef } from 'react';
import { Field } from '@chakra-ui/react';

import { FormControlProps } from './FormControl.types';

export const FormControl = forwardRef(
  ({ ...rest }: FormControlProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <Field.Root {...rest} ref={ref} />;
  }
);

FormControl.displayName = 'FormControl';
