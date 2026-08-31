import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
} from 'react';

/**
 * Types for a component whose rendered element can be swapped with `as`.
 *
 * ## Why this exists
 *
 * Chakra v3's prop types are bound to one element: `ButtonProps` extends
 * `HTMLChakraProps<"button">`, so `as={Link}` swaps what RENDERS without
 * swapping what type-checks. v2's polymorphic `ComponentWithAs` is gone, and
 * Chakra's own answer is `asChild` — which is the right tool when you control
 * the markup, because the child types itself.
 *
 * It is the wrong tool for a component library's consumers. `asChild` requires
 * restructuring the call site to nest exactly one child, and a consuming app
 * that just wants a link-shaped button ends up writing
 * `href` under a `@ts-expect-error` instead. FactChat had **51 of those across
 * 41 files** before this existed.
 *
 * ## What it does
 *
 * `as` picks the element; the element's own props join the component's own.
 * Where they collide the component wins — `color` is a Chakra style prop here,
 * not `<a>`'s deprecated presentational attribute — so a component's contract
 * is never silently widened by the element it happens to render.
 *
 * ```tsx
 * <Button as="a" href="/docs" target="_blank">문서</Button>
 * <Button as={Link} href="/admin" prefetch={false}>관리자</Button>
 * <Button onClick={save}>저장</Button>   // still a <button>, unchanged
 * ```
 */
export type PolymorphicProps<TElement extends ElementType, TOwn> = TOwn & {
  /** The element or component to render. Defaults to the component's own. */
  as?: TElement;
} & Omit<ComponentPropsWithoutRef<TElement>, keyof TOwn | 'as'>;

/**
 * The `ref` a polymorphic component takes, typed for the element `as` picked.
 *
 * Without this an `as="a"` call site still gets a `Ref<HTMLButtonElement>` and
 * has to cast — the same defect one prop over.
 */
export type PolymorphicRef<TElement extends ElementType> =
  ComponentPropsWithRef<TElement>['ref'];

/**
 * The public type of a polymorphic component: a generic call signature whose
 * props follow whatever `as` renders, defaulting to `TDefault`.
 */
export type PolymorphicComponent<TOwn, TDefault extends ElementType> = (<
  TElement extends ElementType = TDefault,
>(
  props: PolymorphicProps<TElement, TOwn> & { ref?: PolymorphicRef<TElement> }
) => ReactElement) & { displayName?: string };

/**
 * Give a component the generic call signature above. **Type-level only** — the
 * implementation, its behaviour and its rendered markup are untouched.
 *
 * ```tsx
 * const ButtonImpl = forwardRef<HTMLButtonElement, ButtonOwnProps>(…);
 * ButtonImpl.displayName = 'Button';
 * export const Button = polymorphic<ButtonOwnProps>(ButtonImpl);
 *
 * const CardImpl = forwardRef<HTMLDivElement, CardOwnProps>(…);
 * CardImpl.displayName = 'Card';
 * export const Card = polymorphic<CardOwnProps, 'div'>(CardImpl);
 * ```
 *
 * ## Why a cast, and why a helper
 *
 * `forwardRef` erases generics: its signature is fixed at the type it was
 * instantiated with, so a generic component cannot be expressed through it.
 * Re-declaring the call signature is the standard way around that. Doing it
 * inline costs a dozen lines per component, which is how a design system ends
 * up polymorphic in two places and not the other seventy-nine — so it lives
 * here once, and each component spends one line.
 *
 * The `Impl` parameter is `unknown` on purpose. It is the erased signature we
 * are replacing; accepting it as a typed component would only re-assert the
 * type this function exists to discard.
 *
 * `displayName` stays on the implementation, where `react/display-name` can
 * see it — the lint rule is the thing that stops a component shipping without
 * one, and it cannot follow a name through this call.
 *
 * ## Consumers wrapping these components
 *
 * Prefer casting against `PolymorphicComponent` directly:
 *
 * ```ts
 * export const ClickableCard =
 *   ClickableCardImpl as unknown as PolymorphicComponent<ClickableCardOwnProps, 'div'>;
 * ```
 *
 * Identical result, but this helper is a RUNTIME import for a compile-time
 * operation, so every test that mocks `@mindlogic-ai/logician-ui` would have
 * to remember to mock it too. Two FactChat suites failed exactly that way the
 * first time a wrapper reached for the helper. A type costs the mocks nothing.
 */
export function polymorphic<TOwn, TDefault extends ElementType = 'button'>(
  Impl: unknown
): PolymorphicComponent<TOwn, TDefault> {
  return Impl as PolymorphicComponent<TOwn, TDefault>;
}
