import { forwardRef, ComponentProps } from 'react';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

export type AvatarProps = ComponentProps<typeof ChakraAvatar.Root> & {
  src?: string;
  name?: string;
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    const { src, name, ...rest } = props;
    return (
      <ChakraAvatar.Root
        ref={ref}
        borderWidth="1px"
        borderColor="gray.200"
        overflow="hidden"
        {...rest}
      >
        <ChakraAvatar.Fallback {...({ asChild: true } as any)}>
          <div>{name}</div>
        </ChakraAvatar.Fallback>
        {src && (
          <ChakraAvatar.Image {...({ asChild: true } as any)}>
            <img src={src} alt={name} />
          </ChakraAvatar.Image>
        )}
      </ChakraAvatar.Root>
    );
  }
);

Avatar.displayName = 'Avatar';
