import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/react';

import { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder,
      onChange,
      value: propValue,
      _focusVisible,
      disabled,
      invalid,
      readOnly,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<
      string | number | readonly string[] | undefined
    >(propValue);

    useEffect(() => {
      setCurrentValue(propValue);
    }, [propValue]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <ChakraTextarea
        ref={ref}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        data-invalid={invalid || undefined}
        resize="none"
        borderColor={invalid ? 'danger.main' : 'gray.400'}
        _focus={{
          borderColor: invalid ? 'danger.main' : 'primary.main',
        }}
        _hover={{
          borderColor: invalid ? 'danger.main' : 'gray.600',
        }}
        _invalid={{
          borderColor: 'danger.main',
          _hover: {
            borderColor: 'danger.main',
          },
          _focus: {
            borderColor: 'danger.main',
          },
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
