# Changelog

## 3.0.0-alpha.22

### Patch Changes

- 0641e41: feat(Checkbox): add inputRef prop to forward ref to the hidden input element
- c4fb34e: fix(Checkbox): move disabled fill styling to CheckboxControl for correct visual targeting

## 3.0.0-alpha.21

### Minor Changes

- b180dcb: feat(Avatar): add Chakra v3 namespace pattern subcomponent exports

  Avatar now exposes subcomponents as namespace properties following the Chakra UI v3 pattern:
  - `Avatar.Root`
  - `Avatar.RootProvider`
  - `Avatar.Fallback`
  - `Avatar.Image`
  - `Avatar.Icon`
  - `Avatar.Group`
  - `Avatar.Context`

  fix(Popover): match arrow tip border color to content border color

  `Popover.Content` now renders with an explicit `1px gray.200` border and sets a `--popover-border-color` CSS variable. `Popover.ArrowTip` reads that variable so the arrow border stays in sync with the content border.

### Patch Changes

- daebe15: fix(Card, Chip, Button, Checkbox): style consistency and runtime error fixes
  - Card: move `transition` into `css` prop to prevent Chakra v3 runtime error when `clickable` is combined with `_hover`; deep-merge `_hover` so user-passed hover styles don't clobber clickable hover styles
  - Chip: align neutral `solid`/`soft`/`outline` border colors with Tag (add missing `borderColor` on solid/soft, fix outline from `gray.700` → `gray.500`)
  - Button: add `transform: scale(0.97)` to all `_active` states; fix primary/secondary soft active color (`*.light` → `*.lighter` to match hover)
  - Checkbox: add `bgColor: gray.300` to `_disabled` state on root

## 3.0.0-alpha.20

### Patch Changes

- a4ce2dc: Fix release workflow alternating alpha bump failure

  Remove `changeset pre exit` step from release workflow — it was committing `pre.json` with `mode: "exit"` back to dev, causing the next run's `pre enter alpha` to no-op and `changeset version` to exit pre-release instead of bumping alpha. Also resets `pre.json` to `mode: "pre"`.

## 3.0.0-alpha.19

### Major Changes

- 3a2a951: **Breaking: Menu refactored to compound component pattern**

  `Menu` is now the root element (wraps `ChakraMenu.Root`) with a `baseFontSize` prop (default `'14px'`). Menu content is automatically wrapped in `ScaledContext`. `MenuButton` is removed — use `Menu.Trigger asChild` instead.

  **Migration**

  ```tsx
  // Before
  <Menu.Root>
    <MenuButton as={Button}>Open</MenuButton>
    <MenuList><MenuItem value="x">Item</MenuItem></MenuList>
  </Menu.Root>

  // After
  <Menu>
    <Menu.Trigger asChild><Button>Open</Button></Menu.Trigger>
    <Menu.List><Menu.Item value="x">Item</Menu.Item></Menu.List>
  </Menu>
  ```

  Exposes: `Menu.Trigger`, `Menu.TriggerItem`, `Menu.ContextTrigger`, `Menu.List`, `Menu.Item`, `Menu.ItemGroup`, `Menu.ItemGroupLabel`, `Menu.ItemCommand`, `Menu.CheckboxItem`, `Menu.RadioItem`, `Menu.RadioItemGroup`, `Menu.Separator`, `Menu.Arrow`, `Menu.ArrowTip`

## 3.0.0-alpha.18

### Minor Changes

- 1656cbc: Add `Popover` compound component

  Wraps Chakra's Popover with a `baseFontSize` prop (default `'14px'`) passed via context to `Popover.Content`, which wraps its children in `ScaledContext`. `Positioner` is hidden inside `Popover.Content`.

  Exposes: `Popover.Anchor`, `Popover.Trigger`, `Popover.Content`, `Popover.Arrow`, `Popover.ArrowTip`, `Popover.CloseTrigger`, `Popover.Header`, `Popover.Body`, `Popover.Title`, `Popover.Description`, `Popover.Footer`.

## 3.0.0-alpha.17

### Minor Changes

- 9c8ef73: Add `ScaledContext` component

  Wraps a `Box` with a given `fontSize` and re-maps spacing/sizes tokens from `rem` to `em`, so all spacing inside scales proportionally with the local font size. Useful for embedding UI at different densities without duplicating theme tokens.

