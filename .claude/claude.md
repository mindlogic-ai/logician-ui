# Logician UI - Claude Code Instructions

React component library built on Chakra UI v3.3+. Published to npm as `@mindlogic-ai/logician-ui`.

**Stack**: TypeScript, tsup (esbuild), Storybook 8.5, Changesets, Yarn

## 접근성 — 먼저 읽을 것

이 저장소의 컴포넌트로 그려지는 앱(FactChat)은 **KWCAG 2.1 웹 접근성 품질인증**을
유지해야 합니다. 여기서 난 결함 하나는 그 컴포넌트를 쓰는 **모든 화면**에서 납니다.

컴포넌트를 만들거나 파트 조합(`Select` · `Combobox` · `Slider` · `Menu` · `Popover`
…)을 바꾸기 전에 **[`ACCESSIBILITY.md`](../ACCESSIBILITY.md)** 를 읽으십시오. 실제로
났던 결함 아홉 가지가 어떤 모양이었는지가 적혀 있고, 그중 셋은 같은 원인이었습니다 —
레이블 파트를 렌더하지 않으면 컨트롤은 레이블이 없는 게 아니라 **이름이 없습니다**.

`yarn test` 가 그 결함들을 붙잡고 있고 매 PR 에서 돕니다.

## Development Workflow

### Common Commands

```bash
# Install dependencies
yarn install

# Start Storybook for component development (http://localhost:6006)
yarn storybook

# Build Storybook for deployment
yarn build-storybook

# Build the library (outputs to dist/)
yarn build

# Watch mode for development
yarn build:watch

# Linting
yarn lint              # Check for issues
yarn lint:fix          # Auto-fix issues

# Type checking
yarn type-check        # Run TypeScript type checking (no output files)

# Icon optimization
yarn optimize-icons    # Optimize SVG icons using the optimize-icons.js script

# Update translations
yarn update-intl       # Update internationalization using get-lang-pack.sh script

# Validate component exports
yarn check-exports
```

### Release Management

```bash
# After making changes, create a changeset
yarn changeset

# Select change type:
# - major: Breaking changes, component API changes
# - minor: New components, new features (non-breaking)
# - patch: Bug fixes, docs, internal improvements

# Update versions and CHANGELOG (done before release)
yarn changeset:version

# Check changeset status
yarn changeset:status

# Publish to npm (if configured)
yarn changeset:publish
```

## Architecture

### Component Structure

Each component follows a consistent pattern:
```
ComponentName/
├── ComponentName.tsx          # Main component implementation
├── ComponentName.types.ts     # TypeScript type definitions
├── ComponentName.styles.ts    # Style variants and configurations (optional)
├── ComponentName.stories.tsx  # Storybook documentation
└── index.tsx                  # Public exports
```

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/components/*` → `src/components/*`
- `@/utils/*` → `src/utils/*`
- `@/hooks/*` → `src/hooks/*`
- `@/theme/*` → `src/theme/*`
- `@/translations/*` → `src/translations/*`

### Source Structure

```
src/
├── components/      # All UI components (70+)
├── theme/          # Chakra UI theme customization
├── utils/          # Shared utility functions
├── hooks/          # Reusable React hooks
├── translations/   # i18n support (Korean via get-lang-pack.sh)
├── types/          # Shared TypeScript types
└── index.ts        # Main export file (categorized exports)
```

## Build Configuration

### tsup Build

- Outputs: ESM + CJS with `.d.ts` and sourcemaps
- `"use client"` banner for Next.js
- Externalized: React, Chakra UI, @emotion, framer-motion, @mdxeditor/editor, recharts, lodash, date-fns, katex

### ESLint

TypeScript ESLint + React + Prettier. Auto-removes unused imports. Simple import sorting.

## Development Guidelines

### Adding a New Component

1. Create component directory: `src/components/ComponentName/`
2. Create required files:
   - `ComponentName.tsx` - Component implementation using `forwardRef`
   - `ComponentName.types.ts` - Export props interface
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.tsx` - Re-export the component
3. Add styles if needed: `ComponentName.styles.ts`
4. Add export to `src/index.ts` (follow existing categorization)
5. Run `yarn check-exports` to validate
6. Add changeset using `yarn changeset`
7. Ensure responsive design and accessibility compliance

### Component Patterns

- Use `forwardRef` for ref forwarding
- Extend Chakra UI components when possible
- Define variant systems for component states
- Use semantic tokens from theme
- Provide sensible defaults
- Support responsive props
- Ensure accessibility (WAI-ARIA)

### Styling

- Leverage Chakra UI's style props
- Use theme tokens for consistency
- Define variants in `.styles.ts` files
- Use `useTheme()` and `useToken()` hooks
- Support focus states with proper outlines

### Testing Components

- Use Storybook for visual testing and documentation
- Test responsive behavior across screen sizes
- Verify keyboard navigation and screen reader compatibility
- Run type checking and linting before committing

### Pull Request Requirements

- Add Storybook stories for new components
- Update TypeScript type definitions
- Verify responsive design
- Add changeset for version management (if needed)
- Export new components in src/index.ts
- Include screenshots of visual changes
- Test keyboard navigation and accessibility

## Git Workflow

- Main branch: `dev`
- Use conventional commits
- Always create changesets for versioning
- Run `yarn lint` and `yarn type-check` before committing
