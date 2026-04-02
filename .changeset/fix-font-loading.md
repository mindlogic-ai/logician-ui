---
'@mindlogic-ai/logician-ui': patch
---

fix: load Pretendard Variable and Inter fonts from CDN in LogicianProvider

Previously no fonts were loaded by the library, causing browsers to fall back to system fonts (Arial/Helvetica) which rendered English text noticeably thicker than intended. LogicianProvider now automatically injects stylesheet links for Pretendard Variable (jsDelivr, dynamic subset) and Inter (Bunny Fonts) on mount. A `loadFonts` prop (default `true`) allows consumers to opt out if they manage fonts themselves. Also adds `-webkit-font-smoothing: antialiased` to global styles for consistent rendering across OS.
