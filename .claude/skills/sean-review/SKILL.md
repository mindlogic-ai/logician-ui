---
name: sean-review
description: Use when reviewing your own PR before requesting review, when adding/changing a component in logician-ui, or when responding to Sean (@spark33) review feedback. Captures the patterns Sean (the most active reviewer on this design system) consistently flags — semantic tokens over raw hex/px, the two-dimensional colorPalette×variant system, forwardRef + Omit<ChakraProps> API design, the per-component file layout (.tsx/.types.ts/.styles.ts/.stories.tsx/index.tsx), public-API stability + changesets, Storybook coverage, export registration, a11y, and translation hygiene. Apply BEFORE pushing so the obvious nits are already fixed.
---

# sean-review — Reviewing logician-ui code the way Sean does

Sean (@spark33) is the dominant author/reviewer on `@mindlogic-ai/logician-ui` (the published
Chakra-UI-v3 design system that FactChat and the rest of `mindlogic-web` consume). Unlike a
product app, **this repo is the source of the design tokens and primitives everyone else
reuses** — so the review bar is about *public API stability, token discipline, and
consistency across the component set*, not about "did you reuse a token" (you ARE the token).

Internalize this before pushing a PR so the first review pass doesn't burn on the same nits.

## Mental model

Sean reviews this repo as a **design-system maintainer**. His top reflexes:

1. **"Is this consistent with every other component?"** — file layout, `forwardRef` +
   `displayName`, prop API shape (`Omit<ChakraXProps, ...> & { ... }`), the two-dimensional
   `colorPalette` × `variant` system, naming. A new component must look like it was written
   by the same hand as `Button`, `Badge`, `Chip`.
2. **"Are these semantic tokens, or raw values?"** — every color must be a theme token
   (`primary.main`, `gray.1200`, `danger.extralight`), every spacing a scale value. Raw hex
   appears ONLY as a trailing `// #1751D0` comment next to a token, never as the value.
3. **"Does this break a consumer?"** — this is a published npm package. A changed/removed
   prop, renamed export, or changed default is a **breaking change** → needs a `major`
   changeset and usually a `@deprecated` alias kept for one major. Silent breaks get blocked.
4. **"Where's the story / export / changeset?"** — a new or changed component without a
   Storybook story, without being registered in `src/index.ts`, or without a changeset is
   incomplete.

If your diff fails any of those, expect a comment. Most reviews are <10 inline comments and
the same handful of categories show up every time.

## When this skill applies

- Self-reviewing your branch before pushing / requesting review on `logician-ui`
- Adding a new component, or changing an existing component's props, styles, or defaults
- Touching the theme (`src/theme/**`), shared `src/utils/**`, `src/hooks/**`, translations
- Responding to spark33 review comments and anticipating the next round

Skip when: pure docs, CI/workflow config, or the Storybook host config only.

---

## The rules

### 1. Per-component file layout — always the five-file folder

Every component is a folder with the exact same shape (see `src/components/Button/`):

```
ComponentName/
├── ComponentName.tsx          # impl — forwardRef + displayName
├── ComponentName.types.ts     # exported props interface/type
├── ComponentName.styles.ts    # style maps / variant tables (when it has styling logic)
├── ComponentName.stories.tsx  # Storybook story (REQUIRED for new components)
└── index.tsx                  # public re-exports (component + types + style helpers)
```

**Rules:**
- Don't inline types into the `.tsx` — they live in `.types.ts` and are re-exported from `index.tsx`.
- Don't inline a big style table into the `.tsx` — it goes in `.styles.ts` as a typed
  `Record<...>` plus a `getXxxStyles()` accessor (mirror `buttonColorPaletteStyles` +
  `getButtonStyles`).
- The folder name must match the main file. No `Foo/` containing only `Bar.tsx`.
- `index.tsx` re-exports the component, its public types, and any style helpers/const lists
  consumers need (`buttonColorPalettes`, etc.).

### 2. Component implementation pattern — forwardRef + displayName

Representative of every primitive in the repo (`Button.tsx`):

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ colorPalette, variant = 'soft', size, children, ...rest }, ref) => {
    ...
    return <ChakraButton {...styles} ref={ref} {...rest}>{children}</ChakraButton>;
  }
);
Button.displayName = 'Button';
```

**Rules:**
- Use `forwardRef` and forward `ref` to the underlying Chakra element. Set `.displayName`.
- Spread `{...rest}` LAST (after your computed styles) so consumers can override.
- Provide sensible defaults inline in the destructure (`variant = 'soft'`), not via mutation.
- Transitions/borders/radius that are part of the component identity live on the JSX, but
  anything color/variant-driven comes from the `.styles.ts` accessor.

### 3. Prop API — `Omit` the Chakra props you're replacing, extend the rest

The single most important design-system discipline. See `Button.types.ts`:

```ts
export type ButtonProps = Omit<
  ChakraButtonProps,
  'variant' | 'colorScheme' | 'colorPalette' | 'leftIcon' | 'rightIcon'
