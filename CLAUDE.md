# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Logician UI is a comprehensive React design system built on Chakra UI with 70+ components. It's published as `@mindlogic-ai/logician-ui` on npm and provides TypeScript-first reusable UI components for modern web applications.

## Development Commands

### Core Development
- `yarn install` - Install dependencies
- `yarn build` - Build the library (outputs to `dist/`)
- `yarn build:watch` - Build in watch mode
- `yarn type-check` - Run TypeScript type checking (no output files)
- `yarn lint` - Lint source code
- `yarn lint:fix` - Lint and auto-fix issues

### Storybook Development
- `yarn storybook` - Start Storybook dev server at http://localhost:6006
- `yarn build-storybook` - Build Storybook for deployment

### Release Management
- `yarn changeset` - Add a changeset for your changes
- `yarn changeset:version` - Update versions and CHANGELOG
- `yarn changeset:publish` - Publish to npm
- `yarn changeset:status` - Check changeset status

### Utilities
- `yarn optimize-icons` - Optimize SVG icons using the optimize-icons.js script
- `yarn update-intl` - Update internationalization using get-lang-pack.sh script

## Architecture

### Directory Structure
- `src/components/` - All UI components, each in its own directory
- `src/utils/` - Shared utility functions
- `src/hooks/` - Custom React hooks
- `src/theme/` - Chakra UI theme customizations
- `src/translations/` - Internationalization files
- `src/types/` - Shared TypeScript type definitions
- `src/index.ts` - Main export file for all components

### Component Structure Pattern
Each component follows this structure:
```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.types.ts     # TypeScript types
├── ComponentName.styles.ts    # Styling (if needed)
├── ComponentName.stories.tsx  # Storybook stories
└── index.tsx                  # Exports
```

### Path Aliases
The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/components/*` → `./src/components/*`
- `@/utils/*` → `./src/utils/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/theme/*` → `./src/theme/*`
- `@/translations/*` → `./src/translations/*`

## Build Configuration

### TypeScript
- Uses `tsup` for fast bundling with TypeScript support
- Outputs both ESM and CommonJS formats
- Includes declaration files (`.d.ts`) and source maps
- Configured with React JSX transform and tree-shaking

### Key External Dependencies
Heavy dependencies are externalized (not bundled):
- React ecosystem (react, react-dom)
- Chakra UI ecosystem (@chakra-ui/react, @emotion/*, framer-motion)
- Editor libraries (@mdxeditor/editor, react-syntax-highlighter)
- Charts (recharts)
- Utilities (lodash, date-fns, katex)

### ESLint Configuration
- Uses TypeScript ESLint with React rules
- Prettier integration for formatting
- Simple import sorting enforced
- Unused imports automatically removed
- Storybook-specific rules included

## Component Categories

### Core Components
Button, Card, Badge, Tag, Container, Modal, Tooltip, Alert

### Form Components
Input, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker, PinInput

### Navigation
Breadcrumb, Pagination, Menu, Tabs, SegmentedControl

### Data Display
Table, Avatar, Typography (H1-H5, Text, Subtext), Code, Markdown

### Layout & Media
Icon, Accordion, Carousel, Masonry

### Feedback & Loading
Toast, CrossPageToasts, Spinner, ProgressBar, RadialProgress

## Development Guidelines

### Adding New Components
1. Create component directory following the established pattern
2. Implement component with TypeScript types
3. Create Storybook stories for documentation
4. Add component export to `src/index.ts`
5. Add changeset using `yarn changeset`
6. Ensure responsive design and accessibility compliance

### Testing Components
- Use Storybook for visual testing and documentation
- Test responsive behavior across screen sizes
- Verify keyboard navigation and screen reader compatibility
- Run type checking and linting before committing

### Internationalization
- Korean language support available via get-lang-pack.sh script
- Translation files stored in `src/translations/`

### Pull Request Requirements
- Add Storybook stories for new components
- Update TypeScript type definitions
- Verify responsive design
- Add changeset for version management (if needed)
- Export new components in src/index.ts
- Include screenshots of visual changes
- Test keyboard navigation and accessibility