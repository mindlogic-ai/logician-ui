import React, { forwardRef } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { RadioProps } from './Radio.types';

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { children, inputProps, rootRef, ...rest } = props;

  return (
    <RadioGroup.Item ref={rootRef} {...rest}>
      <RadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
      <RadioGroup.ItemIndicator {...focusRing} />
      {children && <RadioGroup.ItemText>{children}</RadioGroup.ItemText>}
    </RadioGroup.Item>
  );
});

Radio.displayName = 'Radio';
