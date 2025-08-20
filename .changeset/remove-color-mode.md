---
"logician-design-system": major
---

Remove color mode functionality and simplify to light mode only

- Removed `store/colorMode.ts` and all color mode switching functionality
- Simplified Icon, Card, and TabList components to use light mode styles only
- Removed ErrorBoundary component (had external dependencies)
- Recovered MonthRangePicker component and added back `date-fns` dependency
- Created `useLocale` hook stub for MonthRangePicker support
- Updated tsconfig.json to remove store path references and exclude problematic components
- Design system now only supports light mode for consistency and simplicity
