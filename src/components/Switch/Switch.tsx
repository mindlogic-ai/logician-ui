import React from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

export const Switch = ({ children, ...rest }: any) => {
  return (
    <ChakraSwitch.Root colorPalette="primary" {...rest}>
      <ChakraSwitch.HiddenInput />
      <ChakraSwitch.Control
        bg="gray.200"
        _checked={{
          bg: 'primary.main',
        }}
      >
        <ChakraSwitch.Thumb />
      </ChakraSwitch.Control>
      {children && (
        <ChakraSwitch.Label>{children}</ChakraSwitch.Label>
      )}
    </ChakraSwitch.Root>
  );
};

Switch.displayName = 'Switch';
