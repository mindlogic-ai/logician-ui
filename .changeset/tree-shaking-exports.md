---
"@mindlogic-ai/logician-ui": minor
---

Add per-component exports for optimized tree-shaking

Consumers can now import individual components for better tree-shaking and smaller bundle sizes:

```typescript
// Traditional import (still supported)
import { Button, Card } from '@mindlogic-ai/logician-ui';

// New: per-component imports (better tree-shaking)
import { Button, type ButtonProps } from '@mindlogic-ai/logician-ui/button';
import { Card, type CardProps } from '@mindlogic-ai/logician-ui/card';
```

**Benefits:**
- Smaller bundle sizes with improved tree-shaking
- All 65 components now available as individual exports
- Full TypeScript support with type definitions for each component
- Fully backward compatible - existing imports continue to work
- Main export supports both ESM and CJS
- Individual component exports use ESM-only for optimal tree-shaking

**Available exports:**
- Main: `@mindlogic-ai/logician-ui` (ESM + CJS + types)
- Icons: `@mindlogic-ai/logician-ui/icons` (ESM + CJS + types)
- All components: `@mindlogic-ai/logician-ui/[component-name]` (ESM + types)

**Technical details:**
- Two-pass build: tsup for JavaScript bundling, tsc for reliable type generation
- Type definitions use the official TypeScript compiler for maximum accuracy
- Component exports include proper type mappings in package.json

No migration required - this is a purely additive feature.
