import { createShikiAdapter } from '@chakra-ui/react';
import type { HighlighterGeneric } from 'shiki';

export const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import('shiki');
    return createHighlighter({
      langs: [
        'bash',
        'css',
        'go',
        'html',
        'java',
        'javascript',
        'json',
        'jsx',
        'markdown',
        'python',
        'rust',
        'shell',
        'sql',
        'tsx',
        'typescript',
        'xml',
        'yaml',
      ],
      themes: ['github-dark'],
    });
  },
  theme: 'github-dark',
});
