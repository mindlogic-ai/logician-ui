import { PropsWithChildren } from 'react';
import { BoxProps as ChakraBoxProps } from '@chakra-ui/react';
export type InfoBlockVariant = 'default' | 'danger' | undefined;

export type InfoBlockProps = PropsWithChildren &
  Omit<ChakraBoxProps, 'variant'> & {
    label?: string;
    variant?: InfoBlockVariant;
  };
