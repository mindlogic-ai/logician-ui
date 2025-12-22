import { Tooltip } from '@chakra-ui/react';

type ChakraTooltipRootProps = React.ComponentProps<typeof Tooltip.Root>;

export interface TooltipProps extends ChakraTooltipRootProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
}
