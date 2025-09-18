# Changelog

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
