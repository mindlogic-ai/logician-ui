import { useEffect, useState } from 'react';

/**
 * Custom hook to track document loading state.
 *
 * @returns {boolean} isLoading - `true` if the document is still loading, `false` once fully loaded.
 */
export const useDocumentLoading = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Immediately set loading to false if the document is already fully loaded
    if (document.readyState === 'complete') {
      setIsLoading(false);
      return;
    }

    // Event handler to update loading state when page is fully loaded
    const handleLoad = () => setIsLoading(false);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return isLoading;
};
