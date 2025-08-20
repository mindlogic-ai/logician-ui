# Logician Design System

A comprehensive React design system built on Chakra UI, providing a complete set of reusable UI components for building modern web applications.

> **Note**: This is a source-only design system intended to be used as a Git submodule. Components are compiled and type-checked in your host project alongside your app code.

## Features

- 🎨 **70+ Components** - Comprehensive set of UI components
- 🎭 **Built on Chakra UI** - Leverages the power and flexibility of Chakra UI
- 📱 **Responsive Design** - All components are mobile-first and responsive
- 🦾 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🧪 **Storybook Ready** - Complete Storybook documentation and examples
- 🎯 **Accessible** - WAI-ARIA compliant components
- ⚡ **Performance Optimized** - Tree-shakable exports and optimized bundle size

## Installation

### As a Git Submodule

This design system is designed to be used as a Git submodule in your projects:

```bash
# Add as submodule
git submodule add https://github.com/yourusername/logician-design-system.git src/components/design-system

# Initialize and update
git submodule update --init --recursive
```

### As an NPM Package (Optional)

While this design system is primarily intended for submodule use, it can also be published as an npm package:

```bash
yarn add logician-design-system
# or
npm install logician-design-system
```

Note: When using as an npm package, you'll import the source TypeScript files directly.

## Usage

### Prerequisites

Make sure you have the required peer dependencies installed:

```bash
yarn add react react-dom @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Basic Setup

Wrap your application with Chakra UI's `ChakraProvider`:

```tsx
import { ChakraProvider } from "@chakra-ui/react";
import { Button, Input, Card } from "logician-design-system";

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
- **Lottie** - Animated Lottie components

## Development

### Setup

```bash
# Install dependencies
yarn install

# Start development mode
yarn dev

# Build the library
yarn build

# Run Storybook
yarn storybook
```

### Project Structure

```
├── components/           # All UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   ├── Button.styles.ts
│   │   ├── Button.stories.tsx
│   │   └── index.tsx
│   └── ...
├── utils/               # Utility functions
├── store/               # State management
├── index.ts             # Main export file
├── package.json
├── tsconfig.json
└── README.md
```

### Adding New Components

1. Create a new directory under `components/`
2. Follow the established pattern:
   - `ComponentName.tsx` - Main component
   - `ComponentName.types.ts` - TypeScript types
   - `ComponentName.styles.ts` - Styling (if needed)
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.tsx` - Exports
3. Add export to main `index.ts`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.
