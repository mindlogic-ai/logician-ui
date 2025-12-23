import { FocusEvent, forwardRef, useState } from 'react';
import ResizeTextarea, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { chakra, TextareaProps } from '@chakra-ui/react';

// Create a chakra-wrapped version of react-textarea-autosize
const ChakraAutoResizeTextarea = chakra(ResizeTextarea);

type AutosizeTextareaProps = Omit<TextareaProps, 'minRows' | 'maxRows'> & {
  minRows?: number;
  maxRows?: number;
  /**
   * Limits rows before focus. On focus, the textarea grows to fit full content.
   * Set to undefined to allow full growth pre-focus as well.
   */
  preFocusMaxRows?: number;
};

export const AutosizeTextarea = forwardRef<HTMLTextAreaElement, AutosizeTextareaProps>(
  (
    {
      onFocus,
      onBlur,
      minRows = 6,
      maxRows = 14,
      preFocusMaxRows = 8,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const effectiveMaxRows = isFocused ? maxRows : preFocusMaxRows;

    return (
      <ChakraAutoResizeTextarea
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        minRows={minRows}
        maxRows={effectiveMaxRows}
        overflow="auto"
        w="full"
        px={4}
        py={2}
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.600"
        _focus={{
          borderColor: 'primary.main',
          boxShadow: '0 0 0 1px var(--chakra-colors-primary-main)',
        }}
        {...(props as TextareaAutosizeProps)}
      />
    );
  }
);

AutosizeTextarea.displayName = 'AutosizeTextarea';
