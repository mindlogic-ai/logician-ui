# Chakra UI v3 Migration Plan

This document outlines the complete migration strategy for upgrading the Logician UI component library from Chakra UI v2 to v3.

## Migration Status

### ✅ Phase 1: Complete (2 components)
- **SegmentedControl** - Migrated to native `SegmentGroup`
- **PasswordInput** - Migrated to v3 patterns with `InputGroup` + `useControllableState`

### 🔄 Phase 2: High Priority (Breaking Changes)

These components use patterns that have breaking API changes in v3:

#### 1. Modal Component (11 files)
**Current**: Custom Modal wrapper around Chakra v2
**Target**: Migrate to `Dialog` component

```tsx
// v2 Pattern
<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>Content</ModalBody>
    <ModalFooter>Actions</ModalFooter>
  </ModalContent>
</Modal>

// v3 Pattern
<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Title</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>Content</Dialog.Body>
      <Dialog.Footer>Actions</Dialog.Footer>
      <Dialog.CloseTrigger />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

**Files to update**:
- `src/components/Modal/Modal.tsx`
- `src/components/Modal/ModalOverlay.tsx`
- `src/components/Modal/ModalContent/ModalContent.tsx`
- `src/components/Modal/ModalHeader.tsx`
- `src/components/Modal/ModalBody.tsx`
- `src/components/Modal/ModalFooter/ModalFooter.tsx`
- `src/components/Modal/ModalCloseButton.tsx`
- `src/components/Modal/Modal.stories.tsx`
- `src/components/CarouselModal/CarouselModal.tsx`
- `src/components/CarouselModal/CarouselModal.stories.tsx`

**Breaking Changes**:
- `isOpen` → `open`
- `onClose` → `onOpenChange` (callback signature changes)
- `isCentered` → `placement="center"`
- Component naming: Modal → Dialog

**Migration Strategy**: Create wrapper components to maintain backward compatibility

#### 2. Tag Component (3 files)
**Current**: Custom Tag wrapper
**Target**: Migrate to v3 compound components

```tsx
// v2 Pattern
<Tag colorScheme="blue">
  <TagLeftIcon as={AddIcon} />
  <TagLabel>Label</TagLabel>
  <TagCloseButton />
</Tag>

// v3 Pattern
<Tag.Root colorPalette="blue">
  <Tag.StartElement>
    <AddIcon />
  </Tag.StartElement>
  <Tag.Label>Label</Tag.Label>
  <Tag.CloseTrigger />
</Tag.Root>
```

**Files to update**:
- `src/components/Tag/Tag.tsx`
- `src/components/Tag/TagCloseButton/TagCloseButton.tsx`
- `src/components/Tag/Tag.stories.tsx`

**Breaking Changes**:
- `colorScheme` → `colorPalette`
- `TagLeftIcon`/`TagRightIcon` → `Tag.StartElement`/`Tag.EndElement`
- `TagLabel` → `Tag.Label`
- `TagCloseButton` → `Tag.CloseTrigger`

#### 3. FormControl Component (3 files)
**Current**: FormControl with helper components
**Target**: Migrate to `Field` component

```tsx
// v2 Pattern
<FormControl isInvalid={isError}>
  <FormLabel>Email</FormLabel>
  <Input type='email' />
  <FormHelperText>Helper text</FormHelperText>
  <FormErrorMessage>Error message</FormErrorMessage>
</FormControl>

// v3 Pattern
<Field.Root invalid={isError}>
  <Field.Label>Email</Field.Label>
  <Input type='email' />
  <Field.HelperText>Helper text</Field.HelperText>
  <Field.ErrorText>Error message</Field.ErrorText>
</Field.Root>
```

**Files to update**:
- `src/components/FormControl/FormControl.tsx`
- `src/components/FormLabel/FormLabel.tsx`
- `src/components/FormControl/FormControl.stories.tsx`

**Breaking Changes**:
- FormControl → Field.Root
- `isInvalid` → `invalid`
- FormLabel → Field.Label
- FormHelperText → Field.HelperText
- FormErrorMessage → Field.ErrorText

#### 4. Input Component (with leftIcon/rightIcon)
**Current**: InputGroup with leftIcon/rightIcon props
**Target**: Use startElement/endElement

```tsx
// v2 Pattern
<InputGroup>
  <InputLeftElement>{icon}</InputLeftElement>
  <Input />
  <InputRightElement>{icon}</InputRightElement>
</InputGroup>

// v3 Pattern
<InputGroup
  startElement={icon}
  endElement={icon}
>
  <Input />
</InputGroup>
```

**Files to update**:
- `src/components/Input/Input.tsx` ✅ Already using startElement/endElement
- `src/components/Input/Input.stories.tsx`
- `src/components/DatePicker/SingleDatePicker.tsx`
- `src/components/DatePicker/RangeDatePicker.tsx`
- `src/components/ChipButton/ChipButton.tsx`

**Note**: Input.tsx already uses the v3 pattern! Just need to update consumers.

### 🔄 Phase 3: Medium Priority (Prop Renames)

These require prop renames but maintain similar structure:

#### 5. Button Component
**Pattern**: `leftIcon`/`rightIcon` → children

```tsx
// v2
<Button leftIcon={<Icon />}>Click</Button>

