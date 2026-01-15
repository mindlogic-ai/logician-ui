---
"@mindlogic-ai/logician-ui": patch
---

Responsive typography system and component improvements

**Typography Updates:**
- Override Chakra v3 default textStyles (2xs-7xl) with responsive scaling
- Mobile: base size, Desktop (md+): one size up for better readability
- Update custom Logician textStyles (h1-h5, p, subtitle, subtext) with consistent scaling
- Update Palette storybook to reflect actual theme values

**Modal Component API Changes:**
- Remove auto-rendered `<ModalOverlay />` from Modal component
- Remove Portal wrapper from ModalContent for simpler composition
- Users must now explicitly add `<ModalOverlay />` when using Modal
- **Note:** This is a breaking change in Modal usage pattern

**Component Bug Fixes:**
- Button: Remove fontSize override for xs size (now handled by theme)
- InfoSprinkle: Add optional chaining for iconButtonProps.size
- Markdown: Reduce gap from 1.2em to 1em for better spacing
- Pagination: Add whiteSpace="nowrap" to items per page label
