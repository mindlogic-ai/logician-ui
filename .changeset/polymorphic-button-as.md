---
'@mindlogic-ai/logician-ui': minor
---

Make `Button` and `IconButton` polymorphic — `as` now carries the rendered element's props with it.

`as` has always swapped what renders; it did not swap what type-checks. Chakra v3's `ButtonProps` extends `HTMLChakraProps<"button">`, and v2's polymorphic `ComponentWithAs` is gone, so `<Button as="a" href="/docs">` rendered an anchor while TypeScript still saw a `<button>` — and `href` was an error. Consumers reached for `@ts-expect-error`: FactChat carried 51 of them across 41 files, 30 files' worth of which this change retires outright.

`asChild` remains the right tool when you own the markup, because the child types itself. It is the wrong tool for the "link-shaped button" case, where the consumer wants a `Button` and one extra prop, not a restructured call site with a nested child.

```tsx
<Button as="a" href="/docs" target="_blank" rel="noreferrer">문서</Button>
<Button as={NextLink} href="/admin" prefetch={false}>관리자</Button>
<IconButton as="a" href={file} download aria-label="내려받기"><Download /></IconButton>
```

Type-level only: the runtime component, its behaviour, its `displayName` and its rendered markup are untouched. `as` defaults to `'button'`, so `ButtonProps`/`IconButtonProps` used bare mean exactly what they meant before — every existing call site and every `ComponentProps<typeof Button>` keeps its type. The own props are also split out as `ButtonOwnProps`/`IconButtonOwnProps` for wrappers that need them.

The mechanism is exported as `PolymorphicProps` and `PolymorphicRef` so consumers can carry `as` through their own wrappers. Where an element's props collide with the component's, the component wins — `color` stays a Chakra style prop rather than `<a>`'s deprecated presentational attribute — so a component's contract is never silently widened by the element it happens to render.

One call-site shape stops compiling, by design: spreading a runtime-conditional `as` (`...(cond ? { as: Link, href } : {})`) asks TypeScript to infer one `TElement` for two different elements. Render the two branches explicitly instead.
