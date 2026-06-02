# Icon Management

## File Structure

```
src/components/Icon/
├── _constants/
│   └── iconList.ts            # All icon imports + Icons object (calls createIcon for each)
├── _utils/
│   ├── createIcon.tsx         # Factory: wraps any icon component with Chakra + size/color defaults
│   └── createIconGroup.tsx    # Helper: creates multiple icons at once from a map
├── icons/                     # Custom SVG files
├── Icon.stories.tsx
└── index.tsx                  # Destructures Icons object and re-exports individually
```

## Adding a New Icon

### React Icons

1. Import and add to `_constants/iconList.ts`:

```typescript
import { FaBuildingUser } from 'react-icons/fa6';

const iconList = {
  // ... existing icons
  FaBuildingUser,
};
```

2. Re-export from `index.tsx`:

```typescript
export const {
  // ... existing
  FaBuildingUser,
} = Icons;
```

### Custom SVG Icons

1. Add the `.svg` file to `icons/`
2. Import and add to `_constants/iconList.ts`:

```typescript
import MyNewIcon from '../icons/my-new-icon.svg';

const iconList = {
  // ... existing icons
  MyNewIcon,
};
```

3. Re-export from `index.tsx` (same as above).

## Usage

```typescript
import { FaBuildingUser, MyNewIcon } from '@mindlogic-ai/logician-ui';

<FaBuildingUser boxSize="lg" />
<MyNewIcon boxSize="md" color="blue.500" />
```

## Defaults

All icons created via `createIcon` share these defaults (set in `_utils/createIcon.tsx`):

| Prop      | Default   |
|-----------|-----------|
| `boxSize` | `'md'` (24px) |
| `color`   | `'gray.600'` |

Override per usage: `<MyIcon color="primary.main" />`.

## Size Reference

| boxSize | px  |
|---------|-----|
| `xs`    | 16px |
| `sm`    | 20px |
| `md`    | 24px |
| `lg`    | 32px |
| `xl`    | 40px |
