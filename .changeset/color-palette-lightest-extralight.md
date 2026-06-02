---
"@mindlogic-ai/logician-ui": minor
---

Color palette expansion, responsive typography, and component improvements

## Color Palette Expansion

**New Color Levels:**
- Added 25 shade to all primitive color palettes (blue, rose, green, violet, gold)
- New lightest backgrounds: #F4F7FD (blue), #FDF5F5 (rose), #F4FDF4 (green), #FAF4FD (violet), #FDFBF4 (gold)

**Semantic Token Changes (BREAKING):**
- **NEW**: `lightest` → 25 shade (lightest backgrounds, ghost states)
- **RENAMED**: Previous `lightest` → `extralight` (50 shade, extra-light backgrounds)
- `lighter`, `light`, `main`, `dark`, `darker` remain unchanged

**Migration Guide:**
Replace all instances of `.lightest` with `.extralight`:
```tsx
// Before
<Badge bgColor="primary.lightest" />

// After
<Badge bgColor="primary.extralight" />
```

Or use the new `lightest` for even lighter backgrounds:
```tsx
<Badge bgColor="primary.lightest" /> // Now uses 25 shade
```

**Component Updates:**
- Badge, Chip, Tag: Updated to use `extralight`
- Toast, Banner: Updated to use `extralight`
- Button soft variant: Updated to use `extralight`

## Responsive Typography System

**Typography Updates:**
- Override Chakra v3 default textStyles (2xs-7xl) with responsive scaling
- Mobile: base size, Desktop (md+): one size up for better readability
- Update custom Logician textStyles (h1-h5, p, subtitle, subtext) with consistent scaling
- Update Palette storybook to reflect actual theme values

## Modal Component API Changes (BREAKING)

**API Changes:**
- Remove auto-rendered `<ModalOverlay />` from Modal component
- Remove Portal wrapper from ModalContent for simpler composition
- Users must now explicitly add `<ModalOverlay />` when using Modal

**Migration:**
```tsx
// Before
<Modal open={isOpen}>
  <ModalContent>...</ModalContent>
</Modal>

// After
<Modal open={isOpen}>
  <ModalOverlay />
  <ModalContent>...</ModalContent>
</Modal>
```

## Component Improvements

**Bug Fixes:**
- Button: Remove fontSize override for xs size (now handled by theme)
- InfoSprinkle: Add optional chaining for iconButtonProps.size
- Markdown: Reduce gap from 1.2em to 1em for better spacing
- Pagination: Add whiteSpace="nowrap" to items per page label

## Documentation Updates

- Updated theme/CLAUDE.md with new color tables and semantic token mappings
- Updated all inline comments in colors.ts
- Palette Storybook automatically displays new lightest shade

## WCAG Compliance

All existing WCAG AA compliance maintained - no changes to `main`, `dark`, or `darker` mappings
