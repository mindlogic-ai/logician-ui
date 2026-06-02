import { Tabs as ChakraTabs } from '@chakra-ui/react';

import { TabsProps } from './Tabs.types';

export const Tabs = ({ children, ...rest }: TabsProps) => {
  return (
    <ChakraTabs.Root position="relative" variant="plain" {...rest}>
      {children}
    </ChakraTabs.Root>
  );
};
