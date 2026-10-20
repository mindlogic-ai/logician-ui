import { BoxProps } from '@chakra-ui/react';

export type BannerSize = 'sm' | 'md' | 'lg';

export interface BannerProps extends BoxProps {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  hideIcon?: boolean;
  size?: BannerSize;
}
