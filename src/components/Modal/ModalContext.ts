'use client';

import { createContext, useContext } from 'react';

interface ModalContextValue {
  fullScreenOnMobile: boolean;
}

export const ModalContext = createContext<ModalContextValue>({
  fullScreenOnMobile: true,
});

export const useModalContext = () => useContext(ModalContext);
