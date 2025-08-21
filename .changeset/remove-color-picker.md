---
"logician-ui": minor
---

Remove ColorPicker component

- Removed ColorPicker component directory from src/components/
- Removed ColorPicker export from main index.ts
- Simplifies component API by removing color selection functionality
- ColorPicker was dependent on react-colorful which is no longer needed
