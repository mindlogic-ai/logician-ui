---
"logician-ui": minor
---

Reorganize project structure with src directory for better organization

- Moved all source code (components, utils, hooks, theme, index.ts) into src/ directory
- Updated package.json main and types fields to point to src/index.ts
- Updated tsconfig.json paths and includes for new structure
- Updated Storybook configuration to find stories in src/components
- Updated Vite configuration aliases to point to src directory
- Created root index.ts that re-exports from src for backwards compatibility
- Updated documentation examples to reflect new import paths
- Follows modern project organization standards
