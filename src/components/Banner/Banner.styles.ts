import { BoxProps } from '@chakra-ui/react';
import { IconProps } from 'src/icons';

import { IoIosCheckmarkCircle, IoWarning, LuInfo, MdError } from '../Icon';
import { TypographyProps } from '../Typography';
import { BannerProps, BannerSize } from './Banner.types';

type VariantType = NonNullable<BannerProps['variant']>;

/**
 * Banner variant styles on the BAZE token set.
 *
 * Every status variant is border `{s}.border` + bg `{s}.bg` + text/icon
 * `{s}.fg`, with a `{s}.solid` left accent bar — `info` now reads its own
 * `info.*` family instead of borrowing `primary.*`. `neutral` is the brand
 * notice band: border `secondary.border`, bar `primary.main`, bg
 * `secondary.surface`, text `fg.default`.
 */
export const bannerStyles: Record<VariantType, BoxProps> = {
  info: {
    bg: 'info.bg',
    borderColor: 'info.border',
    color: 'info.fg',
  },
  success: {
    bg: 'success.bg',
    borderColor: 'success.border',
    color: 'success.fg',
  },
  warning: {
    bg: 'warning.bg',
    borderColor: 'warning.border',
    color: 'warning.fg',
  },
  danger: {
    bg: 'danger.bg',
    borderColor: 'danger.border',
    color: 'danger.fg',
  },
  neutral: {
    bg: 'secondary.surface',
    borderColor: 'secondary.border',
    color: 'fg.default',
  },
};

export const accentStyles: Record<VariantType, BoxProps['_before']> = {
  info: {
    bg: 'info.solid',
  },
  success: {
    bg: 'success.solid',
  },
  warning: {
    bg: 'warning.solid',
  },
  danger: {
    bg: 'danger.solid',
  },
  neutral: {
    bg: 'primary.main',
  },
};

export const iconConfig: Record<
  VariantType,
  { Icon: React.ComponentType<IconProps>; color: string }
> = {
  info: { Icon: LuInfo, color: 'info.fg' },
  success: { Icon: IoIosCheckmarkCircle, color: 'success.fg' },
  warning: { Icon: IoWarning, color: 'warning.fg' },
  danger: { Icon: MdError, color: 'danger.fg' },
  neutral: { Icon: LuInfo, color: 'fg.default' },
};

export const textStyles: Record<VariantType, TypographyProps> = {
  info: {
    color: 'info.fg',
  },
  success: {
    color: 'success.fg',
  },
  warning: {
    color: 'warning.fg',
  },
  danger: {
    color: 'danger.fg',
  },
  neutral: {
    color: 'fg.default',
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
