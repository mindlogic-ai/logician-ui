import React, { forwardRef } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { RadioProps } from './Radio.types';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ children, value = '', disabled, ...rest }, ref) => {
    return (
      <RadioGroup.Item
        ref={ref}
        value={value}
        disabled={disabled}
        css={{
          '& [data-part="control"]': {
            '&[data-checked]': {
              bg: 'primary.main',
              borderColor: 'primary.main',
            },
          },
        }}
        {...(rest as React.ComponentProps<typeof RadioGroup.Item>)}
      >
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemControl />
        {children && <RadioGroup.ItemText>{children}</RadioGroup.ItemText>}
      </RadioGroup.Item>
    );
  }
);

Radio.displayName = 'Radio';
