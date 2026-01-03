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
      // v2 backward compatibility props
      isDisabled,
      isInvalid,
      isReadOnly,
      ...props
    },
    ref
  ) => {
    // v2 backward compatibility: isDisabled -> disabled, isInvalid -> invalid, isReadOnly -> readOnly
    const disabledState = disabled ?? isDisabled;
    const invalidState = invalid ?? isInvalid;
    const readOnlyState = readOnly ?? isReadOnly;

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
        disabled={disabledState}
        readOnly={readOnlyState}
        data-invalid={invalidState || undefined}
        resize="none"
        borderColor={invalidState ? 'danger.main' : 'gray.400'}
        _focus={{
          borderColor: 'primary.main',
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
