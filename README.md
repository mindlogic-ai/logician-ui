# Logician Design System

A comprehensive React design system built on Chakra UI, providing a complete set of reusable UI components for building modern web applications.

## Features

- 🎨 **70+ Components** - Comprehensive set of UI components
- 🎭 **Built on Chakra UI** - Leverages the power and flexibility of Chakra UI
- 📱 **Responsive Design** - All components are mobile-first and responsive
- 🦾 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 📚 **Storybook 8.6** - Interactive component documentation and development
- 🎯 **Accessible** - WAI-ARIA compliant components
- ⚡ **Performance Optimized** - Tree-shakable exports and optimized bundle size

## Installation

### As an NPM Package

Install the design system as an NPM package in your project:

```bash
yarn add logician-ui
# or
npm install logician-ui
```

### Prerequisites

Make sure you have the required peer dependencies installed:

```bash
yarn add react react-dom @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### As a Git Submodule (Legacy)

> **Note**: Submodule usage is legacy. We recommend using the NPM package for better dependency management and easier updates.

If you need to use as a submodule:

```bash
# Add as submodule
git submodule add https://github.com/yourusername/logician-ui.git src/components/design-system

# Initialize and update
git submodule update --init --recursive
```

## Usage

### Basic Setup

Wrap your application with Chakra UI's `ChakraProvider`:

```tsx
import { ChakraProvider } from "@chakra-ui/react";
import { Button, Input, Card } from "logician-ui";

function App() {
  return (
    <ChakraProvider>
      <Card>
        <Input placeholder="Enter your name" />
        <Button variant="primary">Submit</Button>
      </Card>
    </ChakraProvider>
  );
}
```

### Component Categories

#### Core Components

- **Button** - Primary, secondary, tertiary, and danger variants
- **Card** - Container component for grouping content
- **Badge** - Status indicators and labels
- **Tag** - Interactive tags with various styles

#### Form Components

- **Input** - Text input with validation support
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection component
- **Checkbox** - Multi-select checkboxes
- **Radio** - Single-select radio buttons
- **Switch** - Toggle switches
- **Slider** - Range selection component

#### Navigation

- **Breadcrumb** - Navigation breadcrumbs
- **Pagination** - Page navigation component
- **Menu** - Dropdown and context menus
- **Tabs** - Tab navigation component

#### Feedback

- **Alert** - Status messages and notifications
- **Toast** - Toast notifications
- **Modal** - Modal dialogs
- **Tooltip** - Contextual help tooltips

#### Data Display

- **Table** - Data tables with sorting and filtering
- **Avatar** - User profile pictures and initials
- **Typography** - Text components with consistent styling
- **Code** - Code syntax highlighting

#### Media

- **Icon** - Comprehensive icon system
- **Logo** - Brand logo components

## Development

### Setup

```bash
# Install dependencies
yarn install

# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Type checking
yarn type-check

# Build the library
yarn build

# Build in watch mode
yarn build:watch

# Validate component exports
yarn check-exports
```

### Storybook Development

Run Storybook for interactive component development and documentation:

```bash
# Start Storybook development server
yarn storybook

# Build Storybook for deployment
yarn build-storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006) and provides an interactive environment to develop, test, and document your components.

### Versioning & Releases

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Add a changeset for your changes
yarn changeset

# Version packages (updates CHANGELOG and package.json)
yarn changeset:version

# Check changeset status
yarn changeset:status

# Publish to npm (if configured)
yarn changeset:publish
```

### Project Structure

```
├── .storybook/          # Storybook configuration
│   ├── main.ts          # Main configuration
│   └── preview.tsx      # Global decorators and parameters
├── src/                 # Source code
│   ├── components/      # All UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   ├── Button.styles.ts
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.tsx
│   │   └── ...
│   ├── utils/           # Utility functions
│   ├── hooks/           # React hooks
│   ├── theme/           # Chakra UI theme
│   ├── translations/    # i18n support
│   ├── types/           # Shared TypeScript types
│   └── index.ts         # Main export file
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { Button } from '@/components/Button';
import { useCustomHook } from '@/hooks/useCustomHook';
import { formatDate } from '@/utils/formatDate';
import { theme } from '@/theme';
```

Available aliases:
- `@/components/*` → `src/components/*`
- `@/utils/*` → `src/utils/*`
- `@/hooks/*` → `src/hooks/*`
- `@/theme/*` → `src/theme/*`
- `@/translations/*` → `src/translations/*`

### Adding New Components

1. Create a new directory under `components/`
2. Follow the established pattern:
   - `ComponentName.tsx` - Main component
   - `ComponentName.types.ts` - TypeScript types
   - `ComponentName.styles.ts` - Styling (if needed)
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.tsx` - Exports
3. Add export to main `index.ts`

## Technical Notes & TODOs

### `createScaledContext()` factory

`Popover`, `Menu`, and similar floating components each define a structurally identical context (`{ baseFontSize }`) to pass a font size down to their content wrapper for use with `ScaledContext`. This is currently duplicated across `Popover.types.ts` and `Menu.types.ts`.

If a third component (e.g. Tooltip, Dialog) adopts this pattern, extract a shared factory:

```ts
// utils/createScaledContext.ts
export function createScaledContext(defaultFontSize: string | number = '14px') {
  const Context = React.createContext({ baseFontSize: defaultFontSize });
  const useContext = () => React.useContext(Context);
  return { Context, useContext };
}
```

This is intentionally deferred — two instances don't justify the abstraction yet.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and ensure they pass linting (`yarn lint`)
4. Add a changeset describing your changes (`yarn changeset`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Changeset Guidelines

When adding changesets, follow these guidelines:

- **Major**: Breaking changes, component API changes, removing components
- **Minor**: New components, new features, new props (non-breaking)
- **Patch**: Bug fixes, internal improvements, documentation updates

Example changeset workflow:

```bash
# After making changes
yarn changeset

# Select change type (major/minor/patch)
# Write a clear description of your changes
# Commit the changeset file along with your code changes
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.
