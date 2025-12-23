import React, { forwardRef } from 'react';
import { RadioGroup as ChakraRadioGroup, Stack } from '@chakra-ui/react';

import { Radio } from './Radio';
import { RadioGroupProps, RadioOption } from './Radio.types';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { options, value, direction = 'column', gap = 3, ...rest },
    ref
  ) => {
    return (
      <ChakraRadioGroup.Root value={value} {...rest}>
        <Stack direction={direction} gap={gap} ref={ref}>
          {options.map((option: RadioOption) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </ChakraRadioGroup.Root>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
