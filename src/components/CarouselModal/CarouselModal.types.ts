import { ReactNode } from 'react';

import { ModalProps } from '@/components/Modal';

export type CarouselModalProps = Omit<
  ModalProps,
  'children' | 'initialFocusEl'
> & {
  slides: Array<{
    /**
     * Recommended image resolution is 400 x 540 ish.
     */
    image: string;
    text: ReactNode;
  }>;
};
