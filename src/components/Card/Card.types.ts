import { CardRootProps as ChakraCardRootProps } from '@chakra-ui/react';

export type CardVariant = 'default' | 'gradient';

export type CardProps = ChakraCardRootProps & {
  clickable?: boolean;
  variant?: CardVariant;
};
