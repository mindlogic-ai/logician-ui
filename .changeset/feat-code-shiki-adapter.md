---
'@mindlogic-ai/logician-ui': minor
---

feat(Code): extract `shikiAdapter` into its own module and refine default surface

- Move the inline `createShikiAdapter` call out of `Code.tsx` into `src/components/Code/shikiAdapter.ts`, so the adapter can be reused across code-rendering components (e.g. `CodeTabs`) and is easier to type and swap.
- Type the adapter against `HighlighterGeneric<BundledLanguage, BundledTheme>` imported from `shiki` instead of `any, any`.
- Simplify the default Code header: drop the `primary.light` bottom border, drop the `textStyle="xs"` title override, and drop the `borderRadius="none"` override on the root so the component respects the token default.
- Switch the root `textStyle` default from `"p"` to `"Body"` and set `borderColor="gray.300"` so the component matches surrounding surfaces.
- Show a `FaCheck` success indicator in the copy trigger when copying succeeds.
