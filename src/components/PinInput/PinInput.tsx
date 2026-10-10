import React, { useEffect, useRef } from 'react';
import ReactPinInput from 'react-pin-input';
import { useToken } from '@chakra-ui/react';

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
  const primaryColor = useToken('colors', 'primary.main')[0];
  const grayColor = useToken('colors', 'border.default')[0];

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
      // `numeric`, not `number`: `number` is not a valid `inputmode` value, so
      // browsers fell back to the full text keyboard.
      inputMode={isNumberOnly ? 'numeric' : 'text'}
      inputStyle={{
        borderColor: grayColor,
        borderRadius: '8px',
        width: '48px',
        height: '48px',
        // iOS Safari zooms the page when focus lands on an input under 16px.
        // An inline style cannot carry the `(pointer: coarse)` query that
        // `noZoomOnFocus` uses, so the floor is unconditional here.
        fontSize: '16px',
        ...inputStyle,
      }}
      inputFocusStyle={{
        borderColor: primaryColor,
        boxShadow: `0 0 0 1px ${primaryColor}`,
      }}
      onComplete={onChange}
      autoSelect
      regexCriteria={isNumberOnly ? /^[0-9]*$/ : undefined}
      {...rest}
    />
  );
};

PinInput.displayName = 'PinInput';
