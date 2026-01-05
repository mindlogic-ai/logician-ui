import { useEffect } from 'react';

import { useTranslate } from '@/hooks/useTranslate';

import { useToast } from '../Toast/useToast';
// Optional Next.js navigation import
let useSearchParams: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  useSearchParams = require('next/navigation').useSearchParams;
} catch {
  useSearchParams = () => ({ get: () => null });
}

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
