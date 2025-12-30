import { FocusEvent, useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import { TextareaProps } from '@chakra-ui/react';

import { Textarea } from './Textarea';

type AutosizeTextareaProps = TextareaProps & {
  minRows?: number;
  maxRows?: number;
  /**
   * Limits rows before focus. On focus, the textarea grows to fit full content.
   * Set to undefined to allow full growth pre-focus as well.
   */
  preFocusMaxRows?: number;
};

export const AutosizeTextarea = ({
  onFocus,
  onBlur,
  minRows = 6,
  maxRows = 14,
  preFocusMaxRows = 8,
  ...props
}: AutosizeTextareaProps) => {
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
    <Textarea
      as={ResizeTextarea}
      onFocus={handleFocus}
      onBlur={handleBlur}
      minRows={minRows}
      maxRows={effectiveMaxRows}
      overflow="auto"
      {...props}
    />
  );
};
