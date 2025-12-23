import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import {
  Textarea as ChakraTextarea,
  TextareaProps,
  useTheme,
} from '@chakra-ui/react';

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
        borderColor="gray.400"
        _focus={{
          borderColor: theme.semanticTokens.colors.primary.main as string,
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
