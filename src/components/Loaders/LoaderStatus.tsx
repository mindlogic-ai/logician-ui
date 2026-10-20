import { VisuallyHidden } from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';

import LoadersTranslations from './Loaders.translations.json';

/**
 * Live-region props and the spoken text for a loader overlay.
 *
 * Live regions announce their text content, not `aria-label`, so the label is
 * visually hidden text inside the status element. An idle loader exposes no
 * status at all — an always-present "Loading" status on an idle page tells a
 * screen reader the page is busy when it is not.
 */
export const useLoaderStatus = (isLoading: boolean, label?: string) => {
  const translate = useTranslate(LoadersTranslations);
  const text = label ?? (translate('loading') as string);

  return {
    statusProps: isLoading
      ? ({ role: 'status', 'aria-live': 'polite' } as const)
      : ({ 'aria-hidden': true } as const),
    statusText: isLoading ? <VisuallyHidden>{text}</VisuallyHidden> : null,
  };
};
