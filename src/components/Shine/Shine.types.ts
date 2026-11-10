import type { BoxProps } from '@chakra-ui/react';

export interface ShineProps extends Omit<BoxProps, 'translate'> {
  /**
   * One pass plus its rest, in ms. Defaults to `motion.loop.sweep` (1800).
   *
   * Raise it where the surface sits beside reading content: a highlight that
   * returns every 1.8s competes with the text next to it, and a CTA that nags
   * is worse than one that does not shine. The proposal drew 3200.
   */
  periodMs?: number;
  /**
   * Colour of the band. Any CSS colour. Defaults to a white wash, which is what
   * reads on a filled brand surface.
   *
   * On a pale surface pass something darker; the band is a lightening pass, not
   * a glow, and white on white is nothing.
   */
  colour?: string;
}
