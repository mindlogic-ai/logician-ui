---
'@mindlogic-ai/logician-ui': minor
---

Make `as` carry the rendered element's props — a reusable mechanism, applied to 19 components.

`as` has always swapped what renders; it did not swap what type-checks. Chakra v3's prop types are bound to one element (`ButtonProps extends HTMLChakraProps<"button">`) and v2's polymorphic `ComponentWithAs` is gone, so `<Button as="a" href="/docs">` rendered an anchor while TypeScript still saw a `<button>` — and `href` was an error. Consumers reached for `@ts-expect-error`: FactChat carries 60 of them, 45 of which this retires across 33 files.

`asChild` remains the right tool when you own the markup, because the child types itself. It is the wrong tool for the "link-shaped button" case, where the consumer wants the component plus one extra prop, not a restructured call site with a nested child.

Applied to the components where swapping the element is a normal, safe thing to do: `Button`, `IconButton`, `MenuItem`, `Card`, `Badge`, `Chip`, `Tag`, `Container`, `SeeMoreButton`, `Link`, and the whole typography scale (`Text`, `Subtitle`, `Subtext`, `Caption`, `Overline`, `H1`–`H5`).

```tsx
<Button as="a" href="/docs" target="_blank" rel="noreferrer">문서</Button>
<MenuItem value="admin" as={NextLink} href="/admin">관리자</MenuItem>
<Card clickable as="button" type="button">눌러서 자세히 보기</Card>
<H3 as="h2">h3 크기, 문서 구조상 h2</H3>
<Text as="label" htmlFor="email">이메일</Text>
<Container as="main" id="content">…</Container>
```

Deliberately **not** applied to components whose element is their semantics — form widgets (`Checkbox`, `Radio`, `Switch`, `Slider`, `Select`, `Input`, `Textarea`, `PinInput`) and structural parts (`Table`/`Th`/`Td`/`Tr`, `Tree*`, `Tabs`, `Accordion`, `Modal`, `Popover`). Typing `as` there would make it easier to reach for, and reaching for it breaks the role, the keyboard behaviour, or the table/tree semantics that KWCAG grades. Two more are skipped for mechanical reasons: `Avatar` attaches sub-components with `Object.assign`, which the helper's return type would drop, and `Breadcrumb`'s root *is* the `<nav>` landmark (the `as` a breadcrumb wants belongs on the link item, which consumers pass in).

Several of these are accessibility fixes as much as typing ones, and that is the main reason to go past the components with suppressions against them. A card whose whole surface is one target should *be* a `<button>` rather than a `<div>` with an `onClick` — that is what puts it in the tab order and makes Enter/Space work. A menu item that navigates should be a real link. The typography scale is a *type* scale, not a document outline, so `as` is how a call site keeps the size while fixing the heading level that KWCAG 제목 제공 actually grades. And `<Text as="label" htmlFor="email">` did not compile at all before — `as="label"` was accepted, but `htmlFor` was not, so the label could not be pointed at a control.

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
