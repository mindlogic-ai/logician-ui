import { MOTION_DURATION_MS, MOTION_STAGGER_MAX } from '@/theme/motion';

/** What `staggerProps` hands back — spreadable onto any Chakra element. */
export interface StaggerProps {
  animationStyle: 'stagger';
  style: Record<string, string | number>;
}

/**
 * Makes one list item arrive `index` beats after the first.
 *
 * ```tsx
 * {options.map((option, i) => (
 *   <Select.Item key={option.value} item={option} {...staggerProps(i)}>
 * ))}
 * ```
 *
 * A function rather than a `<Stagger>` wrapper. A wrapper has to render
 * something to hold the index, and an extra node inside a `Menu.Content` or a
 * `Select.Content` is not free: Ark walks those children to build its typeahead
 * and roving-focus collections, and a grid or flex list would gain a layout box
 * between the container and every row. This adds no DOM at all, and it composes
 * with a list that is already being mapped rather than asking for the list to be
 * restructured around it.
 *
 * The index rides an inline custom property rather than the `css` prop on
 * purpose: `css` would compile one class per index and grow the stylesheet with
 * the length of the longest list ever rendered, while the *only* thing that
 * varies per item is this one number. Everything else — the keyframe, the
 * duration, the curve, the cap — lives in the `stagger` preset, which is one
 * class shared by every item on the page.
 *
 * Where **not** to use it, and why the list is short: stagger costs the reader
 * time in exchange for rhythm, so it is worth it only where the list is short,
 * arrives once, and is looked at as a whole. `Masonry` and `Table` are the
 * explicit exclusions — both are long, both are candidates for virtualization
 * (where "index" means position in a window that scrolls, so items would
 * re-stagger as they scroll into view), and a sortable table re-orders its rows
 * on click, which would deal the whole grid out again on every header press.
 *
 * @param index - The item's position in its list, from 0.
 * @returns Props to spread onto the item. Merge `style` by hand if the call
 *   site already sets one.
 */
export const staggerProps = (index: number): StaggerProps => ({
  animationStyle: 'stagger',
  // Not clamped here even though the preset's `min()` makes it redundant in
  // CSS: an out-of-range value passed straight through is what makes a wrong
  // index visible in the DOM instead of silently flattened.
  style: { '--stagger-index': index },
});

/**
 * The delay `staggerProps(index)` resolves to, in milliseconds.
 *
 * Exists for the two callers that cannot read a CSS variable — a test asserting
 * the cap holds, and JS animation tech sequencing alongside a staggered list.
 * It has to mirror the `calc()` in the `stagger` preset exactly, which is why
 * both read the same two constants.
 */
export const staggerDelayMs = (index: number): number =>
  Math.min(Math.max(index, 0), MOTION_STAGGER_MAX) *
  MOTION_DURATION_MS.staggerStep;