> & {
  colorPalette?: ButtonColorPalette;
  variant?: ButtonVariant;
};
```

**Rules:**
- Start from the underlying Chakra component's props (`ChakraButtonProps`,
  `ChakraBadgeProps`, etc.). `Omit` exactly the props you're overriding or banning, then add
  your typed versions. Never redefine `size`, `disabled`, etc. that Chakra already exposes.
- Our `colorPalette` / `variant` are **custom literal unions** that replace Chakra's — type
  them as their own exported union (`ButtonColorPalette`, `ButtonVariant`) so consumers and
  `.styles.ts` can both reference them.
- TSDoc every public prop, and document non-obvious semantics + `@default`. Public API is
  the product here — props without docs get flagged.
- No type escape hatches (`as unknown as any`). If you need one, the API shape is wrong.

### 4. Semantic tokens only — raw hex/px never appears as a value

The repo runs a "Golden Ratio" semantic color system. Token families per palette:
`*.main`, `*.dark`, `*.light`, `*.lighter`, `*.extralight`, plus the gray scale
`gray.50 … gray.1200`.

**Hard rules:**

| Bad | Good |
|---|---|
| `bgColor: '#1751D0'` | `bgColor: 'primary.main'` |
| `color: '#2A3142'` | `color: 'gray.1200'` |
| `w="48px"`, `mt="6px"` | `w="48"`, `mt="2"` (spacing scale) |
| `style={{ marginRight: 4 }}` | `mr={1}` |
| `fontSize={14}` | rely on Chakra `size`→`textStyle` mapping; only set `textStyle` if needed |
| `boxSize={5}` (numeric) | `boxSize="sm"` (t-shirt token) |
| `colorScheme="blue"` | omit — `colorPalette` drives color |

- Raw hex is allowed in exactly one place: a trailing comment documenting what a token
  resolves to (`bgColor: 'primary.main', // #1751D0`). Never as the actual value.
- If a needed color isn't in the theme, add it to `src/theme/**` as a token first, then use
  the token — don't hard-code it in the component.

### 5. Two-dimensional variant system — `colorPalette` × `variant`

Components with multiple looks follow the Button model: a `colorPalette` (semantic color
family: `primary`/`secondary`/`danger`/`success`/`warning`/`neutral`) crossed with a
`variant` (fill style: `solid`/`soft`/`outline`/`ghost`). Styles live in a fully-enumerated
`Record<ColorPalette, Record<Variant, StyleProps>>` table.

**Rules:**
- Reuse the existing palette/variant union names and values; don't invent a parallel
  `type`/`tone`/`kind` axis for the same concept.
- Fill in **every** palette × variant cell — no missing combinations, no runtime fallback
  that silently picks `primary`.
- Expose `getXxxStyles(palette, variant)` and the `xxxColorPalettes` / `xxxVariants` const
  lists from `index.tsx` (stories and consumers map over them).
- Keep `_hover` / `_active` patterns consistent with siblings (e.g. `transform: 'scale(0.97)'`
  on `_active`).

### 6. Public-API stability & changesets — this is a published package

Representative: the repo keeps `@deprecated buttonColorSchemes = buttonColorPalettes` aliases
rather than deleting the old names outright.

**Rules:**
- Every consumer-visible change needs a changeset (`yarn changeset`):
  - **major** — removing/renaming a prop, export, or component; changing a default; changing
    visual output in a breaking way.
  - **minor** — new component, new (non-breaking) prop or variant.
  - **patch** — bug fix, internal refactor, docs.
- Removing/renaming a public export or prop: keep a `@deprecated` alias for one major and say
  so in the changeset, instead of a hard break — unless the change is explicitly a major.
- Don't change a component's default `colorPalette`/`variant`/`size` casually; downstream
  apps render against those defaults.

### 7. Exports & validation — register and check

**Rules:**
- New component → re-export from its `index.tsx`, then add to `src/index.ts` following the
  existing categorized grouping.
- Run `yarn check-exports` (validates every component is exported), `yarn type-check`, and
  `yarn lint` before pushing — these are the same gates Sean expects green.
- Don't leave unused imports; ESLint auto-removes them and import sorting is enforced.

### 8. Storybook coverage

**Rules:**
- A new component MUST ship a `ComponentName.stories.tsx`. Changing a component's API means
  updating its story.
- Stories should exercise the full matrix (map over `xxxColorPalettes` × `xxxVariants`,
  sizes, disabled/loading states) so visual regressions are catchable.
- Include screenshots of visual changes in the PR (repo PR checklist requires it).

### 9. Accessibility & responsiveness

**Rules:**
- Forward `ref`, keep WAI-ARIA semantics of the base element, support keyboard navigation,
  and keep visible focus (the repo uses a shared `focusRing` util — reuse it, don't
  hand-roll an `outline`).