// v3
<Button>
  <Icon />
  Click
</Button>
```

**Migration**: Can be handled with wrapper to maintain backward compatibility

#### 6. IconButton Component
**Pattern**: Already migrated in PasswordInput ✅
- Remove `icon` prop → use children
- Remove `isRounded` → use `borderRadius="full"`

#### 7. Components using colorScheme (18 files)
**Pattern**: `colorScheme` → `colorPalette`

Files identified:
- Button.tsx
- Tag.tsx
- IconButton.tsx
- Pagination.tsx
- MonthPicker.tsx
- GuideCue.tsx
- FileItem.tsx
- DataField.tsx
- CopyableCode.tsx
- CodeTabs.tsx
- Code/_components/CopyButton.tsx
- And 7 story files

**Strategy**: Simple find/replace with verification

### 🔄 Phase 4: Low Priority (Nice to Have)

#### 8. Table Component
**Current**: Using Chakra v2 Table
**Target**: v3 compound components

```tsx
// v2
<TableContainer>
  <Table>
    <Thead>
      <Tr>
        <Th isNumeric>Price</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td isNumeric>$25</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>

// v3
<Table.ScrollArea>
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell textAlign="end">$25</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
</Table.ScrollArea>
```

#### 9. Tabs Component
**Current**: Using Chakra v2 Tabs
**Target**: v3 with explicit value props

```tsx
// v2
<Tabs>
  <TabList>
    <Tab>One</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content</TabPanel>
  </TabPanels>
</Tabs>

// v3
<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger value="one">One</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="one">Content</Tabs.Content>
</Tabs.Root>
```

#### 10. Checkbox Component
**Current**: Simple Checkbox
**Target**: Compound components

```tsx
// v2
<Checkbox defaultChecked>Label</Checkbox>

// v3
<Checkbox.Root defaultChecked>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Label</Checkbox.Label>
</Checkbox.Root>
```

### ⏸️ Components to Keep Custom

These should remain custom implementations:

- **Pagination** - Custom logic, just needs `colorScheme` → `colorPalette`
- **RadialProgress** - v3's progress-circle doesn't support multi-segment

## Migration Principles

### 1. Backward Compatibility First
- Wrap v3 components to maintain v2 API where possible
- Use prop mapping for renamed props
- Provide deprecation warnings, not hard breaks

### 2. Progressive Enhancement
- Migrate in phases, validate each phase
- Run full test suite after each component
- Update Storybook for visual regression testing

### 3. Type Safety
- Update TypeScript definitions alongside components
- Ensure exported types remain compatible
- Use generics to maintain flexibility

### 4. Documentation
- Update component README files
- Add migration notes to CHANGELOG
- Update Storybook stories with new patterns

## Testing Strategy

For each migrated component:

1. ✅ Visual regression test in Storybook
2. ✅ TypeScript compilation check
3. ✅ Verify backward compatibility
4. ✅ Test all interactive states (hover, focus, disabled)
5. ✅ Accessibility audit (keyboard nav, screen readers)
6. ✅ Responsive behavior check

## Rollout Plan

### Phase 1: Foundation ✅
- SegmentedControl
- PasswordInput
- **Status**: Complete

### Phase 2: Core Components (Week 1-2)
- Modal → Dialog migration
- Tag component update
- FormControl → Field migration
- **Impact**: High - used across many projects

### Phase 3: Prop Updates (Week 3)
- Button leftIcon/rightIcon
- colorScheme → colorPalette (18 files)
- Boolean prop renames
- **Impact**: Medium - backward compatible wrappers possible

### Phase 4: Advanced Components (Week 4)
- Table component
- Tabs component
- Checkbox component
- **Impact**: Low - less frequently used

### Phase 5: Validation & Cleanup
- Remove deprecated code paths
- Update all documentation
- Publish major version with migration guide

## Breaking Changes Summary

### API Changes
- `isOpen` → `open`
- `isDisabled` → `disabled`
- `isInvalid` → `invalid`
- `isRequired` → `required`
- `colorScheme` → `colorPalette`
- `spacing` → `gap` (Stack components)

### Component Renames
- Modal → Dialog
- FormControl → Field
- Specific sub-components renamed (see each section)

### Prop Patterns
- `leftIcon`/`rightIcon` → children pattern
- `icon` prop removed from IconButton
- Icons now passed as children, not props

### Composition Changes
- Most components now use `.Root`, `.Content`, `.Label` patterns
- More explicit structure with compound components
- Better type safety and customization

## Success Metrics

- ✅ Zero TypeScript errors
- ✅ All Storybook stories render correctly
- ✅ No visual regressions from screenshots
- ✅ Accessibility score maintained or improved
- ✅ Bundle size impact < 5%
- ✅ Backward compatibility for existing consumers

## References

- [Chakra UI v3 Migration Guide](https://www.chakra-ui.com/docs/get-started/migration)
- [Chakra UI v3 Components](https://www.chakra-ui.com/docs/components)
- Phase 1 Implementation (SegmentedControl, PasswordInput) - Completed 2024-12-24

---

**Last Updated**: 2024-12-24
**Migration Progress**: 2/70+ components (Phase 1 complete)
