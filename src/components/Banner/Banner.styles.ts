import { BoxProps } from '@chakra-ui/react';
import { IconProps } from 'src/icons';

import { IoIosCheckmarkCircle, IoWarning, LuInfo, MdError } from '../Icon';
import { TypographyProps } from '../Typography';
import { BannerProps, BannerSize } from './Banner.types';

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
  { Icon: React.ComponentType<IconProps>; color: string }
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

export const sizeStyles: Record<
  BannerSize,
  {
    container: BoxProps;
    icon: Pick<IconProps, 'boxSize'>;
    text: TypographyProps;
    accentWidth: string;
  }
> = {
  sm: {
    container: {
      px: 3,
      py: 1.5,
      borderTopLeftRadius: '3px',
      borderBottomLeftRadius: '3px',
    },
    icon: {
      boxSize: 'sm', // 20px
    },
    text: {
      fontSize: 'subtext', // theme.fontSizes.subtext (~13-14px)
      lineHeight: '1.4',
    },
    accentWidth: '3px',
  },
  md: {
    container: {
      px: 4,
      py: 2,
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
    },
    icon: {
      boxSize: 'md', // 24px
    },
    text: {
      fontSize: 'p', // theme.fontSizes.p (~14px)
      lineHeight: '1.5',
    },
    accentWidth: '4px',
  },
  lg: {
    container: {
      px: 5,
      py: 3,
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
    },
    icon: {
      boxSize: 'lg', // 32px
    },
    text: {
      fontSize: 'h5', // theme.fontSizes.h5 (~15-17px)
      lineHeight: '1.6',
    },
    accentWidth: '5px',
  },
};
