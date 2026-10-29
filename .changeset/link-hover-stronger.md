---
'@mindlogic-ai/logician-ui': patch
---

Links: hover now reads stronger than rest in both modes. `fg.linkHover` is #304760 in light (was #295684; 9.56:1 on white vs 6.50:1 for the resting `fg.link`) and #C5DEF8 in dark (was #8BB7E3, which moved toward the background; now 10.66:1 vs 8.48:1 on `bg.surface`). High-contrast modes follow (#304760 / #C5DEF8). `fg.link` itself is unchanged. `ExpandableText`'s "더 보기" toggle is now underlined like every other link. SemanticTokens docs spell out that links are underlined at rest (1px) and on hover (2px), since link blue against body text is under 3:1.
