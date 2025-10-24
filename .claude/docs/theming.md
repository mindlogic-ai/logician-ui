# Theming Guide

Logician UI is built on Chakra UI's powerful theming system. Customize colors, typography, spacing, and more to match your brand.

## Table of Contents

- [Theme Customization](#theme-customization)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Component Styles](#component-styles)
- [Dark Mode](#dark-mode)
- [Accessing Theme Values](#accessing-theme-values)

---

## Theme Customization

### Basic Customization

Pass a custom theme to `LogicianProvider`:

```tsx
import { LogicianProvider } from '@mindlogic-ai/logician-ui';
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      500: '#2196f3',
      900: '#0d47a1',
    },
  },
});

function App() {
  return (
    <LogicianProvider theme={customTheme}>
      <YourApp />
    </LogicianProvider>
  );
}
```

**Note**: Your custom theme is deeply merged with Logician's default theme, so you only need to override what you want to change.

### Override Semantic Tokens

Semantic tokens provide meaning-based color references that are used throughout components:

```tsx
const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        main: 'brand.500',        // Change primary color
        light: 'brand.100',
        dark: 'brand.900',
      },
      danger: {
        main: '#dc2626',          // Change error color
        light: '#fecaca',
      },
    },
  },
});
```

---

## Color System

### Default Color Palette

#### Gray Scale

Extended gray palette with 15 shades for fine-grained control:

```tsx
gray: {
  50: '#F4F5F6',    // Lightest - backgrounds
  100: '#EAECEF',
  200: '#E5E7EB',
  400: '#D1D4DA',   // Default borders
  600: '#BDC1C9',   // Hover borders
  800: '#9499A5',
  1000: '#6B7180',  // Secondary text
  1200: '#474B55',  // Primary text (light backgrounds)
  1500: '#121315',  // Darkest - body text
}
```

#### Blue (Primary Brand)

```tsx
blue: {
  100: '#FDFDFF',   // Very light backgrounds
  300: '#EFF4FF',   // Light backgrounds
  500: '#94b0ec',   // Medium
  900: '#1751D0',   // Primary brand color
  1000: '#113B98',  // Dark brand color
}
```

### Semantic Tokens

**Always use semantic tokens instead of direct colors** for better maintainability:

```tsx
semanticTokens: {
  colors: {
    primary: {
      lightest: '#eff7fd',
      lighter: 'blue.50',
      light: 'blue.300',
      main: 'blue.900',      // Default primary (#1751D0)
      dark: 'blue.1000',
    },
    secondary: {
      lighter: 'purple.50',
      light: 'purple.300',
      main: 'purple.500',
      dark: 'purple.700',
    },
    danger: {
      lighter: 'red.50',
      light: '#FFC9C9',
      main: 'red.500',       // Error states
      dark: '#961616',
    },
    success: {
      lighter: '#EBFBF1',
      light: '#C1F4D4',
      main: '#019939',       // Success states
      dark: '#016626',
    },
    warning: {
      lighter: '#FFF6E7',
      light: '#FFE9BA',
      main: 'yellow.400',    // Warning states
      dark: '#9D6508',
    },
  },
}
```

### Using Colors

#### Recommended: Semantic Tokens

```tsx
// ✅ Best - semantic meaning
<Button bgColor="primary.main" color="white">
  Primary Action
</Button>

<Alert bgColor="danger.lighter" borderColor="danger.main">
  Error message
</Alert>

<Badge bgColor="success.light" color="success.dark">
  Active
</Badge>
```

#### Alternative: Direct Colors

```tsx
// ✅ OK - when no semantic token applies
<Box borderColor="gray.400" bgColor="white">
  Content
</Box>
```

#### Avoid: Hardcoded Values

```tsx
// ❌ Bad - not themeable
<Button bgColor="#1751D0" color="#FFFFFF">
  Button
</Button>
```

### Color Usage Guidelines

**Primary Colors** (`primary.*`)
- Main call-to-action buttons
- Links and interactive elements
- Focus states and highlights

**Danger/Error Colors** (`danger.*`)
- Error messages and alerts
- Delete/destructive actions
- Form validation errors

**Success Colors** (`success.*`)
- Success messages
- Confirmation states
- Positive indicators

**Warning Colors** (`warning.*`)
- Warning messages
- Caution states
- Important notices

**Neutral/Gray Colors** (`gray.*`)
- Borders (`gray.400` default, `gray.600` hover)
- Backgrounds (`gray.50` disabled, `white` active)
- Text (`gray.1500` primary, `gray.1000-1200` secondary)

---

## Typography

### Font Families

Default font stack with multi-language support:

```tsx
fonts: {
  body: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
  heading: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
}
```

**Font priority:**
1. **Pretendard Variable** - Korean characters
2. **Inter** - Latin characters
3. **Noto Sans** - Universal fallback

### Custom Fonts

Override with your own fonts:

```tsx
const customTheme = extendTheme({
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Open Sans", sans-serif',
  },
});
```

Don't forget to load your fonts (via `@font-face`, Google Fonts, etc.):

```tsx
// In your app or global CSS
import '@fontsource/montserrat';
import '@fontsource/open-sans';
```

### Font Sizes

Responsive font sizes using `em` units (scales with base 14px):

```tsx
fontSizes: {
  subtitle: { base: '0.92em', md: '1em' },    // ~13px / 14px
  subtext: { base: '0.92em', md: '1em' },     // ~13px / 14px
  p: { base: '1em', md: '1em' },              // 14px
  h5: { base: '1.1em', md: '1.2em' },         // ~15px / 17px
  h4: { base: '1.25em', md: '1.44em' },       // ~18px / 20px
  h3: { base: '1.5em', md: '1.75em' },        // ~21px / 24px
  h2: { base: '2em', md: '2.5em' },           // ~28px / 35px
  h1: { base: '2.4em', md: '3em' },           // ~34px / 42px
}
```

**Base font size**: `14px` (set on `<html>`)

### Custom Font Sizes

Override or add new font sizes:

```tsx
const customTheme = extendTheme({
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
  },
});
```

### Usage

```tsx
import { Text, Heading, H1, H2 } from '@mindlogic-ai/logician-ui';

<H1>Main heading (34px mobile / 42px desktop)</H1>
<H2>Section heading (28px / 35px)</H2>
<Text fontSize="p">Body text (14px)</Text>
<Text fontSize={{ base: 'sm', md: 'md' }}>Responsive text</Text>
```

---

## Spacing & Layout

### Border Radius

```tsx
radii: {
  none: '0',
  sm: '6px',      // Small elements (badges, tags)
  md: '8px',      // Default (buttons, inputs)
  lg: '12px',     // Cards, modals
  xl: '32px',     // Large containers
  full: '9999px', // Pills, circles (avatars)
}
```

**Usage:**
```tsx
<Button borderRadius="md" />     // 8px
<Card borderRadius="lg" />       // 12px
<Avatar borderRadius="full" />   // Circle
```

### Custom Border Radius

```tsx
const customTheme = extendTheme({
  radii: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
});
```

### Spacing Scale

Chakra UI provides a spacing scale from `0` to `96`:

```tsx
<Box
  padding={4}        // 16px (4 * 4px)
  margin={8}         // 32px (8 * 4px)
  gap={2}            // 8px
/>

// Responsive spacing
<Stack spacing={{ base: 4, md: 8 }} />
```

**Spacing reference:**
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px

---

## Component Styles

### Default Component Variants

Logician UI components use custom variants. Example with `Button`:

```tsx
// Built-in Button variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
```

### Override Component Styles Globally

Customize default component styles:

```tsx
const customTheme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      defaultProps: {
        variant: 'primary',  // Change default variant
        size: 'md',
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'purple.500',  // Change focus color
      },
    },
  },
});
```

### Create Custom Variants

Add your own component variants:

```tsx
const customTheme = extendTheme({
  components: {
    Button: {
      variants: {
        brand: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
    },
  },
});

// Usage
<Button variant="brand">Custom Brand Button</Button>
```

---

## Dark Mode

Logician UI uses Chakra UI's color mode system. To enable dark mode support:

### 1. Configure Color Mode

```tsx
const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,  // or true to follow system
  },
});
```

### 2. Add Dark Mode Colors

Use `_dark` prop or color mode values:

```tsx
// Method 1: _dark prop
<Box bg="white" _dark={{ bg: 'gray.800' }}>
  Content
</Box>

// Method 2: useColorModeValue hook
import { useColorModeValue } from '@chakra-ui/react';

function Component() {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.1500', 'white');

  return <Box bg={bg} color={color}>Content</Box>;
}
```

### 3. Color Mode Toggle

```tsx
import { Button, useColorMode } from '@chakra-ui/react';

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
```

### 4. Semantic Tokens with Dark Mode

Define color mode-aware semantic tokens:

```tsx
const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: 'gray.1500',
        _dark: 'white',
      },
      bg: {
        default: 'white',
        _dark: 'gray.900',
      },
    },
  },
});
```

---

## Accessing Theme Values

### In Components

#### useTheme Hook

```tsx
import { useTheme } from '@chakra-ui/react';

function Component() {
  const theme = useTheme();

  const primaryColor = theme.semanticTokens.colors.primary.main;
  const borderRadius = theme.radii.md;

  console.log(primaryColor); // 'blue.900'
  console.log(borderRadius); // '8px'
}
```

#### useToken Hook

Get resolved color/size values:

```tsx
import { useToken } from '@chakra-ui/react';

function Component() {
  // Get multiple values at once
  const [primary, danger] = useToken('colors', [
    'primary.main',
    'danger.main'
  ]);

  const [md, lg] = useToken('radii', ['md', 'lg']);

  return (
    <Box
      borderColor={primary}
      boxShadow={`0 0 0 2px ${danger}`}
      borderRadius={md}
    />
  );
}
```

### In Emotion/Styled Components

```tsx
import styled from '@emotion/styled';
import { useTheme } from '@chakra-ui/react';

const StyledDiv = styled.div<{ theme: any }>`
  background: ${(props) => props.theme.colors.primary.main};
  border-radius: ${(props) => props.theme.radii.md};
`;

function Component() {
  const theme = useTheme();
  return <StyledDiv theme={theme}>Content</StyledDiv>;
}
```

---

## Complete Customization Example

```tsx
import { LogicianProvider } from '@mindlogic-ai/logician-ui';
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  // Custom colors
  colors: {
    brand: {
      50: '#e3f2fd',
      500: '#2196f3',
      900: '#0d47a1',
    },
  },

  // Override semantic tokens
  semanticTokens: {
    colors: {
      primary: {
        main: 'brand.500',
        dark: 'brand.900',
      },
    },
  },

  // Custom fonts
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Open Sans", sans-serif',
  },

  // Custom font sizes
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },

  // Custom spacing
  space: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },

  // Custom border radius
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },

  // Component overrides
  components: {
    Button: {
      defaultProps: {
        variant: 'primary',
        size: 'md',
      },
    },
  },

  // Color mode config
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});

function App() {
  return (
    <LogicianProvider theme={customTheme}>
      <YourApp />
    </LogicianProvider>
  );
}
```

---

## Best Practices

1. **Use semantic tokens** instead of direct colors for better maintainability
2. **Leverage theme hooks** (`useTheme`, `useToken`) for dynamic values
3. **Define responsive values** using object notation
4. **Extend, don't replace** - use `extendTheme` to merge with defaults
5. **Test dark mode** if you enable color mode support
6. **Keep it consistent** - use theme values instead of arbitrary values
7. **Document custom tokens** if you add new semantic tokens

---

## Resources

- [Chakra UI Theme Reference](https://chakra-ui.com/docs/styled-system/theme)
- [Chakra UI Default Theme](https://github.com/chakra-ui/chakra-ui/tree/main/packages/components/theme)
- [Color Mode Documentation](https://chakra-ui.com/docs/styled-system/color-mode)
- [Logician UI Storybook](https://mindlogic-storybook.vercel.app)
