import { HoverCard } from '@chakra-ui/react';

import { IconButtonProps } from '../IconButton/IconButton.types';

export type InfoSprinkleProps = HoverCard.RootProps & {
  children: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
  contentProps?: HoverCard.ContentProps;
  baseFontSize?: string | number;
};
