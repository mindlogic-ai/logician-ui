import * as CSS from 'csstype';

import theme from '@/theme/index';

import { ChipProps, ChipUseCase } from './Chip.types';

export const baseStyles = {
  borderRadius: '32px', // large border radius to round it
  px: 3,
  py: 2, // Use direct spacing value instead of theme.spacing[2]
  textTransform: 'none' as CSS.Property.TextTransform,
};

/**
 * Chip variant styles using the Golden Ratio color system.
 *
 * Uses semantic tokens where possible for consistency with design system.
 * The `highlight` variant uses violet for accent differentiation.
 */
export const useCaseStyles: Record<
  ChipUseCase,
  Record<string, Partial<ChipProps>>
> = {
  primary: {
    solid: {
      bgColor: theme.semanticTokens.colors.primary.main,
      color: 'white',
    },
    outline: {
      border: '1px solid',
      borderColor: theme.semanticTokens.colors.primary.main,
      color: theme.semanticTokens.colors.primary.main,
      bgColor: 'white',
    },
    subtle: {
      bgColor: theme.semanticTokens.colors.primary.lightest, // #E8EEFB
      color: theme.semanticTokens.colors.primary.main,
    },
  },
  /**
   * Secondary chips - Uses violet (secondary) semantic tokens
   * Consistent with Button/IconButton secondary variants
   */
  secondary: {
    solid: {
      bgColor: theme.semanticTokens.colors.secondary.main, // #9117D0 (violet)
      color: theme.colors.white,
    },
    outline: {
      border: '1px solid',
      borderColor: theme.semanticTokens.colors.secondary.main,
      color: theme.semanticTokens.colors.secondary.main,
      bgColor: 'white',
    },
    subtle: {
      bgColor: theme.semanticTokens.colors.secondary.lightest, // #F4E8FB
      color: theme.semanticTokens.colors.secondary.main,
    },
  },
  success: {
    solid: {
      bgColor: theme.semanticTokens.colors.success.main,
      color: 'white',
    },
    outline: {
      border: '1px solid',
      borderColor: theme.semanticTokens.colors.success.main,
      color: theme.semanticTokens.colors.success.main,
      bgColor: 'white',
    },
    subtle: {
      bgColor: theme.semanticTokens.colors.success.lightest, // #E9FBE8
      color: theme.semanticTokens.colors.success.main,
    },
  },
  danger: {
    solid: {
      bgColor: theme.semanticTokens.colors.danger.main,
      color: 'white',
    },
    outline: {
      border: '1px solid',
      borderColor: theme.semanticTokens.colors.danger.main,
      color: theme.semanticTokens.colors.danger.main,
      bgColor: 'white',
    },
    subtle: {
      bgColor: theme.semanticTokens.colors.danger.lightest, // #FBE8E9
      color: theme.semanticTokens.colors.danger.main,
    },
  },
  dark: {
    solid: {
      bgColor: theme.colors.gray[800],
      color: 'white',
    },
    outline: {
      border: '1px solid',
      backgroundColor: 'transparent',
      borderColor: theme.colors.gray[700],
      color: theme.colors.gray[700],
    },
    subtle: {
      bgColor: theme.colors.gray[100],
      color: theme.colors.gray[800],
    },
  },
  /**
   * Highlight chips - Darker violet for special emphasis
   * @deprecated Consider using `secondary` for violet chips
   */
  highlight: {
    solid: {
      bgColor: theme.colors.violet[600], // #7412A6 - Darker than secondary.main
      color: 'white',
    },
    outline: {
      border: '1px solid',
      backgroundColor: 'transparent',
      borderColor: theme.colors.violet[600],
      color: theme.colors.violet[600],
    },
    subtle: {
      bgColor: theme.colors.violet[50], // #F4E8FB
      color: theme.colors.violet[600],
    },
  },
};
