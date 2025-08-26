---
"@mindlogic-ai/logician-ui": minor
---

Add comprehensive SVG support and fix translation paths

- Added vite-plugin-svgr and svgo for proper SVG handling in development and Storybook
- Created TypeScript declarations for SVG imports
- Updated Vite and Storybook configurations to transform SVG imports into React components
- Added optimize-icons script for SVG optimization (reduced icon sizes by 15-78%)
- Fixed "Failed to execute 'createElement'" error in Storybook when rendering custom SVG icons
- Moved translations to src/translations/ for better organization
- Updated get-lang-pack.sh script to download to correct location
- Created formatTextForMarkdown utility for translation formatting
- Added @/translations/\* path alias to tsconfig.json
