import { BoxProps } from '@chakra-ui/react';

import { IoIosCheckmarkCircle, IoWarning, LuInfo, MdError } from '../Icon';
import { TypographyProps } from '../Typography';
import { BannerProps } from './Banner.types';

type VariantType = NonNullable<BannerProps['variant']>;

export const bannerStyles: Record<VariantType, BoxProps> = {
  info: {
    bg: 'primary.lighter',
    borderColor: 'primary.light',
    color: 'primary.dark',
  },
  success: {
    bg: 'success.lighter',
    borderColor: 'success.light',
    color: 'success.dark',
  },
  warning: {
    bg: 'warning.lighter',
    borderColor: 'warning.light',
    color: 'warning.dark',
  },
  danger: {
    bg: 'danger.lighter',
    borderColor: 'danger.light',
    color: 'danger.dark',
  },
};

export const accentStyles: Record<VariantType, BoxProps['_before']> = {
  info: {
    bg: 'primary.main',
  },
  success: {
    bg: 'success.main',
  },
  warning: {
    bg: 'warning.main',
  },
  danger: {
    bg: 'danger.dark',
  },
};

export const iconConfig: Record<
  VariantType,
  { Icon: React.ComponentType<any>; color: string }
> = {
  info: { Icon: LuInfo, color: 'primary.main' },
  success: { Icon: IoIosCheckmarkCircle, color: 'success.main' },
  warning: { Icon: IoWarning, color: 'warning.main' },
  danger: { Icon: MdError, color: 'danger.main' },
};

export const textStyles: Record<VariantType, TypographyProps> = {
  info: {
    color: 'primary.dark',
  },
  success: {
    color: 'success.dark',
  },
  warning: {
    color: 'warning.dark',
  },
  danger: {
    color: 'danger.dark',
  },
};
