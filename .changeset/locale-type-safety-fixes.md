---
"@mindlogic-ai/logician-ui": patch
---

fix: improve locale type safety and fix date format issues

- Add `SupportedLocale` union type derived from LOCALE_MAP keys, applied to LogicianProvider, useLocale, and all date helper functions
- Export `useLocale`, `LocaleContext`, and `LocaleContextValue` from package entry point
- Fix 2-digit year format (yy → yyyy) in getDefaultFullDateFormat
- Fix RangeDatePicker showing raw format string as end-date placeholder
