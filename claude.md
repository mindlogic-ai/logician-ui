# Logician UI Design System

A comprehensive React design system built on Chakra UI, providing 70+ reusable UI components.

## Project Overview

- **Type**: React UI component library (published to npm as `@mindlogic-ai/logician-ui`)
- **Base Framework**: Chakra UI v2.8+
- **Language**: TypeScript with JSX
- **Build Tool**: tsup (esbuild-based)
- **Documentation**: Storybook 8.5
- **Version Management**: Changesets
- **Package Manager**: Yarn

## Architecture

### Component Structure

Each component follows a consistent pattern:
```
ComponentName/
├── ComponentName.tsx          # Main component implementation
├── ComponentName.types.ts     # TypeScript type definitions
├── ComponentName.styles.ts    # Style variants and configurations (optional)
├── ComponentName.stories.tsx  # Storybook documentation
└── index.tsx                  # Public exports
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:
- `@/components/*` → `src/components/*`
- `@/utils/*` → `src/utils/*`
- `@/hooks/*` → `src/hooks/*`
- `@/theme/*` → `src/theme/*`
- `@/translations/*` → `src/translations/*`

### Source Structure

```
src/
├── components/      # All UI components (70+)
├── theme/          # Chakra UI theme customization
├── utils/          # Shared utility functions
├── hooks/          # Reusable React hooks
├── translations/   # i18n support
├── types/          # Shared TypeScript types
└── index.ts        # Main export file
```

## Development Workflow

### Common Commands

```bash
# Install dependencies
yarn install

# Start Storybook for component development
yarn storybook

# Build the library
yarn build

# Watch mode for development
yarn build:watch

# Linting
yarn lint              # Check for issues
yarn lint:fix          # Auto-fix issues

# Type checking
yarn type-check

# Icon optimization
yarn optimize-icons

# Update translations
yarn update-intl

# Validate component exports
yarn check-exports
```

### Adding a New Component

1. Create component directory: `src/components/ComponentName/`
2. Create required files:
   - `ComponentName.tsx` - Component implementation using `forwardRef`
   - `ComponentName.types.ts` - Export props interface
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.tsx` - Re-export the component
3. Add styles if needed: `ComponentName.styles.ts`
4. Add export to `src/index.ts` (follow existing categorization)
5. Run `yarn check-exports` to validate
6. Create Storybook story with examples

### Versioning & Releases

This project uses [Changesets](https://github.com/changesets/changesets):

```bash
# After making changes, create a changeset
yarn changeset

# Select change type:
# - major: Breaking changes, component API changes
# - minor: New components, new features (non-breaking)
# - patch: Bug fixes, docs, internal improvements

# Update versions (done before release)
yarn changeset:version

# Check changeset status
yarn changeset:status

# Publish to npm (if configured)
yarn changeset:publish
```

## Build Configuration

### tsup Build

The library is built using tsup with:
- **Formats**: ESM and CJS
- **Type Definitions**: Generated (.d.ts files)
- **Code Splitting**: Enabled for better tree-shaking
- **Banner**: `"use client"` for Next.js compatibility
- **External Dependencies**: React, Chakra UI, and heavy deps are externalized

### Exports

Components are exported from `src/index.ts` with categorization:
- Core Components (Button, Card, Badge, etc.)
- Form Components (Input, Select, Checkbox, etc.)
- Navigation (Tabs, Pagination, Breadcrumb, etc.)
- Feedback (Alert, Toast, Modal, etc.)
- Data Display (Table, Avatar, Typography, etc.)
- File Components
- Icon Components

## Code Standards

### TypeScript

- Target: ES2020
- JSX: react-jsx (automatic runtime)
- Strict mode: Disabled (for flexibility)
- Declaration files: Generated with sourcemaps

### Component Patterns

- Use `forwardRef` for ref forwarding
- Extend Chakra UI components when possible
- Define variant systems for component states
- Use semantic tokens from theme
- Provide sensible defaults
- Support responsive props
- Ensure accessibility (WAI-ARIA)

### Styling

- Leverage Chakra UI's style props
- Use theme tokens for consistency
- Define variants in `.styles.ts` files
- Use `useTheme()` and `useToken()` hooks
- Support focus states with proper outlines

## Key Dependencies

### Peer Dependencies (required by consumers)
- `react` & `react-dom` ^18.0.0
- `@chakra-ui/react` ^2.8.0
- `@emotion/react` & `@emotion/styled` ^11.11.0
- `framer-motion` ^10.0.0
- `next` ^13/14/15 (optional)

### Major Dependencies
- `@mdxeditor/editor` - Rich text editing
- `react-markdown` - Markdown rendering
- `react-select` - Advanced select component
- `recharts` - Charting components
- `date-fns` - Date utilities
- `lodash` - Utility functions

## Git Workflow

- Main development branch: `dev`
- Follow conventional commits
- Create changesets for all changes
- Ensure lint and type-check pass before commits
- Use meaningful commit messages

## Testing

Currently: `echo 'No tests specified'`
(Tests should be added in the future)

## Notes

- Components are tree-shakable
- Supports Server-Side Rendering (SSR)
- Next.js compatible with "use client" directive
- Storybook provides live component playground
- Icon system uses optimized SVGs
- Internationalization support via translations
