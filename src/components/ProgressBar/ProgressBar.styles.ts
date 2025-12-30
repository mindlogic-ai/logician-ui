import { ProgressBarSize } from './ProgressBar.types';

export const baseStyles = {
  borderRadius: 'full',
  height: 4, // Use direct spacing value instead of theme.spacing[4]
};

export const sizeStyles: Record<
  ProgressBarSize,
  { height: number; borderRadius: string }
> = {
  xs: {
    height: 1, // 4px - very compact
    borderRadius: 'full',
  },
  sm: {
    height: 2, // 8px - small
    borderRadius: 'full',
  },
  md: {
    height: 4, // 16px - current default, balanced
    borderRadius: 'full',
  },
  lg: {
    height: 6, // 24px - large, prominent
    borderRadius: 'full',
  },
  xl: {
    height: 8, // 32px - extra large
    borderRadius: 'full',
  },
};
