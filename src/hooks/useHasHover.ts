'use client';

import { useEffect, useState } from 'react';

/**
 * Returns whether the primary pointing device is capable of hovering
 * (i.e. a mouse/trackpad rather than a touchscreen).
 *
 * Useful for components that rely on hover interactions on desktop but need a
 * tap/click affordance on touch devices, where hover events never fire.
 *
 * Defaults to `true` so server-rendered markup matches the most common
 * (desktop) case, then resolves to the real value after mount.
 */
export const useHasHover = () => {
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mql = window.matchMedia('(hover: hover)');
    const update = () => setHasHover(mql.matches);

    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return hasHover;
};

export default useHasHover;
