import React, { forwardRef, useCallback } from 'react';
import { RadioGroup as ChakraRadioGroup, Stack } from '@chakra-ui/react';

import { Radio } from './Radio';
import { RadioGroupProps, RadioOption } from './Radio.types';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onValueChange,
      onChange,
      direction = 'column',
      gap,
      spacing = 3,
      ...rest
    },
    ref
  ) => {
    const finalGap = gap ?? spacing;

    // Handle deprecated onChange prop
    const handleValueChange = useCallback(
      (details: { value: string }) => {
        if (onValueChange) {
          onValueChange(details);
        }
        if (onChange) {
          onChange(details.value);
        }
      },
      [onValueChange, onChange]
    );

    return (
      <ChakraRadioGroup.Root
        value={value}
        onValueChange={handleValueChange}
        {...rest}
      >
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
