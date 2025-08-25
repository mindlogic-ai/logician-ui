---
"@mindlogic-ai/logician-ui": patch
---

Replace @chakra-ui/icons usage with custom Icon component equivalents

- Replaced ChevronDownIcon with IoChevronDownOutline in Menu stories
- Replaced PhoneIcon with IoCall in Input stories
- Replaced SearchIcon with IoSearch in Input stories
- Added IoCall icon to REACT_ICONS_MAP for phone functionality
- Removed dependency on @chakra-ui/icons package
- All icon functionality now uses the unified Icon component system
