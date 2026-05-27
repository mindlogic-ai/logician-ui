import { Meta, StoryObj } from '@storybook/react';

import { BUNDLED_LANGUAGES } from '@/components/Code';

import { CodeDiff } from './CodeDiff';

const TS_BEFORE = `type User = {
  id: string;
  name: string;
};

const getUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
};`;

const TS_AFTER = `type User = {
  id: string;
  name: string;
  email: string;
};

const getUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load user');
  return res.json();
};`;

const meta = {
  title: 'Components/CodeDiff',
  component: CodeDiff,
  args: {
    before: TS_BEFORE,
    after: TS_AFTER,
    language: 'typescript',
    filename: 'src/api/getUser.ts',
  },
  argTypes: {
    language: {
      control: 'select',
      options: BUNDLED_LANGUAGES,
    },
    mode: {
      control: 'radio',
      options: ['unified', 'split'],
    },
  },
} satisfies Meta<typeof CodeDiff>;

export default meta;

type Story = StoryObj<typeof CodeDiff>;

export const UnifiedBasic: Story = {
  args: {
    mode: 'unified',
  },
};

export const SplitBasic: Story = {
  args: {
    mode: 'split',
  },
};

export const WithFilename: Story = {
  args: {
    mode: 'unified',
    filename: 'src/components/UserCard/UserCard.tsx',
  },
};

export const WithoutFilename: Story = {
  args: {
    mode: 'unified',
    filename: undefined,
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    mode: 'unified',
    showLineNumbers: false,
  },
};

export const WithoutHeader: Story = {
  args: {
    mode: 'unified',
    hideHeader: true,
  },
};

export const WithoutStats: Story = {
  args: {
    mode: 'unified',
    showStats: false,
  },
};

export const NoChanges: Story = {
  args: {
    before: TS_AFTER,
    after: TS_AFTER,
    filename: 'src/api/getUser.ts',
    mode: 'unified',
  },
};

export const OnlyAdditions: Story = {
  args: {
    before: '',
    after: TS_AFTER,
    filename: 'src/api/getUser.ts',
    mode: 'unified',
  },
};

export const OnlyDeletions: Story = {
  args: {
    before: TS_BEFORE,
    after: '',
    filename: 'src/api/getUser.ts',
    mode: 'unified',
  },
};

export const SplitWithLargeBlock: Story = {
  args: {
    mode: 'split',
    filename: 'src/api/getUser.ts',
    before: `import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  const json = await res.json();
  return UserSchema.parse(json);
};`,
    after: `import { z } from 'zod';
import { logger } from '@/lib/logger';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

export const getUser = async (id: string): Promise<User | null> => {
  const res = await fetch(\`/api/users/\${id}\`, { cache: 'no-store' });
  if (res.status === 404) {
    logger.warn('user_not_found', { id });
    return null;
  }
  if (!res.ok) throw new Error('Failed to load user');
  const json = await res.json();
  return UserSchema.parse(json);
};`,
  },
};

export const JsonDiff: Story = {
  args: {
    language: 'json',
    filename: 'package.json',
    mode: 'unified',
    before: `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}`,
    after: `{
  "name": "my-app",
  "version": "1.1.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
  },
};

export const WithCopyCallback: Story = {
  args: {
    mode: 'unified',
    onCopy: (afterCode) => {
      // eslint-disable-next-line no-console
      console.log('Copied after code:', afterCode);
    },
  },
};

export const SplitNoChanges: Story = {
  args: {
    mode: 'split',
    before: TS_AFTER,
    after: TS_AFTER,
  },
};

export const SplitOnlyAdditions: Story = {
  args: {
    mode: 'split',
    before: '',
    after: TS_AFTER,
  },
};

export const LongUnifiedDiff: Story = {
  args: {
    mode: 'unified',
    filename: 'src/utils/process.ts',
    before: Array.from(
      { length: 30 },
      (_, i) => `const line${i} = ${i};`
    ).join('\n'),
    after: Array.from({ length: 30 }, (_, i) =>
      i % 5 === 0 ? `const line${i} = ${i * 2};` : `const line${i} = ${i};`
    ).join('\n'),
  },
};
