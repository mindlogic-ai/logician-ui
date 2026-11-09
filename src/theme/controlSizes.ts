/**
 * One size scale for every control.
 *
 * A row of controls — a table filter bar, a toolbar, an inline form — only
 * lines up when every control resolves the same `size` value to the same
 * height, type size, icon size and corner. Each component used to carry its own
 * map (Chakra's recipe here, a local table there), and they drifted: in the
 * FactChat coding-agent toolbar a `SegmentedControl size="sm"` drew 36px, an
 * `Input size="xs"` 28px and an `lg` `Tag` 20.4px side by side (R28 3차 QA #18).
 * Every height-bearing control and every recipe override now reads this table,
 * and `controlSizes.test.ts` fails if one stops doing so.
 *
 * ## The scale is Button's
 *
 * `Button` was the reference and does not change: the values below are exactly
 * Chakra's button recipe. Everything else is aligned to it.
 *
 * | size | height token | px at the 14px root | in a 16px `ScaledContext` (desktop) |
 * |------|--------------|---------------------|-------------------------------------|
 * | 2xs  | `sizes.6`    | 21                  | 21 (2xs type is 0.875em)            |
 * | xs   | `sizes.8`    | 28                  | 28 (xs type is 0.875em)             |
 * | sm   | `sizes.9`    | 31.5                | 36                                  |
 * | md   | `sizes.10`   | 35                  | 40                                  |
 * | lg   | `sizes.11`   | 38.5                | 44                                  |
 * | xl   | `sizes.12`   | 42                  | 48                                  |
 *
 * ## Why one type step per size, not just one height
 *
 * `html` is 14px, and the sizes tokens are rem, so outside a `ScaledContext`
 * the height alone decides. Inside one (FactChat's `ReadingScale` is
 * `<ScaledContext fontSize="16px">`) the sizes tokens become **em**, and an em
 * resolves against the control's *own* font size. Two controls with the same
 * height token but different type therefore stop matching there — that is how
 * `Input lg` (1.143em type) drew 50px next to a 44px `Button lg`. The same
 * happens at the mobile breakpoint, where the textStyles drop to 0.875em. So
 * every control takes its type from `textStyle` here too: equal type per size
 * is what keeps equal height everywhere, not only at the root.
 *
 * Text-entry controls still raise their type to 16px under `pointer: coarse`
 * (`noZoomOnFocus`, iOS zoom). At the root that changes nothing about height;
 * inside a `ScaledContext` on a touch device it makes an `Input` taller than
 * its neighbours. That is the price of not zooming, and it is left alone.
 *
 * ## Two padding ramps
 *
 * Action controls (Button, SegmentedControl items, interactive Tag) and field
 * controls (Input, Select, Combobox, Textarea) keep different inline padding on
 * purpose: a field's text starts near its edge, a button's label is centred in
 * air. Each ramp is shared by its whole family.
 *
 * ## Icons
 *
 * `iconSize` is Button's `_icon` ramp as a sizes token; `iconBoxSize` is the
 * `Icon` `boxSize` name with the same size, for icons a control draws itself
 * (DatePicker / MonthPicker triggers) and for call sites placing an icon in a
 * control (`<SearchIcon boxSize={controlSizes[size].iconBoxSize} />`).
 */

export const CONTROL_SIZES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

export type ControlSize = (typeof CONTROL_SIZES)[number];

/**
 * The four sizes a control row is built from. Every height-bearing control
 * supports these; `2xs` / `xl` exist only where the component already had them.
 */
export const CORE_CONTROL_SIZES = ['xs', 'sm', 'md', 'lg'] as const;

export type CoreControlSize = (typeof CORE_CONTROL_SIZES)[number];

export interface ControlSizeSpec {
  /** `sizes` token key — the outer height of every height-bearing control. */
  height: string;
  /** textStyle every control uses at this size (font size + line height). */
  textStyle: 'xs' | 'sm' | 'md';
  /** `sizes` token key for an icon inside the control (Button's `_icon`). */
  iconSize: string;
  /** The `Icon` `boxSize` name that renders at `iconSize`. */
  iconBoxSize: '2xs' | 'xs' | 'sm';
  /** Inline padding of action controls (spacing token). */
  actionPaddingX: string;
  /** Inline padding of field controls (spacing token). */
  fieldPaddingX: string;
  /** Gap between an icon and the label (spacing token). */
  gap: string;
}

export const controlSizes: Record<ControlSize, ControlSizeSpec> = {
  '2xs': {
    height: '6',
    textStyle: 'xs',
    iconSize: '3.5',
    iconBoxSize: '2xs',
    actionPaddingX: '2',
    fieldPaddingX: '2',
    gap: '1',
  },
  xs: {
    height: '8',
    textStyle: 'xs',
    iconSize: '4',
    iconBoxSize: 'xs',
    actionPaddingX: '2.5',
    fieldPaddingX: '2',
    gap: '1',
  },
  sm: {
    height: '9',
    textStyle: 'sm',
    iconSize: '4',
    iconBoxSize: 'xs',
    actionPaddingX: '3.5',
    fieldPaddingX: '2.5',
    gap: '2',
  },
  md: {
    height: '10',
    textStyle: 'sm',
    iconSize: '5',
    iconBoxSize: 'sm',
    actionPaddingX: '4',
    fieldPaddingX: '3',
    gap: '2',
  },
  lg: {
    height: '11',
    textStyle: 'md',
    iconSize: '5',
    iconBoxSize: 'sm',
    actionPaddingX: '5',
    // 12px at a 16px font — kept from the lg padding fix (f2820c8) so lg reads
    // as a step up from md rather than a wider box.
    fieldPaddingX: '3',
    gap: '3',
  },
  xl: {
    height: '12',
    textStyle: 'md',
    iconSize: '5',
    iconBoxSize: 'sm',
    actionPaddingX: '5',
    fieldPaddingX: '4.5',
    gap: '2.5',
  },
};

/** Corner radius of every boxed control, at every size (Button's). */
export const CONTROL_RADIUS = 'md';

/** `sizes.N` token path of a size's height, for recipe CSS variables. */
export const controlHeightToken = (size: ControlSize): string =>
  `sizes.${controlSizes[size].height}`;

/** The same height as a CSS value, for `calc()` and inline styles. */
export const controlHeightVar = (size: ControlSize): string =>
  `var(--chakra-sizes-${controlSizes[size].height})`;

/** Resolve an arbitrary `size` prop to a spec, falling back to `md`. */
export const getControlSize = (size: unknown): ControlSizeSpec =>
  typeof size === 'string' && size in controlSizes
    ? controlSizes[size as ControlSize]
    : controlSizes.md;
