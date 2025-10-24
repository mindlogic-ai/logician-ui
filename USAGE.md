# Usage Examples

This document provides detailed examples of how to use the Logician Design System in your projects.

## Documentation

For comprehensive guides, copy the documentation to your project:

```bash
npx @mindlogic-ai/logician-ui copy-lui-docs
```

This installs detailed guides to `.claude/logician-ui/`:
- **getting-started.md** - Installation and setup
- **components.md** - Complete component reference
- **theming.md** - Theme customization
- **icons.md** - Icon library
- **accessibility.md** - A11y best practices
- **integration.md** - Framework guides

## Installation & Setup

### NPM Package Installation

```bash
# Install the package
yarn add @mindlogic-ai/logician-ui
# or
npm install @mindlogic-ai/logician-ui

# Install required peer dependencies
yarn add react react-dom @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Basic Setup

```tsx
import { LogicianProvider, Button, Input, Card } from "@mindlogic-ai/logician-ui";

function App() {
  return (
    <LogicianProvider>
      {/* Your app content */}
    </LogicianProvider>
  );
}
```

## Example Implementations

### Basic Form

```tsx
import React from "react";
import {
  LogicianProvider,
  Button,
  Input,
  FormLabel,
  Card,
} from "@mindlogic-ai/logician-ui";

function LoginForm() {
  return (
    <LogicianProvider>
      <Card maxWidth="400px" margin="auto" padding={6}>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter your email" marginBottom={4} />

        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          marginBottom={6}
        />

        <Button variant="primary" width="100%">
          Sign In
        </Button>
      </Card>
    </LogicianProvider>
  );
}
```

### Dashboard Layout

```tsx
import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import {
  LogicianProvider,
  Card,
  Badge,
  Table,
  H1,
  H2,
  H3,
} from "@mindlogic-ai/logician-ui";

function Dashboard() {
  return (
    <LogicianProvider>
      <Box padding={6}>
        <H1 marginBottom={6}>Dashboard</H1>

        <Grid templateColumns="repeat(3, 1fr)" gap={6} marginBottom={8}>
          <GridItem>
            <Card>
              <H3>Total Users</H3>
              <H1 color="blue.500">1,234</H1>
              <Badge colorScheme="green">+12%</Badge>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <H3>Revenue</H3>
              <H1 color="green.500">$45,678</H1>
              <Badge colorScheme="green">+8%</Badge>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <H3>Orders</H3>
              <H1 color="purple.500">892</H1>
              <Badge colorScheme="yellow">-3%</Badge>
            </Card>
          </GridItem>
        </Grid>

        <Card>
          <H2 marginBottom={4}>Recent Users</H2>
          <Table>{/* Table content */}</Table>
        </Card>
      </Box>
    </LogicianProvider>
  );
}
```

### Modal Example

```tsx
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormLabel,
  Switch,
} from "@mindlogic-ai/logician-ui";

function UserSettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Settings</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Settings</ModalHeader>
          <ModalBody>
            <FormLabel>Display Name</FormLabel>
            <Input placeholder="Enter display name" marginBottom={4} />

            <FormLabel>Email Notifications</FormLabel>
            <Switch defaultChecked marginBottom={6} />
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" marginRight={3}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

## TypeScript Configuration

### Path Aliases (Optional)

If you want to use shorter import paths, you can set up TypeScript path aliases in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/ui/*": ["node_modules/logician-ui/src/*"]
    }
  }
}
```

Then import like this:

```tsx
import { Button, Input } from "@/ui/components";
```

## Legacy: Git Submodule Usage

> **⚠️ Deprecated**: The following instructions are for legacy submodule usage. We recommend using the NPM package instead.

### Adding the Submodule

```bash
# Add as a submodule in your project
git submodule add https://github.com/yourusername/logician-ui.git src/design-system

# Initialize the submodule
git submodule update --init --recursive
```

### Importing Components (Submodule)

```tsx
// Import specific components (submodule)
import { Button, Input, Card } from "../design-system";

// Or import from specific component directories (submodule)
import { Button } from "../design-system/src/components/Button";
```

### Updating the Submodule

```bash
# Update to latest version
git submodule update --remote

# Commit the submodule update
git add .
git commit -m "Update design system to latest version"
```

### Path Aliases for Submodules

If using submodules, update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/design-system/*": ["src/design-system/*"],
      "@/components/*": ["src/design-system/src/components/*"]
    }
  }
}
```

Then import like this:

```tsx
import { Button, Input } from "@/design-system";
import { Card } from "@/components/Card";
```

## Theme Customization

You can extend the theme to customize colors, typography, and more:

```tsx
import { LogicianProvider } from "@mindlogic-ai/logician-ui";
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#E6FFFA",
      500: "#38B2AC",
      900: "#234E52",
    },
  },
  semanticTokens: {
    colors: {
      primary: {
        main: "brand.500", // Use your brand color as primary
      },
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

function App() {
  return <LogicianProvider theme={customTheme}>{/* Your app */}</LogicianProvider>;
}
```

See the [theming documentation](./.claude/logician-ui/theming.md) for comprehensive customization options.

## Best Practices

### 1. Component Organization

- Group related components together
- Use consistent naming conventions
- Create wrapper components for complex patterns

### 2. Performance

- Import only the components you need
- Use React.lazy() for code splitting when needed
- Leverage Chakra UI's built-in optimization

### 3. Accessibility

- Always use semantic HTML elements
- Provide proper ARIA labels
- Test with screen readers
- Ensure proper color contrast

### 4. Responsive Design

- Use Chakra UI's responsive props
- Test on multiple device sizes
- Consider mobile-first approach

```tsx
// Responsive example
<Button
  size={{ base: "sm", md: "md", lg: "lg" }}
  width={{ base: "100%", md: "auto" }}
>
  Responsive Button
</Button>
```
