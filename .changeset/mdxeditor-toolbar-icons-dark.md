---
'@mindlogic-ai/logician-ui': patch
---

fix(dark-mode): make MDXEditor toolbar icons follow the color mode

mdxeditor colors its toolbar icons with its own `--baseTextContrast` (its
internal slate scale), which doesn't track our color mode. In dark mode every
toolbar icon stayed near-black (`#1c2024`) and all but vanished against the dark
toolbar — only undo/redo read at all, because their disabled state used a
different (lighter) token.

Flip the toolbar svgs onto the semantic `fg.default` token (and disabled
buttons onto `fg.subtle`) so they resolve per color mode like the editor body
text. Light mode is unchanged.
