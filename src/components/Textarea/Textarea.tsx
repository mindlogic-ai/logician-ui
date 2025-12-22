import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder,
      onChange,
      value: propValue,
      _focusVisible,
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
        resize="none"
        _focus={{
          borderColor: 'primary.main',
          boxShadow: '0 0 0 1px var(--chakra-colors-primary-main)',
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
