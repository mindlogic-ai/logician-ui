---
'@mindlogic-ai/logician-ui': patch
---

Code: all code blocks now share one Shiki highlighter. Before, every `<Code>` built its own highlighter and compiled all 29 bundled languages, so a chat with many code blocks froze the page (136 blocks made 136 highlighters). Unmounting one block no longer disposes the highlighter the other blocks use. If Shiki fails to load, the block shows plain text and the next block to mount tries again.
