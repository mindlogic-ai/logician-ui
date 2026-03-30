import React from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { SwitchProps } from './Switch.types';

export const Switch = ({ checked, disabled, ...rest }: SwitchProps) => {
  return (
    <ChakraSwitch.Root
      colorPalette="primary"
      checked={checked}
      disabled={disabled}
      {...rest}
    >
      <ChakraSwitch.HiddenInput />
      <ChakraSwitch.Control
        bg="gray.200"
        _checked={{
          bg: 'primary.main',
        }}
        {...focusRing}
      >
        <ChakraSwitch.Thumb />
      </ChakraSwitch.Control>
    </ChakraSwitch.Root>
  );
};

Switch.displayName = 'Switch';
