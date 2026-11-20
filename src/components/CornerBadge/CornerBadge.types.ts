import type { ReactNode } from 'react';

import type { CountBadgeProps } from '../CountBadge';

export type CornerBadgeProps = CountBadgeProps & {
  /**
   * The icon or avatar the badge sits on. The badge floats at its top-end
   * corner, so the app does not place it by hand. The wrapper is a `<span>`,
   * so it is valid inside a `<button>`.
   */
  children: ReactNode;
  /**
   * Colour of a 2px ring drawn OUTSIDE the badge (`outline`), so the badge
   * keeps its full size. Pass the colour behind the badge (`bg.canvas`,
   * `bg.panel`) to cut it out of the icon or avatar underneath.
   */
  ringColor?: string;
  /**
   * Hide the badge but keep `children`. Use it for a dot with no count; a
   * numeric badge already hides at 0.
   */
  invisible?: boolean;
};
