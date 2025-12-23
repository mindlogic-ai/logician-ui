import { forwardRef } from 'react';
import {
  Link as ChakraLink,
  LinkProps,
  useTheme,
  useToken,
} from '@chakra-ui/react';
import { darken } from 'polished';

export interface LinkCustomProps extends Omit<LinkProps, 'variant'> {
  variant?: 'error';
}

export const Link = forwardRef<HTMLAnchorElement, LinkCustomProps>(
  ({ color, variant, ...rest }, ref) => {
    const theme = useTheme();
    const defaultColor = theme.semanticTokens.colors.primary.main;
    const errorColor = theme.semanticTokens.colors.danger.main;
    const tokenKey =
      variant === 'error'
        ? errorColor
        : (typeof color === 'string' ? color : undefined) || defaultColor;

    const linkColor =
      useToken('colors', tokenKey)[0] ??
      (typeof color === 'string' ? color : defaultColor);

    const getHoverColor = () => {
      let hoverColor;
      try {
        hoverColor = darken(0.1, linkColor);
      } catch (e) {
        hoverColor = 'inherit';
      }
      return hoverColor;
    };

    return (
      <ChakraLink
        ref={ref}
        fontWeight="semibold"
        wordBreak="keep-all"
        color={linkColor}
        _hover={{
          color: getHoverColor(),
        }} // Darken by 10% on hover
        {...rest}
        {...({} as any)}
      />
    );
  }
);

Link.displayName = 'Link';
