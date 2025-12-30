# Build Scripts & Tooling

This guide covers the custom scripts and build tooling in the Logician UI design system.

## Scripts Overview

```
scripts/
├── optimize-icons.js         # SVG icon optimization
└── get-lang-pack.sh          # Translation file sync from S3

Root level:
├── check-component-exports.js  # Validates component exports
└── package.json                # npm scripts
```

## NPM Scripts

Available in `package.json`:

### Build Scripts
```bash
# Build the library (ESM + CJS)
yarn build

# Build in watch mode for development
yarn build:watch

# Pre-publish build (runs automatically)
yarn prepublishOnly
```

**Build configuration:** `tsup.config.ts`
- Output formats: ESM (`.mjs`) and CJS (`.js`)
- Type definitions: Generated with sourcemaps
- Code splitting: Enabled for tree-shaking
- External dependencies: React, Chakra UI, heavy deps
- Banner: `"use client"` for Next.js compatibility

### Development Scripts
```bash
# Start Storybook development server
yarn storybook

# Build Storybook for deployment
yarn build-storybook
```

### Code Quality Scripts
```bash
# Lint code
yarn lint

# Fix linting issues automatically
yarn lint:fix

# Type check without emitting files
yarn type-check

# Validate component exports
yarn check-exports
```

### Utility Scripts
```bash
# Optimize icon SVG files
yarn optimize-icons

# Sync translation files from S3
yarn update-intl
```

### Versioning Scripts
```bash
# Create a changeset for your changes
yarn changeset

# Update package versions from changesets
yarn changeset:version

# Check changeset status
yarn changeset:status

# Publish to npm (if configured)
yarn changeset:publish
```

## Script Details

### 1. optimize-icons.js

**Purpose:** Optimizes SVG icons using SVGO to reduce file size while preserving accessibility.

**Location:** `scripts/optimize-icons.js`

**Usage:**
```bash
yarn optimize-icons
```

**What it does:**
1. Finds all `.svg` files in `src/components/Icon/icons/`
2. Optimizes each SVG using SVGO
3. Preserves `viewBox` and `title` attributes for accessibility
4. Writes optimized SVGs back to the same location
5. Reports size savings for each file

**SVGO Configuration:**
```js
{
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,  // Keep for scaling
          removeTitle: false,    // Keep for accessibility
        },
      },
    },
  ],
}
```

**Output example:**
```
🚀 Optimizing Icon SVGs...

Found 15 SVG icon files:

✅ arrow-right.svg: 842B → 654B (-22.3%)
✅ check.svg: 512B → 398B (-22.3%)
✨ close.svg: Already optimized

🎉 Complete! 15/15 icons optimized.
```

**When to run:**
- After adding new SVG icons
- Before committing icon changes
- As part of build pipeline

### 2. get-lang-pack.sh

**Purpose:** Syncs translation files from AWS S3 bucket to local project.

**Location:** `scripts/get-lang-pack.sh`

**Prerequisites:**
- AWS CLI installed and configured
- Proper AWS credentials with S3 read access

**Usage:**
```bash
yarn update-intl
# or
./scripts/get-lang-pack.sh
```

**What it does:**
1. Checks if AWS CLI is installed
2. Creates `src/translations/` directory if needed
3. Lists files in S3 bucket `mindlogic-language-pack/logician_ui`
4. Syncs all translation files to `src/translations/`

**Configuration:**
```bash
BUCKET_NAME="mindlogic-language-pack/logician_ui"
LOCAL_DOWNLOAD_DIR="./src/translations"
```

**Output example:**
```
Listing files in S3 bucket: mindlogic-language-pack/logician_ui
2024-01-15 10:30:00    1234 en.json
2024-01-15 10:30:00    1567 ko.json
2024-01-15 10:30:00    1456 es.json

Downloading files from S3 bucket...
download: s3://mindlogic-language-pack/logician_ui/en.json to ./src/translations/en.json
download: s3://mindlogic-language-pack/logician_ui/ko.json to ./src/translations/ko.json
download: s3://mindlogic-language-pack/logician_ui/es.json to ./src/translations/es.json

Download complete. Files are saved in ./src/translations.
```

**When to run:**
- When translation files are updated in S3
- Before building for release
- When adding new language support

### 3. check-component-exports.js

**Purpose:** Validates that all component exports from individual components are properly re-exported in `src/index.ts`.

**Location:** `check-component-exports.js` (root)

**Usage:**
```bash
yarn check-exports
```

**What it does:**
1. Scans all component directories in `src/components/`
2. Parses `index.ts`/`index.tsx` to find component exports
3. Checks if those exports exist in main `src/index.ts`
4. Reports missing exports

**Success output:**
```
🔍 Checking individual component exports...

✅ All component exports are properly included in src/index.ts!
```

**Error output:**
```
🔍 Checking individual component exports...

❌ Components not exported at all in src/index.ts:
   - NewComponent

❌ Individual exports missing in src/index.ts:
   - Button.ButtonProps
     Available in component: [Button, ButtonProps, variantStyles]
     Exported in main: [Button, variantStyles]

💡 Fix by updating the exports in src/index.ts
```

