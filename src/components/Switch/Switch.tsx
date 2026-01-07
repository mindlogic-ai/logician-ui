import React from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

import { SwitchProps } from './Switch.types';

export const Switch = ({
  checked,
  disabled,
  // v2 backward compatibility props
  isChecked,
  isDisabled,
  ...rest
}: SwitchProps) => {
  // v2 backward compatibility: isChecked -> checked, isDisabled -> disabled
  const checkedState = checked ?? isChecked;
  const disabledState = disabled ?? isDisabled;

  return (
    <ChakraSwitch.Root
      colorPalette="primary"
      checked={checkedState}
      disabled={disabledState}
      {...rest}
    >
      <ChakraSwitch.HiddenInput />
      <ChakraSwitch.Control
        bg="gray.200"
        _checked={{
          bg: 'primary.main',
        }}
      >
        <ChakraSwitch.Thumb />
      </ChakraSwitch.Control>
    </ChakraSwitch.Root>
  );
};

Switch.displayName = 'Switch';
