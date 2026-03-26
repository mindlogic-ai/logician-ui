---
"@mindlogic-ai/logician-ui": minor
---

feat: FormLabel RequiredIndicator, Select styles fix, Badge sizes, FileItem tooltips/download loading, Input bg, MonthPicker showClearButton rename

- FormLabel: show Field.RequiredIndicator when FormControl has required prop (via Chakra v3 Field context)
- Select: pass Logician-merged styles as base to consumer style callbacks (fixes Pagination border color)
- Select: fix option flicker on mouse leave by removing isFocused from background condition
- Badge: add size prop (sm/md/lg) with textStyle presets (subtext/subtitle)
- FileItem: add tooltips on download/delete icons, add isDownloading prop with spinner
- Input: set default background to white
- MonthPicker: rename showResetButton to showClearButton
