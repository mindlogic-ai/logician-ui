# Integration Guide

Framework-specific setup and integration patterns for Logician UI.

## Table of Contents

- [Next.js](#nextjs)
- [Vite](#vite)
- [Create React App](#create-react-app)
- [Remix](#remix)
- [TypeScript Configuration](#typescript-configuration)
- [Form Libraries](#form-libraries)
- [State Management](#state-management)
- [Server-Side Rendering](#server-side-rendering)
- [Styling Integration](#styling-integration)

---

## Next.js

Logician UI works seamlessly with Next.js 13+ (App Router) and Next.js 12 (Pages Router).

### Next.js 13+ (App Router)

#### 1. Install Dependencies

```bash
yarn add @mindlogic-ai/logician-ui @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

#### 2. Create Providers Component

Create `app/providers.tsx`:

```tsx
'use client';

import { LogicianProvider } from '@mindlogic-ai/logician-ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return <LogicianProvider>{children}</LogicianProvider>;
}
```

**Important:** The `'use client'` directive is required because Chakra UI uses React hooks and context.

#### 3. Update Root Layout

Modify `app/layout.tsx`:

```tsx
import { Providers } from './providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with Logician UI',
};

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

#### 4. Use Components

In any page or component:

```tsx
// app/page.tsx
import { Button, H1, Text } from '@mindlogic-ai/logician-ui';

export default function HomePage() {
  return (
    <main>
      <H1>Welcome</H1>
      <Text>Built with Logician UI</Text>
      <Button variant="primary">Get Started</Button>
    </main>
  );
}
```

#### 5. Server Components

Logician UI components are **client components** (they use hooks and state). You can still use Next.js Server Components for data fetching:

```tsx
// app/users/page.tsx (Server Component)
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return <UserList users={users} />;  // Client component
}

// components/UserList.tsx (Client Component)
'use client';

import { Card, Text } from '@mindlogic-ai/logician-ui';

export function UserList({ users }) {
  return (
    <>
      {users.map(user => (
        <Card key={user.id}>
          <Text>{user.name}</Text>
        </Card>
      ))}
    </>
  );
}
```

#### 6. Custom Theme

```tsx
// app/providers.tsx
'use client';

import { LogicianProvider } from '@mindlogic-ai/logician-ui';
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  // Your customizations
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LogicianProvider theme={customTheme}>
      {children}
    </LogicianProvider>
  );
}
```

### Next.js 12 (Pages Router)

#### 1. Install Dependencies

Same as App Router.

#### 2. Create `_app.tsx`

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

#### 3. Use Components

```tsx
// pages/index.tsx
import { Button, H1, Text } from '@mindlogic-ai/logician-ui';

export default function HomePage() {
  return (
    <main>
      <H1>Welcome</H1>
      <Text>Built with Logician UI</Text>
      <Button variant="primary">Get Started</Button>
    </main>
  );
}
```

### Next.js Font Optimization

Optimize fonts with `next/font`:

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

Then update your theme:

```tsx
// app/providers.tsx
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'var(--font-inter)',
    body: 'var(--font-inter)',
  },
});
```

### MDX Support

If using MDX with Next.js:

```tsx
// next.config.js
const withMDX = require('@next/mdx')();

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
});
```

Use Logician UI's Markdown component:

```tsx
import { Markdown } from '@mindlogic-ai/logician-ui';

<Markdown content={mdxContent} />
```

---

## Vite

### Setup

#### 1. Install Dependencies

```bash
yarn add @mindlogic-ai/logician-ui @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

#### 2. Update `main.tsx`

```tsx
// src/main.tsx
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

#### 3. Use Components

```tsx
// src/App.tsx
import { Button, H1, Text } from '@mindlogic-ai/logician-ui';

function App() {
  return (
    <main>
      <H1>Welcome</H1>
      <Text>Built with Logician UI</Text>
      <Button variant="primary">Get Started</Button>
    </main>
  );
}

export default App;
```

### Vite Configuration

For optimal performance, configure Vite to optimize dependencies:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },
});
```

---

## Create React App

### Setup

#### 1. Install Dependencies

```bash
yarn add @mindlogic-ai/logician-ui @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

#### 2. Update `index.tsx`

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LogicianProvider } from '@mindlogic-ai/logician-ui';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LogicianProvider>
      <App />
    </LogicianProvider>
  </React.StrictMode>
);
```

#### 3. Use Components

Same as Vite example.

---

## Remix

### Setup

#### 1. Install Dependencies

```bash
yarn add @mindlogic-ai/logician-ui @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

#### 2. Update `root.tsx`

```tsx
// app/root.tsx
import { LogicianProvider } from '@mindlogic-ai/logician-ui';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <LogicianProvider>
          <Outlet />
        </LogicianProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

#### 3. Handle Emotion SSR

Create `entry.server.tsx`:

```tsx
// app/entry.server.tsx
import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import type { EntryContext } from '@remix-run/node';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createCache({ key: 'css' });
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const html = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  const chunks = extractCriticalToChunks(html);

  const markup = renderToString(
    <>
      <style
        data-emotion={`css ${chunks.styles.map(s => s.key).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: chunks.styles.map(s => s.css).join(''),
        }}
      />
      <RemixServer context={remixContext} url={request.url} />
    </>
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
```

---

## TypeScript Configuration

### Recommended `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "types": ["react", "react-dom"]
  },
  "include": ["src"]
}
```

### Path Aliases (Optional)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

Update Vite config:

```ts
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## Form Libraries

### React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from '@mindlogic-ai/logician-ui';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          type="email"
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          type="password"
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" variant="primary">
        Sign In
      </Button>
    </form>
  );
}
```

### Formik

```tsx
import { Formik, Form, Field } from 'formik';
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from '@mindlogic-ai/logician-ui';

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = 'Email is required';
        }
        return errors;
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="email">
            {({ field }) => (
              <FormControl isInvalid={errors.email && touched.email}>
                <FormLabel>Email</FormLabel>
                <Input {...field} type="email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
```

---

## State Management

### Zustand

```tsx
import create from 'zustand';
import { Button, Text } from '@mindlogic-ai/logician-ui';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const { count, increment } = useStore();

  return (
    <>
      <Text>Count: {count}</Text>
      <Button onClick={increment}>Increment</Button>
    </>
  );
}
```

### Redux Toolkit

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';
import { Button, Text } from '@mindlogic-ai/logician-ui';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <Text>Count: {count}</Text>
      <Button onClick={() => dispatch(increment())}>
        Increment
      </Button>
    </>
  );
}
```

---

## Server-Side Rendering

### Emotion SSR

For SSR frameworks (Next.js handles this automatically):

```tsx
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';

const cache = createCache({ key: 'css' });
const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  createEmotionServer(cache);

// In your server render:
const html = renderToString(<App />);
const chunks = extractCriticalToChunks(html);
const styles = constructStyleTagsFromChunks(chunks);
```

### Hydration Issues

If you encounter hydration mismatches:

1. Ensure server and client render the same content
2. Use `suppressHydrationWarning` for dynamic content:

```tsx
<div suppressHydrationWarning>
  {typeof window !== 'undefined' ? clientContent : serverContent}
</div>
```

3. Use `useEffect` for client-only rendering:

```tsx
import { useState, useEffect } from 'react';

function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
```

---

## Styling Integration

### Emotion

Logician UI uses Emotion internally. You can use Emotion directly:

```tsx
import styled from '@emotion/styled';
import { Button } from '@mindlogic-ai/logician-ui';

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  &:hover {
    background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
  }
`;
```

### Tailwind CSS

While Logician UI uses Chakra's style props, you can use Tailwind alongside:

```tsx
import { Box } from '@chakra-ui/react';
import { Button } from '@mindlogic-ai/logician-ui';

function Component() {
  return (
    <Box className="container mx-auto px-4">
      <Button variant="primary" className="mt-4">
        Click Me
      </Button>
    </Box>
  );
}
```

**Note:** Prefer Chakra style props for consistency.

---

## Common Issues & Solutions

### Build Errors

**Issue:** `Module not found: Can't resolve '@chakra-ui/react'`

**Solution:** Install peer dependencies:
```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

---

**Issue:** TypeScript errors with component props

**Solution:** Ensure TypeScript version ≥5.0:
```bash
yarn add -D typescript@^5.0.0
```

---

### Runtime Issues

**Issue:** `Uncaught Error: Rendered more hooks than during the previous render`

**Solution:** Ensure React version ≥18.0:
```bash
yarn add react@^18.0.0 react-dom@^18.0.0
```

---

**Issue:** Flash of unstyled content (FOUC)

**Solution:** For SSR, ensure Emotion styles are extracted and injected (Next.js handles this automatically).

---

### Performance

**Issue:** Large bundle size

**Solution:**
1. Use tree-shaking (import only what you need)
2. Code split heavy components:
```tsx
import dynamic from 'next/dynamic';

const MDXEditor = dynamic(
  () => import('@mindlogic-ai/logician-ui').then(mod => mod.MDXEditor),
  { ssr: false }
);
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Chakra UI SSR Guide](https://chakra-ui.com/docs/styled-system/features/server-side-rendering)
- [Emotion SSR](https://emotion.sh/docs/ssr)
- [React Hook Form](https://react-hook-form.com/)
