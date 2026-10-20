export const footerStyles = {
  center: {
    justifyContent: 'center',
    gap: 4,
  },
  left: {
    justifyContent: 'flex-start',
    gap: 4,
  },
  right: {
    justifyContent: 'flex-end',
    gap: 4,
  },
};

/**
 * The Modal's own enter and exit movement.
 *
 * Only the two keyframe *names* are here — the clock comes from the shared
 * `presence` preset, which every surface with an open and a closed state
 * carries. That split is what keeps the Modal on the house 2:1 enter/exit ratio
 * without restating the numbers, while the movement itself stays bespoke: no
 * other surface enters by rising toward the reader.
 *
 * Reduced motion is `presence`'s too — it swaps both names for a plain fade
 * rather than zeroing the duration, because a surface that appears with no
 * transition at all reads as a page swap. The movement is what has to go, not
 * the fact that something changed.
 */
export const modalAnimation = {
  _open: { animationName: 'modal-in' },
  _closed: { animationName: 'modal-out' },
};
