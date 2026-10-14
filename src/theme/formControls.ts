import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * Keeps a text-entry control at the size iOS Safari needs to leave the viewport
 * alone.
 *
 * Safari zooms the page when a focused editable host computes to a font-size
 * under 16px. The only ways to suppress that are `maximum-scale=1` /
 * `user-scalable=no`, which also remove pinch-zoom and fail KWCAG 2.2 8.2.1
 * (확대/축소 보장), so the control has to meet the threshold instead.
 *
 * Being under it is the default here rather than the exception: `html` is 14px
 * (see `global.ts`), and Chakra's input recipe maps `size="sm"`/`"md"` onto the
 * `sm`/`md` textStyles, which this theme defines as
 * `{ base: '0.875em', md: '1em' }`. The `base` arm is the PHONE, so a control
 * renders *smaller* there than on desktop — 12.25px against the 14px root.
 *
 * Exactly 16px, not a floor like `max(16px, 1em)`: 16px is the threshold
 * itself, so anything above it only makes a phone form bigger than the type
 * scale intends. Nothing in the set is clamped by it — the largest shipped
 * control text is `PinInput`'s OTP box at `1.125rem` = 15.75px, which is itself
 * under the line and gets raised.
 *
 * **`pointer: coarse`, never a width breakpoint.** The zoom is a property of the
 * device, and a width rule is wrong in both directions: it misses touch devices
 * above the breakpoint (iPad portrait is exactly 768px, iPhone landscape wider
 * still), and it catches devices that never zoom — a desktop user at 200%
 * browser zoom has a ~640px CSS viewport, so a width rule enlarges their form
 * controls and pushes wide tables off-screen, making the low-vision case worse.
 *
 * `Input` and `Textarea` already spread this, so their call sites need nothing,
 * and `PasswordInput` composes `Input` so it inherits.
 *
 * Two components deliberately do NOT, because the zoom does not reach them.
 * `Select` is a listbox — a `<button>` trigger over a portalled list, plus a
 * visually hidden native `<select>` that exists only for form submission and
 * never takes visible focus; Safari zooms toward text entry, not toward a
 * button. `PinInput` wraps `react-pin-input`, which takes an inline `style`
 * object, and an inline style cannot carry a media query at all — a consumer
 * that builds OTP boxes on `ChakraPinInput` instead has to spread this itself.
 *
 * Spread it yourself on any editable surface the design system does not own —
 * a Lexical/ProseMirror `contenteditable`, a bare Chakra `Input`, or a
 * `ChakraPinInput.Input`:
 *
 * ```tsx
 * <Box css={mergeCss(noZoomOnFocus, ownStyles)} />
 * ```
 *
 * It is merged first inside those components, so a call site that genuinely
 * wants a different size can still pass one. That makes it a default rather
 * than a lock, and the cost is that a regression is invisible at the call
 * site — catch it by measuring computed font-size under device emulation, not
 * by reading the JSX.
 */
export const noZoomOnFocus: SystemStyleObject = {
  '@media (pointer: coarse)': { fontSize: '16px' },
};
