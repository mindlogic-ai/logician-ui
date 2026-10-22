# Theme System

The Logician UI theme system extends Chakra UI's theming with the **BAZE color system** (5.0): warm black / beige-brown / coral brand scales, 12 system hues, role-named semantic tokens, and a contrast audit in CI.

## Theme Structure

```
src/theme/
├── index.ts          # Main theme export (also defines textStyles)
├── colors.ts         # Raw scales + semantic tokens (built from palette.generated.ts)
├── palette.generated.ts  # Generator output — do not edit (scripts/palette/generate.mjs)
├── contrast.test.ts  # Contrast audit, 4 modes
├── deprecatedColorTokens.json  # 4.x → 5.0 names (aliases, lint, codemod)
├── motion.ts         # Duration/easing scales & the animationStyle presets
├── font.ts           # Font family definitions
├── global.ts         # Global CSS styles
├── BazePalette.stories.tsx  # Every raw + role value, 4 modes
└── Motion.stories.tsx   # Motion preset & scale reference
```

## Motion

**Never write a duration or a curve as a literal.** Everything below exists so
that `300ms` and `cubic-bezier(...)` do not appear in component code.

### Start here — which of the three

```
An element already on screen, one of its values changes   →  a preset
An element appears / disappears / has to replay           →  a component
You are using a library component (Switch, Card, …)       →  nothing. It is done.
```

The third is the common case. Reaching for `animationStyle` by hand means you
are building something the library does not have.

### Presets — `animationStyle`

A name carries duration, curve and reduced-motion together, the way
`textStyle="h3"` carries family, size, weight, leading and tracking.

```tsx
<Switch.Control
  _checked={{ bg: 'primary.main' }} // when it changes
  animationStyle="feedback" // how long, what curve
  transitionProperty="background-color" // what moves
/>
```

Those three roles are separate and all three are required. A preset is a clock —
it never knows _what_ moves, so `transitionProperty` stays at the call site.

| Preset              | For                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------- |
| `press`             | Contact — a button going down under the pointer                                        |
| `feedback`          | Hover and state colour                                                                 |
| `travel`            | Something moving to a new position or size                                             |
| `spring`            | A physical flip, or two things crossing                                                |
| `presence`          | A part with **both** an open and a closed state                                        |
| `presence-anchored` | The same, for a popup anchored to a trigger (Menu, Select, Combobox, Popover, Tooltip) |
| `stagger`           | Siblings arriving in sequence (with `staggerProps(index)`)                             |
| `composite`         | Escape hatch — one element needing two different clocks                                |

**Eight is the whole list and that is policy.** A motion with one caller belongs
next to that caller, not here (see `Spinner.styles.ts`, `Checkbox.styles.ts`).
Adding an eighth needs two real call sites that the existing seven cannot
express.

Three rules are inside the preset definitions, so no component has to remember
them:

- **`transitionProperty` defaults to `none`.** CSS defaults it to `all`, which
  would animate every property on the element — including ones the call site
  set. Forgetting the prop means nothing moves, which is visible; the CSS
  default fails invisibly.
- **`prefers-reduced-motion`** is handled. Loops are the exception and slow down
  rather than stopping — a frozen spinner reads as a dead request.
- **Enter is 300ms, exit is 150ms** for `presence` (Modal, BottomSheet,
  Collapsible) and **200ms / 100ms** for `presence-anchored`, enforced by a test.

Three things `animationStyle` accepts and should never be given — all three
compile, and all three are caught by lint instead of by types, because Chakra
types the prop as `… | AnyString`:

```tsx
<Box animationStyle="feedbak" />                  // typo — silently does nothing
<Box animationStyle="feedback" />                 // no scope — nothing moves
<Box animationStyle={['travel', 'spring']} />     // read as RESPONSIVE BREAKPOINTS,
                                                  // not as two motions
```

### Components — `Components/Motion/*` in Storybook

CSS transitions need a before-value to interpolate from, so they cannot animate
something that did not exist a moment ago, and cannot be replayed on demand.
That is what these are for.

| Component        | For                                                  |
| ---------------- | ---------------------------------------------------- |
| `Pulse`          | A value just landed — pop once                       |
| `Shake`          | Refusal. Never use it for emphasis                   |
| `Appear`         | One element entering on mount                        |
| `Reveal`         | A block opening underneath what is being read        |
| `FlyTo`          | This went there — a ghost between two measured rects |
| `Confetti`       | One celebratory burst                                |
| `CountUp`        | A number rising                                      |
| `SwapTransition` | Content being replaced — steps, records              |

