import { ComponentProps, ReactNode } from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

export interface TooltipProps extends ComponentProps<typeof ChakraTooltip.Root> {
  label: ReactNode;
  children: ReactNode;
}
