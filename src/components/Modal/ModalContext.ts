'use client';

import { createContext, useContext } from 'react';

interface ModalContextValue {
  fullScreenOnMobile: boolean;
}

export const ModalContext = createContext<ModalContextValue>({
  fullScreenOnMobile: false,
});

export const useModalContext = () => useContext(ModalContext);
