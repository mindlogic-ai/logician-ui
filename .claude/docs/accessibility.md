# Accessibility Guide

Logician UI is built with accessibility in mind, following WAI-ARIA best practices and WCAG 2.1 guidelines. All components are keyboard navigable and screen reader friendly.

## Table of Contents

- [Core Principles](#core-principles)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Color Contrast](#color-contrast)
- [Form Accessibility](#form-accessibility)
- [Component-Specific Patterns](#component-specific-patterns)
- [Testing Accessibility](#testing-accessibility)

---

## Core Principles

### WCAG 2.1 Compliance

Logician UI components follow WCAG 2.1 Level AA standards:

1. **Perceivable** - Information presented in ways all users can perceive
2. **Operable** - UI components are keyboard accessible
3. **Understandable** - Clear, consistent interface and behavior
4. **Robust** - Compatible with assistive technologies

### Built-in Features

All Logician UI components include:
- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Screen reader announcements
- Color contrast compliance

---

## Keyboard Navigation

All interactive components support keyboard navigation:

### Standard Keys

- **Tab** / **Shift+Tab** - Navigate between focusable elements
- **Enter** / **Space** - Activate buttons, checkboxes, links
- **Escape** - Close modals, menus, dialogs
- **Arrow Keys** - Navigate menus, tabs, radio groups, sliders

### Component Examples

#### Button

```tsx
import { Button } from '@mindlogic-ai/logician-ui';

<Button onClick={handleClick}>
  Click Me
</Button>
// ✅ Focusable with Tab
// ✅ Activates with Enter or Space
```

#### Modal

```tsx
import { Modal, ModalOverlay, ModalContent } from '@mindlogic-ai/logician-ui';

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    {/* Content */}
  </ModalContent>
</Modal>
// ✅ Focus trapped within modal
// ✅ Closes with Escape key
// ✅ Returns focus to trigger element on close
```

#### Tabs

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@mindlogic-ai/logician-ui';

<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  {/* Panels */}
</Tabs>
// ✅ Arrow keys navigate between tabs
// ✅ Tab key moves to tab panel
// ✅ Home/End keys jump to first/last tab
```

#### Menu

```tsx
import { Menu, MenuButton, MenuList, MenuItem } from '@mindlogic-ai/logician-ui';

<Menu>
  <MenuButton as={Button}>Actions</MenuButton>
  <MenuList>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </MenuList>
</Menu>
// ✅ Arrow keys navigate menu items
// ✅ Enter/Space activates selected item
// ✅ Escape closes menu
// ✅ Type-ahead search support
```

### Custom Keyboard Handlers

For custom interactions, handle keyboard events properly:

```tsx
import { Box } from '@chakra-ui/react';

<Box
  tabIndex={0}  // Make focusable
  role="button"  // Announce as button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom Interactive Element
</Box>
```

---

## Screen Reader Support

### ARIA Labels

Always provide descriptive labels for interactive elements:

```tsx
import { IconButton, Icon } from '@mindlogic-ai/logician-ui';

// ✅ Good - descriptive label
<IconButton
  aria-label="Close dialog"
  icon={<Icon icon="IoClose" />}
  onClick={onClose}
/>

// ❌ Bad - no label
<IconButton
  icon={<Icon icon="IoClose" />}
  onClick={onClose}
/>
```

### ARIA Descriptions

Provide additional context when needed:

```tsx
import { Button } from '@mindlogic-ai/logician-ui';

<Button
  aria-label="Delete"
  aria-describedby="delete-description"
  onClick={handleDelete}
>
  Delete
</Button>
<Text id="delete-description" srOnly>
  This action cannot be undone
</Text>
```

### Screen Reader Only Text

Use Chakra's `srOnly` prop to hide text visually but keep it for screen readers:

```tsx
import { Text } from '@mindlogic-ai/logician-ui';

<Text srOnly>
  Additional context for screen readers
</Text>
```

### Live Regions

Announce dynamic content changes:

```tsx
import { Box } from '@chakra-ui/react';

<Box
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</Box>

// For urgent announcements
<Box role="alert" aria-live="assertive">
  {errorMessage}
</Box>
```

### Common ARIA Patterns

```tsx
// Loading state
<Button isLoading aria-label="Saving changes">
  Save
</Button>
// Announces: "Saving changes, button, loading"

// Disabled state
<Button isDisabled>
  Submit
</Button>
// Announces: "Submit, button, dimmed" or "unavailable"

// Error state
<Input
  isInvalid
  aria-invalid="true"
  aria-describedby="email-error"
/>
<Text id="email-error" color="danger.main">
  Please enter a valid email address
</Text>
```

---

## Focus Management

### Visible Focus Indicators

All interactive elements have visible focus states:

```tsx
import { Button } from '@mindlogic-ai/logician-ui';

<Button
  _focus={{
    outline: 'none',
    boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px, primary.main 0px 0px 0px 4px',
  }}
>
  Focused Button
</Button>
```

**Default focus styles:**
- 2px white inner ring
- 4px colored outer ring (using primary.main)
- High contrast, visible on all backgrounds

### Focus Trap

Modals and dialogs automatically trap focus:

```tsx
import { Modal } from '@mindlogic-ai/logician-ui';

<Modal isOpen={isOpen} onClose={onClose}>
  {/* Focus automatically trapped within modal */}
  {/* Tab cycles through focusable elements */}
  {/* Escape closes and returns focus */}
</Modal>
```

### Manual Focus Management

```tsx
import { useRef, useEffect } from 'react';
import { Input } from '@mindlogic-ai/logician-ui';

function Component() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  return <Input ref={inputRef} placeholder="Auto-focused" />;
}
```

### Skip to Content

Provide skip links for keyboard users:

```tsx
import { Link } from '@mindlogic-ai/logician-ui';

<Link
  href="#main-content"
  position="absolute"
  top="-40px"
  _focus={{
    top: 0,
    zIndex: 9999,
  }}
>
  Skip to main content
</Link>

<main id="main-content">
  {/* Page content */}
</main>
```

---

## Color Contrast

### WCAG AA Compliance

Logician UI's default theme meets WCAG AA contrast requirements:

**Text Contrast:**
- Normal text (14px-18px): 4.5:1 minimum
- Large text (≥18px or ≥14px bold): 3:1 minimum

**Default Text Colors:**
```tsx
// Primary text: gray.1500 (#121315) on white
// Contrast ratio: 16.1:1 ✅

// Secondary text: gray.1000 (#6B7180) on white
// Contrast ratio: 5.8:1 ✅

// Disabled text: gray.600 (#BDC1C9) on white
// Contrast ratio: 2.9:1 ⚠️ (decorative only)
```

### Button Contrast

```tsx
// Primary button
<Button variant="primary">
  {/* Blue.900 (#1751D0) background with white text */}
  {/* Contrast: 9.2:1 ✅ */}
  Primary Action
</Button>

// Secondary button
<Button variant="secondary">
  {/* White background, gray.1200 (#474B55) text */}
  {/* Contrast: 8.5:1 ✅ */}
  Secondary Action
</Button>
```

### Custom Colors

When using custom colors, verify contrast:

```tsx
// ❌ Low contrast - avoid
<Text color="gray.500" bg="white">
  Hard to read
</Text>

// ✅ Good contrast
<Text color="gray.1200" bg="white">
  Easy to read
</Text>
```

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)

---

## Form Accessibility

### Form Labels

Always use `FormLabel` with form inputs:

```tsx
import { FormControl, FormLabel, Input } from '@mindlogic-ai/logician-ui';

// ✅ Good - explicit label
<FormControl>
  <FormLabel htmlFor="email">Email Address</FormLabel>
  <Input id="email" type="email" />
</FormControl>

// ❌ Bad - no label
<Input type="email" placeholder="Email" />
```

### Required Fields

Indicate required fields properly:

```tsx
import { FormControl, FormLabel, Input } from '@mindlogic-ai/logician-ui';

<FormControl isRequired>
  <FormLabel>Email Address</FormLabel>
  <Input type="email" aria-required="true" />
</FormControl>
// Visually shows asterisk (*)
// Screen reader announces "Email Address, required, edit text"
```

### Error Messages

Associate error messages with inputs:

```tsx
import { FormControl, FormLabel, Input, FormErrorMessage } from '@mindlogic-ai/logician-ui';

<FormControl isInvalid={hasError}>
  <FormLabel>Email</FormLabel>
  <Input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <FormErrorMessage>
    Please enter a valid email address
  </FormErrorMessage>
</FormControl>
// Error message automatically linked via aria-describedby
```

### Helper Text

Provide instructions when needed:

```tsx
import { FormControl, FormLabel, Input, FormHelperText } from '@mindlogic-ai/logician-ui';

<FormControl>
  <FormLabel>Password</FormLabel>
  <Input type="password" />
  <FormHelperText>
    Must be at least 8 characters
  </FormHelperText>
</FormControl>
```

### Checkbox & Radio Groups

```tsx
import { FormControl, FormLabel, Checkbox, Stack } from '@mindlogic-ai/logician-ui';

<FormControl as="fieldset">
  <FormLabel as="legend">Preferences</FormLabel>
  <Stack spacing={2}>
    <Checkbox>Email notifications</Checkbox>
    <Checkbox>SMS notifications</Checkbox>
  </Stack>
</FormControl>
// Uses semantic <fieldset> and <legend>
```

---

## Component-Specific Patterns

### Modal

```tsx
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@mindlogic-ai/logician-ui';

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Dialog Title</ModalHeader>
    <ModalCloseButton aria-label="Close dialog" />
    <ModalBody>
      {/* Content */}
    </ModalBody>
  </ModalContent>
</Modal>
```

**Built-in accessibility:**
- `role="dialog"`
- `aria-modal="true"`
- Focus trap
- Escape key closes
- Returns focus to trigger

### Tooltip

```tsx
import { Tooltip, IconButton, Icon } from '@mindlogic-ai/logician-ui';

<Tooltip label="Delete item">
  <IconButton
    aria-label="Delete item"
    icon={<Icon icon="FaRegTrashAlt" />}
  />
</Tooltip>
```

**Note:** Don't rely solely on tooltips for critical info - they're not accessible on mobile.

### Accordion

```tsx
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@mindlogic-ai/logician-ui';

<Accordion>
  <AccordionItem>
    <AccordionButton>
      Section Title
    </AccordionButton>
    <AccordionPanel>
      Content
    </AccordionPanel>
  </AccordionItem>
</Accordion>
```

**Built-in accessibility:**
- `role="button"` on headers
- `aria-expanded` state
- `aria-controls` linking
- Arrow key navigation

### Table

```tsx
import { Table, Thead, Tbody, Tr, Th, Td } from '@mindlogic-ai/logician-ui';

<Table>
  <Thead>
    <Tr>
      <Th scope="col">Name</Th>
      <Th scope="col">Email</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>John Doe</Td>
      <Td>john@example.com</Td>
    </Tr>
  </Tbody>
</Table>
```

**Use `scope` attribute** for table headers to help screen readers.

---

## Testing Accessibility

### Automated Testing

Use these tools to catch common issues:

1. **Lighthouse** (Chrome DevTools)
   - Open DevTools → Lighthouse tab
   - Check "Accessibility"
   - Generate report

2. **axe DevTools** (Browser Extension)
   - [Chrome](https://chrome.google.com/webstore/detail/axe-devtools-web-accessibility/lhdoppojpmngadmnindnejefpokejbdd)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)
   - Run scan on your page

3. **WAVE** (Browser Extension)
   - [WebAIM WAVE](https://wave.webaim.org/extension/)
   - Visual feedback on accessibility issues

### Manual Testing

#### Keyboard Navigation

Test all functionality with keyboard only:

1. Unplug your mouse
2. Use Tab to navigate
3. Verify focus indicators are visible
4. Test all interactive elements
5. Check modal/menu focus trapping

**Checklist:**
- [ ] Can reach all interactive elements with Tab
- [ ] Focus order is logical
- [ ] Focus indicators are clearly visible
- [ ] Enter/Space activate buttons and links
- [ ] Escape closes modals/menus
- [ ] Arrow keys work in menus/tabs/radio groups

#### Screen Reader Testing

Test with screen readers:

- **macOS**: VoiceOver (Cmd+F5)
- **Windows**: NVDA (free) or JAWS
- **Mobile**: TalkBack (Android), VoiceOver (iOS)

**Checklist:**
- [ ] All images have alt text
- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Dynamic content changes announced
- [ ] Interactive elements have proper roles
- [ ] Button/link purpose is clear

#### Color Contrast

1. Use browser DevTools to inspect colors
2. Check contrast ratio (should be ≥4.5:1 for normal text)
3. Test with grayscale/color blindness simulators

### Component Testing Example

```tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button is accessible', async () => {
  const { container } = render(
    <Button onClick={() => {}}>
      Click Me
    </Button>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Best Practices Checklist

### General

- [ ] Use semantic HTML elements
- [ ] Provide text alternatives for non-text content
- [ ] Ensure sufficient color contrast (4.5:1 for text)
- [ ] Make all functionality keyboard accessible
- [ ] Provide visible focus indicators
- [ ] Use ARIA attributes correctly

### Forms

- [ ] Associate labels with inputs
- [ ] Mark required fields with `isRequired`
- [ ] Provide clear error messages
- [ ] Link errors to inputs with `aria-describedby`
- [ ] Group related inputs with fieldset/legend
- [ ] Provide helpful instructions

### Interactive Elements

- [ ] Use Button for actions, Link for navigation
- [ ] Provide meaningful labels for icon buttons
- [ ] Don't rely on color alone to convey information
- [ ] Ensure touch targets are at least 44x44px
- [ ] Avoid auto-playing media

### Dynamic Content

- [ ] Use live regions for status updates
- [ ] Manage focus when content changes
- [ ] Provide loading states
- [ ] Announce important updates to screen readers

---

## Common Pitfalls

### ❌ Avoid

```tsx
// Missing label
<IconButton icon={<Icon icon="IoClose" />} />

// Div as button
<div onClick={handleClick}>Click me</div>

// Placeholder as label
<Input placeholder="Email address" />

// Low contrast
<Text color="gray.400">Important text</Text>

// Keyboard trap
<Modal
  closeOnEsc={false}
  closeOnOverlayClick={false}
  // No way to close with keyboard!
/>
```

### ✅ Do Instead

```tsx
// Proper label
<IconButton
  aria-label="Close dialog"
  icon={<Icon icon="IoClose" />}
/>

// Semantic button
<Button onClick={handleClick}>Click me</Button>

// Explicit label
<FormControl>
  <FormLabel>Email address</FormLabel>
  <Input placeholder="you@example.com" />
</FormControl>

// Good contrast
<Text color="gray.1200">Important text</Text>

// Proper modal
<Modal
  isOpen={isOpen}
  onClose={onClose}  // Can close with Escape
/>
```

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Chakra UI Accessibility](https://chakra-ui.com/docs/styled-system/style-props#accessibility)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