**Validation rules:**
- Ignores type-only exports
- Handles `export *` statements
- Supports named exports and re-exports
- Checks both `.ts` and `.tsx` files

**When to run:**
- After adding new components
- After modifying component exports
- As part of CI/CD pipeline
- Before releases

**Exit codes:**
- `0`: All exports valid
- `1`: Missing or incorrect exports

## Build Configuration

### tsup.config.ts

Main build configuration for the library:

```ts
{
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,                    // Generate TypeScript definitions
  splitting: true,              // Enable code splitting
  sourcemap: true,              // Generate source maps (dev only)
  clean: true,                  // Clean dist/ before build
  external: [                   // Don't bundle these
    'react',
    'react-dom',
    '@chakra-ui/react',
    '@emotion/react',
    '@emotion/styled',
    'framer-motion',
    '@mdxeditor/editor',
    'react-syntax-highlighter',
    'recharts',
    'react-markdown',
    'katex',
    'lodash',
    'date-fns',
  ],
  banner: {
    js: '"use client"',         // Next.js compatibility
  },
  treeshake: true,              // Remove unused code
  minify: false,                // Keep readable for debugging
}
```

**Key features:**
- Dual format output (ESM + CJS)
- Tree-shakable exports
- TypeScript type definitions
- Next.js "use client" directive
- External peer dependencies
- SVGR plugin for SVG imports

## ESLint Configuration

**File:** `.eslintrc.js`

**Plugins:**
- `@typescript-eslint` - TypeScript linting
- `react` - React-specific rules
- `react-hooks` - Hooks linting
- `import` - Import/export rules
- `simple-import-sort` - Auto-sort imports
- `unused-imports` - Remove unused imports
- `prettier` - Code formatting
- `storybook` - Storybook-specific rules

**Key rules:**
```js
'react-hooks/rules-of-hooks': 'error'
'react-hooks/exhaustive-deps': 'warn'
'unused-imports/no-unused-imports': 'error'
'simple-import-sort/imports': 'error'
```

## CI/CD Integration

### Recommended GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: yarn install
      - run: yarn lint
      - run: yarn type-check
      - run: yarn check-exports
      - run: yarn build
```

### Pre-commit Hooks

Consider using Husky + lint-staged:

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## Development Workflow

### Adding a New Component

1. Create component files
2. Export from component's `index.tsx`
3. Add to `src/index.ts`
4. Run validation:
   ```bash
   yarn check-exports
   yarn lint
   yarn type-check
   ```
5. Create Storybook story
6. Test in Storybook:
   ```bash
   yarn storybook
   ```

### Adding New Icons

1. Add `.svg` files to `src/components/Icon/icons/`
2. Optimize icons:
   ```bash
   yarn optimize-icons
   ```
3. Update Icon component if needed
4. Test in Storybook

### Updating Translations

1. Update translation files in S3
2. Sync locally:
   ```bash
   yarn update-intl
   ```
3. Test translated components

### Pre-release Checklist

```bash
# 1. Ensure code quality
yarn lint
yarn type-check
yarn check-exports

# 2. Build successfully
yarn build

# 3. Create changeset
yarn changeset

# 4. Test in Storybook
yarn storybook

# 5. Update versions (when ready)
yarn changeset:version

# 6. Publish (if configured)
yarn changeset:publish
```

## Troubleshooting

### Build Failures

**Issue:** Build fails with type errors
```bash
# Check TypeScript errors
yarn type-check

# Clean and rebuild
rm -rf dist node_modules
yarn install
yarn build
```

**Issue:** Module not found errors
- Check `tsup.config.ts` external dependencies
- Verify peer dependencies are installed
- Check path aliases in `tsconfig.json`

### Export Validation Failures

**Issue:** `check-exports` reports missing exports
1. Check `src/index.ts` has the export
2. Verify component's `index.tsx` exports correctly
3. Ensure export format matches (named vs default)
4. Run `yarn check-exports` for detailed report

### Icon Optimization Issues

**Issue:** Icons look broken after optimization
- SVG might have special requirements
- Check SVGO config in `optimize-icons.js`
- Add file to exclusion list if needed
- Manually verify optimized SVG

### Translation Sync Issues

**Issue:** AWS CLI not found
```bash
# Install AWS CLI
brew install awscli  # macOS
# or follow: https://aws.amazon.com/cli/

# Configure credentials
aws configure
```

**Issue:** Access denied to S3
- Verify AWS credentials
- Check IAM permissions for S3 read access
- Confirm bucket name is correct

## Custom Script Template

When creating new scripts:

```js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 Starting script...\n');

  try {
    // Script logic here

    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
```

**Best practices:**
- Use emoji for visual feedback (🚀 ✅ ❌)
- Provide clear error messages
- Exit with proper codes (0 = success, 1 = error)
- Make executable: `chmod +x script.js`
- Add shebang: `#!/usr/bin/env node`
- Support both CLI and module usage
- Log progress for long operations
