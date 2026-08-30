import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
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
