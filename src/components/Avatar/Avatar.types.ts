import type { AvatarRootProps as ChakraAvatarRootProps } from '@chakra-ui/react';

export type {
  AvatarFallbackProps,
  AvatarGroupProps,
  AvatarIconProps,
  AvatarImageProps,
  AvatarRootProps,
} from '@chakra-ui/react';

export type AvatarProps = ChakraAvatarRootProps & {
  src?: string;
  name?: string;
};
