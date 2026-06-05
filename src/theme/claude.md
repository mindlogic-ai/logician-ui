# Theme System

The Logician UI theme system extends Chakra UI's theming capabilities with the **Golden Ratio Color System** - a mathematically harmonious color palette designed using the golden ratio (φ ≈ 1.618) to create visually balanced color relationships.

## Theme Structure

```
src/theme/
├── index.ts          # Main theme export
├── colors.ts         # Color palette & semantic tokens
├── font.ts           # Font family definitions
├── global.ts         # Global CSS styles
└── Palette.stories.tsx  # Visual color palette reference
```

## Golden Ratio Color System

### Design Principles

1. **Accessibility First**: All semantic color combinations meet WCAG 2.1 AA standards (4.5:1 minimum contrast)
2. **Cool Gray Foundation**: Slate-based grays with blue undertone for a modern, professional feel
3. **Consistent Scale**: Each color has 50/100/200/300/500/600/700/800/900 steps
4. **Light & Dark Mode**: Neutral semantic tokens (`bg.*`/`fg.*`/`border.*`) carry a `_dark`
   variant and flip automatically by color mode. Use them instead of raw `gray.*`/`white`
   primitives so components work in both modes (see [Neutral Semantic Tokens](#neutral-semantic-tokens-dark-mode)).

### Primitive Color Palettes

Located in `src/theme/colors.ts`

#### Blue Palette (Primary)
Primary brand color for interactive elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `blue.25` | `#F4F7FD` | Lightest backgrounds |
| `blue.50` | `#E8EEFB` | Extra-light backgrounds |
| `blue.100` | `#B9CBF3` | Light backgrounds, subtle fills |
| `blue.200` | `#7DA0E8` | Hover states, focus rings |
| `blue.300` | `#4A79DC` | Medium accents, borders |
| `blue.500` | `#1751D0` | **Primary main** - buttons, links |
| `blue.600` | `#1241A6` | Hover on main |
| `blue.700` | `#0D317D` | Text on light backgrounds |
| `blue.800` | `#092053` | Dark emphasis |
| `blue.900` | `#04102A` | Darkest, high contrast |

#### Rose Palette (Danger)
Error and destructive action states.

| Token | Hex | Usage |
|-------|-----|-------|
| `rose.25` | `#FDF5F5` | Lightest backgrounds |
| `rose.50` | `#FBE8E9` | Extra-light backgrounds |
| `rose.100` | `#F3B9BD` | Light error fills |
| `rose.200` | `#E87D84` | Error borders, icons |
| `rose.300` | `#DC4A53` | Error accents |
| `rose.500` | `#D01721` | **Danger main** - error states |
| `rose.600` | `#A6121A` | Hover on main |
| `rose.700` | `#7D0D14` | Error text |
| `rose.800` | `#53090D` | Dark emphasis |
| `rose.900` | `#2A0407` | Darkest, high contrast |

#### Green Palette (Success)
Success and confirmation states.

| Token | Hex | Usage |
|-------|-----|-------|
| `green.25` | `#F4FDF4` | Lightest backgrounds |
| `green.50` | `#E9FBE8` | Extra-light backgrounds |
| `green.100` | `#BDF3B9` | Light success fills |
| `green.200` | `#84E87D` | Success borders, icons |
| `green.300` | `#53DC4A` | Success accents |
| `green.500` | `#21D017` | Bright (avoid for text) |
| `green.600` | `#1AA612` | **Success main** - confirmations |
| `green.700` | `#147D0D` | Success text |
| `green.800` | `#0D5309` | Dark emphasis |
| `green.900` | `#072A04` | Darkest, high contrast |

#### Violet Palette (Secondary)
Secondary accent and highlight elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `violet.25` | `#FAF4FD` | Lightest backgrounds |
| `violet.50` | `#F4E8FB` | Extra-light backgrounds |
| `violet.100` | `#DEB9F3` | Light accent fills |
| `violet.200` | `#C17DE8` | Accent borders |
| `violet.300` | `#A84ADC` | Accent elements |
| `violet.500` | `#9117D0` | **Secondary main** - accents |
| `violet.600` | `#7412A6` | Hover on main |
| `violet.700` | `#570D7D` | Accent text |
| `violet.800` | `#3A0953` | Dark emphasis |
| `violet.900` | `#1D042A` | Darkest, high contrast |

#### Gold Palette (Warning)
Warning and caution states.

| Token | Hex | Usage |
|-------|-----|-------|
| `gold.25` | `#FDFBF4` | Lightest backgrounds |
| `gold.50` | `#FBF6E8` | Extra-light backgrounds |
| `gold.100` | `#F3E4B9` | Light warning fills |
| `gold.200` | `#E8CD7D` | Warning borders, icons |
| `gold.300` | `#DCB84A` | Warning accents |
| `gold.500` | `#D0A117` | **Warning main** - caution |
| `gold.600` | `#A68112` | Hover on main |
| `gold.700` | `#7D610D` | Warning text |
| `gold.800` | `#534109` | Dark emphasis |
| `gold.900` | `#2A2004` | Darkest, high contrast |

#### Gray Palette (Slate-based)
Extended 16-shade scale with cool blue undertone.

| Token | Hex | Usage |
|-------|-----|-------|
| `gray.0` | `#FDFDFF` | Pure background |
| `gray.50` | `#F7F9FC` | Subtle background |
| `gray.100` | `#F0F3F9` | Muted background |
| `gray.200` | `#E2E6F0` | Light borders, dividers |
| `gray.300` | `#CDD3E0` | Default borders |
| `gray.400` | `#B0B8C9` | Disabled borders |
| `gray.500` | `#9AA3B8` | Placeholder text, tertiary |
| `gray.600` | `#8690A7` | Icons, secondary text |
| `gray.700` | `#737D96` | Secondary text |
| `gray.800` | `#616B85` | Body text (light) |
| `gray.900` | `#505A74` | Body text (medium) |
| `gray.1000` | `#414A63` | Body text (strong) |
| `gray.1100` | `#343C52` | Headings (light) |
| `gray.1200` | `#2A3142` | Headings (medium) |
| `gray.1300` | `#1E2433` | **Primary text** - default body |
| `gray.1400` | `#141924` | Dark backgrounds |
| `gray.1500` | `#0B0E17` | Darkest background |

### Semantic Tokens

Semantic tokens provide meaning-based color references that should be used instead of primitive colors.

```tsx
semanticTokens: {
  colors: {
    primary: {
      lightest: 'blue.25',     // #F4F7FD - Lightest backgrounds
      extralight: 'blue.50',   // #E8EEFB - Extra-light backgrounds
      lighter: 'blue.100',     // #B9CBF3 - Light backgrounds
      light: 'blue.200',       // #7DA0E8 - Hover states
      main: 'blue.500',        // #1751D0 - Primary actions
      dark: 'blue.700',        // #0D317D - Text on light bg
      darker: 'blue.900',      // #04102A - High contrast text
    },
    secondary: {
      lightest: 'violet.25',   // #FAF4FD - Lightest backgrounds
      extralight: 'violet.50', // #F4E8FB - Extra-light backgrounds
      lighter: 'violet.100',   // #DEB9F3 - Light backgrounds
      light: 'violet.200',     // #C17DE8 - Hover states
      main: 'violet.500',      // #9117D0 - Accent actions
      dark: 'violet.700',      // #570D7D - Text on light bg
      darker: 'violet.900',    // #1D042A - High contrast text
    },
    danger: {
      lightest: 'rose.25',     // #FDF5F5 - Lightest backgrounds
      extralight: 'rose.50',   // #FBE8E9 - Extra-light backgrounds
      lighter: 'rose.100',     // #F3B9BD - Light error fills
      light: 'rose.200',       // #E87D84 - Error borders
      main: 'rose.500',        // #D01721 - Error states
      dark: 'rose.700',        // #7D0D14 - Error text on light bg
      darker: 'rose.900',      // #2A0407 - High contrast error text
    },
    success: {
      lightest: 'green.25',    // #F4FDF4 - Lightest backgrounds
      extralight: 'green.50',  // #E9FBE8 - Extra-light backgrounds
      lighter: 'green.100',    // #BDF3B9 - Light success fills
      light: 'green.200',      // #84E87D - Success borders
      main: 'green.600',       // #1AA612 - Success states
      dark: 'green.700',       // #147D0D - Success text on light bg
      darker: 'green.900',     // #072A04 - High contrast success text
    },
    warning: {
      lightest: 'gold.25',     // #FDFBF4 - Lightest backgrounds
      extralight: 'gold.50',   // #FBF6E8 - Extra-light backgrounds
      lighter: 'gold.100',     // #F3E4B9 - Light warning fills
      light: 'gold.200',       // #E8CD7D - Warning borders
      main: 'gold.500',        // #D0A117 - Warning states
      dark: 'gold.700',        // #7D610D - Warning text on light bg
      darker: 'gold.900',      // #2A2004 - High contrast warning text
    },
  },
}
```

### Neutral Semantic Tokens (Dark Mode)

The brand semantics above carry `_dark` variants, but the **neutral** tokens below are
the ones to reach for on surfaces, text, and borders. Each maps onto the `gray.0–1500`
scale and resolves to a different step under `.dark` (Chakra v3's class strategy), so a
component built with them flips for free — **no `_dark` overrides needed**.

```tsx
semanticTokens: {
  colors: {
    // Backgrounds                base (light) → _dark
    bg: {
      canvas:  'gray.0',    // app background        → gray.1500
      surface: 'white',     // cards, menus, popovers → gray.1400
      subtle:  'gray.50',   // secondary surface      → gray.1300
      muted:   'gray.100',  // tertiary fill, hover   → gray.1200
      inverse: 'gray.1300', // high-contrast surface  → gray.50
    },
    // Foreground (text / icons)
    fg: {
      default: 'gray.1300', // primary text → gray.200
      muted:   'gray.900',  // secondary    → gray.400
      subtle:  'gray.700',  // tertiary     → gray.600
      inverse: 'gray.0',    // text on inverse → gray.1400
    },
    // Borders / dividers
    border: {
      default: 'gray.300',  // standard borders → gray.1100
      subtle:  'gray.200',  // low-emphasis     → gray.1300
      strong:  'gray.500',  // high-emphasis    → gray.900
    },
  },
}
```

```tsx
// ✅ Flips with color mode
<Box bg="bg.surface" color="fg.default" borderColor="border.default" />

// ❌ Stuck in light mode — a white panel / dark text that never flips
<Box bg="white" color="gray.1300" borderColor="gray.300" />
```

**Exceptions (intentionally do not flip):**
- Solid brand fills and their white labels (`bg="primary.main" color="white"`) are
  mode-invariant by design — keep them as primitives.
- White slider knobs and always-dark surfaces (Tooltip, CodeTabs) stay fixed.
- **Third-party renderers that don't resolve Chakra tokens** (e.g. recharts in
  `LineGraph`): feed the resolved CSS var instead — `var(--chakra-colors-fg-muted)`.
- **Translucency**: when you need a semi-transparent surface that still flips, mix the
  CSS var instead of hardcoding rgba — e.g.
  `color-mix(in srgb, var(--chakra-colors-bg-surface) 85%, transparent)` (see `FileInput`).

### WCAG Contrast Ratios

All semantic color combinations meet WCAG 2.1 accessibility standards:

| Combination | Ratio | Level |
|-------------|-------|-------|
| `primary.lightest` + `primary.dark` | 7.2:1 | AAA |
| `primary.main` + white | 5.9:1 | AA |
| `danger.lightest` + `danger.dark` | 7.4:1 | AAA |
| `danger.main` + white | 5.2:1 | AA |
| `success.lightest` + `success.dark` | 6.1:1 | AA |
| `warning.lightest` + `warning.dark` | 5.8:1 | AA |
| `gray.0` + `gray.1300` | 11.2:1 | AAA |
| `gray.50` + `gray.900` | 6.2:1 | AA |

## Using Colors in Components

### Preferred: Semantic Tokens

```tsx
// ✅ Best - uses semantic meaning
<Button bgColor="primary.main" color="white" />
<Alert bgColor="danger.lightest" borderColor="danger.main" />
<Badge bgColor="success.lightest" color="success.dark" />

// Toast with proper contrast
<Box bg="warning.lighter" color="warning.dark" />
```

### Neutral Surfaces / Text / Borders: use `bg.*` / `fg.*` / `border.*`

These flip with color mode — prefer them over raw `gray.*`/`white` for anything neutral:

```tsx
// ✅ Best - flips between light and dark
<Box bgColor="bg.surface" borderColor="border.default" />
<Text color="fg.default">Primary text</Text>
<Text color="fg.subtle">Secondary text</Text>
```

### Alternative: Primitive Colors

```tsx
// ⚠️ Only when the value must stay fixed across modes (rare for neutrals).
// Raw gray.*/white do NOT flip, so a `white` surface or `gray.1300` text will be
// stuck in light mode under .dark. Reach for bg.*/fg.*/border.* above instead.
<Box bgColor="primary.main" color="white" /> // mode-invariant brand fill — OK
```

### Accessing Theme in Components

```tsx
import { useTheme, useToken } from '@chakra-ui/react';

const Component = () => {
  // Access entire theme object
  const theme = useTheme();
  const primaryColor = theme.semanticTokens.colors.primary.main;

  // Get resolved color values
  const [primary, danger] = useToken('colors', [
    'primary.main',
    'danger.main'
  ]);

  return (
    <Box
      borderColor="primary.main"
      _focus={{
        boxShadow: `rgb(255, 255, 255) 0px 0px 0px 2px, ${primary} 0px 0px 0px 4px`
      }}
    />
  );
};
```

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

Global styles apply the Golden Ratio color system:

```tsx
global: {
  ':root': {
    '--chakra-colors-chakra-body-text': '#1E2433',  // gray.1300
    '--chakra-colors-chakra-body-bg': '#FDFDFF',    // gray.0
  },
  'html, body': {
    color: 'gray.1300',  // Primary text color
  },
}
```

## Best Practices

### 1. Always Use Semantic Tokens

```tsx
// ✅ Good
<Button bgColor="primary.main" />
<Alert bgColor="danger.lightest" color="danger.dark" />

// ❌ Bad - hardcoded colors
<Button bgColor="#1751D0" />
<Alert bgColor="#ffcccc" />
```

### 2. Use Theme Hooks

```tsx
// ✅ Good - dynamic, respects theme
import { useTheme } from '@chakra-ui/react';
const theme = useTheme();
const color = theme.semanticTokens.colors.primary.main;

// ❌ Bad - static
const color = '#1751D0';
```

### 3. Consistent Gray Usage — prefer flipping neutral tokens

```tsx
// ✅ Best - neutral semantic tokens flip with color mode
<Text color="fg.default">Primary text</Text>
<Text color="fg.subtle">Secondary text</Text>
<Box bgColor="bg.surface" borderColor="border.default" />

// ⚠️ Stuck in light mode - raw gray.*/white never flip under .dark
<Text color="gray.1300" /> // use fg.default
<Box bgColor="white" />    // use bg.surface

// ❌ Bad - arbitrary values
<Text color="#333" />
```

### 4. Accessible Color Combinations

```tsx
// ✅ Good - meets WCAG AA
<Box bg="primary.lightest" color="primary.dark" />
<Box bg="danger.main" color="white" />

// ⚠️ Caution - check contrast
<Box bg="warning.main" color="white" />  // May need darker text
```

## Color Usage Guidelines

### Primary Colors (Blue)
- **Buttons**: `primary.main` for primary actions
- **Links**: `primary.main` for interactive text
- **Focus rings**: `primary.main` with box shadow
- **Backgrounds**: `primary.lightest` for subtle emphasis

### Danger Colors (Rose)
- **Error messages**: `danger.lighter` background with `danger.dark` text
- **Delete buttons**: `danger.main` with white text
- **Form validation**: `errorBorderColor="danger.main"`

### Success Colors (Green)
- **Success messages**: `success.lightest` background with `success.dark` text
- **Confirmation buttons**: `success.main`
- **Badges**: `success.lightest` with `success.dark` text

### Warning Colors (Gold)
- **Warning messages**: `warning.lightest` background with `warning.dark` text
- **Caution icons**: `warning.main`
- Note: Use `warning.dark` for text (better contrast)

### Neutral Colors (Slate Gray)
- **Backgrounds**: `gray.0` (main), `gray.50` (subtle), `gray.100` (muted)
- **Borders**: `gray.300` (default), `gray.200` (subtle)
- **Primary text**: `gray.1300`
- **Secondary text**: `gray.700`
- **Tertiary text**: `gray.500`

## Legacy Color Aliases

For backwards compatibility, the following aliases are available:

- `purple.*` → maps to `violet.*`
- `red.*` → maps to `rose.*`
- `yellow.*` → maps to `gold.*`

These are deprecated and will be removed in a future version.

## Extending the Theme

Consumers can extend the theme:

```tsx
import { extendTheme } from '@chakra-ui/react';
import logicianTheme from '@mindlogic-ai/logician-ui/theme';

const customTheme = extendTheme({
  ...logicianTheme,
  colors: {
    ...logicianTheme.colors,
    // Add custom colors
    brand: {
      500: '#custom-color',
    },
  },
  semanticTokens: {
    colors: {
      ...logicianTheme.semanticTokens.colors,
      primary: {
        ...logicianTheme.semanticTokens.colors.primary,
        main: 'brand.500',
      },
    },
  },
});
```

## Visual Reference

See `Palette.stories.tsx` in Storybook for interactive color palette exploration:

- **Semantic Tokens**: Primary, secondary, danger, success, warning
- **Primitive Colors**: Blue, rose, green, violet, gold
- **Gray Scale**: Full 16-shade slate palette
- **Contrast Reference**: WCAG compliance examples

## Common Patterns

### Focus Ring
```tsx
_focus={{
  outline: 'none',
  boxShadow: `rgb(255, 255, 255) 0px 0px 0px 2px, ${primaryColor} 0px 0px 0px 4px`,
}}
```

### Hover States
```tsx
_hover={{
  bgColor: 'blue.600',  // Darker shade of primary
  borderColor: 'gray.400',
}}
```

### Disabled States
```tsx
_disabled={{
  opacity: 1,
  bg: 'gray.100',
  color: 'gray.500',
  cursor: 'not-allowed',
}}
```

### Error States
```tsx
<Input
  isInvalid={hasError}
  errorBorderColor="danger.main"
  focusBorderColor="primary.main"
/>
```

### Toast Notifications
```tsx
// Success toast
<Box bg="success.lighter" color="success.dark" borderColor="success.light" />

// Error toast
<Box bg="danger.lighter" color="danger.dark" borderColor="danger.light" />

// Warning toast
<Box bg="warning.lighter" color="warning.dark" borderColor="warning.light" />

// Info toast
<Box bg="primary.light" color="primary.dark" borderColor="primary.lighter" />
```
