import { Card } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export type CardVariant = 'default' | 'gradient';

export type CardProps = ComponentProps<typeof Card.Root> & {
  clickable?: boolean;
  variant?: CardVariant;
};
