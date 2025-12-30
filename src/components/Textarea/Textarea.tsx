import { ChangeEvent, useEffect, useState } from 'react';
import {
  forwardRef,
  Textarea as ChakraTextarea,
  TextareaProps,
  useTheme,
} from '@chakra-ui/react';

export const Textarea = forwardRef<TextareaProps, 'textarea'>(
  (
    {
      placeholder,
      onChange,
      value: propValue,
      _focusVisible,
      ...props
    }: TextareaProps,
    ref?
  ) => {
    const theme = useTheme();
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
        focusBorderColor={theme.semanticTokens.colors.primary.main}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
