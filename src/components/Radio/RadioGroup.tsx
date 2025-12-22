import React, { forwardRef } from 'react';
import { RadioGroup as ChakraRadioGroup, Stack } from '@chakra-ui/react';

import { Radio } from './Radio';
import { RadioGroupProps, RadioOption } from './Radio.types';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { options, value, onValueChange, direction = 'column', gap, spacing = 3, ...rest },
    ref
  ) => {
    const finalGap = gap ?? spacing;

    return (
      <ChakraRadioGroup.Root value={value} onValueChange={onValueChange} {...rest}>
        <Stack direction={direction} gap={finalGap} ref={ref}>
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
