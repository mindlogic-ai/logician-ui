import { forwardRef } from 'react';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

import { AvatarProps } from './Avatar.types';

export const AvatarBase = forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
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
        <ChakraAvatar.Fallback name={name} />
        <ChakraAvatar.Image src={src} />
      </ChakraAvatar.Root>
    );
  }
);

AvatarBase.displayName = 'Avatar';
