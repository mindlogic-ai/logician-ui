---
'@mindlogic-ai/logician-ui': major
---

feat(PinInput)!: replace `react-pin-input` with Chakra UI v3's built-in `PinInput` compound, removing the legacy class-component dependency that crashed under React 19 (removed `findDOMNode` / legacy context APIs).

## Breaking Changes

The component is rewritten on top of Chakra v3 (Ark UI / Zag) and the public prop surface is slimmed down. Props removed entirely:

- `initialValue` — use the controlled `value` prop instead
- `inputMode` — derived automatically from `type`
- `inputStyle`, `inputFocusStyle` — replaced by internal styling that matches the logician-ui `Input` component (gray.400 default, primary.lighter hover, primary.main focus, danger.main invalid)
- `secret`, `secretDelay` — masking is no longer exposed; consumers can opt back in via Chakra v3 primitives if needed
- `regexCriteria` — covered by the new `type: 'numeric' | 'alphanumeric' | 'alphabetic'`; for custom validation, filter inside `onChange`
- `validate`, `autoSelect`, `focus` — handled by Zag's default behavior in Chakra v3
- `ariaLabel` — labeling is delegated to the surrounding `Field.Root` / `Field.Label` composition, or via `inputProps={{ 'aria-label': ... }}` on the hidden form input

`onChange` signature changed:

- Before: `(value: string, index: number) => void`
- After: `(value: string) => void`

Default value changes (consumers must opt in explicitly):

- `autoFocus` now defaults to `false` (was `true`)
- `otp` is now an explicit prop and defaults to `false`

New props:

- `type: 'numeric' | 'alphanumeric' | 'alphabetic'` — replaces the `isNumberOnly` boolean; default `'numeric'`
- `onComplete: (value: string) => void` — fires when all pins are filled
- `invalid: boolean` — triggers danger.main border styling, matching the `Input` component
- `inputProps?: InputHTMLAttributes<HTMLInputElement>` — forwarded to the underlying hidden `<input>` (the form-submission element). Use this for `name`, `aria-label`, `data-testid`, and any other attribute that targets the PinInput as a single logical input.

The component now also forwards refs to the hidden `<input>` via `forwardRef`, so it works with `react-hook-form`, `Formik`, and any form library that registers refs against the value-bearing input.

`PinInputProps` now extends Chakra's `PinInput.RootProps` (with conflicting members omitted), so `mask`, `blurOnComplete`, `selectOnFocus`, `pattern`, `name`, `colorPalette`, `size`, and `variant` are available without us having to curate them. The previous explicit `style` prop has moved to the Chakra Root via this inheritance — if you were passing layout styles to the cell container, wrap the component in a `<Box display="flex" ... />` or use `<PinInput.Control>` directly.

## Migration

```tsx
// Before
<PinInput
  length={6}
  initialValue={code}
  onChange={setCode}
  isNumberOnly
  inputStyle={{ borderRadius: 8 }}
/>

// After
<Field.Root>
  <Field.Label>{t('verification_code')}</Field.Label>
  <PinInput length={6} value={code} onChange={setCode} otp autoFocus />
</Field.Root>
```

The `react-pin-input` package is removed from dependencies.
