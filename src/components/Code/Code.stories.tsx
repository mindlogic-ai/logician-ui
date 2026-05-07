import { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';

const meta = {
  title: 'Components/Code',
  component: Code,
  args: {
    children: `const t = 'test';`,
  },
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof Code>;

export const Basic: Story = {
  args: {
    children: `const t = 'test';`,
  },
};

export const Copyable: Story = {
  args: {
    children: `const t = 'test';`,
    onCopy: (str) => {
      navigator.clipboard.writeText(str);
      console.log(str);
    },
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

export const JavaScript: Story = {
  args: {
    language: 'javascript',
    children: `function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('world');
console.log(message);`,
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

export const TSX: Story = {
  args: {
    language: 'tsx',
    children: `import { Button } from '@mindlogic-ai/logician-ui';

type Props = {
  onClick: () => void;
};

export const SubmitButton = ({ onClick }: Props) => (
  <Button variant="primary" onClick={onClick}>
    Submit
  </Button>
);`,
  },
};

export const Python: Story = {
  args: {
    language: 'python',
    children: `def fibonacci(n: int) -> list[int]:
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

print(fibonacci(10))`,
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

export const SQL: Story = {
  args: {
    language: 'sql',
    children: `SELECT u.id, u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > '2025-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC
LIMIT 10;`,
  },
};

export const HTML: Story = {
  args: {
    language: 'html',
    children: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Logician UI</title>
  </head>
  <body>
    <main id="root"></main>
  </body>
</html>`,
  },
};

export const CSS: Story = {
  args: {
    language: 'css',
    children: `.ml-code {
  border-radius: 0;
  overflow: hidden;
}

.ml-code-header {
  padding: 8px 16px;
  background-color: white;
  border-bottom: 1px solid var(--chakra-colors-primary-light);
}`,
  },
};

export const Go: Story = {
  args: {
    language: 'go',
    children: `package main

import "fmt"

func main() {
	names := []string{"Alice", "Bob", "Carol"}
	for i, name := range names {
		fmt.Printf("%d: Hello, %s!\\n", i, name)
	}
}`,
  },
};

export const Rust: Story = {
  args: {
    language: 'rust',
    children: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);
}`,
  },
};

export const YAML: Story = {
  args: {
    language: 'yaml',
    children: `name: CI
on:
  push:
    branches: [main, dev]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: yarn install
      - run: yarn type-check`,
  },
};

export const Markdown: Story = {
  args: {
    language: 'markdown',
    children: `# Logician UI

A React component library built on **Chakra UI**.

## Installation

\`\`\`bash
yarn add @mindlogic-ai/logician-ui
\`\`\`

- Accessible
- Themeable
- TypeScript-first`,
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

export const HideLanguageLabel: Story = {
  name: 'Code/HideLanguageLabel',
  args: {
    language: 'java',
    hideLanguageLabel: true,
    onCopy: (str) => navigator.clipboard.writeText(str),
    children: `// C++ source rendered with the Java grammar as a best-effort fallback.
// The "java" label would be misleading, so we hide it but keep the copy button.
#include <iostream>

int main() {
  std::cout << "Hello, world!" << std::endl;
  return 0;
}`,
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

export const WithLineNumbersAndCopy: Story = {
  args: {
    language: 'tsx',
    showLineNumbers: true,
    onCopy: (str) => navigator.clipboard.writeText(str),
    children: `import { Code } from '@mindlogic-ai/logician-ui';

export const Example = () => (
  <Code language="tsx" showLineNumbers>
    {'const greeting = "hello";'}
  </Code>
);`,
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
