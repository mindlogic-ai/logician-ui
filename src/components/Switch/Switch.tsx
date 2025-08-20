import React from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

export const Switch = ({ ...rest }) => {
  return <ChakraSwitch {...rest} />;
};

Switch.displayName = 'Switch';
