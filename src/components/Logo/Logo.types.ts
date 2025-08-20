import { ImageProps } from 'next/image';

// 필요에 따라 사이즈 variant 추가
export type LogoSize = 'default' | 'lg';

export const LogoSizes: Record<LogoSize, { width: number; height: number }> = {
  default: {
    width: 78,
    height: 28,
  },
  lg: {
    width: 120,
    height: 44,
  },
};

export interface LogoProps
  extends Omit<ImageProps, 'width' | 'height' | 'src' | 'alt'>,
    Partial<Pick<ImageProps, 'src' | 'alt'>> {
  size?: LogoSize;
}
