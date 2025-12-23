import { Tooltip } from '@chakra-ui/react';

type ChakraTooltipRootProps = React.ComponentProps<typeof Tooltip.Root>;

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipProps extends ChakraTooltipRootProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  /** @deprecated Use `open` instead */
  isOpen?: boolean;
  /** @deprecated Use `positioning={{ placement: ... }}` instead */
  placement?: TooltipPlacement;
}
