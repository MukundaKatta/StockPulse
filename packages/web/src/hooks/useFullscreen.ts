import { useState, useCallback, useEffect, type RefObject } from 'react';

interface UseFullscreenReturn {
  isFullscreen: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
}

export function useFullscreen(ref: RefObject<HTMLElement | null>): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enter = useCallback(async () => {
    const el = ref.current;
    if (!el) return;
    await el.requestFullscreen?.();
  }, [ref]);

  const exit = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
    }
  }, []);

  const toggle = useCallback(async () => {
    if (isFullscreen) {
      await exit();
    } else {
      await enter();
    }
  }, [isFullscreen, enter, exit]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return { isFullscreen, enter, exit, toggle };
}
