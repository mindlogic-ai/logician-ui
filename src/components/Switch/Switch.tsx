import React from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

export const Switch = ({ children, ...rest }: any) => {
  return (
    <ChakraSwitch.Root {...rest}>
      <ChakraSwitch.HiddenInput />
      <ChakraSwitch.Control {...({} as any)}>
        <ChakraSwitch.Thumb />
      </ChakraSwitch.Control>
      {children && (
        <ChakraSwitch.Label {...({} as any)}>{children}</ChakraSwitch.Label>
      )}
    </ChakraSwitch.Root>
  );
};

Switch.displayName = 'Switch';
