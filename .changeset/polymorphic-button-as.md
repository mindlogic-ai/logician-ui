---
'@mindlogic-ai/logician-ui': minor
---

Make `as` carry the rendered element's props — a reusable mechanism, applied to `Button`, `IconButton`, `MenuItem`, `Card` and `Badge`.

`as` has always swapped what renders; it did not swap what type-checks. Chakra v3's prop types are bound to one element (`ButtonProps extends HTMLChakraProps<"button">`) and v2's polymorphic `ComponentWithAs` is gone, so `<Button as="a" href="/docs">` rendered an anchor while TypeScript still saw a `<button>` — and `href` was an error. Consumers reached for `@ts-expect-error`: FactChat carries 60 of them, 45 of which this retires across 33 files.

`asChild` remains the right tool when you own the markup, because the child types itself. It is the wrong tool for the "link-shaped button" case, where the consumer wants the component plus one extra prop, not a restructured call site with a nested child.

```tsx
<Button as="a" href="/docs" target="_blank" rel="noreferrer">문서</Button>
<MenuItem value="admin" as={NextLink} href="/admin">관리자</MenuItem>
<Card clickable as="button" type="button">눌러서 자세히 보기</Card>
<IconButton as="a" href={file} download aria-label="내려받기"><Download /></IconButton>
```

Several of these are accessibility fixes as much as typing ones. A card whose whole surface is one target should *be* a `<button>` rather than a `<div>` with an `onClick` — that is what puts it in the tab order and makes Enter/Space work. A menu item that navigates should be a real link, so middle-click and "open in new tab" keep working. The types stopped consumers doing the right thing.

**The mechanism, not just the five components.** `PolymorphicProps`, `PolymorphicRef` and `polymorphic()` are exported. Applying them to another component is one line, and a consumer can carry `as` through its own wrapper the same way:

```ts
const CardImpl = forwardRef<HTMLDivElement, CardOwnProps>(…);
CardImpl.displayName = 'Card';
export const Card = polymorphic<CardOwnProps, 'div'>(CardImpl);
```

`forwardRef` erases generics — its signature is fixed at the type it was instantiated with — so re-declaring the call signature is the standard way around that, and `polymorphic()` is that cast in one place instead of a dozen lines per component. `displayName` deliberately stays on the implementation, where `react/display-name` can still see it.

Type-level only: runtime components, behaviour, `displayName` and rendered markup are untouched. Every `as` keeps its previous default (`'button'`, `'div'`, `'span'`), so the bare prop types mean exactly what they meant before and every existing call site keeps its type. Own props are also split out (`ButtonOwnProps`, `MenuItemOwnProps`, `CardOwnProps`, …) for wrappers that need them.

Where an element's props collide with the component's, the component wins — `color` stays a Chakra style prop rather than `<a>`'s deprecated presentational attribute — so a component's contract is never silently widened by the element it happens to render.

One call-site shape stops compiling, by design: spreading a runtime-conditional `as` (`...(cond ? { as: Link, href } : {})`) asks TypeScript to infer one element type for two different elements. Render the two branches explicitly instead.
