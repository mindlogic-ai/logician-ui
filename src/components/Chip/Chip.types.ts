import { Badge } from '@chakra-ui/react';

type ChakraBadgeProps = React.ComponentProps<typeof Badge>;

export type ChipUseCase =
  | 'danger'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'highlight';

export type ChipVariant = 'subtle' | 'solid';

export interface ChipProps extends Omit<ChakraBadgeProps, 'variant'> {
  useCase?: ChipUseCase;
  variant?: ChipVariant;
}
