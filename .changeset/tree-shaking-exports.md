---
"@mindlogic-ai/logician-ui": minor
---

Add per-component exports for optimized tree-shaking

Consumers can now import individual components for better tree-shaking and smaller bundle sizes:

```typescript
// Traditional import (still supported)
import { Button, Card } from '@mindlogic-ai/logician-ui';

// New: per-component imports (better tree-shaking)
import { Button } from '@mindlogic-ai/logician-ui/button';
import { Card } from '@mindlogic-ai/logician-ui/card';
```

**Benefits:**
- Smaller bundle sizes with improved tree-shaking
- All 63 components now available as individual exports
- Fully backward compatible - existing imports continue to work
- Main export supports both ESM and CJS
- Individual component exports use ESM-only for optimal tree-shaking

**Available exports:**
- Main: `@mindlogic-ai/logician-ui` (ESM + CJS)
- Icons: `@mindlogic-ai/logician-ui/icons` (ESM + CJS)
- All components: `@mindlogic-ai/logician-ui/[component-name]` (ESM only)

No migration required - this is a purely additive feature.
