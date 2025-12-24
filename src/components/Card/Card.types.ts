import { ComponentProps } from 'react';
import { Card } from '@chakra-ui/react';

export type CardVariant = 'default' | 'gradient';

export type CardProps = ComponentProps<typeof Card.Root> & {
  clickable?: boolean;
  variant?: CardVariant;
};
