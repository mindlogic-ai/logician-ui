import { forwardRef } from 'react';
import {
  Avatar as ChakraAvatar,
  AvatarRootProps as ChakraAvatarRootProps,
} from '@chakra-ui/react';

export type AvatarProps = ChakraAvatarRootProps & {
  src?: string;
  name?: string;
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { src, name, ...rest } = props;
  return (
    <ChakraAvatar.Root
      ref={ref}
      borderWidth="1px"
      borderColor="gray.200"
      overflow="hidden"
      {...rest}
    >
      <ChakraAvatar.Fallback name={name} />
      <ChakraAvatar.Image src={src} />
    </ChakraAvatar.Root>
  );
});

Avatar.displayName = 'Avatar';
