import { BoxProps } from '@chakra-ui/react';

export interface BannerProps extends BoxProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  hideIcon?: boolean;
}
