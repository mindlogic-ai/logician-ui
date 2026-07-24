/**
 * Compute cumulative pinned offsets for a group of sticky columns on the
 * same side. Widths and offsets are in `em` (relative to the table's
 * font-size context) so the values track the design system's em-based
 * spacing scale and stay consistent when the base font size changes.
 * Each entry returns `{ w, left }` (or `{ w, right }` when
 * `stickyDirection` is `'right'`) so you can spread it straight onto
 * the matching `<Th>` / `<Td>`.
 *
 * Sticky columns must be **fixed-width by contract**: pin offsets are
 * cumulative sums of the preceding widths, so any per-row width variance
 * would break alignment. Long content truncates with the default
 * `text-overflow: ellipsis`.
 *
 * @example
 * // Header (values are `em` — e.g. `3` = 3em)
 * const sticky = stickyOffsets([3, 15, 12, 9]);
 * <Th isSticky {...sticky[0]}>Checkbox</Th>
 * <Th isSticky {...sticky[1]}>Name</Th>
 * <Th isSticky {...sticky[2]}>Groups</Th>
 * <Th isSticky {...sticky[3]}>Status</Th>
 *
 * // The same array must be spread onto the matching Tds so the header
 * // and body columns line up.
 */
export const stickyOffsets = (
  widthsInEm: number[],
  stickyDirection: 'left' | 'right' = 'left'
): Array<{ w: string; left?: string; right?: string }> => {
  const offsetKey = stickyDirection === 'right' ? 'right' : 'left';
  return widthsInEm.map((width, i) => {
    const preceding = widthsInEm.slice(0, i).reduce((sum, x) => sum + x, 0);
    return {
      w: `${width}em`,
      [offsetKey]: `${preceding}em`,
    };
  });
};
