---
'@mindlogic-ai/logician-ui': minor
---

Re-export an explicit allowlist of raw Chakra names (layout primitives, utilities, hooks and their types — `Box`, `Flex`, `Stack`, `useDisclosure`, `chakra`, …) from the package root via `src/chakra.ts`, so consumers never need to import `@chakra-ui/react` directly. Add the `logician/no-chakra-import` ESLint rule (in `configs.recommended`): it reports every `@chakra-ui/react` import and names the replacement — the logician component, the re-exported pass-through, or the DS equivalent (`Dialog` → `Modal`, `Field` → `FieldRow`/`FormControl`, `NativeSelect` → `Select`, `ProgressCircle` → `RadialProgress`). Its `allow` option takes globs for theme/provider/test-support files. The rule's name sets are generated from the package's own exports (`eslint/logician-exports.json`); `yarn check-exports` fails if they drift.
