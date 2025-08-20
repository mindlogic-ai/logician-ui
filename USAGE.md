# Usage Examples

This document provides detailed examples of how to use the Logician Design System in your projects.

## Using as a Git Submodule

### Adding the Submodule

```bash
# Add as a submodule in your project
git submodule add https://github.com/yourusername/logician-design-system.git src/design-system

# Initialize the submodule
git submodule update --init --recursive
```

### Importing Components

```tsx
// Import specific components
import { Button, Input, Card } from "../design-system";

// Or import from specific component directories
import { Button } from "../design-system/components/Button";
```

### Updating the Submodule

```bash
# Update to latest version
git submodule update --remote

# Commit the submodule update
git add .
git commit -m "Update design system to latest version"
```

## Example Implementations

### Basic Form

```tsx
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Button, Input, FormLabel, Card } from "logician-design-system";

function LoginForm() {
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
}
```

### Dashboard Layout

```tsx
import React from "react";
import { ChakraProvider, Box, Grid, GridItem } from "@chakra-ui/react";
import {
  Button,
  Card,
  Badge,
  Table,
  Avatar,
  Typography,
} from "logician-design-system";

function Dashboard() {
  return (
    <ChakraProvider>
      <Box padding={6}>
        <Typography variant="h1" marginBottom={6}>
          Dashboard
        </Typography>

        <Grid templateColumns="repeat(3, 1fr)" gap={6} marginBottom={8}>
          <GridItem>
            <Card>
              <Typography variant="h3">Total Users</Typography>
              <Typography variant="h1" color="blue.500">
                1,234
              </Typography>
              <Badge variant="success">+12%</Badge>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <Typography variant="h3">Revenue</Typography>
              <Typography variant="h1" color="green.500">
                $45,678
              </Typography>
              <Badge variant="success">+8%</Badge>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <Typography variant="h3">Orders</Typography>
              <Typography variant="h1" color="purple.500">
                892
              </Typography>
              <Badge variant="warning">-3%</Badge>
            </Card>
          </GridItem>
        </Grid>

        <Card>
          <Typography variant="h2" marginBottom={4}>
            Recent Users
          </Typography>
          <Table>{/* Table content */}</Table>
        </Card>
      </Box>
    </ChakraProvider>
  );
}
```

### Modal Example

```tsx
import React, { useState } from "react";
import { Button, Modal, Input, FormLabel } from "logician-design-system";

function UserSettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Settings</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="User Settings"
      >
        <FormLabel>Display Name</FormLabel>
        <Input placeholder="Enter display name" marginBottom={4} />

        <FormLabel>Email Notifications</FormLabel>
        <Switch defaultChecked marginBottom={6} />

        <Button variant="primary" marginRight={3}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </Modal>
    </>
  );
}
```

## Path Aliases in Your Project

If you want to use path aliases in your main project, update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/design-system/*": ["src/design-system/*"],
      "@/components/*": ["src/design-system/components/*"]
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

You can extend the Chakra UI theme to customize the design system:

```tsx
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#E6FFFA",
      500: "#38B2AC",
      900: "#234E52",
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

function App() {
  return <ChakraProvider theme={customTheme}>{/* Your app */}</ChakraProvider>;
}
```

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
