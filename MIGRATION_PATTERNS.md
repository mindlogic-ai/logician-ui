# Chakra v3 Migration Patterns - Proven Approaches

This document contains the actual migration patterns successfully used in Phase 1 of the Chakra UI v3 migration. Use these as templates for future component migrations.

## Table of Contents
1. [SegmentedControl: Custom to Native Migration](#segmentedcontrol-custom-to-native-migration)
2. [PasswordInput: Composition Pattern Migration](#passwordinput-composition-pattern-migration)
3. [Common Patterns](#common-patterns)
4. [Lessons Learned](#lessons-learned)

---

## SegmentedControl: Custom to Native Migration

### Overview
- **From**: Custom component using framer-motion + Button (98 lines)
- **To**: Native Chakra v3 SegmentGroup (56 lines, 43% reduction)
- **Key Win**: Removed framer-motion dependency, leveraged native Chakra features

### Before: v2 Custom Implementation

```tsx
import { motion } from 'framer-motion';
import { Button, Flex } from '@chakra-ui/react';

export const SegmentedControl = ({ options, value, onSelect, size = 'md' }) => {
  return (
    <Flex bg="gray.50" p="1" borderRadius="md" position="relative">
      {/* Animated indicator */}
      <motion.div
        animate={{ x: calculatePosition() }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        style={{
          position: 'absolute',
          background: 'white',
          boxShadow: '...',
          // ...98 lines total
        }}
      />
      {options.map(option => (
        <Button
          key={option.value}
          onClick={() => onSelect(option.value)}
          variant={value === option.value ? 'selected' : 'default'}
        >
          {option.label}
        </Button>
      ))}
    </Flex>
  );
};
```

### After: v3 Native SegmentGroup

```tsx
import { forwardRef } from 'react';
import { SegmentGroup } from '@chakra-ui/react';

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(props, ref) {
    const { options, value, onSelect, defaultValue, size = 'md', borderRadius = 'md', ...rest } = props;

    // Normalize options to SegmentGroup format
    const items = options.map((option) => ({
      value: option.value,
      label: option.label,
      disabled: option.disabled,
    }));

    // Map borderRadius tokens to pixel values for indicator
    const borderRadiusMap: Record<string, string> = {
      none: '0',
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '32px',
      full: '9999px',
    };

    const indicatorRadius =
      typeof borderRadius === 'string'
        ? borderRadiusMap[borderRadius] || borderRadius
        : borderRadius;

    return (
      <SegmentGroup.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue ?? options[0]?.value}
        onValueChange={(details: { value: string }) => {
          if (onSelect) {
            onSelect(details.value);
          }
        }}
        size={size}
        bg="gray.50"
        p="1"
        borderRadius={borderRadius}
        boxShadow="none"
        css={{
          // Chakra v3 CSS variables for styling
          '--segment-indicator-bg': 'white',
          '--segment-indicator-shadow':
            '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',

          // Style the indicator
          '& [data-part="indicator"]': {
            borderRadius: indicatorRadius,
          },

          // Make all items equal width
          '& [data-part="item"]': {
            flex: 1,
            _hover: {
              bg: 'transparent',
            },
          },

          // Item text colors - matching original design
          '& [data-part="item-text"]': {
            color: 'gray.600',
            fontWeight: '500',
          },
          '& [data-part="item"][data-state="checked"] [data-part="item-text"]': {
            color: 'gray.1300',
            fontWeight: '600',
          },
        }}
        {...rest}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={items} />
      </SegmentGroup.Root>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
```

### Type Definitions Update

```tsx
// Before: v2
import { FlexProps } from '@chakra-ui/react';

export type SegmentedControlProps = FlexProps & {
  options: Array<SegmentedControlOption>;
  // ...
};

// After: v3
import { SegmentGroup } from '@chakra-ui/react';

export type SegmentedControlProps = Omit<
  SegmentGroup.RootProps,
  'onValueChange' | 'defaultValue'
> & {
  options: Array<SegmentedControlOption>;
  onSelect?: (selectedValue: string) => void;
  defaultValue?: string;
};
```

### Key Patterns

#### 1. CSS Variables for Styling
```tsx
css={{
  '--segment-indicator-bg': 'white',
  '--segment-indicator-shadow': '...',
}}
```
**Why**: Chakra v3 uses CSS variables for component theming. This is the recommended approach.

#### 2. Data-Part Selectors
```tsx
css={{
  '& [data-part="indicator"]': { /* styles */ },
  '& [data-part="item"]': { /* styles */ },
  '& [data-part="item-text"]': { /* styles */ },
}}
```
**Why**: Chakra v3 uses `data-part` attributes for internal component parts. This enables precise styling without class name conflicts.

#### 3. State Selectors
```tsx
css={{
  '& [data-part="item"][data-state="checked"]': { /* styles */ },
}}
```
**Why**: State is tracked via `data-state` attributes, not CSS classes.

#### 4. Dynamic Prop Mapping
```tsx
const borderRadiusMap: Record<string, string> = {
  md: '8px',
  full: '9999px',
};

const indicatorRadius = borderRadiusMap[borderRadius] || borderRadius;
```
**Why**: Maps semantic tokens to actual values for CSS variables that don't accept tokens.

---

## PasswordInput: Composition Pattern Migration

### Overview
- **From**: Custom useDisclosure + conditional rendering
- **To**: Chakra v3 InputGroup + useControllableState
- **Key Win**: Better composition, integrated with project's custom Input component

### Before: v2 Pattern

```tsx
export const PasswordInput = ({ onVisibleChange, ...props }) => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    onVisibleChange?.(newVisible);
  };

  return (
    <InputGroup>
      <Input type={visible ? 'text' : 'password'} {...props} />
      <InputRightElement>
        <IconButton icon={visible ? <EyeOff /> : <Eye />} onClick={handleToggle} />
      </InputRightElement>
    </InputGroup>
  );
};
```

### After: v3 Pattern

```tsx
import { ForwardedRef, forwardRef } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import {
  IconButton,
  InputGroup,
  mergeRefs,
  useControllableState,
} from '@chakra-ui/react';

import { Input } from '../Input'; // CRITICAL: Use custom Input, not Chakra's

export const PasswordInput = forwardRef(
  (
    {
      rootProps,
      defaultVisible = false,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      disabled,
      ...rest
    }: PasswordInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    // Use Chakra's controlled/uncontrolled state hook
    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible,
      onChange: onVisibleChange,
    });

    const handleToggle = () => setVisible(!visible);

    return (
      <InputGroup
        endElement={
          <IconButton
            tabIndex={-1}
            me="-2"
            aspectRatio="square"
            size="sm"
            variant="ghost"
            height="calc(100% - {spacing.2})"
            aria-label="Toggle password visibility"
            onPointerDown={(e) => {
              if (disabled) return;
              if (e.button !== 0) return; // Only handle left click
              e.preventDefault();
              handleToggle();
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </IconButton>
        }
        {...rootProps}
      >
        <Input
          {...rest}
          disabled={disabled}
          ref={mergeRefs(ref as any)}
          type={visible ? 'text' : 'password'}
        />
      </InputGroup>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
```

### Type Definitions Update

```tsx
import { ReactNode } from 'react';
import { InputProps, GroupProps } from '@chakra-ui/react';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  /**
   * Props for the root InputGroup wrapper
   */
  rootProps?: GroupProps;
  /**
   * The default visibility state of the password input.
   */
  defaultVisible?: boolean;
  /**
   * The controlled visibility state of the password input.
   */
  visible?: boolean;
  /**
   * Callback invoked when the visibility state changes.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Custom icons for the visibility toggle button.
   */
  visibilityIcon?: { on: ReactNode; off: ReactNode };
}
```

### Key Patterns

#### 1. useControllableState Hook
```tsx
const [visible, setVisible] = useControllableState({
  value: visibleProp,      // Controlled value
  defaultValue: defaultVisible, // Uncontrolled default
  onChange: onVisibleChange,    // Change callback
});
```
**Why**: Handles both controlled and uncontrolled modes automatically. This is the Chakra v3 standard for state management.

#### 2. InputGroup with endElement
```tsx
<InputGroup
  endElement={<IconButton>...</IconButton>}
  {...rootProps}
>
  <Input {...rest} />
</InputGroup>
```
**Why**: v3 uses `endElement` prop instead of `InputRightElement` component. Cleaner composition.

#### 3. mergeRefs for Multiple Refs
```tsx
import { mergeRefs } from '@chakra-ui/react';

<Input ref={mergeRefs(ref as any)} {...rest} />
```
**Why**: When a component needs to use both an internal ref and a forwarded ref, `mergeRefs` combines them.

#### 4. IconButton Children Pattern
```tsx
// v2: icon prop ❌
<IconButton icon={<EyeIcon />} />

// v3: children ✅
<IconButton>
  <EyeIcon />
</IconButton>
```
**Why**: v3 removed the `icon` prop in favor of children for better composition.

#### 5. Using Custom Input Component
```tsx
import { Input } from '../Input'; // Project's custom Input

// NOT: import { Input } from '@chakra-ui/react';
```
**Why**: Ensures custom focus styles, validation, and other project-specific features are preserved.

#### 6. Focus Ring Management
```tsx
// In Input.tsx
<ChakraInput
  focusBorderColor="primary.main"
  focusRing="none"  // Disable v3's default focus ring
  _focus={{
    borderColor: 'primary.main',
  }}
  {...rest}
/>
```
**Why**: Chakra v3 adds a default `focusRing` for accessibility. Set to `"none"` if you have custom focus styles to prevent duplicates.

---

## Common Patterns

### Pattern 1: Maintaining Backward Compatibility

```tsx
// Map old prop names to new ones
export const Component = ({
  colorScheme,  // v2 prop
  colorPalette, // v3 prop
  ...rest
}) => {
  // Prefer v3 prop, fallback to v2 for compatibility
  const palette = colorPalette ?? colorScheme;

  return <ChakraComponent colorPalette={palette} {...rest} />;
};
```

### Pattern 2: Wrapper Components for Breaking Changes

```tsx
// Create a compatibility wrapper
export const Modal = ({ isOpen, onClose, children, ...rest }) => {
  // v3 expects onOpenChange with different signature
  const handleOpenChange = (details: { open: boolean }) => {
    if (!details.open) {
      onClose();
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
      {...rest}
    >
      {children}
    </Dialog.Root>
  );
};
```

### Pattern 3: CSS Variable Customization

```tsx
// Override Chakra's default CSS variables
<Component
  css={{
    '--component-bg': 'white',
    '--component-color': 'gray.800',
    '--component-border': '1px solid',
    // Target specific parts
    '& [data-part="specific-part"]': {
      borderRadius: '8px',
    },
  }}
/>
```

### Pattern 4: Data Attribute Selectors

```tsx
// Select by state
'& [data-state="checked"]': { /* styles */ }
'& [data-state="open"]': { /* styles */ }
'& [data-state="disabled"]': { /* styles */ }

// Select by part
'& [data-part="root"]': { /* styles */ }
'& [data-part="trigger"]': { /* styles */ }
'& [data-part="content"]': { /* styles */ }

// Combine state + part
'& [data-part="item"][data-state="selected"]': { /* styles */ }
```

### Pattern 5: Equal Width Items (Flex Pattern)

```tsx
// Make all children equal width
css={{
  '& [data-part="item"]': {
    flex: 1,
  },
}}
```

### Pattern 6: Responsive Gap/Spacing

```tsx
// v2
<Stack spacing={{ base: 2, md: 4, lg: 6 }}>

// v3
<Stack gap={{ base: 2, md: 4, lg: 6 }}>
```

---

## Lessons Learned

### 1. Always Use Project's Custom Components
❌ **Don't**: Import base Chakra components when custom versions exist
```tsx
import { Input } from '@chakra-ui/react'; // Base Chakra Input
```

✅ **Do**: Use the project's custom components
```tsx
import { Input } from '../Input'; // Custom Input with project styles
```

**Why**: Custom components contain project-specific styles, validation logic, and behaviors that must be preserved.

### 2. Focus Ring Handling in v3
Chakra v3 introduced `focusRing` for better accessibility. If you have custom focus styles:

```tsx
<Input
  focusRing="none"  // Disable default ring
  _focus={{
    borderColor: 'primary.main', // Custom focus style
  }}
/>
```

### 3. CSS Variables Are First-Class
Don't try to override with style props. Use CSS variables:

❌ **Don't**:
```tsx
<SegmentGroup.Root bg="white" />
```

✅ **Do**:
```tsx
<SegmentGroup.Root
  css={{
    '--segment-indicator-bg': 'white',
  }}
/>
```

### 4. Preserve Visual Design
After migration, compare screenshots:
- Check hover states
- Check focus states
- Check disabled states
- Check all size variants
- Check responsive behavior

### 5. Type Safety First
Update type definitions alongside components:

```tsx
// Extend v3 component props
export type ComponentProps = Omit<
  ChakraV3Component.RootProps,
  'conflictingProp'
> & {
  customProp?: string;
};
```

### 6. Event Handler Signatures Change
v3 often uses details objects:

```tsx
// v2
onSelect={(value: string) => {}}

// v3
onValueChange={(details: { value: string }) => {
  // Extract value from details
  onSelect?.(details.value);
}}
```

### 7. Boolean Props → Standard HTML
v3 prefers standard HTML boolean props:

```tsx
// v2
<Input isDisabled isRequired isInvalid />

// v3
<Input disabled required invalid />
```

### 8. Compound Components Are Mandatory
Many v3 components require explicit subcomponents:

```tsx
// v2: Implicit structure
<Checkbox>Label</Checkbox>

// v3: Explicit structure
<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Label</Checkbox.Label>
</Checkbox.Root>
```

---

## Migration Checklist

For each component migration:

- [ ] Read component files (implementation + types + stories)
- [ ] Check MCP v2_to_v3_code_review for migration pattern
- [ ] Update component implementation
- [ ] Update type definitions
- [ ] Update Storybook stories
- [ ] Visual regression test (compare screenshots)
- [ ] Test all interactive states
- [ ] Test accessibility (keyboard, screen reader)
- [ ] Verify backward compatibility
- [ ] Update exports in index.ts
- [ ] Run `yarn type-check`
- [ ] Run `yarn lint`
- [ ] Create changeset if needed

---

## Quick Reference

### Props Renamed
| v2 | v3 |
|----|-----|
| `colorScheme` | `colorPalette` |
| `isOpen` | `open` |
| `isDisabled` | `disabled` |
| `isInvalid` | `invalid` |
| `isRequired` | `required` |
| `spacing` | `gap` |
| `isCentered` | `placement="center"` |
| `leftIcon` | children (first) |
| `rightIcon` | children (last) |

### Components Renamed
| v2 | v3 |
|----|-----|
| `Modal` | `Dialog.Root` |
| `FormControl` | `Field.Root` |
| `Tag` | `Tag.Root` |
| `Checkbox` | `Checkbox.Root` |

### Hooks
| v2 | v3 |
|----|-----|
| Manual state + onChange | `useControllableState` |
| Custom ref merging | `mergeRefs` |

---

**Last Updated**: 2024-12-24
**Based On**: Phase 1 Migration (SegmentedControl, PasswordInput)
