import React, { forwardRef } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { RadioProps } from './Radio.types';

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { children, inputProps, rootRef, ...rest } = props;

  return (
    <RadioGroup.Item ref={rootRef} {...rest}>
      <RadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
      <RadioGroup.ItemIndicator />
      {children && <RadioGroup.ItemText>{children}</RadioGroup.ItemText>}
    </RadioGroup.Item>
  );
});

Radio.displayName = 'Radio';
