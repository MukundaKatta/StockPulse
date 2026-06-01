import { useEffect, useRef, useCallback } from 'react';

export function useAnimationFrame(callback: (deltaTime: number) => void, active = true) {
  const requestRef = useRef<number>(undefined);
  const previousTimeRef = useRef<number>(undefined);
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const delta = time - previousTimeRef.current;
      savedCallback.current(delta);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!active) return;
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active, animate]);
}
