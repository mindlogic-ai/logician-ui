---
'@mindlogic-ai/logician-ui': patch
---

fix(CodeTabs): stabilize panel width and split `CopyButton`

- Stack all language panels inside a single CSS grid cell so the container sizes to the widest panel. Non-selected panels use `visibility: hidden` + `aria-hidden` so they still contribute to intrinsic width without being interactive or announced to assistive tech. This eliminates the width jitter that occurred when switching between tabs whose code samples have different maximum line lengths.
- Extract `CopyButton` into its own module (`CodeTabs/CopyButton.tsx`) and drop the inner `TabPanels`/`TabPanel` wiring in favor of rendering `Code` panels directly.
