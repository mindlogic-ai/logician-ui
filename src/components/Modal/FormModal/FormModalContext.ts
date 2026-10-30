'use client';

import { createContext, useContext } from 'react';

interface FormModalContextValue {
  /**
   * Whether the form inside the `FormModal` currently fails its native
   * constraints — an empty `required` field, a malformed `type="email"`.
   */
  invalid: boolean;
}

/** `null` outside a `FormModal`, so a footer used on its own is unaffected. */
export const FormModalContext = createContext<FormModalContextValue | null>(
  null
);

/**
 * The enclosing `FormModal`'s form state, or `null` outside one. For a custom
 * footer that has to gate its own submit button the way `FormModalFooter` does.
 */
export const useFormModalContext = () => useContext(FormModalContext);
