import { forwardRef } from 'react';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

type AvatarProps = React.ComponentProps<typeof ChakraAvatar.Root>;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ ...rest }, ref) => {
    return (
      <ChakraAvatar.Root
        ref={ref}
        borderWidth="1px"
        borderColor="gray.200"
        overflow="hidden"
        {...rest}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
