import { createShikiAdapter } from '@chakra-ui/react';
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';

export const BUNDLED_LANGUAGES: BundledLanguage[] = [
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
];

export const shikiAdapter = createShikiAdapter<
  HighlighterGeneric<BundledLanguage, BundledTheme>
>({
  async load() {
    const { createHighlighter } = await import('shiki');
    return createHighlighter({
      langs: BUNDLED_LANGUAGES,
      themes: ['github-dark'],
    });
  },
  theme: 'github-dark',
});
