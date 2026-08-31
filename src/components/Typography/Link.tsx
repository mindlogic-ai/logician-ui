import type { ElementType } from 'react';
import { forwardRef } from 'react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*` — see `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';
import { polymorphic } from '../../types/polymorphic';

export type LinkOwnProps = Omit<LinkProps, 'variant' | 'as'> & {
  variant?: 'error';
};

/**
 * Props for `Link`, typed for whatever element `as` renders.
 *
 * Defaults to `'a'`, so the bare type is unchanged. `as={NextLink}` is the
 * reason this exists — the router link's own props (`href`, `prefetch`,
 * `replace`) now come with it instead of arriving anonymously in `...rest`.
 */
export type LinkCustomProps<TElement extends ElementType = 'a'> =
  PolymorphicProps<TElement, LinkOwnProps>;

/**
 * The ramp steps the link paints, exported so a test can assert BOTH halves at
 * once: that the component still picks these tokens, and that these tokens
 * still clear the contrast bar. Asserting only the second half is a test that
 * passes while the component points somewhere else entirely — which is how the
 * dark hover regressed with a green suite.
 */
export const LINK_RAMP = {
  default: { base: 'primary.main', _dark: 'primary.dark' },
  error: { base: 'danger.main', _dark: 'danger.dark' },
  defaultHover: { base: 'primary.dark', _dark: 'primary.darker' },
  errorHover: { base: 'danger.dark', _dark: 'danger.darker' },
} as const;

const LinkImpl = forwardRef<HTMLAnchorElement, LinkOwnProps>(
  ({ color, variant, ...rest }, ref) => {
    // Theme-aware, because `.main` is tuned against a WHITE page. On the dark
    // canvas (#181A20) `primary.main` measures 4.19:1 and `danger.main` 4.26:1
    // — both under the 4.5:1 that KWCAG 2.1 5.1.3.3 (명도 대비) asks of body
    // text, and every link in a consuming app inherits it. The `.dark` end of
    // each ramp is the far side from the PAGE rather than a fixed lightness, so
    // in dark mode it resolves lighter: 6.68:1 and 6.38:1.
    const defaultColor = LINK_RAMP.default;
    const errorColor = LINK_RAMP.error;
    // The hover has to move AWAY from the page in BOTH modes, and `.main` is
    // the wrong end of the ramp to move toward in dark. Mirroring the light
    // step ("one darker") instead of reflecting it sent the dark hover back
    // toward the background: resting 6.68:1 → hovering **4.19:1**, under the
    // same 4.5:1 the resting colour above was just fixed to clear. KWCAG
    // 5.3.3 applies to text in every state a user can put it in, and hover is
    // a state a mouse user is IN while reading the link.
    //
    // `.darker` is the step past `.dark` at both ends, so one token is correct
    // in both modes with no special-casing: light 11.98:1 (unchanged from
    // before), dark 10.68:1. Error the same: 10.83:1 and 10.34:1.
    //
    // No axe rule would have caught this — it measures the resting state only.
    const defaultHoverColor = LINK_RAMP.defaultHover;
    const errorHoverColor = LINK_RAMP.errorHover;

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

LinkImpl.displayName = 'Link';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Link = polymorphic<LinkOwnProps, 'a'>(LinkImpl);
