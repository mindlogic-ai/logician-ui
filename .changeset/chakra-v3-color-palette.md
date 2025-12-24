---
"@mindlogic-ai/logician-ui": minor
---

Migrate to Chakra UI v3 `colorPalette` prop (Phase 2: Quick Wins)

**Breaking Changes**: None - fully backward compatible

**Changes**:
- ✅ Renamed `colorScheme` → `colorPalette` across all components (Button, IconButton, Tag)
- ✅ Updated type definitions: `ButtonColorScheme` → `ButtonColorPalette`, `TagColorScheme` → `TagColorPalette`, `IconButtonColorScheme` → `IconButtonColorPalette`
- ✅ Updated all internal component usages to use `colorPalette`
- ✅ Maintained full backward compatibility with deprecated `colorScheme` prop

**Backward Compatibility**:
- All components still accept `colorScheme` prop (deprecated, will be removed in next major version)
- Deprecated exports maintained: `buttonColorSchemes`, `tagColorSchemes`, `iconButtonColorSchemes`
- No consumer code needs to change - existing usage continues to work

**Migration Guide**:
```tsx
// Old (still works, but deprecated)
<Button colorScheme="primary" variant="solid">Submit</Button>
<Tag colorScheme="danger" variant="soft">Error</Tag>

// New (recommended)
<Button colorPalette="primary" variant="solid">Submit</Button>
<Tag colorPalette="danger" variant="soft">Error</Tag>
```

**Components Updated**:
- Button, IconButton, Tag (core components)
- MonthPicker, Pagination, DataField, GuideCue, FileItem, CodeTabs, CopyableCode, Code components
- All Storybook stories updated to use `colorPalette`

**Known Issues**:
- DatePicker components temporarily removed calendar icon due to `chakra-dayzed-datepicker` library not yet supporting Chakra v3's removal of `leftIcon` prop. Will be restored when library updates.

**Documentation**:
See `/CHAKRA_V3_MIGRATION.md` and `/MIGRATION_PATTERNS.md` for complete migration guide and patterns.