`Pulse` and `Shake` replay when `trigger` **changes**, and never on first render
(a counter that mounts at 12 has not just become 12).

They are not interchangeable with the presets and not a fallback for them. If
the element can close, use `presence`; if siblings arrive with it, `stagger`.

Each wraps differently, so check its TSDoc before putting one inside a `<tr>` or
an Ark part that walks its own children: `Pulse` / `Shake` / `Appear` add one
`div`, `Reveal` / `SwapTransition` add two, `FlyTo` portals, `Confetti` is an
overlay, `CountUp` is the `<span>` itself.

### Raw values — the escape hatch

`durations` and `easings` are registered in the theme, so `motion.base` and
`overshoot` resolve anywhere CSS does. Reach for the raw exports only where CSS
cannot: `MOTION_DURATION_MS` / `MOTION_DURATION_S` / `MOTION_EASE` /
`MOTION_EASE_CSS` for a third-party animation API, and `cubicBezier(curve)` to
evaluate a house curve in JavaScript (a count-up that invents its own
`easeOutCubic` lands on a different curve from the card beside it).

Durations carry a `motion.` prefix so they sit alongside Chakra's scale rather
than redefining `slow` / `slower`, which its `dialog`, `drawer` and `progress`
recipes read — redefining a token you did not author retimes every component
that reads it. There are deliberately no `motion.*` tokens for 150ms and 200ms:
Chakra's `fast` and `moderate` are exactly those, and two names for one number
is worse than remembering which scale to reach into.

`Theme/Motion` in Storybook is the live version of this page.

## Color System — BAZE (5.0)

**Read `SemanticTokens.mdx` (Storybook: Setup/Theme/Using Semantic Tokens) for
which token to use, and Setup/Theme/BAZE Palette for every value.** This section
is the maintainer's view.

### Layers and files

| Layer                                                                                                                                                                     | Where                                            | Rule                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| Raw scales `ink`/`inkDark`, `sand`/`sandDark`, `slate`/`slateDark` (1–12), `coral`, 12 system hues `{base, baseDark, hc, hcDark, surface, ink, surfaceDark, inkDark}`     | `palette.generated.ts` → `colors` in `colors.ts` | Components and recipes **never** read them                                    |
| Semantic steps `neutral.1–12`, `secondary.1–12`                                                                                                                           | `createSemanticColors()`                         | Filled by the theme option (`neutral: 'ink' \| 'slate'`, `secondary: 'sand'`) |
| Roles (`bg.*`, `layer.*`, `fg.*`, `border.*`, `primary.*`, `secondary.*`, `action.*`, `send.*`, `count.*`, `disabled.*`, `focus.ring`, status, `tooltip.*`, `category.*`) | `ROLE_TOKEN_PATHS` + `createSemanticColors()`    | The only colours a component reads                                            |

- **Values come from the generator.** `scripts/palette/generate.mjs` ports the
  designer prototype (OKLCH, contrast-targeted steps) and `--check`s it against
  `scripts/palette/reference.json`. Change a value there, regenerate, commit
  `palette.generated.ts`. Never hand-edit the generated file.
- **High contrast** (`prefers-contrast: more`): a role whose HC value differs
  reads an internal helper `scheme.light.*` / `scheme.dark.*` (`{ base,
_moreContrast }`) because Chakra cannot nest `_dark` inside `_moreContrast`
  (it emits an invalid selector). Never reference `scheme.*`.
- **Use `_light`/`_dark`, not `base`,** for any token Chakra also defines
  (`bg.subtle`, `fg.muted`, `border.subtle`, `bg.panel` …): Chakra's `_light`
  outranks a `base` override. `createSemanticColors` already does this.
- **Semantic → semantic references work** in Chakra 3.30 (`{colors.fg.default}`
  emits a `var()` chain); the deprecated aliases rely on it.

### Adding or changing a token

1. Add it to the generator (`buildScheme`) and to `PATHS` in `colors.ts`.
2. Register its contrast pair(s) in `contrast.test.ts` (`PAIRS`, `SEP`), or a
   reason in `NO_PAIR`. The registry test fails until you do; the audit runs
   light / dark / hcLight / hcDark for every neutral scheme.
3. Add it to `SemanticColorToken` and to SemanticTokens.mdx.

### Deprecated 4.x names

