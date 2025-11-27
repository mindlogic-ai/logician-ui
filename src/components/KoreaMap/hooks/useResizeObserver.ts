import { useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

/**
 * ResizeObserver를 사용하여 요소의 크기 변화를 감지하는 커스텀 훅
 * @param ref - 크기를 감지할 요소의 ref
 * @returns 요소의 현재 width와 height
 */
export function useResizeObserver<T extends HTMLElement>(
  ref: React.RefObject<T>
): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;

      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(element);

    // 초기 크기 설정
    const { width, height } = element.getBoundingClientRect();
    setSize({ width, height });

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return size;
}
