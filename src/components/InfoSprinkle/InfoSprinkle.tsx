import { Popover, Portal } from '@chakra-ui/react';

import { LuInfo } from '../Icon';
import { IconButton } from '../IconButton';
import { IconButtonProps } from '../IconButton/IconButton.types';

export const InfoSprinkle = ({
  children,
  iconButtonProps,
  ...rest
}: {
  children: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
} & Popover.RootProps) => {
  return (
    <Popover.Root positioning={{ placement: 'top' }} lazyMount {...rest}>
      <Popover.Trigger>
        <IconButton aria-label="Info" {...iconButtonProps}>
          <LuInfo boxSize="sm" color="inherit" />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content fontSize="1em">
            <Popover.Arrow />
            <Popover.Body p={2}>{children}</Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
