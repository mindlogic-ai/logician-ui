'use client';

import React from 'react';
import { PinInput as ChakraPinInput } from '@chakra-ui/react';

import { PinInputProps } from './PinInput.types';

export const PinInput = ({
  length,
  value = '',
  onChange,
  onComplete,
  type = 'numeric',
  autoFocus = false,
  otp = false,
  disabled = false,
  invalid = false,
  placeholder = '',
  style,
  ...rest
}: PinInputProps) => {
  const valueArray = Array.from({ length }, (_, i) => value[i] ?? '');

  return (
    <ChakraPinInput.Root
      count={length}
      value={valueArray}
      onValueChange={(d) => onChange?.(d.valueAsString, d.value.length - 1)}
      onValueComplete={(d) => onComplete?.(d.valueAsString)}
      type={type}
      autoFocus={autoFocus}
      otp={otp}
      disabled={disabled}
      invalid={invalid}
      placeholder={placeholder}
      {...rest}
    >
      <ChakraPinInput.HiddenInput />
      <ChakraPinInput.Control style={style}>
        {valueArray.map((_, i) => (
          <ChakraPinInput.Input
            key={i}
            index={i}
            w="48px"
            h="48px"
            fontSize="lg"
            borderRadius="md"
            bg="white"
            borderColor={invalid ? 'danger.main' : 'gray.400'}
            _hover={{
              borderColor: invalid ? 'danger.main' : 'primary.lighter',
            }}
            _focus={{
              borderColor: invalid ? 'danger.main' : 'primary.main',
            }}
            _disabled={{ borderColor: 'gray.200', bg: 'gray.50' }}
          />
        ))}
      </ChakraPinInput.Control>
    </ChakraPinInput.Root>
  );
};

PinInput.displayName = 'PinInput';
