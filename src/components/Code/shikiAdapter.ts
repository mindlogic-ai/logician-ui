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
  'stata',
  'toml',
  'tsx',
  'typescript',
  'xml',
  'yaml',
];

type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

// One highlighter for the whole app. Every <Code> mounts its own
// AdapterProvider, and Chakra calls `load()` once per provider. Without this
// cache a chat with 136 code blocks built 136 highlighters, each compiling all
// BUNDLED_LANGUAGES, and froze the tab for tens of seconds.
let highlighterPromise: Promise<Highlighter | null> | null = null;

const loadHighlighter = (): Promise<Highlighter | null> => {
  highlighterPromise ??= import('shiki')
    .then(({ createHighlighter }) =>
      createHighlighter({
        langs: BUNDLED_LANGUAGES,
        themes: ['github-dark'],
      })
    )
    .catch((error: unknown) => {
      // Chakra does not catch a rejected load, so resolve to null instead: the
      // block renders as plain text. Clear the cache so the next mount retries.
      console.error(
        '[logician-ui] Failed to load the Shiki highlighter',
        error
      );
      highlighterPromise = null;
      return null;
    });
  return highlighterPromise;
};

const baseAdapter = createShikiAdapter<Highlighter | null>({
  load: loadHighlighter,
  theme: 'github-dark',
});

// Chakra's default `unloadContext` calls `dispose()` when a provider unmounts.
// The highlighter is shared, so one block unmounting would break highlighting
// in every other block. Keep it alive for the life of the page.
export const shikiAdapter: typeof baseAdapter = {
  ...baseAdapter,
  unloadContext: () => {},
};
