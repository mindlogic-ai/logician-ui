import { CardProps as ChakraCardProps } from '@chakra-ui/react';

export type CardVariant = 'default' | 'gradient';

export type CardProps = ChakraCardProps & {
  clickable?: boolean;
  variant?: CardVariant;
};
