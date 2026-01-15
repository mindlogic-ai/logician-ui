import { HoverCard, Portal } from '@chakra-ui/react';

import { LuInfo } from '../Icon';
import { IconButton } from '../IconButton';
import { IconButtonProps } from '../IconButton/IconButton.types';

export const InfoSprinkle = ({
  children,
  iconButtonProps,
  contentProps,
  ...rest
}: {
  children: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
  contentProps?: HoverCard.ContentProps;
} & HoverCard.RootProps) => {
  return (
    <HoverCard.Root positioning={{ placement: 'top' }} lazyMount {...rest}>
      <HoverCard.Trigger asChild>
        <IconButton aria-label="Info" {...iconButtonProps}>
          <LuInfo color="inherit" boxSize={iconButtonProps?.size} />
        </IconButton>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content p={2} {...contentProps}>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            {children}
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  );
};