- Support responsive props where the base Chakra component does; don't hard-fix a width that
  should be fluid.

### 10. Naming & translations

**Rules:**
- Match the repo's existing names (`colorPalette`, `variant`, `size`) — don't invent
  one-off prop names for concepts that already have a name here.
- Casing uniform within a feature; a `useXxx` is a hook only if it calls a React hook,
  otherwise it's a util under `src/utils/`.
- i18n strings come through the `get-lang-pack.sh` / `yarn update-intl` flow — don't
  hard-code Korean/English copy in a component when it should be a translation key.

### 11. Cleanup / smells

**Rules:**
- Strip `console.log`, debug `data-testid`s, commented-out blocks, and `// removed` comments.
- Comment only the non-obvious *why* (a constraint, an upstream-bug workaround — link it).
  Don't restate what the code does or reference the current task/PR.
- Nested `return`-inside-`return` JSX → split into a subcomponent. A wrapper that only
  forwards props → inline it.

### 12. Tone / responding to Sean

- `nit:` = non-blocking but should fix. 🔴 / "**Blocker**" / "Collapsible?" = address before merge.
- Terse comments (`px!`, `remove!`, `hexes?`, `token?`) assume you know the rule — just fix.
- He often phrases as a question ("…나을까요?", "…하면 어떨까요?"); the expected reply is
  action + brief rationale, not a debate. When you disagree, cite the prior pattern/commit
  you're aligning with.

---

## Quick self-review checklist (before pushing for review)

**Structure & impl**
- [ ] Five-file folder layout (`.tsx`/`.types.ts`/`.styles.ts`/`.stories.tsx`/`index.tsx`)?
- [ ] `forwardRef` + `ref` forwarded + `.displayName` set?
- [ ] `{...rest}` spread last; sensible inline defaults?
- [ ] Style table extracted to `.styles.ts` with a `getXxxStyles()` accessor?

**Prop API**
- [ ] Props = `Omit<ChakraXProps, ...overridden> & { custom }` — nothing redefined that Chakra already gives?
- [ ] Custom `colorPalette`/`variant` typed as exported unions?
- [ ] Every public prop has TSDoc + `@default`? No `as unknown as any`?

**Tokens**
- [ ] Zero raw hex/`px`/numeric `boxSize`/`fontSize`/`colorScheme` as *values* (hex only in trailing comments)?
- [ ] Missing colors added to `src/theme` as tokens first?

**Variant system**
- [ ] Reused palette/variant union names (no parallel axis)?
- [ ] Every palette × variant cell filled, no silent fallback?
- [ ] `getXxxStyles` + `xxxColorPalettes`/`xxxVariants` exported from `index.tsx`?

**Publishing**
- [ ] Changeset added with the right bump (major/minor/patch)?
- [ ] Breaking renames keep a `@deprecated` alias (or explicitly a major)?
- [ ] Defaults unchanged unless intended + documented?

**Exports & gates**
- [ ] Re-exported from `index.tsx` and registered in `src/index.ts`?
- [ ] `yarn check-exports`, `yarn type-check`, `yarn lint` all green? No unused imports?

**Story & a11y**
- [ ] `*.stories.tsx` added/updated, exercising the full matrix? Screenshots in PR?
- [ ] `forwardRef`, ARIA semantics, keyboard nav, shared `focusRing`, responsive props?

**Cleanup**
- [ ] No `console.log` / debug `data-testid` / dead code / `// removed`?
- [ ] Comments only on non-obvious *why* (upstream workarounds linked)?

## Red flags — `grep` your own diff before pushing

```
#[0-9A-Fa-f]{6}        # raw hex as a VALUE (ok only in a trailing // comment) → token
px"                    # → spacing scale
fontSize=              # → rely on size→textStyle, or set textStyle
boxSize={[0-9]         # numeric → t-shirt token
colorScheme=           # → drop; colorPalette drives color
as unknown as any      # → fix the API shape
console.log(           # → remove
data-testid=           # → probably remove
```

Plus:
- A new component folder with no `.stories.tsx` → add a story
- A new/renamed export not in `src/index.ts` → register (`yarn check-exports` will fail)
- A removed/renamed prop or export with no changeset / no `@deprecated` alias → breaking change
- Types inlined in the `.tsx` instead of `.types.ts` → extract
- A style table inlined in the `.tsx` instead of `.styles.ts` → extract
- A `forwardRef` component missing `.displayName` → add it

## What this skill is NOT

- Not a substitute for the repo `.claude/claude.md` (build/release/architecture) — read it
  for the full workflow (`yarn changeset`, tsup build, Storybook).
- Not personal preference — each rule maps to how the existing components (`Button`, `Badge`,
  `Chip`, …) are actually built and to recurring review patterns. Pushback is fine with a
  documented reason, but expect to defend it by citing a prior component.
