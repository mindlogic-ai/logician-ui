import { BoxProps } from '@chakra-ui/react';

import { IconProps } from '../Icon';
import { TypographyProps } from '../Typography';
import { BannerProps } from './Banner.types';

type VariantType = keyof BannerProps['variant'];

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

export const iconStyles: Record<VariantType, IconProps> = {
  info: {
    icon: 'LuInfo',
    color: 'primary.main',
  },
  success: {
    icon: 'IoIosCheckmarkCircle',
    color: 'success.main',
  },
  warning: {
    icon: 'IoWarning',
    color: 'warning.main',
  },
  danger: {
    icon: 'MdError',
    color: 'danger.main',
  },
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
