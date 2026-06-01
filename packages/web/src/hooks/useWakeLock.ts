import { useState, useCallback } from 'react';

interface UseWakeLockReturn {
  isLocked: boolean;
  request: () => Promise<void>;
  release: () => Promise<void>;
}

export function useWakeLock(): UseWakeLockReturn {
  const [sentinel, setSentinel] = useState<WakeLockSentinel | null>(null);

  const request = useCallback(async () => {
    if (!('wakeLock' in navigator)) return;
    const s = await navigator.wakeLock.request('screen');
    setSentinel(s);
  }, []);

  const release = useCallback(async () => {
    if (sentinel) {
      await sentinel.release();
      setSentinel(null);
    }
  }, [sentinel]);

  return { isLocked: sentinel !== null, request, release };
}
