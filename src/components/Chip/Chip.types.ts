import { BadgeProps as ChakraBadgeProps } from '@chakra-ui/react';

export type ChipUseCase =
  | 'danger'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'highlight';

export interface ChipProps extends ChakraBadgeProps {
  useCase?: ChipUseCase;
  variant?: string;
}
