import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useTranslate } from '@/hooks/useTranslate';

import { useToast } from '../Toast/useToast';

/**
 * Separate any cross-page toasts sent using the message query param to ensure these can be wrapped with Suspense tags.
 */
export function CrossPageToasts() {
  const translate = useTranslate();
  const pushToast = useToast();
  const searchParams = useSearchParams();
  const message = searchParams.get('message'); // Retrieve message with Suspense support

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (message) {
        pushToast({ description: translate(message) as string });
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [message]);

  return null;
}
