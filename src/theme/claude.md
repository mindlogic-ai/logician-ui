# Theme System

The Logician UI theme system extends Chakra UI's theming capabilities with custom colors, semantic tokens, typography, and global styles.

## Theme Structure

```
src/theme/
├── index.ts          # Main theme export
├── colors.ts         # Color palette & semantic tokens
├── font.ts           # Font family definitions
├── global.ts         # Global CSS styles
└── Palette.stories.tsx  # Visual color palette reference
```

## Color System

### Color Palette

Located in `src/theme/colors.ts`

#### Gray Scale
Extended gray palette with 15 shades (50-1500):
```tsx
gray: {
  50: '#F4F5F6',    // Lightest
  100: '#EAECEF',
  200: '#E5E7EB',
  // ... up to
  1500: '#121315',  // Darkest (body text)
}
```

**Usage:**
- `gray.50-200`: Backgrounds and subtle borders
- `gray.400-700`: Borders and disabled states
- `gray.800-1100`: Secondary text
- `gray.1200-1500`: Primary text

#### Blue Palette
Primary brand color with 10 shades:
```tsx
blue: {
  100: '#FDFDFF',   // Very light backgrounds
  300: '#EFF4FF',   // Light backgrounds
  900: '#1751D0',   // Primary brand color
  1000: '#113B98',  // Dark brand color
}
```

### Semantic Tokens

Semantic tokens provide meaning-based color references that should be used instead of direct color values.

```tsx
semanticTokens: {
  colors: {
    primary: {
      lightest: '#eff7fd',
      lighter: 'blue.50',
      light: 'blue.300',
      main: 'blue.900',      // Default primary color
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

## Using Colors in Components

### Preferred: Semantic Tokens

```tsx
// ✅ Best - uses semantic meaning
<Button
  bgColor="primary.main"
  borderColor="primary.main"
  color="white"
/>

<Alert bgColor="danger.lighter" borderColor="danger.main" />
<Badge bgColor="success.light" />
```

### Alternative: Direct Colors

```tsx
// ✅ Acceptable - direct color when no semantic token applies
<Box borderColor="gray.400" bgColor="white" />
```

### Accessing Theme in Components

```tsx
import { useTheme, useToken } from '@chakra-ui/react';

const Component = () => {
  // Access entire theme object
  const theme = useTheme();
  const primaryColor = theme.semanticTokens.colors.primary.main;

  // Get resolved color values
  const [primary, danger] = useToken('colors', [
    'primary.main',
    'danger.main'
  ]);

  return (
    <Box
      borderColor="primary.main"
      _focus={{
        boxShadow: `rgb(255, 255, 255) 0px 0px 0px 2px, ${primary} 0px 0px 0px 4px`
      }}
    />
  );
};
```

## Typography

### Font Families

```tsx
fonts: {
  body: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
  heading: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
}
```

**Font priority:**
1. **Pretendard Variable** - Korean characters
2. **Inter** - Latin characters
3. **Noto Sans** - Fallback

**Language-specific fonts:**
- Spanish (`data-lang='es'`): Uses Inter only

### Font Sizes

Responsive font sizes using `em` units (scales with base font size):

```tsx
fontSizes: {
  subtitle: { base: '0.92em', md: '1em' },    // ~13px / ~14px
  subtext: { base: '0.92em', md: '1em' },     // ~13px / ~14px
  p: { base: '1em', md: '1em' },              // ~14px
  h5: { base: '1.1em', md: '1.2em' },         // ~15px / ~17px
  h4: { base: '1.25em', md: '1.44em' },       // ~18px / ~20px
  h3: { base: '1.5em', md: '1.75em' },        // ~21px / ~24px
  h2: { base: '2em', md: '2.5em' },           // ~28px / ~35px
  h1: { base: '2.4em', md: '3em' },           // ~34px / ~42px
}
```

**Base font size:** `14px` (set in `global.ts`)

**Usage:**
```tsx
<Text fontSize="p">Body text</Text>
<Heading fontSize="h2">Heading</Heading>
```

## Border Radius

```tsx
radii: {
  none: '0',
  sm: '6px',      // Small elements (badges, tags)
  md: '8px',      // Default (buttons, inputs)
  lg: '12px',     // Cards, modals
  xl: '32px',     // Large containers
  full: '9999px', // Pills, avatars
}
```

**Usage:**
```tsx
<Button borderRadius="md" />    // 8px
<Card borderRadius="lg" />      // 12px
<Avatar borderRadius="full" />  // Circle
```

## Global Styles

Global styles are applied to the entire application:

```tsx
global: {
  ':root': {
    '--chakra-colors-chakra-body-text': '#121315',  // gray.1500
    '--chakra-colors-chakra-body-bg': '#FFFFFF',
  },

  html: {
    height: 'var(--chakra-vh)',
    fontSize: 14,  // Base font size
    fontFamily: '"Pretendard Variable", "Inter", "Noto Sans", sans-serif',
    overflow: 'auto',
  },

  'html, body': {
    color: 'gray.1500',  // Default text color
  },
}
```

## Best Practices

### 1. Always Use Semantic Tokens

```tsx
// ✅ Good
<Button bgColor="primary.main" />
<Alert bgColor="danger.lighter" />

