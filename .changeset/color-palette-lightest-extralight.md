---
"@mindlogic-ai/logician-ui": minor
---

Add lightest (25 shade) and rename semantic tokens for expanded color palette

**New Color Levels:**
- Added 25 shade to all primitive color palettes (blue, rose, green, violet, gold)
- New lightest backgrounds: #F4F7FD (blue), #FDF5F5 (rose), #F4FDF4 (green), #FAF4FD (violet), #FDFBF4 (gold)

**Semantic Token Changes (BREAKING):**
- **NEW**: `lightest` → 25 shade (lightest backgrounds, ghost states)
- **RENAMED**: Previous `lightest` → `extralight` (50 shade, extra-light backgrounds)
- `lighter`, `light`, `main`, `dark`, `darker` remain unchanged

**Migration Guide:**
Replace all instances of `.lightest` with `.extralight` in your codebase:
```tsx
// Before
<Badge bgColor="primary.lightest" />

// After
<Badge bgColor="primary.extralight" />
```

Or use the new `lightest` for even lighter backgrounds:
```tsx
<Badge bgColor="primary.lightest" /> // Now uses 25 shade (lighter than before)
```

**Component Updates:**
- Badge, Chip, Tag: Updated to use `extralight` (maintains previous visual appearance)
- Toast, Banner: Updated to use `extralight` (maintains previous visual appearance)
- Button soft variant: Updated to use `extralight` (maintains previous visual appearance)

**Documentation Updates:**
- Updated theme/CLAUDE.md with new color tables and semantic token mappings
- Updated all inline comments in colors.ts
- Palette Storybook will automatically display new lightest shade

**WCAG Compliance:**
All existing WCAG AA compliance maintained - no changes to `main`, `dark`, or `darker` mappings
