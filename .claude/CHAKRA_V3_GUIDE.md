# Chakra UI v3 Migration - Quick Start Guide

## 📚 Documentation Overview

This project has comprehensive Chakra v3 migration documentation:

### 1. **CHAKRA_V3_MIGRATION.md** - Master Plan
- Complete inventory of all components needing migration
- Phased rollout strategy (Phases 1-5)
- Breaking changes summary
- Success metrics and testing strategy

### 2. **MIGRATION_PATTERNS.md** - Implementation Guide
- Proven code patterns from Phase 1 migrations
- Before/after examples for SegmentedControl and PasswordInput
- Common pitfalls and solutions
- Copy-paste ready code templates

### 3. **This Guide** - Quick Reference
- Fast lookup for common migrations
- Decision tree for migration approach
- Team workflows

---

## 🚀 Quick Start

### Before You Start a Migration

1. **Read the component**:
   ```bash
   # Read implementation, types, and stories
   cat src/components/ComponentName/*.tsx
   ```

2. **Check the MCP for v3 pattern**:
   ```bash
   # Use Chakra MCP to get migration guidance
   # See available scenarios in MIGRATION_PATTERNS.md
   ```

3. **Reference existing migrations**:
   - ✅ SegmentedControl - Custom to native component
   - ✅ PasswordInput - Composition pattern update

### Migration Decision Tree

```
Is there a native v3 component?
│
├─ YES → Use native v3 component
│   ├─ Example: SegmentedControl → SegmentGroup
│   └─ See: MIGRATION_PATTERNS.md#SegmentedControl
│
└─ NO → Update to v3 patterns
    ├─ Prop renames (colorScheme → colorPalette)
    ├─ Composition changes (leftIcon → children)
    └─ See: MIGRATION_PATTERNS.md#PasswordInput
```

---

## 📋 Migration Checklist

Copy this for each migration:

```markdown
## ComponentName Migration

- [ ] Read component + types + stories
- [ ] Check MCP v2_to_v3_code_review for pattern
- [ ] Update component implementation
- [ ] Update TypeScript types
- [ ] Update Storybook stories
- [ ] Visual regression (screenshot compare)
- [ ] Test interactive states (hover, focus, disabled)
- [ ] Test accessibility (keyboard, screen reader)
- [ ] Verify backward compatibility
- [ ] Run yarn type-check
- [ ] Run yarn lint
- [ ] Create changeset (if public API changed)
```

---

## 🎯 Common Migrations

### Simple Prop Rename

```tsx
// Find and replace pattern
colorScheme → colorPalette
spacing → gap
isDisabled → disabled
isInvalid → invalid
```

### Icon Prop → Children

```tsx
// Before
<Button leftIcon={<Icon />}>Text</Button>
<IconButton icon={<Icon />} />

// After
<Button><Icon />Text</Button>
<IconButton><Icon /></IconButton>
```

### Compound Component

```tsx
// Before
<Tag>Label <TagCloseButton /></Tag>

// After
<Tag.Root>
  <Tag.Label>Label</Tag.Label>
  <Tag.CloseTrigger />
</Tag.Root>
```

### CSS Variable Styling

```tsx
<Component
  css={{
    '--component-bg': 'white',
    '& [data-part="item"]': { flex: 1 },
    '& [data-state="checked"]': { color: 'blue' },
  }}
/>
```

---

## ⚠️ Common Pitfalls

### 1. Using Base Chakra Instead of Custom Components
```tsx
❌ import { Input } from '@chakra-ui/react';
✅ import { Input } from '../Input';
```

### 2. Duplicate Focus Rings
```tsx
// Add this to components with custom focus styles
focusRing="none"
```

### 3. Not Handling onValueChange Signature
```tsx
// v3 uses details object
onValueChange={(details: { value: string }) => {
  onSelect?.(details.value);
}}
```

### 4. Forgetting to Update Types
```tsx
// Always extend v3 types
export type Props = Omit<ChakraV3.RootProps, 'conflict'> & {
  customProp?: string;
};
```

---

## 🧪 Testing Strategy

### Visual Regression
```bash
# Start Storybook
yarn storybook

# Compare before/after screenshots
# Check all variants, all states
```

### Type Safety
```bash
yarn type-check
```

### Linting
```bash
yarn lint
yarn lint:fix  # Auto-fix
```

### Manual Testing
- [ ] All size variants (xs, sm, md, lg, xl)
- [ ] All color variants
- [ ] Hover states
- [ ] Focus states (keyboard navigation)
- [ ] Disabled states
- [ ] Error/invalid states
- [ ] Responsive behavior
- [ ] Dark mode (if applicable)

---

## 📦 Phase Status

### ✅ Phase 1: Complete
- SegmentedControl (custom → native SegmentGroup)
- PasswordInput (composition pattern update)

### 🔄 Phase 2: High Priority (Next)
- Modal → Dialog (11 files)
- Tag component (3 files)
- FormControl → Field (3 files)

### 🔜 Phase 3: Prop Updates
- Button leftIcon/rightIcon
- colorScheme → colorPalette (18 files)

### 🔜 Phase 4: Advanced
- Table, Tabs, Checkbox components

---

## 🛠️ Tools & Resources

### Chakra MCP Tool
```typescript
// Check migration pattern
mcp__chakra-ui__v2_to_v3_code_review({
  scenario: 'modal_to_dialog'
})
```

Available scenarios:
- `button_icon_to_children`
- `colorScheme_to_colorPalette`
- `form_control_to_field`
- `icon_button_changes`
- `modal_to_dialog`
- `stack_spacing_to_gap`
- `tag_component_changes`
- And 35+ more...

### Official Docs
- [Chakra UI v3 Docs](https://www.chakra-ui.com/docs)
- [Migration Guide](https://www.chakra-ui.com/docs/get-started/migration)

### Project Docs
- `/CHAKRA_V3_MIGRATION.md` - Master plan
- `/MIGRATION_PATTERNS.md` - Code patterns
- `/.claude/CLAUDE.md` - Component dev guide

---

## 🚢 Publishing Flow

After migration:

1. **Create changeset**:
   ```bash
   yarn changeset
   # Select: major (breaking), minor (feature), or patch (fix)
   ```

2. **Update version** (before release):
   ```bash
   yarn changeset:version
   ```

3. **Verify**:
   ```bash
   yarn build
   yarn type-check
   yarn lint
   ```

4. **Publish**:
   ```bash
   yarn changeset:publish
   ```

---

## 💡 Pro Tips

1. **Start Small**: Migrate one component at a time
2. **Visual First**: Always compare screenshots before/after
3. **Backward Compatible**: Use wrappers for breaking changes when possible
4. **Document**: Update CHANGELOG and component docs
5. **Ask for Help**: Reference MIGRATION_PATTERNS.md for examples

---

## 📞 Need Help?

1. Check **MIGRATION_PATTERNS.md** for code examples
2. Check **CHAKRA_V3_MIGRATION.md** for strategy
3. Use Chakra MCP `v2_to_v3_code_review` tool
4. Review Phase 1 implementations:
   - `src/components/SegmentedControl/`
   - `src/components/PasswordInput/`

---

**Last Updated**: 2024-12-24
**Current Phase**: Phase 1 Complete (2/70+ components)
