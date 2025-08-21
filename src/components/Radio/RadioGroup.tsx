import React, { forwardRef } from 'react';
import { RadioGroup as ChakraRadioGroup, Stack } from '@chakra-ui/react';

import { Radio } from './Radio';
import { RadioGroupProps, RadioOption } from './Radio.types';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { options, value, onChange, direction = 'column', spacing = 3, ...rest },
    ref
  ) => {
    return (
      <ChakraRadioGroup value={value} onChange={onChange} {...rest}>
        <Stack direction={direction} spacing={spacing} ref={ref}>
          {options.map((option: RadioOption) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </ChakraRadioGroup>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
