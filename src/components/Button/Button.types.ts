import type { ElementType, MouseEvent } from 'react';
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

// Relative, NOT `@/types/polymorphic`. Path aliases survive into the emitted
// `.d.ts`, where they are resolved against the CONSUMER's tsconfig — so an app
// with its own `@/*` alias either binds this to its own file or fails to
// resolve it and silently degrades the type to `any`. Measured: with the alias,
// `<Button as="a" nonsense={1}>` stopped erroring in FactChat. See the PR body.
import type { PolymorphicProps } from '../../types/polymorphic';

/**
 * Button variant — one role per value (5.0 BAZE palette).
 *
 * Overrides Chakra UI's `variant` prop; Chakra's own variants are not supported.
 * There is no separate colour axis any more: the role *is* the colour.
 *
 * - `primary`: BAZE black fill — the one main action of a screen
 * - `action`: black "run" button whose icon is coral (`action.iconOnSolid`)
 * - `accent`: coral fill with dark text (`send.*`) — the one coloured call to
 *   action of a marketing surface or a hero; at most one per view
 * - `secondary`: outlined surface button — cancel, alternative actions
 * - `subtle`: quiet warm-wash fill — low-emphasis actions (the default)
 * - `ghost`: no fill, no border — toolbars, inline actions
 * - `danger`: red fill — a confirmed destructive action
 *
 * For a *secondary* destructive action (a "delete" link-ish button next to a
 * form) keep `secondary`/`ghost`/`subtle` and add `isDestructive`.
 */
export type ButtonVariant =
  | 'primary'
  | 'action'
  | 'accent'
  | 'secondary'
  | 'subtle'
  | 'ghost'
  | 'danger';

/**
 * @deprecated 5.0 removed the colour axis — `colorPalette` is no longer a
 * Button prop. Pick a `variant` role instead (and `isDestructive` for a
 * danger-coloured secondary/ghost/subtle button). Kept only so existing type
 * imports get a deprecation instead of a hard error; will be removed in 6.0.
 *
 * Old → new: `primary|neutral` + `solid` → `primary`; `danger` + `solid` →
 * `danger`; any + `outline` → `secondary`; any + `soft` → `subtle`;
 * `danger` + `outline|ghost|soft` → same role + `isDestructive`.
 */
export type ButtonColorPalette =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * @deprecated 4.x variant names. Still accepted at runtime (mapped, with a
 * development warning) but no longer part of `ButtonVariant`.
 */
export type LegacyButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';

/**
 * Button props.
 *
 * @note Overrides Chakra UI's `variant`; Chakra's `colorPalette` /
 *       `colorScheme` are not accepted.
 *
 * @example
 * ```tsx
 * <Button variant="primary">저장</Button>
 * <Button variant="secondary">취소</Button>
 * <Button variant="ghost" isDestructive>삭제</Button>
 * <Button variant="danger">영구 삭제</Button>
 * ```
 */
export type ButtonOwnProps = Omit<
  ChakraButtonProps,
  'variant' | 'colorScheme' | 'colorPalette' | 'leftIcon' | 'rightIcon' | 'as'
> & {
  /**
   * The role of the button (fill, border and text colour together).
   * Overrides Chakra UI's variant prop.
   * @default 'subtle'
   */
  variant?: ButtonVariant;
  /**
   * Danger-coloured text (`danger.fg`) for a destructive action that does not
   * deserve a red fill. Applies to `secondary`, `ghost` and `subtle`; the
   * border and fill stay the variant's own. Ignored on `primary`, `action`,
   * `accent` and `danger` (use `variant="danger"` for a filled destructive button).
   * @default false
   */
  isDestructive?: boolean;
  /**
   * Raises the button 1px on hover and puts a shadow under it, so it reads as
   * lifting toward the pointer. Pressing sets it back down, under the existing
   * `scale` press.
   *
   * Off by default and deliberately opt-in: a lift is emphasis, and a form of
   * six buttons all lifting is noise. Use it where one button is the point of
   * the screen — a primary call to action, a card that is itself a button — not
   * as a house style.
   *
   * The shadow yields to the keyboard focus ring, which is also a `box-shadow`;
   * a focused button that is also hovered keeps its ring and still lifts.
   *
   * @default false
   */
  lift?: boolean;
  /**
   * Keeps a `disabled` button in the Tab order and lets it receive clicks, so
   * the screen can say *why* it is disabled.
   *
   * A natively `disabled` `<button>` cannot be focused and swallows every
   * click: a keyboard or screen reader user may never find it, and a mouse
   * user who presses it gets no answer at all. With this prop, `disabled`
   * renders as `aria-disabled="true"` (plus `data-disabled`) instead of the
   * native attribute:
   *
   * - the disabled colours, the `not-allowed` cursor and the "no hover, no
   *   press" behaviour are the same as a native disabled button;
   * - Tab still reaches it and the focus ring shows;
   * - activating it (click, Enter, Space) does **not** call `onClick`, and its
   *   default action is cancelled, so a `type="submit"` button does not submit
   *   its form; `onDisabledClick` is called instead.
   *
   * Has no effect unless `disabled` is set. `loading` keeps the native
   * `disabled` — a busy button is working, not refusing.
   *
   * @default false
   */
  focusableWhenDisabled?: boolean;
  /**
   * Called when a `disabled` + `focusableWhenDisabled` button is activated
   * (click, Enter, Space) — where `onClick` would have been. Use it to explain
   * the reason or move focus to what is missing (an unticked consent box).
   * Never called on a natively disabled button, and never while `loading`.
   */
  onDisabledClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Props for `Button`, typed for whatever element `as` renders.
 *
 * Defaults to `'button'`, so `ButtonProps` on its own means exactly what it
 * meant before this became polymorphic — every existing call site and every
 * `ComponentProps<typeof Button>` keeps its type.
 *
 * `as` now carries the element's own props with it:
 *
 * ```tsx
 * <Button as="a" href="/docs" target="_blank" rel="noreferrer">문서</Button>
 * <Button as={Link} href="/admin" prefetch={false}>관리자</Button>
 * ```
 *
 * Before, `as` swapped the rendered element but not the type — `href` was not a
 * `<button>` prop, so consumers reached for `@ts-expect-error`. See
 * `src/types/polymorphic.ts` for why `asChild` does not cover this case.
 */
export type ButtonProps<TElement extends ElementType = 'button'> =
  PolymorphicProps<TElement, ButtonOwnProps>;
