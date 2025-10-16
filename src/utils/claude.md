# Utility Functions & Hooks

This guide covers the utility functions and custom hooks in the Logician UI design system.

## Directory Structure

```
src/
├── utils/              # Pure utility functions
│   ├── formatNumber.ts
│   ├── formatDateByLocale.ts
│   ├── formatFileSize.ts
│   ├── formatTextForMarkdown.ts
│   └── findKeyByValue.ts
└── hooks/              # Custom React hooks
    ├── useLocale.ts
    └── useTranslate.ts
```

## Utility Functions

### formatNumber

Formats numbers with thousands separators based on locale.

**Location:** `src/utils/formatNumber.ts`

```tsx
import { formatNumber, parseFormattedNumber } from '@/utils/formatNumber';

// Format a number
formatNumber(1234567);           // "1,234,567" (en-US)
formatNumber(1234567, 'de-DE');  // "1.234.567" (German)

// Parse formatted number back
parseFormattedNumber("1,234,567");  // 1234567
```

**Function signature:**
```tsx
formatNumber(
  value: number | string,
  locale?: string = 'en-US'
): string

parseFormattedNumber(formattedValue: string): number
```

**Use cases:**
- Display numbers in input fields (see Input component's `maskNumber` prop)
- Format currency displays
- Format large numbers for readability

### formatDateByLocale

Formats dates based on user locale with localized month names.

**Location:** `src/utils/formatDateByLocale.ts`

```tsx
import { formatDateByLocale } from '@/utils/formatDateByLocale';

const date = new Date('2024-01-15');

formatDateByLocale(date, 'en');     // "Jan 15, 2024"
formatDateByLocale(date, 'ko');     // "2024. 1. 15."
formatDateByLocale('2024-01-15', 'en');  // Also accepts strings
formatDateByLocale(undefined, 'en');     // Returns ''
```

**Function signature:**
```tsx
formatDateByLocale(
  date?: string | Date,
  locale?: string = 'en'
): string
```

**Locale-specific behavior:**
- **Korean (`ko`)**: Uses numeric months, no leading zeros
- **Other locales**: Uses abbreviated month names (Jan, Feb, etc.)

**Use cases:**
- Display dates in tables
- Format date picker outputs
- Show user-friendly dates in UI

### formatFileSize

Converts byte sizes to human-readable format (Bytes, KB, MB, GB, TB).

**Location:** `src/utils/formatFileSize.ts`

```tsx
import { formatFileSize } from '@/utils/formatFileSize';

formatFileSize(0);           // "0 Bytes"
formatFileSize(1024);        // "1KB"
formatFileSize(1536);        // "1.50KB"
formatFileSize(1048576);     // "1MB"
formatFileSize(1234567890);  // "1.15GB"
```

**Function signature:**
```tsx
formatFileSize(sizeInBytes: number): string
```

**Behavior:**
- Returns integers without decimals when size is whole number
- Returns 2 decimal places for fractional sizes
- No space between number and unit (e.g., "1.5MB" not "1.5 MB")

**Use cases:**
- File upload components
- Display file sizes in file lists
- Show storage usage

### formatTextForMarkdown

Converts escaped newlines to Markdown line breaks.

**Location:** `src/utils/formatTextForMarkdown.ts`

```tsx
import { formatForMarkdown } from '@/utils/formatTextForMarkdown';

const text = "Line 1\\nLine 2\\nLine 3";
formatForMarkdown(text);
// Returns: "Line 1  \nLine 2  \nLine 3"
// (two spaces before \n for Markdown line break)
```

**Function signature:**
```tsx
formatForMarkdown(text: string): string
```

**Use cases:**
- Prepare text for Markdown rendering
- Format user input for Markdown editors
- Convert escaped newlines in API responses

### findKeyByValue

Utility for finding keys in objects by value.

**Location:** `src/utils/findKeyByValue.ts`

**Use cases:**
- Reverse lookup in enums or maps
- Finding component variant names

## Custom Hooks

### useLocale

Provides current locale from LogicianProvider context.

**Location:** `src/hooks/useLocale.ts`

```tsx
import { useLocale } from '@/hooks/useLocale';

const MyComponent = () => {
  const { locale } = useLocale();
  // locale: 'en' | 'ko' | 'es' etc.

  return <Text>Current locale: {locale}</Text>;
};
```

**Use cases:**
- Get current user locale
- Conditional rendering based on language
- Pass to formatting utilities

### useTranslate

Translation hook for internationalization.

**Location:** `src/hooks/useTranslate.ts`

```tsx
import { useTranslate } from '@/hooks/useTranslate';

const MyComponent = () => {
  const t = useTranslate();

  return (
    <div>
      <Text>{t('common.save')}</Text>
      <Text>{t('errors.required')}</Text>
    </div>
  );
};
```

**Use cases:**
- Translate UI text
- Multi-language support
- Localized error messages

## Creating New Utility Functions

### Guidelines

1. **Pure functions**: Utilities should be side-effect free
2. **Single responsibility**: Each utility should do one thing well
3. **Type-safe**: Use TypeScript with proper types
4. **JSDoc comments**: Document parameters and return values
5. **Testable**: Easy to unit test

### Template

```tsx
/**
 * Brief description of what the function does
 * @param paramName - Description of parameter
 * @returns Description of return value
 */
export const utilityName = (
  paramName: ParamType,
  options?: OptionsType = defaultValue
): ReturnType => {
  // Validation
  if (!paramName) {
    return defaultValue;
  }

  // Implementation
  const result = someTransformation(paramName);

  return result;
};
```

### Example: New Utility

```tsx
/**
 * Truncates text to a maximum length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - String to append when truncated (default: '...')
 * @returns Truncated text with suffix if needed
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = '...'
): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - suffix.length) + suffix;
};
```

## Creating Custom Hooks

### Guidelines

1. **Name with `use` prefix**: Follow React naming convention
2. **Return stable references**: Use `useMemo`, `useCallback`
3. **Handle cleanup**: Use `useEffect` cleanup functions
4. **Type return values**: Export hook return type
5. **Document dependencies**: Clear comments about re-render triggers

### Template

```tsx
import { useState, useEffect, useCallback } from 'react';

export interface UseCustomHookOptions {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export interface UseCustomHookReturn {
  value: string;
  setValue: (newValue: string) => void;
  reset: () => void;
}

/**
 * Custom hook description
 * @param options - Configuration options
 * @returns Hook return value description
 */
export const useCustomHook = (
  options: UseCustomHookOptions = {}
): UseCustomHookReturn => {
  const { initialValue = '', onChange } = options;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    setValue,
    reset,
  };
};
```

## Common Patterns

### Locale-aware Utilities

When creating locale-dependent utilities:

```tsx
export const formatCurrency = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};
```

### Error Handling

Handle edge cases gracefully:

```tsx
export const parseJSON = <T = any>(
  jsonString: string,
  fallback?: T
): T | null => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return fallback ?? null;
  }
};
```

### Memoization

For expensive operations:

```tsx
import { useMemo } from 'react';

export const useExpensiveComputation = (data: any[]) => {
  return useMemo(() => {
    // Expensive computation here
    return data.map(item => heavyTransform(item));
  }, [data]);
};
```

## Best Practices

### 1. Use Intl API for Formatting

```tsx
// ✅ Good - supports all locales
new Intl.NumberFormat(locale).format(value);
new Intl.DateTimeFormat(locale, options).format(date);

// ❌ Bad - hardcoded format
value.toLocaleString();  // Uses system locale, not controlled
```

### 2. Validate Inputs

```tsx
// ✅ Good
export const formatDate = (date?: string | Date): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return dateObj.toISOString();
};

// ❌ Bad - no validation
export const formatDate = (date: Date): string => {
  return date.toISOString();  // Crashes if date is null/undefined
};
```

### 3. Provide Default Values

```tsx
// ✅ Good
export const formatNumber = (
  value: number,
  locale: string = 'en-US'  // Default provided
): string => { ... };

// ❌ Bad
export const formatNumber = (
  value: number,
  locale: string  // Required, less flexible
): string => { ... };
```

### 4. Export Related Utilities Together

```tsx
// ✅ Good - related functions in same file
// formatNumber.ts
export const formatNumber = ...
export const parseFormattedNumber = ...

// ❌ Bad - split across files unnecessarily
// formatNumber.ts
export const formatNumber = ...
// parseNumber.ts
export const parseFormattedNumber = ...
```

### 5. Keep Utilities Pure

```tsx
// ✅ Good - pure function
export const formatText = (text: string): string => {
  return text.toUpperCase();
};

// ❌ Bad - side effects
let lastFormatted = '';
export const formatText = (text: string): string => {
  lastFormatted = text.toUpperCase();  // Side effect!
  return lastFormatted;
};
```

## When to Create a Utility

Create a utility function when:

1. **Code is reused** in 3+ places
2. **Logic is complex** and deserves isolation
3. **Testing is important** for the transformation
4. **Formatting is consistent** across the app

Don't create a utility for:

1. **Single-use code** (inline it)
2. **Simple transformations** (`text.toUpperCase()`)
3. **Component-specific logic** (keep in component)

## Import Patterns

Always use path aliases:

```tsx
// ✅ Good
import { formatNumber } from '@/utils/formatNumber';
import { useLocale } from '@/hooks/useLocale';

// ❌ Bad
import { formatNumber } from '../../utils/formatNumber';
import { useLocale } from '../hooks/useLocale';
```

## Testing Utilities

Utilities should be easy to test:

```tsx
// formatNumber.test.ts
import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('formats numbers with thousands separators', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('handles different locales', () => {
    expect(formatNumber(1234567, 'de-DE')).toBe('1.234.567');
  });

  it('handles invalid input', () => {
    expect(formatNumber(NaN)).toBe('');
  });
});
```

## Common Utility Ideas

Consider creating utilities for:

- **Text manipulation**: truncate, capitalize, slugify
- **Validation**: email, phone, URL validation
- **Array helpers**: unique, groupBy, sortBy
- **Date utilities**: diffDays, isExpired, formatRelative
- **Color utilities**: hexToRgb, darken, lighten
- **URL helpers**: buildQueryString, parseQueryString