## 3.0.0-alpha.16

### Patch Changes

- 515d7ea: fix: improve locale type safety and fix date format issues
  - Add `SupportedLocale` union type derived from LOCALE_MAP keys, applied to LogicianProvider, useLocale, and all date helper functions
  - Export `useLocale`, `LocaleContext`, and `LocaleContextValue` from package entry point
  - Fix 2-digit year format (yy → yyyy) in getDefaultFullDateFormat
  - Fix RangeDatePicker showing raw format string as end-date placeholder

## 3.0.0-alpha.15

### Major Changes

- 61646cf: **Breaking: Checkbox, Switch, and Radio are now compound components**

  `Checkbox`, `Switch`, and `Radio` no longer render their internal controls automatically. You must now compose them explicitly using sub-components.

  **Checkbox**
  - `Checkbox` is now the root element (replaces `Checkbox.Root`)
  - `Checkbox.Control` renders the styled checkbox box
  - `Checkbox.Label` renders the label text

  **Switch**
  - `Switch` is now the root element
  - `Switch.Control` renders the styled toggle (includes thumb)
  - `Switch.Label` renders the label text

  **Radio**
  - `Radio` is now the root element (replaces the internal `RadioGroup.Item` wrapper)
  - `Radio.Indicator` renders the styled radio circle
  - `Radio.Text` renders the label text
  - `rootRef` and `inputProps` props removed

## 3.0.0-alpha.14

### Patch Changes

