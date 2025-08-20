import { ButtonProps } from '@chakra-ui/react';

export interface SeeMoreButtonProps extends ButtonProps {
  currentCount: number;
  maxCount: number;
}
