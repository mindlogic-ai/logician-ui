import { Card } from '@chakra-ui/react';

type ChakraCardRootProps = React.ComponentProps<typeof Card.Root>;

export type CardVariant = 'default' | 'gradient';

export type CardProps = ChakraCardRootProps & {
  clickable?: boolean;
  variant?: CardVariant;
};
