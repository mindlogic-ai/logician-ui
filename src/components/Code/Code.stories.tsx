import { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';
import { BUNDLED_LANGUAGES } from './shikiAdapter';

const meta = {
  title: 'Components/Code',
  component: Code,
  args: {
    children: `const t = 'test';`,
  },
  argTypes: {
    language: {
      control: 'select',
      options: BUNDLED_LANGUAGES,
    },
  },
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof Code>;

export const Basic: Story = {
  args: {
    children: `const t = 'test';`,
  },
};

export const WithCopyButton: Story = {
  args: {
    language: 'typescript',
    children: `import { Code } from '@mindlogic-ai/logician-ui';

export const Example = () => (
  <Code
    language="typescript"
    onCopy={(str) => navigator.clipboard.writeText(str)}
  >
    {'const greeting = "hello";'}
  </Code>
);`,
    onCopy: (str) => {
      navigator.clipboard.writeText(str);
      console.log('Copied:', str);
    },
  },
};

export const TypeScript: Story = {
  args: {
    language: 'typescript',
    children: `type User = {
  id: string;
  name: string;
  email: string;
};

const getUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
};`,
  },
};

export const JSON: Story = {
  args: {
    language: 'json',
    children: `{
  "name": "@mindlogic-ai/logician-ui",
  "version": "1.0.0",
  "private": false,
  "dependencies": {
    "react": "^18.0.0",
    "@chakra-ui/react": "^3.3.0"
  }
}`,
  },
};

export const Bash: Story = {
  args: {
    language: 'bash',
    children: `# Install dependencies and run Storybook
yarn install
yarn storybook

# Build the library
yarn build`,
  },
};

export const JsAlias: Story = {
  args: {
    language: 'js',
    children: `// The 'js' language prop is normalized to 'javascript'
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('world'));`,
  },
};

export const HiddenHeader: Story = {
  args: {
    language: 'typescript',
    hideHeader: true,
    children: `const sum = (a: number, b: number) => a + b;`,
  },
};

export const HiddenHeaderWithCopy: Story = {
  args: {
    language: 'typescript',
    hideHeader: true,
    onCopy: (str) => navigator.clipboard.writeText(str),
    children: `type User = {
  id: string;
  name: string;
  email: string;
};

const getUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
};`,
  },
};

export const NoLanguage: Story = {
  args: {
    children: `Plain text without syntax highlighting.
Header is omitted when no language is provided.`,
  },
};

export const LongSnippet: Story = {
  args: {
    language: 'typescript',
    onCopy: (str) => navigator.clipboard.writeText(str),
    children: `import { forwardRef, useEffect, useState } from 'react';

type FetcherProps<T> = {
  url: string;
  onLoad?: (data: T) => void;
  onError?: (error: Error) => void;
};

export const Fetcher = forwardRef(
  <T,>({ url, onLoad, onError }: FetcherProps<T>, ref: React.Ref<HTMLDivElement>) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      let cancelled = false;
      fetch(url)
        .then((res) => res.json() as Promise<T>)
        .then((json) => {
          if (cancelled) return;
          setData(json);
          onLoad?.(json);
        })
        .catch((err: Error) => {
          if (cancelled) return;
          setError(err);
          onError?.(err);
        });

      return () => {
        cancelled = true;
      };
    }, [url, onLoad, onError]);

    if (error) return <div ref={ref}>Error: {error.message}</div>;
    if (!data) return <div ref={ref}>Loading...</div>;
    return <div ref={ref}>{JSON.stringify(data)}</div>;
  }
);`,
  },
};

export const WithLineNumbers: Story = {
  args: {
    language: 'typescript',
    showLineNumbers: true,
    onCopy: (str) => navigator.clipboard.writeText(str),
    children: `type User = {
  id: string;
  name: string;
  email: string;
};

const getUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
};`,
  },
};

export const CustomContainer: Story = {
  args: {
    language: 'typescript',
    onCopy: (str) => navigator.clipboard.writeText(str),
    containerProps: {
      borderRadius: 'md',
      maxW: '480px',
      boxShadow: 'lg',
    },
    children: `const config = {
  borderRadius: 'md',
  maxW: '480px',
  boxShadow: 'lg',
};`,
  },
};
