import { createShikiAdapter } from '@chakra-ui/react';
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';

export const shikiAdapter = createShikiAdapter<
  HighlighterGeneric<BundledLanguage, BundledTheme>
>({
  async load() {
    const { createHighlighter } = await import('shiki');
    return createHighlighter({
      langs: [
        'bash',
        'c',
        'csharp',
        'css',
        'dart',
        'dockerfile',
        'go',
        'html',
        'java',
        'javascript',
        'json',
        'jsx',
        'kotlin',
        'lua',
        'markdown',
        'matlab',
        'mermaid',
        'python',
        'r',
        'ruby',
        'rust',
        'shell',
        'sql',
        'toml',
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
