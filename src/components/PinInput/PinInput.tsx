'use client';

import { forwardRef } from 'react';
import { PinInput as ChakraPinInput } from '@chakra-ui/react';

import { PinInputProps } from './PinInput.types';

export const PinInput = forwardRef<HTMLInputElement, PinInputProps>(
  function PinInput(
    {
      length,
      value,
      onChange,
      onComplete,
      placeholder = '',
      inputProps,
      ...rest
    },
    ref
  ) {
    const valueArray = Array.from({ length }, (_, i) => value?.[i] ?? '');

    return (
      <ChakraPinInput.Root
        count={length}
        value={valueArray}
        onValueChange={(d) => onChange?.(d.valueAsString)}
        onValueComplete={(d) => onComplete?.(d.valueAsString)}
        placeholder={placeholder}
        {...rest}
      >
        <ChakraPinInput.HiddenInput ref={ref} {...inputProps} />
        <ChakraPinInput.Control>
          {Array.from({ length }).map((_, i) => (
            <ChakraPinInput.Input
              key={i}
              index={i}
              w={12}
              h={12}
              fontSize="lg"
              borderRadius="md"
              bg="white"
              borderColor="gray.400"
              _hover={{ borderColor: 'primary.lighter' }}
              _focus={{ borderColor: 'primary.main' }}
              _invalid={{ borderColor: 'danger.main' }}
              _disabled={{ borderColor: 'gray.200', bg: 'gray.50' }}
            />
          ))}
        </ChakraPinInput.Control>
      </ChakraPinInput.Root>
    );
  }
);

PinInput.displayName = 'PinInput';