// ❌ Bad - hardcoded colors
<Button bgColor="#1751D0" />
<Alert bgColor="#ffcccc" />
```

### 2. Use Theme Hooks

```tsx
// ✅ Good - dynamic, respects theme
import { useTheme } from '@chakra-ui/react';
const theme = useTheme();
const color = theme.semanticTokens.colors.primary.main;

// ❌ Bad - static, doesn't support theme customization
const color = '#1751D0';
```

### 3. Responsive Values

```tsx
// ✅ Good - responsive
<Text fontSize={{ base: 'sm', md: 'md' }} />
<Box padding={{ base: 4, md: 8 }} />

// ⚠️ OK for static values
<Text fontSize="md" />
```

### 4. Consistent Border Radii

```tsx
// ✅ Good - use theme tokens
<Card borderRadius="lg" />
<Button borderRadius="md" />

// ❌ Bad - arbitrary values
<Card borderRadius="13px" />
```

## Color Usage Guidelines

### Primary Colors
- **Buttons**: Use `primary.main` for primary actions
- **Links**: Use `primary.main`
- **Focus states**: Use `primary.main` with box shadow

### Danger/Error Colors
- **Error messages**: Use `danger.main` or `danger.lighter` background
- **Delete buttons**: Use `danger.main`
- **Form validation**: Use `errorBorderColor="danger.main"`

### Success Colors
- **Success messages**: Use `success.main` or `success.lighter` background
- **Confirmation buttons**: Use `success.main`
- **Badges**: Use `success.light` or `success.lighter`

### Warning Colors
- **Warning messages**: Use `warning.main` or `warning.lighter` background
- **Caution states**: Use `warning.main`

### Neutral/Gray Colors
- **Borders**: Use `gray.400` (default) or `gray.600` (hover)
- **Backgrounds**: Use `gray.50` (disabled) or `white`
- **Text**: Use `gray.1500` (primary) or `gray.1000-1200` (secondary)

## Extending the Theme

Consumers can extend the theme:

```tsx
import { extendTheme } from '@chakra-ui/react';
import logicianTheme from '@mindlogic-ai/logician-ui/theme';

const customTheme = extendTheme({
  ...logicianTheme,
  colors: {
    ...logicianTheme.colors,
    // Override or add custom colors
    brand: {
      500: '#custom-color',
    },
  },
  // Override semantic tokens
  semanticTokens: {
    colors: {
      ...logicianTheme.semanticTokens.colors,
      primary: {
        ...logicianTheme.semanticTokens.colors.primary,
        main: 'brand.500', // Use custom primary
      },
    },
  },
});
```

## Visual Reference

See `Palette.stories.tsx` in Storybook for a visual reference of all colors and their usage.

## Common Patterns

### Focus Ring
```tsx
_focus={{
  outline: 'none',
  boxShadow: `rgb(255, 255, 255) 0px 0px 0px 2px, ${primaryColor} 0px 0px 0px 4px`,
}}
```

### Hover States
```tsx
_hover={{
  bgColor: 'primary.dark',
  borderColor: 'gray.600',
}}
```

### Disabled States
```tsx
_disabled={{
  opacity: 1,
  bg: 'gray.50',
  color: 'gray.1000',
  cursor: 'not-allowed',
}}
```

### Error States
```tsx
<Input
  isInvalid={hasError}
  errorBorderColor="danger.main"
  focusBorderColor="primary.main"
/>
```
