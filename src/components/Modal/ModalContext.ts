'use client';

import { createContext, useContext } from 'react';

import { ModalHeaderTone } from './Modal.types';

interface ModalContextValue {
  fullScreenOnMobile: boolean;
  headerTone: ModalHeaderTone;
}

export const ModalContext = createContext<ModalContextValue>({
  fullScreenOnMobile: false,
  headerTone: 'default',
});

export const useModalContext = () => useContext(ModalContext);
