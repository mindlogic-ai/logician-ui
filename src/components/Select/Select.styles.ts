/**
 * Shared style objects for the Select and Combobox components.
 *
 * These mirror the Input component (`Input.tsx`) so the form controls share
 * the same border, hover, focus and disabled behavior. They are applied on
 * top of Chakra's built-in `select` / `combobox` slot recipes via the `css`
 * prop — only the design-system deltas live here. When `Input.tsx` changes,
 * update these values to match.
 */

const focusVars = {
  '--focus-color': 'var(--chakra-colors-primary-main)',
  '--error-color': 'var(--chakra-colors-danger-main)',
};

const fieldBase = {
  ...focusVars,
  bg: 'bg.surface',
  color: 'fg.default',
  borderColor: { base: 'gray.400', _dark: 'gray.1100' },
  _hover: { borderColor: 'primary.lighter' },
  _focus: { borderColor: 'primary.main' },
  _invalid: {
    borderColor: 'danger.main',
    _hover: { borderColor: 'danger.main' },
    _focus: { borderColor: 'danger.main' },
  },
  _disabled: {
    opacity: 1,
    cursor: 'not-allowed',
    bg: 'bg.subtle',
    color: { base: 'gray.1000', _dark: 'gray.400' },
    fontWeight: 'semibold',
  },
};

/** Select trigger — the clickable control. */
export const triggerStyles = {
  ...fieldBase,
  cursor: 'pointer',
  _open: { borderColor: 'primary.main' },
};

/** Combobox text input — the typeable control. */
export const inputStyles = {
  ...fieldBase,
};

/** Dropdown panel for both Select and Combobox. */
export const contentStyles = {
  bg: 'bg.surface',
  borderColor: 'border.default',
  borderWidth: '1px',
  borderRadius: '8px',
  boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)',
  padding: '4px',
};

/** Individual option for both Select and Combobox. */
export const itemStyles = {
  borderRadius: '4px',
  cursor: 'pointer',
  color: 'fg.default',
  _highlighted: { bg: 'bg.subtle' },
  _checked: {
    bg: 'primary.extralight',
    color: 'primary.dark',
    fontWeight: 'bold',
  },
  _disabled: { color: 'fg.subtle', cursor: 'not-allowed' },
};

/** Dropdown chevron — softened so it doesn't outweigh adjacent icons. */
export const indicatorStyles = {
  color: 'fg.muted',
};
