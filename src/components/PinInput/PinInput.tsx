import React, { useEffect, useRef } from 'react';
import ReactPinInput from 'react-pin-input';

import { colors } from '@/theme/colors';

import { PinInputProps } from './PinInput.types';

// Theme values for v3 compatibility
const primaryMainColor = colors.blue[900];

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
        borderColor: colors.gray[200],
        borderRadius: '8px',
        width: '3rem',
        height: '3rem',
        ...inputStyle,
      }}
      inputFocusStyle={{
        borderColor: primaryMainColor,
        boxShadow: `0 0 0 1px ${primaryMainColor}`,
      }}
      onComplete={onChange}
      autoSelect
      regexCriteria={isNumberOnly ? /^[0-9]*$/ : undefined}
      {...rest}
    />
  );
};

PinInput.displayName = 'PinInput';
