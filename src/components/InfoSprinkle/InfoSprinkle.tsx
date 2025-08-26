import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

import { Icon, IconTypes } from '@/components/Icon';

import { IconButtonProps } from '../IconButton/IconButton.types';

export const InfoSprinkle = ({
  children,
  icon,
  ...rest
}: {
  children: React.ReactNode;
  icon?: IconButtonProps['icon'];
} & PopoverProps) => {
  return (
    <Popover trigger="hover" placement="top" isLazy {...rest}>
      <PopoverTrigger>
        <Box
          display="inline-flex"
          color="white" // for icon color inherit
          bgColor="gray.800"
          borderRadius="full"
          opacity={0.75}
          _hover={{
            opacity: 1,
          }}
        >
          {icon || <Icon icon={IconTypes.LuInfo} boxSize="sm" />}
        </Box>
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
