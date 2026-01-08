import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { Textarea as ChakraTextarea, useToken } from '@chakra-ui/react';

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
    // Get resolved color values for boxShadow
    const [primaryColor, dangerColor] = useToken('colors', [
      'primary.main',
      'danger.main',
    ]);

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
          boxShadow: invalid
            ? `0 0 0 1px ${dangerColor}`
            : `0 0 0 1px ${primaryColor}`,
        }}
        _hover={{
          borderColor: invalid ? 'danger.main' : 'gray.600',
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
