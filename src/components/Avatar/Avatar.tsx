import { forwardRef } from 'react';
import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react';

export const Avatar = forwardRef(({ ...rest }: ChakraAvatarProps, ref) => {
  return (
    <ChakraAvatar
      ref={ref}
      borderWidth="1px"
      borderColor="gray.200"
      overflow="hidden"
      {...rest}
    />
  );
});

Avatar.displayName = 'Avatar';
