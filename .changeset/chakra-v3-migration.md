---
"@mindlogic-ai/logician-ui": major
---

feat!: Chakra UI v3 migration with Golden Ratio Color System

Complete migration to Chakra UI v3 with comprehensive design system overhaul and component architecture improvements.

## Breaking Changes

### Dependencies

- **Chakra UI**: v2.8 → v3.3 (major upgrade)
- **Removed peer dependencies**: `@emotion/styled`, `framer-motion` (no longer required in Chakra v3)
- **Next.js**: Now supports Next.js 16 (peer dependency range extended to `^13.0.0 || ^14.0.0 || ^15.0.0 || ^16.0.0`)
  - All Next.js navigation APIs (`useRouter`, `usePathname`, `useSearchParams`) and `next/link` remain fully compatible
  - No breaking changes to Next.js integration in logician-ui components
- **chakra-dayzed-datepicker**: upgraded to v3.0.0 for Chakra v3 compatibility

### Removed Components

The following components have been removed:

- **Alert** - Use Chakra UI's native Alert component instead
- **AutowidthInput** - Functionality can be achieved with regular Input
- **Carousel** & **CarouselModal** - Use external carousel libraries
- **Chip** - Replaced by enhanced Tag component with variants
- **DataField** - Use Field component from Chakra v3
- **GuideCue** - Use Tooltip or Popover components
- **UrlInput** - Use regular Input component

### Component API Changes

All components have been migrated to Chakra UI v3 APIs:

- **Button & IconButton**: `colorScheme` → `colorPalette`, new two-dimensional variant system (solid/outline/soft/ghost × primary/secondary/danger/success/warning)
- **Tag**: Enhanced with `colorPalette` prop and comprehensive variant support, replacing Chip functionality
- **Accordion**: New composition pattern with AccordionPanel component
- **Checkbox**: Updated to v3 composition API, `children` prop removed (use explicit label patterns instead)
- **Radio**: Updated to v3 composition API
- **Switch**: Updated to v3 composition API, `children` prop removed (use explicit label patterns instead)
- **Slider**: Updated to v3 composition API with SliderControl and SliderThumbs components
- **Tabs**: Updated to v3 composition API and context management
- **Toast**: New v3 API with backward compatibility wrapper
- **Tooltip**: Updated to v3 Popover-based implementation
- **Modal**: Migrated to Dialog component (v3)
- **Menu**: Updated to v3 composition pattern
- **Select**: Updated styling for v3 compatibility
- **PasswordInput**: Enhanced stories and v3 compatibility

## New Features

### Chakra UI v3 Primitives

Added `primitives.ts` for advanced composition patterns:

```tsx
import { V3Checkbox, V3RadioGroup, V3Switch, V3Slider } from '@mindlogic-ai/logician-ui';

// Use raw Chakra v3 components for maximum flexibility
<V3Checkbox.Root>
  <V3Checkbox.HiddenInput />
  <V3Checkbox.Control>
    <V3Checkbox.Indicator />
  </V3Checkbox.Control>
  <V3Checkbox.Label>Label</V3Checkbox.Label>
</V3Checkbox.Root>
```

Available primitives: `V3Checkbox`, `V3RadioGroup`, `V3Switch`, `V3Slider`, `V3Field`, `V3PinInput`, `V3NumberInput`, `V3Dialog`, `V3Menu`, `V3Popover`, `V3Tooltip`, `V3Accordion`, `V3Collapsible`, `V3Tabs`, `V3Avatar`, `V3Badge`, `V3Card`, `V3Table`, `V3Tag`, `V3Progress`, `V3Breadcrumb`, `V3List`

### Golden Ratio Color System

Complete redesign of the color palette using mathematically harmonious color relationships based on the golden ratio (φ ≈ 1.618).

#### New Color Primitives

- **Blue** (`blue.50` - `blue.900`): Primary brand color palette
- **Rose** (`rose.50` - `rose.900`): Danger/error states (replaces `red`)
- **Green** (`green.50` - `green.900`): Success states
- **Violet** (`violet.50` - `violet.900`): Secondary/accent color (replaces `purple`)
- **Gold** (`gold.50` - `gold.900`): Warning states (replaces `yellow`)
- **Gray** (`gray.0` - `gray.1500`): Extended 16-shade slate-based gray scale with cool blue undertone