- 2eec3f8: Fix vertical Tabs missing selected indicator and bottom border bleed

  Vertical selected tab now shows a right-side 2px primary indicator (matching horizontal's bottom indicator). TabList no longer renders a bottom border in vertical orientation.

## 3.0.0-alpha.13

### Minor Changes

- de10bd4: feat: add consistent keyboard focus ring across interactive components

  Introduces a shared `focusRing` utility (`src/utils/focusRing.ts`) and applies the standard double-ring focus style (white inner + primary blue outer) to all keyboard-navigable components: Button, IconButton, Checkbox, Radio, Switch, SliderThumb, AccordionButton, MenuItem, BreadcrumbLink, and Chip.

  Focus ring now only shows on keyboard navigation (`_focusVisible`) rather than on mouse click (`_focus`), following the CSS `:focus-visible` standard used by GitHub, Radix, and Material Design.

### Patch Changes

- 7f3d81d: fix: load Pretendard Variable and Inter fonts from CDN in LogicianProvider

  Previously no fonts were loaded by the library, causing browsers to fall back to system fonts (Arial/Helvetica) which rendered English text noticeably thicker than intended. LogicianProvider now automatically injects stylesheet links for Pretendard Variable (jsDelivr, dynamic subset) and Inter (Bunny Fonts) on mount. A `loadFonts` prop (default `true`) allows consumers to opt out if they manage fonts themselves. Also adds `-webkit-font-smoothing: antialiased` to global styles for consistent rendering across OS.

## 3.0.0-alpha.12

### Patch Changes

- 1595e85: fix: override Chakra spacing scale with em units

  Numeric spacing tokens (p: 4, gap: 2, etc.) now resolve to em values
  instead of rem, so spacing cascades from the nearest ancestor font-size
  alongside text — enabling consistent contextual scaling.

- 5edf7a7: fix: switch theme textStyles font sizes from rem to em for contextual scaling

  em units inherit from the nearest ancestor font-size, enabling components inside
  containers like Popover to scale from a local base (e.g. 14px) rather than
  always deferring to the html root.

- e7627c9: fix: replace compounding em lineHeight on 6xl textStyle with unitless ratio

  `lineHeight: '5.75em'` resolved against the element's own font-size (60px),
  producing 345px instead of the intended 92px. Replaced with unitless `1.533`
  (92 ÷ 60) to preserve the original rendered output.

## 3.0.0-alpha.11

### Minor Changes

- a1d012f: feat: FormLabel RequiredIndicator, Select styles fix, Badge sizes, FileItem tooltips/download loading, Input bg, MonthPicker showClearButton rename
  - FormLabel: show Field.RequiredIndicator when FormControl has required prop (via Chakra v3 Field context)
  - Select: pass Logician-merged styles as base to consumer style callbacks (fixes Pagination border color)
  - Select: fix option flicker on mouse leave by removing isFocused from background condition
  - Badge: add size prop (sm/md/lg) with textStyle presets (subtext/subtitle)
  - FileItem: add tooltips on download/delete icons, add isDownloading prop with spinner
  - Input: set default background to white
  - MonthPicker: rename showResetButton to showClearButton

## 3.0.0-alpha.10

### Patch Changes

- cc60a0d: fix: remove borders from soft button variants; improve Toast close button contrast and description styling

## 3.0.0-alpha.9

### Patch Changes

- aa5e009: Various component fixes
  - SegmentedControl: fix sizing, layout shift on selection, and font size scaling with size prop
  - FileInput: use Text instead of Subtext for upload label
  - MenuItem: apply danger.lightest hover background for danger variant
  - ModalCloseButton: simplify using IconButton

## 3.0.0-alpha.8

### Minor Changes

- 7e15535: Add `Collapsible` compound component (`Root`, `Trigger`, `Content`, `Indicator`) wrapping Chakra UI v3 Collapsible with Accordion-style defaults (bordered rounded container, bold trigger with chevron, padded content). Also fixes Avatar background, IconButton color precedence, Tooltip cloneElement removal, ModalFooter unused import, rollup CSS SSR injection, and removes unused `react-textarea-autosize` dependency.

### Patch Changes

- 69c85f5: Fix TagCloseButton missing cursor pointer on hover

  Fix Tag size prop type error by using TagRootProps instead of BoxProps

## 3.0.0-alpha.7

### Patch Changes

- d971f4c: feat(Modal): bake in Dialog.Backdrop overlay by default

  Modal now renders the backdrop overlay internally, matching the Chakra v2 behavior where the overlay was included automatically. Users no longer need to render `<ModalOverlay />` manually inside `<Modal>`.

## 3.0.0-alpha.6

### Patch Changes

- 7ca7b1d: Fix RadialProgress useToken hooks rule violation
  - Resolve "Rendered fewer hooks" error by calling useToken at component top level instead of inside map callbacks

## 3.0.0-alpha.5

### Patch Changes

- 070588f: Fix Icon color to use currentColor, add default color/colorPalette to IconButton, update global fontWeight to 500

## 3.0.0-alpha.4

### Patch Changes

- 5361a87: Set default icon color to `gray.600`

## 3.0.0-alpha.3

### Patch Changes

- 9a9c8e7: fix: PR #55 review feedback - Tabs v3 migration, createIcon optimization, SegmentedControl theme tokens, LogicianProvider Toaster removal

## 3.0.0-alpha.2

### Minor Changes

- e47db64: Color palette expansion, responsive typography, and component improvements

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

## 3.0.0-alpha.1

### Minor Changes

- 63fa11b: Add FormIntegration component and improve Chakra UI v3 compatibility
  - Add new FormIntegration component with comprehensive documentation
  - Enhance LogicianProvider with Chakra UI v3 patterns and better theme integration
  - Update form components (Select, Input, Textarea) for v3 compatibility
  - Add comprehensive Storybook stories for Avatar, IconButton, and InfoSprinkle
  - Refine theme configuration and global styles for better consistency
  - Improve component exports in main index file

## 3.0.0-alpha.0

### Major Changes

- a827f0f: feat!: Chakra UI v3 migration with Golden Ratio Color System

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

  ### Removed Deprecated v2 Props

  All deprecated Chakra UI v2 props have been removed. TypeScript will now error for any usage of old prop names, forcing migration to v3 syntax:
  - **Button**: Removed `colorScheme`, `isLoading`, `isDisabled`, `leftIcon`, `rightIcon`
  - **IconButton**: Removed `colorScheme`, `isLoading`, `isDisabled`, `icon`
  - **Input**: Removed `isDisabled`, `isInvalid`, `isReadOnly`
  - **Checkbox**: Removed `isChecked`, `isDisabled`, `isInvalid`
  - **Switch**: Removed `isChecked`, `isDisabled`
  - **Textarea**: Removed `isDisabled`, `isInvalid`, `isReadOnly`
  - **Tooltip**: Removed `label`, `hasArrow`, `isDisabled`, `isOpen`
  - **Modal**: Removed `isOpen`, `onClose`
  - **Toast**: Removed `position`, `isClosable`
  - **Accordion**: Removed `allowToggle`, `allowMultiple`
  - **Tag**: Removed `TagColorScheme` type alias
  - **Slider**: Removed `onChange`, `focusThumbOnChange`; changed `value`/`defaultValue` types to `number[]` only

  ## New Features

  ### Chakra UI v3 Primitives

  Added `primitives.ts` for advanced composition patterns:

  ```tsx
  import {
    V3Checkbox,
    V3RadioGroup,
    V3Switch,
    V3Slider,
  } from '@mindlogic-ai/logician-ui';

  // Use raw Chakra v3 components for maximum flexibility
  <V3Checkbox.Root>
    <V3Checkbox.HiddenInput />
    <V3Checkbox.Control>
      <V3Checkbox.Indicator />
    </V3Checkbox.Control>
    <V3Checkbox.Label>Label</V3Checkbox.Label>
  </V3Checkbox.Root>;
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
  primary.lightest; // #E8EEFB
  primary.darker; // #04102A
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
  <Tag colorPalette="primary" variant="solid">
    Chip content
  </Tag>;

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
  color: 'primary.main'; // #1751D0 (was different in v2)
  color: 'danger.main'; // #D01721 (rose-based)
  color: 'gray.1300'; // #1E2433 (default text)
  bg: 'gray.0'; // #FDFDFF (pure background)
  ```

  ## Documentation
  - Component migration patterns: See updated Storybook stories
  - Color system: `src/theme/Palette.stories.tsx`
  - Theme documentation: `src/theme/claude.md`
  - Chakra v3 primitives: `src/primitives.ts`

## 2.0.0

### Major Changes

- 052ff1a: Clean up dependencies and remove unused components
  - Removed `EditableImage` and `ToggleableInput` components (Formik dependencies)
  - Removed `SelectDate` component (external form dependencies)
  - Cleaned up package.json dependencies:
    - Removed unused `react-hook-form`
    - Removed unused `formik`
    - Fixed `lottie-react` → `react-lottie-player`
    - Removed unused `react-window`
  - All remaining dependencies are actively used by components
  - Improved TypeScript configuration for better compilation

- 60c5169: Remove Link component(src/components/Link), Change InfoSprinkle props
- 876a8cc: Remove color mode functionality and simplify to light mode only
  - Removed `store/colorMode.ts` and all color mode switching functionality
  - Simplified Icon, Card, and TabList components to use light mode styles only
  - Removed ErrorBoundary component (had external dependencies)
  - Recovered MonthRangePicker component and added back `date-fns` dependency
  - Created `useLocale` hook stub for MonthRangePicker support
  - Updated tsconfig.json to remove store path references and exclude problematic components
  - Design system now only supports light mode for consistency and simplicity

### Minor Changes

- 75c0f2f: Add Storybook 8.6 for interactive component development and documentation
  - Added latest Storybook 8.6 with Vite support for fast development
  - Configured Storybook with Chakra UI provider integration
  - Added development server and build scripts
  - Created proper Storybook configuration files
  - Updated project structure documentation
  - Storybook provides interactive component playground at localhost:6006

- ffe2214: Add comprehensive SVG support and fix translation paths
  - Added vite-plugin-svgr and svgo for proper SVG handling in development and Storybook
  - Created TypeScript declarations for SVG imports
  - Updated Vite and Storybook configurations to transform SVG imports into React components
  - Added optimize-icons script for SVG optimization (reduced icon sizes by 15-78%)
  - Fixed "Failed to execute 'createElement'" error in Storybook when rendering custom SVG icons
  - Moved translations to src/translations/ for better organization
  - Updated get-lang-pack.sh script to download to correct location
  - Created formatTextForMarkdown utility for translation formatting
  - Added @/translations/\* path alias to tsconfig.json

- ea6bd90: ErrorFallback 컴포넌트 추가
- 4e6661f: icon 선언 사용 방법 수정 style props 변경 <Icon icon="IoSearch" /> -> <IoSearch /> 로 변경
- 485d869: Created the LogicianProvider component
- 339c162: DatePicker(RangeDatePicker, SingleDatePicker) UI 개선
- 96e6a29: useTheme() 사용시 제네릭 타입을 전달하지 않아도 타입 추론이 가능하도록 개선
- cb6d2c5: useToast 메소드(update,close,...) 및 warning status 추가
- ea99714: useToast에서 토스트 생성시 toastId를 반환하도록 return toastId 추가
- 9f2110d: Entry file에 export되지 않은 컴포넌트들에 대해 export 추가
- 436f57b: MDXEditor 개선
  - @mdxeditor/editor 패키지 업데이트 ^1.0.0 -> ^3.45.1
  - <Box />가 이중으로 래핑되어 있어 containerProps가 제대로 적용되지 않는 문제 해결 (nesting 단계가 줄어들어 diff가 많아 보일 수 있음)
  - forwardRef를 적용하여 디자인 시스템을 사용하는 쪽에서도 에디터의 ref에 접근할 수 있도록 추가
  - 마크다운 구문 파싱 중 에러가 발생했을 때 Source Mode로 전환할 수 있도록 추가.
    - 외부에서도 onError를 prop으로 넘겨줄 수 있어서 Toast를 띄우는 등 커스텀 가능

- 8cf348b: Remove AvatarInput component
  - Removed AvatarInput component directory from src/components/
  - Removed AvatarInput export from main index.ts
  - Simplifies component API surface area

- 104b9bd: Remove ColorPicker component
  - Removed ColorPicker component directory from src/components/
  - Removed ColorPicker export from main index.ts
  - Simplifies component API by removing color selection functionality
  - ColorPicker was dependent on react-colorful which is no longer needed

- 2e9c753: Reorganize project structure with src directory for better organization
  - Moved all source code (components, utils, hooks, theme, index.ts) into src/ directory
  - Updated package.json main and types fields to point to src/index.ts
  - Updated tsconfig.json paths and includes for new structure
  - Updated Storybook configuration to find stories in src/components
  - Updated Vite configuration aliases to point to src directory
  - Created root index.ts that re-exports from src for backwards compatibility
  - Updated documentation examples to reflect new import paths
  - Follows modern project organization standards

- e365f4f: errorLogger 제거
- d5ef0ee: ErrorFallback의 errorId, timestamp prop을 optional로 변경

### Patch Changes

- 627427d: MDXEditor의 자식 팝업을 클릭했을때 에디터에 autofocus되는 이슈를 해결했습니다.
- d51e509: Migrate build system from tsup to Rollup with preserveModules for improved tree-shaking support
- 84c2a20: Typography 내 Link를 export 하지 않는 버그 수정
- c32bd4d: Informe에서 사용하는 icon과 component를 수정하였습니다
- 1a0ea5d: Switch enabled 상태에서 primary.main 색상 적용
- 1fe38fb: icon system을 도입하여 기존의 아이콘 관리 방식을 개선합니다.
- 6e58b66: 기존에는 IconMap에 없는 키인 경우 사용하지 못했는데 JSX 형식을 받아서 직접 import 하는 방식을 추가하였습니다
- 2ade984: Add factchat task mode icon
- 0fdd011: Remove react-icons dependency.
  Icons are now included directly in the logician-ui package.
- 104b9bd: Replace @chakra-ui/icons usage with custom Icon component equivalents
  - Replaced ChevronDownIcon with IoChevronDownOutline in Menu stories
  - Replaced PhoneIcon with IoCall in Input stories
  - Replaced SearchIcon with IoSearch in Input stories
  - Added IoCall icon to REACT_ICONS_MAP for phone functionality
  - Removed dependency on @chakra-ui/icons package
  - All icon functionality now uses the unified Icon component system

- b52865f: fix: ErrorFallback bgGradient 제거
- cf07d04: createIcon 을 export를 다시 해주었습니다
- ce536e6: Add src/index.ts export lint rule, Add ExpandableText export in src/index.ts
- d05891f: MDXEditor 마크다운 테이블 클릭시 focus가 되는 현상 해결
- 6506547: Fix SVG issue with tsup
- 768f361: 2ade984 변경 사항이 alpha.14에 반영되어있지 않아 재배포

## 2.0.0-alpha.24

### Patch Changes

- d51e509: Migrate build system from tsup to Rollup with preserveModules for improved tree-shaking support

## 2.0.0-alpha.23

### Minor Changes

- 339c162: DatePicker(RangeDatePicker, SingleDatePicker) UI 개선

## 2.0.0-alpha.22

### Minor Changes

- cb6d2c5: useToast 메소드(update,close,...) 및 warning status 추가

## 2.0.0-alpha.21

### Minor Changes

- ea99714: useToast에서 토스트 생성시 toastId를 반환하도록 return toastId 추가

## 2.0.0-alpha.20

### Patch Changes

- 1a0ea5d: Switch enabled 상태에서 primary.main 색상 적용

## 2.0.0-alpha.19

### Patch Changes

- b52865f: fix: ErrorFallback bgGradient 제거

## 2.0.0-alpha.18

### Patch Changes

- 627427d: MDXEditor의 자식 팝업을 클릭했을때 에디터에 autofocus되는 이슈를 해결했습니다.

## 2.0.0-alpha.17

### Patch Changes

- cf07d04: createIcon 을 export를 다시 해주었습니다

## 2.0.0-alpha.16

### Minor Changes

- 4e6661f: icon 선언 사용 방법 수정 style props 변경 <Icon icon="IoSearch" /> -> <IoSearch /> 로 변경

### Patch Changes

- 1fe38fb: icon system을 도입하여 기존의 아이콘 관리 방식을 개선합니다.
- 6e58b66: 기존에는 IconMap에 없는 키인 경우 사용하지 못했는데 JSX 형식을 받아서 직접 import 하는 방식을 추가하였습니다

## 2.0.0-alpha.15

### Patch Changes

- 768f361: 2ade984 변경 사항이 alpha.14에 반영되어있지 않아 재배포

## 2.0.0-alpha.14

### Patch Changes

- 2ade984: Add factchat task mode icon
- ce536e6: Add src/index.ts export lint rule, Add ExpandableText export in src/index.ts

## 2.0.0-alpha.13

### Patch Changes

- 84c2a20: Typography 내 Link를 export 하지 않는 버그 수정

## 2.0.0-alpha.12

### Major Changes

- 60c5169: Remove Link component(src/components/Link), Change InfoSprinkle props

## 2.0.0-alpha.11

### Minor Changes

- d5ef0ee: ErrorFallback의 errorId, timestamp prop을 optional로 변경

## 2.0.0-alpha.10

### Minor Changes

- e365f4f: errorLogger 제거

## 2.0.0-alpha.9

### Minor Changes

- 9f2110d: Entry file에 export되지 않은 컴포넌트들에 대해 export 추가

## 2.0.0-alpha.8

### Minor Changes

- ea6bd90: ErrorFallback 컴포넌트 추가

## 2.0.0-alpha.7

### Patch Changes

- d05891f: MDXEditor 마크다운 테이블 클릭시 focus가 되는 현상 해결

## 2.0.0-alpha.6

### Minor Changes

- 436f57b: MDXEditor 개선
  - @mdxeditor/editor 패키지 업데이트 ^1.0.0 -> ^3.45.1
  - <Box />가 이중으로 래핑되어 있어 containerProps가 제대로 적용되지 않는 문제 해결 (nesting 단계가 줄어들어 diff가 많아 보일 수 있음)
  - forwardRef를 적용하여 디자인 시스템을 사용하는 쪽에서도 에디터의 ref에 접근할 수 있도록 추가
  - 마크다운 구문 파싱 중 에러가 발생했을 때 Source Mode로 전환할 수 있도록 추가.
    - 외부에서도 onError를 prop으로 넘겨줄 수 있어서 Toast를 띄우는 등 커스텀 가능

## 2.0.0-alpha.5

### Minor Changes

- 96e6a29: useTheme() 사용시 제네릭 타입을 전달하지 않아도 타입 추론이 가능하도록 개선

## 2.0.0-alpha.4

### Patch Changes

- 0fdd011: Remove react-icons dependency.
  Icons are now included directly in the logician-ui package.

## 2.0.0-alpha.3

### Minor Changes

- 485d869: Created the LogicianProvider component

## 2.0.0-alpha.2

### Patch Changes

- c32bd4d: Informe에서 사용하는 icon과 component를 수정하였습니다

## 2.0.0-alpha.1

### Patch Changes

- 6506547: Fix SVG issue with tsup

## 2.0.0-alpha.0

### Major Changes

- 052ff1a: Clean up dependencies and remove unused components
  - Removed `EditableImage` and `ToggleableInput` components (Formik dependencies)
  - Removed `SelectDate` component (external form dependencies)
  - Cleaned up package.json dependencies:
    - Removed unused `react-hook-form`
    - Removed unused `formik`
    - Fixed `lottie-react` → `react-lottie-player`
    - Removed unused `react-window`
  - All remaining dependencies are actively used by components
  - Improved TypeScript configuration for better compilation

- 876a8cc: Remove color mode functionality and simplify to light mode only
  - Removed `store/colorMode.ts` and all color mode switching functionality
  - Simplified Icon, Card, and TabList components to use light mode styles only
  - Removed ErrorBoundary component (had external dependencies)
  - Recovered MonthRangePicker component and added back `date-fns` dependency
  - Created `useLocale` hook stub for MonthRangePicker support
  - Updated tsconfig.json to remove store path references and exclude problematic components
  - Design system now only supports light mode for consistency and simplicity

### Minor Changes

- 75c0f2f: Add Storybook 8.6 for interactive component development and documentation
  - Added latest Storybook 8.6 with Vite support for fast development
  - Configured Storybook with Chakra UI provider integration
  - Added development server and build scripts
  - Created proper Storybook configuration files
  - Updated project structure documentation
  - Storybook provides interactive component playground at localhost:6006

- ffe2214: Add comprehensive SVG support and fix translation paths
  - Added vite-plugin-svgr and svgo for proper SVG handling in development and Storybook
  - Created TypeScript declarations for SVG imports
  - Updated Vite and Storybook configurations to transform SVG imports into React components
  - Added optimize-icons script for SVG optimization (reduced icon sizes by 15-78%)
  - Fixed "Failed to execute 'createElement'" error in Storybook when rendering custom SVG icons
  - Moved translations to src/translations/ for better organization
  - Updated get-lang-pack.sh script to download to correct location
  - Created formatTextForMarkdown utility for translation formatting
  - Added @/translations/\* path alias to tsconfig.json

- 8cf348b: Remove AvatarInput component
  - Removed AvatarInput component directory from src/components/
  - Removed AvatarInput export from main index.ts
  - Simplifies component API surface area

- 104b9bd: Remove ColorPicker component
  - Removed ColorPicker component directory from src/components/
  - Removed ColorPicker export from main index.ts
  - Simplifies component API by removing color selection functionality
  - ColorPicker was dependent on react-colorful which is no longer needed

- 2e9c753: Reorganize project structure with src directory for better organization
  - Moved all source code (components, utils, hooks, theme, index.ts) into src/ directory
  - Updated package.json main and types fields to point to src/index.ts
  - Updated tsconfig.json paths and includes for new structure
  - Updated Storybook configuration to find stories in src/components
  - Updated Vite configuration aliases to point to src directory
  - Created root index.ts that re-exports from src for backwards compatibility
  - Updated documentation examples to reflect new import paths
  - Follows modern project organization standards

### Patch Changes

- 104b9bd: Replace @chakra-ui/icons usage with custom Icon component equivalents
  - Replaced ChevronDownIcon with IoChevronDownOutline in Menu stories
  - Replaced PhoneIcon with IoCall in Input stories
  - Replaced SearchIcon with IoSearch in Input stories
  - Added IoCall icon to REACT_ICONS_MAP for phone functionality
  - Removed dependency on @chakra-ui/icons package
  - All icon functionality now uses the unified Icon component system

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added

- Initial release of Logician Design System
- 70+ React components built on Chakra UI
- Complete TypeScript support
- Comprehensive component library including:
  - Core components (Button, Card, Badge, Tag)
  - Form components (Input, Select, Checkbox, Radio, etc.)
  - Navigation components (Breadcrumb, Pagination, Menu, Tabs)
  - Feedback components (Alert, Toast, Modal, Tooltip)
  - Data display components (Table, Avatar, Typography, Code)
  - Media components (Icon, Logo)
- Storybook documentation for all components
- Built-in utilities and state management
- Responsive design system
- Accessibility features
- Tree-shakable exports

### Dependencies

- React 18+ support
- Chakra UI 2.8+ integration
- React Icons integration
- TypeScript support
- Emotion styling system
