# Component Development Guide

This guide covers patterns and conventions for creating components in the Logician UI design system.

## Component Structure

Each component follows a consistent file structure:

```
ComponentName/
├── ComponentName.tsx          # Main component implementation
├── ComponentName.types.ts     # TypeScript type definitions
├── ComponentName.styles.ts    # Style variants (optional)
├── ComponentName.stories.tsx  # Storybook documentation
└── index.tsx                  # Public exports
```

## Component Implementation Patterns

### 1. Basic Component Template

```tsx
// ComponentName.tsx
import { forwardRef } from 'react';
import { ComponentName as ChakraComponentName } from '@chakra-ui/react';

import { ComponentNameProps } from './ComponentName.types';

export const ComponentName = forwardRef(
  ({ variant = 'default', ...rest }: ComponentNameProps, ref) => {
    return (
      <ChakraComponentName
        ref={ref}
        {...rest}
      />
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### 2. Type Definition Pattern

```tsx
// ComponentName.types.ts
import { ComponentNameProps as ChakraComponentNameProps } from '@chakra-ui/react';

export type ComponentNameVariant = 'primary' | 'secondary' | 'tertiary';

export type ComponentNameProps = Omit<ChakraComponentNameProps, 'variant'> & {
  variant?: ComponentNameVariant;
  // Add custom props here
};
```

**Key patterns:**
- Extend Chakra UI component props using `Omit<>` to override specific props
- Define custom variant types when overriding Chakra's variant system
- Export all types for external use

### 3. Style Variants Pattern

```tsx
// ComponentName.styles.ts
import { ComponentNameProps } from './ComponentName.types';

export const variantStyles: Record<
  ComponentNameVariant,
  Partial<ComponentNameProps>
> = {
  primary: {
    borderColor: 'primary.main',
    bgColor: 'primary.main',
    color: 'white',
    _hover: {
      bgColor: 'blue.800',
    },
  },
  secondary: {
    borderColor: 'gray.400',
    bgColor: 'white',
    color: 'gray.1200',
    _hover: {
      bgColor: 'gray.50',
    },
  },
};
```

**Best practices:**
- Use theme tokens (semantic tokens preferred)
- Define all interactive states (`_hover`, `_focus`, `_disabled`, `_active`)
- Keep styles type-safe with `Partial<ComponentNameProps>`

### 4. Export Pattern

```tsx
// index.tsx
export { ComponentName } from './ComponentName';
export { variantStyles } from './ComponentName.styles'; // if applicable
export type { ComponentNameProps } from './ComponentName.types';
```

Then add to `src/index.ts`:
```tsx
export * from './components/ComponentName';
```

## Required Patterns

### forwardRef Usage

**Always use `forwardRef`** for components that might need ref access:

```tsx
export const Component = forwardRef((props: ComponentProps, ref) => {
  return <ChakraComponent ref={ref} {...props} />;
});

Component.displayName = 'Component';
```

**Why:**
- Enables ref forwarding for DOM manipulation
- Required for Chakra UI integration
- Supports form libraries (React Hook Form, Formik)
- Better for accessibility tools

### Theme Integration

Access theme values using hooks:

```tsx
import { useTheme, useToken } from '@chakra-ui/react';

const Component = () => {
  const theme = useTheme();
  const primaryColor = useToken('colors', theme.semanticTokens.colors.primary.main);

  // Use semantic tokens when available
  const borderColor = theme.semanticTokens.colors.primary.main;
};
```

**Semantic tokens to use:**
- `primary.main`, `primary.light` - Primary brand colors
- `danger.main` - Error/danger states
- `gray.*` - Neutral colors (gray.50 to gray.1200)

### Common Style Patterns

#### Focus States
```tsx
_focus={{
  outline: 'none',
  boxShadow: `rgb(255, 255, 255) 0px 0px 0px 2px, ${primaryMainColor} 0px 0px 0px 4px`,
}}
```

#### Disabled States
```tsx
_disabled={{
  opacity: 1,
  cursor: 'not-allowed',
  bg: 'gray.50',
  color: 'gray.1000',
}}
```

#### Read-Only States
```tsx
_readOnly={{
  opacity: 1,
  cursor: 'not-allowed',
  bg: 'gray.50',
  color: 'gray.600',
  borderColor: 'gray.200',
}}
```

#### Hover States
```tsx
_hover={{
  borderColor: 'gray.600',
}}
```

## Form Components

### Input Components

For input-like components:

```tsx
import { useRef, useState, useEffect } from 'react';

