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
  bg: 'white',
  borderColor: 'gray.400',
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
    bg: 'gray.50',
    color: 'gray.1000',
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
  bg: 'white',
  borderColor: 'gray.300',
  borderWidth: '1px',
  borderRadius: '8px',
  boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)',
  padding: '4px',
};

/** Individual option for both Select and Combobox. */
export const itemStyles = {
  borderRadius: '4px',
  cursor: 'pointer',
  color: 'gray.1200',
  _highlighted: { bg: 'gray.50' },
  _checked: {
    bg: 'primary.extralight',
    color: 'primary.dark',
    fontWeight: 'bold',
  },
  _disabled: { color: 'gray.500', cursor: 'not-allowed' },
};

/** Dropdown chevron — softened so it doesn't outweigh adjacent icons. */
export const indicatorStyles = {
  color: 'gray.600',
};
