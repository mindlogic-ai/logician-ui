import { forwardRef } from 'react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

// Omit conflicting props from ChakraLink's LinkProps
export interface LinkCustomProps extends Omit<LinkProps, 'variant'> {
  variant?: 'error';
}

export const Link = forwardRef<HTMLAnchorElement, LinkCustomProps>(
  ({ color, variant, ...rest }, ref) => {
    // Use semantic tokens directly - Chakra v3 resolves them at runtime
    const linkColor =
      variant === 'error'
        ? 'danger.main'
        : (typeof color === 'string' ? color : undefined) || 'primary.main';

    const hoverColor = variant === 'error' ? 'danger.dark' : 'primary.dark';

    return (
      <ChakraLink
        ref={ref}
        fontWeight="semibold"
        wordBreak="keep-all"
        color={linkColor}
        _hover={{
          color: hoverColor,
        }}
        {...rest}
      />
    );
  }
);

Link.displayName = 'Link';
