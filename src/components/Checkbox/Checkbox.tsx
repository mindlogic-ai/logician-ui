import { forwardRef } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      size = 'sm',
      checked,
      disabled,
      invalid,
      // v2 backward compatibility props
      isChecked,
      isDisabled,
      isInvalid,
      ...rest
    },
    ref
  ) => {
    // v2 backward compatibility: isChecked -> checked, isDisabled -> disabled, isInvalid -> invalid
    const checkedState = checked ?? isChecked;
    const disabledState = disabled ?? isDisabled;
    const invalidState = invalid ?? isInvalid;

    return (
      <ChakraCheckbox.Root
        ref={ref}
        size={size}
        checked={checkedState}
        disabled={disabledState}
        invalid={invalidState}
        {...rest}
      >
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control
          borderRadius="xs"
          borderColor="gray.400"
          borderWidth="1px"
          _checked={{
            bgColor: 'primary.main',
            borderColor: 'primary.main',
          }}
          cursor="pointer"
        >
          <ChakraCheckbox.Indicator />
        </ChakraCheckbox.Control>
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';
