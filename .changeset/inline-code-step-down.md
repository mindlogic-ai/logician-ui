---
'@mindlogic-ai/logician-ui': minor
---

`InlineCode` renders one step below body text.

Changes `InlineCode`'s `textStyle` from `p` to `subtext` (`1em` → `0.875em` on desktop, em-relative). The chip (padding + border ring) plus the monospace face's larger x-height made a body-size chip read visibly bigger than the prose around it; stepping it down brings its footprint back in line with running text.

`subtext` is the same tier as `p` — identical `fontFamily`, `fontWeight`, and `line-height` — only one size smaller, so this changes size only. A caller's explicit `fontFamily="mono"` still wins (InlineCode has no monospace default), exactly as before. `subtext` lands the chip at ~87.5% of body on desktop, in line with GitHub (85%), Bootstrap and Tailwind Typography (0.875em).

The corner radius also tightens from `sm` (6px) to `xs` (4px): on the smaller chip a 6px radius reads a little bubbly, and the tighter corner is crisper inline.

Note: the size is em-relative, so inline code inside a heading renders proportionally smaller than the heading text. If you want it to match the heading instead, reset it per context at your prose layer (e.g. `:is(h1,h2,h3,h4,h5,h6) code { font-size: inherit }`).
