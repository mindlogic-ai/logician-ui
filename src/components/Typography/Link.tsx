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
        // Inherit the surrounding text weight so an inline link reads as part of
        // its sentence (extrabold inside an H1, body weight inside a paragraph)
        // rather than a fixed-semibold patch. Color + underline carry the link
        // affordance. Override with an explicit `fontWeight` when needed.
        fontWeight="inherit"
        wordBreak="keep-all"
        color={linkColor}
        _hover={{
          color: hoverColor,
          textDecor: 'none',
        }}
        {...rest}
      />
    );
  }
);

Link.displayName = 'Link';
