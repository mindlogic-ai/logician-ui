# Getting Started with Logician UI

Logician UI is a comprehensive React design system built on Chakra UI, providing 70+ production-ready components with TypeScript support, accessible by default, and optimized for modern web applications.

## Installation

### Prerequisites

- Node.js >= 16.0.0
- React >= 18.0.0
- Yarn >= 1.22.0 (recommended) or npm

### Install the Package

```bash
# Using yarn
yarn add @mindlogic-ai/logician-ui

# Using npm
npm install @mindlogic-ai/logician-ui
```

### Install Peer Dependencies

Logician UI requires several peer dependencies to function properly:

```bash
# Using yarn
yarn add @chakra-ui/react@^2.8.0 @emotion/react@^11.11.0 @emotion/styled@^11.11.0 framer-motion@^10.0.0

# Using npm
npm install @chakra-ui/react@^2.8.0 @emotion/react@^11.11.0 @emotion/styled@^11.11.0 framer-motion@^10.0.0
```

**Note**: If you're using Next.js, it's already included as an optional peer dependency.

## Setup

### 1. Wrap Your App with LogicianProvider

The `LogicianProvider` component provides the Logician design system theme to all child components. Place it at the root of your application:

```tsx
// app.tsx or _app.tsx (Next.js)
import { LogicianProvider } from '@mindlogic-ai/logician-ui';

function App() {
  return (
    <LogicianProvider>
      <YourApp />
    </LogicianProvider>
  );
}

export default App;
```

### 2. Next.js App Router Setup

If you're using Next.js 13+ with the App Router, create a providers component:

```tsx
// app/providers.tsx
'use client';

import { LogicianProvider } from '@mindlogic-ai/logician-ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return <LogicianProvider>{children}</LogicianProvider>;
}
```

Then use it in your root layout:

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 3. Next.js Pages Router Setup

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { LogicianProvider } from '@mindlogic-ai/logician-ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LogicianProvider>
      <Component {...pageProps} />
    </LogicianProvider>
  );
}
```

### 4. Vite Setup

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LogicianProvider } from '@mindlogic-ai/logician-ui';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LogicianProvider>
      <App />
    </LogicianProvider>
  </React.StrictMode>
);
```

## Your First Component

Now you're ready to use Logician UI components! Here's a simple example:

```tsx
import { Button, Card, H2, Text } from '@mindlogic-ai/logician-ui';

export default function HomePage() {
  return (
    <Card padding={6} borderRadius="lg" maxWidth="md" margin="auto">
      <H2 marginBottom={4}>Welcome to Logician UI</H2>
      <Text marginBottom={4}>
        Build beautiful, accessible interfaces with our design system.
      </Text>
      <Button variant="primary" onClick={() => alert('Hello!')}>
        Get Started
      </Button>
    </Card>
  );
}
```

## Component Categories

Logician UI provides components organized into these categories:

### Core Components
Alert, Accordion, Avatar, Badge, Banner, Breadcrumb, Button, Card, Carousel, Chip, Container, Tag

### Form Components
Checkbox, DatePicker, FileInput, FormControl, FormLabel, Input, PasswordInput, PinInput, Radio, Select, Slider, Switch, Textarea, UrlInput

### Navigation
Breadcrumb, Menu, Pagination, Tabs

### Feedback
Alert, Banner, Modal, Toast, Tooltip, Spinner, Loaders, ProgressBar

### Data Display
Code, CopyableCode, CodeTabs, DataField, ExpandableText, InlineCode, Markdown, MDXEditor, Table, Typography (H1-H5, Text, Link, Subtitle, Subtext)

### Icons
Icon, IconButton (supports 100+ icons from react-icons + custom SVG icons)

### Layout
Container, Masonry

### Charts & Data Visualization
LineGraph, RadialProgress, SegmentedProgressBar

## TypeScript Support

Logician UI is built with TypeScript and provides comprehensive type definitions:

```tsx
import { ButtonProps, InputProps, CardProps } from '@mindlogic-ai/logician-ui';

// All component props are fully typed
const buttonConfig: ButtonProps = {
  variant: 'primary',
  size: 'md',
  isDisabled: false,
};
```

## Customizing the Theme

You can customize the default theme by passing a custom theme to `LogicianProvider`:

```tsx
import { LogicianProvider } from '@mindlogic-ai/logician-ui';
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      500: '#your-color',
    },
  },
});

function App() {
  return (
    <LogicianProvider theme={customTheme}>
      <YourApp />
    </LogicianProvider>
  );
}
```

**Note**: The custom theme will be deeply merged with the default Logician theme. See the [Theming Guide](./theming.md) for more details.

## Tree-Shaking & Bundle Size

Logician UI is optimized for tree-shaking. Only import the components you use:

```tsx
// ✅ Good - only imports what you need
import { Button, Input } from '@mindlogic-ai/logician-ui';

// ⚠️ Avoid - imports entire library
import * as LogicianUI from '@mindlogic-ai/logician-ui';
```

## Storybook Documentation

Explore all components with live examples in our Storybook:

**[View Storybook →](https://mindlogic-storybook.vercel.app)**

## Next Steps

- **[Component Reference](./components.md)** - Browse all available components
- **[Theming Guide](./theming.md)** - Customize colors, typography, and more
- **[Icon Library](./icons.md)** - Explore available icons
- **[Accessibility](./accessibility.md)** - Learn about accessibility features
- **[Integration Guide](./integration.md)** - Framework-specific setup

## Common Issues

### "Module not found" errors

Make sure all peer dependencies are installed:
```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### TypeScript errors

Ensure you're using TypeScript >= 5.0 and have proper type definitions:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}
```

### Next.js "use client" errors

Logician UI uses "use client" directives for client-side components. This is normal and expected with Next.js App Router.

## Support

- **GitHub Issues**: [Report bugs](https://github.com/mindlogic-ai/logician-ui/issues)
- **Storybook**: [View live examples](https://mindlogic-storybook.vercel.app)
- **NPM**: [@mindlogic-ai/logician-ui](https://www.npmjs.com/package/@mindlogic-ai/logician-ui)