`deprecatedColorTokens.json` maps every 4.x semantic name to its replacement.
The same file drives the aliases (`colors.ts`), the `no-deprecated-tokens`
lint rule (`eslint/rules/`, loaded with `--rulesdir` by `yarn lint`) and the
`codemods/5.0` token renames. Removed in 6.0.

### Shared style utils

- `focusRing` (`@/utils/focusRing`): inner 2px `bg.canvas` band + outer 2px
  `focus.ring`. No transition.
- `disabledControl` / `disabledText` (`@/utils/disabledControl`): fixed
  `disabled.*` colours, never opacity.

## Typography

### Font Families

```tsx
fonts: {
  body: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
  heading: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
}
```

**Font priority:**

1. **Pretendard Variable** - Korean characters
2. **Inter** - Latin characters
3. **Noto Sans** - Fallback

### Font Sizes

Responsive font sizes using `em` units:

```tsx
fontSizes: {
  subtitle: { base: '0.92em', md: '1em' },
  subtext: { base: '0.92em', md: '1em' },
  p: { base: '1em', md: '1em' },
  h5: { base: '1.1em', md: '1.2em' },
  h4: { base: '1.25em', md: '1.44em' },
  h3: { base: '1.5em', md: '1.75em' },
  h2: { base: '2em', md: '2.5em' },
  h1: { base: '2.4em', md: '3em' },
}
```

**Base font size:** `14px` (set in `global.ts`)

## Border Radius

```tsx
radii: {
  none: '0',
  sm: '6px',      // Small elements (badges, tags)
  md: '8px',      // Default (buttons, inputs)
  lg: '12px',     // Cards, modals
  xl: '32px',     // Large containers
  full: '9999px', // Pills, avatars
}
```

## Global Styles

`global.ts` reads role tokens only: `html, body` use `fg.default`, and Chakra's
legacy body vars (`--chakra-colors-chakra-body-text/-bg`) point at
`var(--chakra-colors-fg-default)` / `var(--chakra-colors-bg-canvas)` so they
follow the scheme and high contrast. Base font size is 14px.

## Best Practices

1. Read only role tokens; reach for `neutral.N` only when no role names the job.
2. Emphasis is weight, not colour — never `primary.*` for text.
3. Status colours carry status meaning; decoration uses `category.*`.
4. Beige (`secondary.surface*`) is for small surfaces (bubbles, soft
   badges/tags, the modal header band), never rows or panels.
5. Disabled = `disabled.*`, not opacity. Focus = `focusRing`.
6. Blue means data and links: links are `fg.link`; data visualisation
   (usage bars, single-measure charts, maps) is a blue monochrome ramp, never a
   rainbow or grey ramp. Values: SemanticTokens.mdx → "Blue means data and links".

## Extending the Theme

```tsx
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import {
  createLogicianTheme,
  LogicianProvider,
  normalizeSemanticOverrides,
} from '@mindlogic-ai/logician-ui';

// 1. Pick the neutral scheme — every role follows.
<LogicianProvider theme={{ neutral: 'slate' }}>…</LogicianProvider>

// 2. Override roles: pass a config; it is merged over the Logician theme.
<LogicianProvider
  config={defineConfig({
    theme: { semanticTokens: { colors: { primary: { main: { value: { base: '#1A56DB', _dark: '#7EA6F8' } } } } } },
  })}
/>

// 3. Building the system yourself: normalise your overrides first.
createSystem(defaultConfig, createLogicianTheme(), normalizeSemanticOverrides(appConfig));
```

Logician roles are emitted as `{ _light, _dark }`, and Chakra's `_light`
outranks `base`. A `{ base, _dark }` override would therefore keep the
library's light value. `LogicianProvider` runs `normalizeSemanticOverrides` on
its `config` (copies `base` into `_light`); call it yourself when you call
`createSystem` directly.

Chakra's own names (`bg.emphasized`, `border.muted`, `fg.error`, `*.inverted` …)
are mapped onto BAZE roles in `createSemanticColors` (`sameAs`);
`chakraTokens.test.ts` fails if Chakra adds one that is not mapped.

## Visual Reference

- Setup/Theme → Default: every 5.0 semantic colour in light and dark, plus the
  4.x alias table (`paletteSwatches.ts`, tested).
- Setup/Theme/BAZE Palette: raw scales and every role in all four modes.
- Setup/Theme/Using Semantic Tokens (`SemanticTokens.mdx`): which token to use.
