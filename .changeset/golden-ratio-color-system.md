---
"@mindlogic-ai/logician-ui": major
---

feat!: implement Golden Ratio Color System

Complete redesign of the color palette using mathematically harmonious color relationships based on the golden ratio (φ ≈ 1.618).

## New Color Primitives

- **Blue** (`blue.50` - `blue.900`): Primary brand color palette
- **Rose** (`rose.50` - `rose.900`): Danger/error states (replaces `red`)
- **Green** (`green.50` - `green.900`): Success states
- **Violet** (`violet.50` - `violet.900`): Secondary/accent color (replaces `purple`)
- **Gold** (`gold.50` - `gold.900`): Warning states (replaces `yellow`)
- **Gray** (`gray.0` - `gray.1500`): Extended 16-shade slate-based gray scale with cool blue undertone

## Semantic Token Updates

All semantic tokens now reference the new primitive palettes:

- `primary.*` → Blue palette (#1751D0 main)
- `secondary.*` → Violet palette (#9117D0 main)
- `danger.*` → Rose palette (#D01721 main)
- `success.*` → Green palette (#1AA612 main)
- `warning.*` → Gold palette (#D0A117 main)

## New Semantic Token Variants

Each semantic category now includes `lightest` and `darker` variants:

```tsx
primary.lightest // #E8EEFB
primary.darker   // #04102A
```

## Gray Scale Changes

- Added `gray.0` (#FDFDFF) for pure background
- All gray values updated with blue undertone
- Default body text changed from `gray.1500` to `gray.1300` (#1E2433)

## WCAG Accessibility

All semantic color combinations meet WCAG 2.1 AA standards (4.5:1 minimum contrast).

## Breaking Changes

- Gray palette values have changed significantly (now slate-based with blue undertone)
- `primary.light` now maps to `blue.200` (#7DA0E8) instead of `blue.300`
- `primary.main` now maps to `blue.500` (#1751D0) instead of `blue.900`
- Default body text color changed to `gray.1300` (#1E2433)
- Button hover states updated to use new palette shades

## Legacy Aliases (Deprecated)

For backwards compatibility:

- `purple.*` → maps to `violet.*`
- `red.*` → maps to `rose.*`
- `yellow.*` → maps to `gold.*`

## Component Updates

- **Button**: Updated hover states to use `blue.600`, removed hardcoded hex values
- **IconButton**: Updated hover states to use `blue.600` and `rose.600`
- **Chip**: Updated to use semantic tokens. Highlight variant now uses `violet` instead of `purple`.

## Documentation

- Comprehensive theme documentation in `src/theme/claude.md`
- New Storybook stories: SemanticTokens, PrimitiveColors, GrayScale, ContrastReference
