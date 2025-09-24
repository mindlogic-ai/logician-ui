import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

import { Icon, IconTypes } from '@/components/Icon';

import { IconButton } from '../IconButton';
import { IconButtonProps } from '../IconButton/IconButton.types';

export const InfoSprinkle = ({
  children,
  iconButtonProps,
  ...rest
}: {
  children: React.ReactNode;
  iconButtonProps?: Partial<IconButtonProps>;
} & PopoverProps) => {
  return (
    <Popover trigger="hover" placement="top" isLazy {...rest}>
      <PopoverTrigger>
        <IconButton
          aria-label="Info"
          icon={<Icon icon={IconTypes.LuInfo} boxSize="sm" color="inherit" />}
          {...iconButtonProps}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent boxShadow="2xl" w="fit-content">
          <PopoverArrow />
          <PopoverBody>{children}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
