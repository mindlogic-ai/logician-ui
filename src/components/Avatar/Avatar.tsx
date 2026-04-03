import { forwardRef } from 'react';
import {
  Avatar as ChakraAvatar,
  AvatarContext,
  AvatarFallback,
  AvatarGroup,
  AvatarIcon,
  AvatarImage,
  AvatarRoot,
  AvatarRootProvider,
  AvatarRootProps as ChakraAvatarRootProps,
} from '@chakra-ui/react';

import { Face } from '@/components/Icon';

export type { AvatarFallbackProps, AvatarGroupProps, AvatarIconProps, AvatarImageProps, AvatarRootProps, AvatarRootProviderProps } from '@chakra-ui/react';

export type AvatarProps = ChakraAvatarRootProps & {
  src?: string;
  name?: string;
};

const AvatarComponent = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { src, name, ...rest } = props;
  return (
    <ChakraAvatar.Root
      ref={ref}
      borderWidth="1px"
      borderColor="gray.200"
      overflow="hidden"
      bgColor="transparent"
      {...rest}
    >
      <ChakraAvatar.Fallback name={name}>
        {!name && <Face color="gray.400" boxSize="60%" />}
      </ChakraAvatar.Fallback>
      <ChakraAvatar.Image src={src} />
    </ChakraAvatar.Root>
  );
});

AvatarComponent.displayName = 'Avatar';

export const Avatar = Object.assign(AvatarComponent, {
  Root: AvatarRoot,
  RootProvider: AvatarRootProvider,
  Fallback: AvatarFallback,
  Image: AvatarImage,
  Icon: AvatarIcon,
  Group: AvatarGroup,
  Context: AvatarContext,
});
