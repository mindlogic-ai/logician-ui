import React from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

type SwitchRootProps = React.ComponentProps<typeof ChakraSwitch.Root>;

export const Switch = ({ ...rest }: SwitchRootProps) => {
  return <ChakraSwitch.Root {...rest} />;
};

Switch.displayName = 'Switch';
