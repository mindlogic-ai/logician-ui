# Changelog

## 3.0.0

### Major Changes

- **Golden Ratio Color System**: Complete redesign of the color palette using mathematically harmonious color relationships based on the golden ratio (φ ≈ 1.618).

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

#### New Semantic Token: `darker`

Each semantic category now includes a `darker` variant for high-contrast text:

```tsx
primary.darker   // #04102A
secondary.darker // #1D042A
danger.darker    // #2A0407
success.darker   // #072A04
warning.darker   // #2A2004
```

#### Gray Scale Changes

The gray palette has been completely redesigned with a cool blue undertone (slate-based):

- Added `gray.0` (#FDFDFF) for pure background
- All gray values updated with blue undertone
- Default body text changed from `gray.1500` to `gray.1300` (#1E2433) for better readability

#### WCAG Accessibility

All semantic color combinations meet WCAG 2.1 AA standards (4.5:1 minimum contrast):

| Combination | Ratio | Level |
|-------------|-------|-------|
| `primary.lightest` + `primary.dark` | 7.2:1 | AAA |
| `primary.main` + white | 5.9:1 | AA |
| `danger.lightest` + `danger.dark` | 7.4:1 | AAA |
| `gray.0` + `gray.1300` | 11.2:1 | AAA |

#### Breaking Changes

- Gray palette values have changed significantly (now slate-based with blue undertone)
- `primary.light` now maps to `blue.200` (#7DA0E8) instead of `blue.300`
- `primary.main` now maps to `blue.500` (#1751D0) instead of `blue.900`
- Default body text color changed to `gray.1300` (#1E2433)
- Button hover states updated to use new palette shades

#### Legacy Aliases (Deprecated)

For backwards compatibility, the following aliases are maintained but deprecated:

- `purple.*` → maps to `violet.*`
- `red.*` → maps to `rose.*`
- `yellow.*` → maps to `gold.*`

These will be removed in a future major version.

#### Component Updates

- **Button**: Updated hover states to use `blue.600`, removed hardcoded hex values
- **IconButton**: Updated hover states to use `blue.600` and `rose.600`
- **Chip**: Updated to use semantic tokens (`primary.lightest`, `success.lightest`, etc.) instead of hardcoded values. Highlight variant now uses `violet` instead of `purple`.

#### Documentation

- Comprehensive theme documentation updated in `src/theme/claude.md`
- New Storybook stories for color palette exploration:
  - `SemanticTokens`: Interactive semantic token reference
  - `PrimitiveColors`: Raw color palette visualization
  - `GrayScale`: Full 16-shade slate palette with usage guide
  - `ContrastReference`: WCAG accessibility compliance examples

#### Migration Guide

1. **Update semantic token usage**: If you were using hardcoded hex values, replace with semantic tokens:
   ```tsx
   // Before
   <Box bgColor="#EBF0FB" />

   // After
   <Box bgColor="primary.lightest" />
   ```

2. **Update gray references**: If you're using specific gray shades, test for visual changes as all values have shifted to a cooler tone.

3. **Check custom components**: If you've built custom components using the old palette, update color references to match the new scale.

4. **Test contrast**: If you have custom color combinations, verify they still meet accessibility standards.

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
