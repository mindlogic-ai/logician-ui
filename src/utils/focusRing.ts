/**
 * Standard focus ring styles for interactive components.
 *
 * - _focus: suppresses the browser's default outline on all focus events (including mouse)
 * - _focusVisible: shows the ring only on keyboard focus (CSS :focus-visible),
 *   with a 0.15s ease-out transition on box-shadow
 */
export const focusRing = {
  _focus: { outline: 'none' },
  _focusVisible: {
    outline: 'none',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 2px, var(--chakra-colors-primary-main) 0px 0px 0px 4px',
    transition: 'box-shadow 0.15s ease-out',
    _motionReduce: { transition: 'none' },
  },
} as const;
