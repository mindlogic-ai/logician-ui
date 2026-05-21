---
'@mindlogic-ai/logician-ui': minor
---

feat(Select): replace react-select with Chakra-based Select and Combobox

The `Select` component is no longer a `react-select` wrapper. It is now a
compound-component namespace built on Chakra v3's Select primitives and
styled to match `Input` (border, hover, focus, invalid and disabled
states share the same tokens). A matching `Combobox` namespace is added
for searchable selects.

Two convenience components cover the common single-select case:

- `SelectField` — single-select dropdown (`options` / `value` / `onChange`)
- `ComboboxField` — searchable single-select with text filtering

### Breaking change

The previous `react-select` API is removed. Consumers of `<Select />`
should migrate to `<SelectField />`:

```tsx
// Before
<Select options={options} value={selectedOption} onChange={handleChange} />

// After
<SelectField options={options} value={value} onChange={handleChange} />
```

`value` / `onChange` now work with the option's `value` (`T`) directly
rather than the whole option object. The `react-select`-specific props
(`styles`, `isMulti`, `isSearchable`, `menuPlacement`, …) no longer
exist — use the `Select` / `Combobox` namespaces for multi-select,
grouped options and custom layouts.

The `react-select` and `@tanstack/react-virtual` dependencies have been
dropped.
