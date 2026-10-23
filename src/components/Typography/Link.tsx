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
 *
 * 5.0: every entry is a flipping semantic role — `fg.link` / `fg.linkHover` /
 * `danger.fg` each already resolve to the right hex in light and dark — so a
 * ramp step is one token, not the 4.x `{ base, _dark }` pair of hand-picked
 * steps. There is no darker danger token than `danger.fg` today, so the error
 * link does not change colour on hover (only its underline thickens).
 */
export const LINK_RAMP = {
  default: 'fg.link',
  error: 'danger.fg',
  defaultHover: 'fg.linkHover',
  errorHover: 'danger.fg',
} as const;

const LinkImpl = forwardRef<HTMLAnchorElement, LinkOwnProps>(
  ({ color, variant, ...rest }, ref) => {
    // `fg.link` / `danger.fg` are flipping semantic roles, tuned against their
    // own canvas in both modes — unlike the 4.x `primary.*` ramp, there is no
    // light/dark arm to hand-pick here. KWCAG 2.1 5.1.3.3 (명도 대비) still
    // applies to every state a user can put the link in: the default link's
    // hover has its own token (`fg.linkHover`); the error link's hover keeps
    // `danger.fg` (no darker danger token exists), so for it the thicker
    // underline is the only hover cue.
    const defaultColor = LINK_RAMP.default;
    const errorColor = LINK_RAMP.error;
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
        // 5.0: links carry their own weight (500) instead of inheriting the
        // surrounding text's, because colour alone (`fg.link`) no longer
        // reads as an affordance against every body-text colour in the fg.*
        // scale the way `primary.main` used to. `{...rest}` below still lets
        // a call site override it.
        fontWeight={500}
        color={linkColor}
        textDecoration="underline"
        textDecorationThickness="1px"
        textUnderlineOffset="3px"
        _hover={{
          color: hoverColor,
          textDecorationThickness: '2px',
        }}
        {...rest}
      />
    );
  }
);

LinkImpl.displayName = 'Link';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Link = polymorphic<LinkOwnProps, 'a'>(LinkImpl);
