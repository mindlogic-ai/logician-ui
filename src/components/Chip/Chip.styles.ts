import * as CSS from 'csstype';

import { colors, semanticTokens } from '@/theme/colors';

import { ChipProps, ChipUseCase } from './Chip.types';

export const baseStyles = {
  borderRadius: '32px', // large border radius to round it
  px: 3,
  py: 2, // Use direct spacing value instead of theme.spacing[2]
  textTransform: 'none' as CSS.Property.TextTransform,
};

export const useCaseStyles: Record<
  ChipUseCase,
  Record<string, Partial<ChipProps>>
> = {
  primary: {
    solid: {
      bgColor: semanticTokens.colors.primary.main,
      color: 'white',
    },
    outline: {
      border: '1px solid',
      borderColor: semanticTokens.colors.primary.main,
      color: semanticTokens.colors.primary.main,
      bgColor: 'white',
    },
    subtle: {
      bgColor: '#EBF0FB',
      color: semanticTokens.colors.primary.main,
    },
  },
  secondary: {
    solid: {
      bgColor: colors.blue[700],
      color: colors.white,
    },
    outline: {
      border: '1px solid',
      borderColor: colors.blue[700],
      color: colors.blue[700],
      bgColor: 'white',
    },
    subtle: {
      bgColor: colors.blue[100],
      color: colors.blue[700],
    },
  },
  success: {
    solid: {
      bgColor: semanticTokens.colors.success.main,
      color: 'white',
    },
    outline: {
      border: '1px solid',
      borderColor: semanticTokens.colors.success.main,
      color: semanticTokens.colors.success.main,
      bgColor: 'white',
    },
    subtle: {
      bgColor: semanticTokens.colors.success.lighter,
      color: semanticTokens.colors.success.main,
    },
  },
  danger: {
    solid: {
      bgColor: semanticTokens.colors.danger.main,
      color: 'white',
    },
    outline: {
      border: '1px solid',
      borderColor: semanticTokens.colors.danger.main,
      color: semanticTokens.colors.danger.main,
      bgColor: 'white',
    },
    subtle: {
      bgColor: semanticTokens.colors.danger.lighter,
      color: semanticTokens.colors.danger.main,
    },
  },
  dark: {
    solid: {
      bgColor: colors.gray[800],
      color: 'white',
    },
    outline: {
      border: '1px solid',
      backgroundColor: 'transparent',
      borderColor: colors.gray[700],
      color: colors.gray[700],
    },
    subtle: {
      bgColor: colors.gray[100],
      color: colors.gray[800],
    },
  },
  highlight: {
    solid: {
      bgColor: '#9F7AEA',
      color: 'white',
    },
    outline: {
      border: '1px solid',
      backgroundColor: 'transparent',
      borderColor: '#9F7AEA',
      color: '#9F7AEA',
    },
    subtle: {
      bgColor: '#FAF5FF',
      color: '#9F7AEA',
    },
  },
};
