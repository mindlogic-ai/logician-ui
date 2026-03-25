---
"@mindlogic-ai/logician-ui": patch
---

Fix SegmentedControl sizing and layout shift issues

- Width now sizes to fit content (`fit-content`) instead of stretching full width
- Items maintain equal width based on the longest label
- Prevent text wrapping in item labels (`whiteSpace: nowrap`)
- Prevent layout shift when `fontWeight` changes on selection (pseudo-element trick)
- Add `cursor: pointer` on items
- Font size now scales with `size` prop to match equivalent Chakra button sizes
- Refactor: styles moved from root CSS selectors onto individual sub-components
