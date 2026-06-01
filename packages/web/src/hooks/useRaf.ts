import { useRef, useCallback, useEffect } from 'react';

interface UseRafReturn {
  start: () => void;
  stop: () => void;
  isRunning: boolean;
}

export function useRaf(callback: (deltaTime: number) => void): UseRafReturn {
  const rafRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const savedCallback = useRef(callback);
  const runningRef = useRef(false);

  savedCallback.current = callback;

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const delta = time - previousTimeRef.current;
      savedCallback.current(delta);
    }
    previousTimeRef.current = time;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    previousTimeRef.current = undefined;
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
    previousTimeRef.current = undefined;
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { start, stop, isRunning: runningRef.current };
}
