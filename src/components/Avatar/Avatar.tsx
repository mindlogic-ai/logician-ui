import { forwardRef } from 'react';
import {
  Avatar as ChakraAvatar,
  AvatarContext,
  AvatarFallback,
  AvatarGroup,
  AvatarIcon,
  AvatarImage,
  AvatarRoot,
  AvatarRootProps as ChakraAvatarRootProps,
  AvatarRootProvider,
} from '@chakra-ui/react';

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

const AvatarComponent = forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    const { src, name, ...rest } = props;
    return (
      <ChakraAvatar.Root
        ref={ref}
        borderWidth="1px"
        borderColor="border.subtle"
        overflow="hidden"
        bgColor="transparent"
        {...rest}
      >
        <ChakraAvatar.Fallback name={name} />
        <ChakraAvatar.Image src={src} />
      </ChakraAvatar.Root>
    );
  }
);

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
