/**
 * Shared style objects for the Select and Combobox components.
 *
 * These mirror the Input component (`Input.tsx`) so the form controls share
 * the same border, hover, focus and disabled behavior. They are applied on
 * top of Chakra's built-in `select` / `combobox` slot recipes via the `css`
 * prop — only the design-system deltas live here. When `Input.tsx` changes,
 * update these values to match.
 */

import { disabledControl } from '@/utils/disabledControl';

const focusVars = {
  '--focus-color': 'var(--chakra-colors-primary-main)',
  '--error-color': 'var(--chakra-colors-danger-solid)',
};

const fieldBase = {
  ...focusVars,
  bg: 'bg.surface',
  color: 'fg.default',
  borderColor: 'border.control',
  _hover: { borderColor: 'fg.icon' },
  _focus: {
    borderColor: 'primary.main',
    boxShadow: '0 0 0 1px var(--chakra-colors-primary-main)',
  },
  _invalid: {
    borderColor: 'danger.solid',
    _hover: { borderColor: 'danger.solid' },
    _focus: { borderColor: 'danger.solid' },
  },
  _disabled: {
    ...disabledControl,
    cursor: 'not-allowed',
    fontWeight: 'semibold',
  },
};

/** Select trigger — the clickable control. */
export const triggerStyles = {
  ...fieldBase,
  cursor: 'pointer',
  _open: {
    borderColor: 'primary.main',
    boxShadow: '0 0 0 1px var(--chakra-colors-primary-main)',
  },
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
  _highlighted: { bg: 'primary.wash' },
  _checked: {
    bg: 'primary.selected',
    color: 'fg.default',
    fontWeight: 'bold',
  },
  _disabled: { color: 'fg.subtle', cursor: 'not-allowed' },
};

/** Dropdown chevron — softened so it doesn't outweigh adjacent icons. */
export const indicatorStyles = {
  color: 'fg.muted',
};
