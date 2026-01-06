import { BoxProps } from '@chakra-ui/react';
import { IconProps } from 'src/icons';

import { IoIosCheckmarkCircle, IoWarning, LuInfo, MdError } from '../Icon';
import { TypographyProps } from '../Typography';
import { BannerProps, BannerSize } from './Banner.types';

type VariantType = NonNullable<BannerProps['variant']>;

/**
 * Banner variant styles using the Golden Ratio color system.
 *
 * Uses `lightest` backgrounds with `lighter` borders and `dark` text
 * for optimal readability and WCAG AA compliance.
 */
export const bannerStyles: Record<VariantType, BoxProps> = {
  info: {
    bg: 'primary.lightest', // #E8EEFB
    borderColor: 'primary.lighter', // #B9CBF3
    color: 'primary.dark', // #0D317D
  },
  success: {
    bg: 'success.lightest', // #E9FBE8
    borderColor: 'success.lighter', // #BDF3B9
    color: 'success.dark', // #147D0D
  },
  warning: {
    bg: 'warning.lightest', // #FBF6E8
    borderColor: 'warning.lighter', // #F3E4B9
    color: 'warning.dark', // #7D610D
  },
  danger: {
    bg: 'danger.lightest', // #FBE8E9
    borderColor: 'danger.lighter', // #F3B9BD
    color: 'danger.dark', // #7D0D14
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
      textStyle: 'subtext', // Use textStyle instead of fontSize
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
      textStyle: 'p', // Use textStyle instead of fontSize
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
      textStyle: 'h5', // Use textStyle instead of fontSize
      lineHeight: '1.6',
    },
    accentWidth: '5px',
  },
};
