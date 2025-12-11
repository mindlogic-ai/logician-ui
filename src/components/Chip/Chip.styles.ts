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
  secondary: {
    solid: {
      bgColor: theme.colors.blue[700],
      color: theme.colors.white,
    },
    outline: {
      border: '1px solid',
      borderColor: theme.colors.blue[700],
      color: theme.colors.blue[700],
      bgColor: 'white',
    },
    subtle: {
      bgColor: theme.colors.blue[50],
      color: theme.colors.blue[700],
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
  highlight: {
    solid: {
      bgColor: theme.colors.violet[600], // #7412A6
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
