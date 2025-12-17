import React, { useEffect, useRef } from 'react';
import ReactPinInput from 'react-pin-input';
import { useTheme, useToken } from '@chakra-ui/react';

import { PinInputProps } from './PinInput.types';

// TODO: forwardRef
export const PinInput = ({
  value,
  onChange,
  inputStyle,
  autoFocus = true,
  isNumberOnly = true,
  ...rest
}: PinInputProps) => {
  const pinInputRef = useRef<ReactPinInput>(null);
  const theme = useTheme();

  useEffect(() => {
    // Automatically focus the PinInput component on mount
    if (autoFocus) pinInputRef.current?.focus();
  }, []);

  return (
    <ReactPinInput
      ref={pinInputRef} // Attach the ref to the PinInput component
      initialValue={value}
      onChange={onChange}
      type={isNumberOnly ? 'numeric' : 'custom'}
      inputMode={isNumberOnly ? 'number' : 'text'}
      inputStyle={{
        borderColor: useToken('colors', 'gray.200'),
        borderRadius: theme.radii.md,
        width: theme.sizes[12],
        height: theme.sizes[12],
        ...inputStyle,
      }}
      inputFocusStyle={{
        borderColor: useToken(
          'colors',
          theme.semanticTokens.colors.primary.main
        ),
        boxShadow: `0 0 0 1px ${useToken('colors', theme.semanticTokens.colors.primary.main)}`,
      }}
      onComplete={onChange}
      autoSelect
      regexCriteria={isNumberOnly ? /^[0-9]*$/ : undefined}
      {...rest}
    />
  );
};

PinInput.displayName = 'PinInput';
