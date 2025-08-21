---
"logician-ui": major
---

Clean up dependencies and remove unused components

- Removed `EditableImage` and `ToggleableInput` components (Formik dependencies)
- Removed `SelectDate` component (external form dependencies)
- Cleaned up package.json dependencies:
  - Removed unused `react-hook-form`
  - Removed unused `formik`
  - Fixed `lottie-react` → `react-lottie-player`
  - Removed unused `react-window`
- All remaining dependencies are actively used by components
- Improved TypeScript configuration for better compilation
