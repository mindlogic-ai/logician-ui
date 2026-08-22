import { forwardRef } from 'react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

export interface LinkCustomProps extends Omit<LinkProps, 'variant'> {
  variant?: 'error';
}

export const Link = forwardRef<HTMLAnchorElement, LinkCustomProps>(
  ({ color, variant, ...rest }, ref) => {
    // Theme-aware, because `.main` is tuned against a WHITE page. On the dark
    // canvas (#181A20) `primary.main` measures 4.19:1 and `danger.main` 4.26:1
    // — both under the 4.5:1 that KWCAG 2.1 5.1.3.3 (명도 대비) asks of body
    // text, and every link in a consuming app inherits it. The `.dark` end of
    // each ramp is the far side from the PAGE rather than a fixed lightness, so
    // in dark mode it resolves lighter: 6.68:1 and 6.38:1.
    const defaultColor = { base: 'primary.main', _dark: 'primary.dark' };
    const errorColor = { base: 'danger.main', _dark: 'danger.dark' };
    const defaultHoverColor = { base: 'primary.dark', _dark: 'primary.main' };
    const errorHoverColor = { base: 'danger.dark', _dark: 'danger.main' };

    // `color ?? defaultColor`, not a `typeof color === 'string'` narrowing. The
    // old form silently DISCARDED any non-string value, so a call site passing
    // a per-theme `{ base, _dark }` — the documented Chakra way to fix exactly
    // the contrast problem above — got the default back and no error, in the
    // types or at runtime. A prop the type accepts and the component throws
    // away is worse than one it rejects.
    const linkColor =
      variant === 'error' ? errorColor : (color ?? defaultColor);

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