#### Semantic Token Updates

All semantic tokens now reference the new primitive palettes:

- `primary.*` → Blue palette (#1751D0 main)
- `secondary.*` → Violet palette (#9117D0 main)
- `danger.*` → Rose palette (#D01721 main)
- `success.*` → Green palette (#1AA612 main)
- `warning.*` → Gold palette (#D0A117 main)

Each semantic category includes `lightest` and `darker` variants:

```tsx
primary.lightest // #E8EEFB
primary.darker   // #04102A
```

#### Gray Scale Changes

- Added `gray.0` (#FDFDFF) for pure background
- All gray values updated with blue undertone
- Default body text changed from `gray.1500` to `gray.1300` (#1E2433)

#### WCAG Accessibility

All semantic color combinations meet WCAG 2.1 AA standards (4.5:1 minimum contrast).

#### Color Breaking Changes

- Gray palette values have changed significantly (now slate-based with blue undertone)
- `primary.light` now maps to `blue.200` (#7DA0E8) instead of `blue.300`
- `primary.main` now maps to `blue.500` (#1751D0) instead of `blue.900`
- Default body text color changed to `gray.1300` (#1E2433)
- Button hover states updated to use new palette shades

#### Legacy Aliases (Deprecated)

For backwards compatibility:

- `purple.*` → maps to `violet.*`
- `red.*` → maps to `rose.*`
- `yellow.*` → maps to `gold.*`

### Component Enhancements

- **Button/IconButton**: New soft variant, two-dimensional variant system, updated hover states
- **Tag**: Full variant system replacing Chip component
- **Badge**: Enhanced with new color palette
- **Banner**: Updated styles for new color system
- **Typography**: All components updated with new color tokens
- **Breadcrumb**: v3 composition pattern support
- **PasswordInput**: New comprehensive stories

## Migration Guide

### Dependency Updates

```bash
# Update package.json
npm install @chakra-ui/react@^3.3.0

# Remove old peer dependencies (no longer needed)
npm uninstall @emotion/styled framer-motion
```

### Replacing Removed Components

```tsx
// Alert: Use Chakra's native Alert
import { Alert } from '@chakra-ui/react';

// Chip: Use Tag component
import { Tag } from '@mindlogic-ai/logician-ui';
<Tag colorPalette="primary" variant="solid">Chip content</Tag>

// DataField: Use Field component
import { V3Field } from '@mindlogic-ai/logician-ui';

// GuideCue: Use Tooltip
import { Tooltip } from '@mindlogic-ai/logician-ui';
```

### Component API Updates

```tsx
// Button/IconButton: colorScheme → colorPalette
<Button colorPalette="primary" variant="solid">Submit</Button>
<IconButton colorPalette="danger" variant="outline" aria-label="Delete" />

// Tag: New enhanced API
<Tag colorPalette="success" variant="soft">Active</Tag>

// Checkbox/Switch: children prop removed
// Before: <Checkbox>Accept terms</Checkbox>
// After: Use Chakra v3 primitives for labels
import { V3Checkbox } from '@mindlogic-ai/logician-ui';
<V3Checkbox.Root>
  <V3Checkbox.HiddenInput />
  <V3Checkbox.Control>
    <V3Checkbox.Indicator />
  </V3Checkbox.Control>
  <V3Checkbox.Label>Accept terms</V3Checkbox.Label>
</V3Checkbox.Root>

// Slider: New composition pattern
<Slider defaultValue={[50]}>
  <SliderControl>
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <SliderThumbs />
  </SliderControl>
</Slider>
```

### Color Token Updates

```tsx
// Update semantic token references
color: 'primary.main'      // #1751D0 (was different in v2)
color: 'danger.main'       // #D01721 (rose-based)
color: 'gray.1300'         // #1E2433 (default text)
bg: 'gray.0'              // #FDFDFF (pure background)
```

## Documentation

- Component migration patterns: See updated Storybook stories
- Color system: `src/theme/Palette.stories.tsx`
- Theme documentation: `src/theme/claude.md`
- Chakra v3 primitives: `src/primitives.ts`
