---
"@mindlogic-ai/logician-ui": major
---

**Breaking: Menu refactored to compound component pattern**

`Menu` is now the root element (wraps `ChakraMenu.Root`) with a `baseFontSize` prop (default `'14px'`). Menu content is automatically wrapped in `ScaledContext`. `MenuButton` is removed — use `Menu.Trigger asChild` instead.

**Migration**
```tsx
// Before
<Menu.Root>
  <MenuButton as={Button}>Open</MenuButton>
  <MenuList><MenuItem value="x">Item</MenuItem></MenuList>
</Menu.Root>

// After
<Menu>
  <Menu.Trigger asChild><Button>Open</Button></Menu.Trigger>
  <Menu.List><Menu.Item value="x">Item</Menu.Item></Menu.List>
</Menu>
```

Exposes: `Menu.Trigger`, `Menu.TriggerItem`, `Menu.ContextTrigger`, `Menu.List`, `Menu.Item`, `Menu.ItemGroup`, `Menu.ItemGroupLabel`, `Menu.ItemCommand`, `Menu.CheckboxItem`, `Menu.RadioItem`, `Menu.RadioItemGroup`, `Menu.Separator`, `Menu.Arrow`, `Menu.ArrowTip`
