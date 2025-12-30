import { forwardRef } from 'react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

export interface LinkCustomProps extends Omit<LinkProps, 'variant'> {
  variant?: 'error';
}

export const Link = forwardRef<HTMLAnchorElement, LinkCustomProps>(
  ({ color, variant, ...rest }, ref) => {
    const defaultColor = 'primary.main';
    const errorColor = 'danger.main';
    const defaultHoverColor = 'primary.dark';
    const errorHoverColor = 'danger.dark';

    const linkColor =
      variant === 'error'
        ? errorColor
        : (typeof color === 'string' ? color : undefined) || defaultColor;

    const hoverColor =
      variant === 'error' ? errorHoverColor : defaultHoverColor;

    return (
      <ChakraLink
        ref={ref}
        fontWeight="semibold"
        wordBreak="keep-all"
        color={linkColor}
        _hover={{
          color: hoverColor,
          textDecor: 'none',
        }}
        {...rest}
        {...({} as any)}
      />
    );
  }
);

Link.displayName = 'Link';