const Input = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);

  // Handle IME composition (Korean, Japanese, Chinese input)
  const isComposing = useRef(false);

  const handleCompositionStart = (e) => {
    isComposing.current = true;
  };

  const handleCompositionEnd = (e) => {
    isComposing.current = false;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isComposing.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  return (
    <ChakraInput
      ref={ref}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      borderColor="gray.400"
      focusBorderColor="primary.main"
      errorBorderColor="danger.main"
      {...props}
    />
  );
});
```

**Key considerations:**
- Handle IME composition for international input
- Support controlled/uncontrolled modes
- Include focus, error, and disabled states
- Use Chakra's input props (`errorBorderColor`, `focusBorderColor`)

### Creating Synthetic Events

When modifying input values programmatically (for Formik compatibility):

```tsx
const createSyntheticEvent = (
  originalEvent: React.ChangeEvent<HTMLInputElement>,
  newValue: string
) => {
  const nativeEvent = Object.create(originalEvent.nativeEvent);
  const newTarget = {
    ...originalEvent.target,
    value: newValue,
    name: originalEvent.target.name,
  };

  return {
    ...originalEvent,
    nativeEvent,
    target: newTarget,
    currentTarget: newTarget,
  } as React.ChangeEvent<HTMLInputElement>;
};
```

## Component Props Best Practices

### Default Values

Provide sensible defaults:
```tsx
const Button = ({ variant = 'secondary', size = 'md', ...rest }) => {
  // secondary is safer default than primary
  // md is most common size
};
```

### Prop Spreading

Always spread props at the end:
```tsx
<ChakraComponent
  // Your custom props first
  variant={variant}
  borderColor="gray.400"
  // Then spread remaining props
  {...rest}
/>
```

### Custom Props vs Chakra Props

Prefer Chakra's built-in props when available:
- ✅ Use `isDisabled` instead of `disabled`
- ✅ Use `isReadOnly` instead of `readonly`
- ✅ Use `isInvalid` for error states
- ✅ Use Chakra's style props (`bg`, `color`, `borderColor`, etc.)

## Accessibility

### Required Attributes

- Set `displayName` on all forwardRef components
- Use semantic HTML elements
- Include ARIA labels where needed
- Support keyboard navigation
- Maintain proper focus management

### Example:
```tsx
<Button
  aria-label="Close dialog"
  onClick={onClose}
  tabIndex={0}
>
  Close
</Button>
```

## Path Aliases

Use path aliases for imports:

```tsx
// ✅ Good
import { formatNumber } from '@/utils/formatNumber';
import { useCustomHook } from '@/hooks/useCustomHook';
import theme from '@/theme/index';

// ❌ Avoid
import { formatNumber } from '../../utils/formatNumber';
```

Available aliases:
- `@/components/*`
- `@/utils/*`
- `@/hooks/*`
- `@/theme/*`
- `@/translations/*`

## Storybook Stories

See `.storybook/claude.md` for Storybook-specific patterns.

## Common Pitfalls

1. **Forgetting forwardRef**: Always use it for components wrapping DOM elements
2. **Not setting displayName**: Required for React DevTools
3. **Hardcoded colors**: Use theme tokens instead
4. **Missing focus states**: Required for accessibility
5. **Props in wrong order**: Custom props before spread
6. **Not handling IME**: Important for international users
7. **Missing type exports**: Export all custom types
8. **Inconsistent variants**: Follow existing variant naming

## Component Categories

When adding to `src/index.ts`, follow these categories:

- **Core Components**: Button, Card, Badge, Tag
- **Form Components**: Input, Select, Checkbox, Radio
- **Navigation**: Breadcrumb, Pagination, Menu, Tabs
- **Feedback**: Alert, Toast, Modal, Tooltip
- **Data Display**: Table, Avatar, Typography, Code
- **File Components**: FileInput, FileItem, FileList
- **Icon Components**: Icon, IconButton
- **Loading Components**: Loaders, Spinner, Progress

## Testing Checklist

Before considering a component complete:

- [ ] Component uses forwardRef
- [ ] displayName is set
- [ ] All types are exported
- [ ] Props extend Chakra props properly
- [ ] Default values are sensible
- [ ] Focus states are defined
- [ ] Disabled states work correctly
- [ ] Hover states are visible
- [ ] Theme tokens are used (no hardcoded colors)
- [ ] Storybook story is created
- [ ] Component is exported from src/index.ts
- [ ] Works with keyboard navigation
- [ ] Supports responsive props (if applicable)
- [ ] IME composition handled (for input components)
