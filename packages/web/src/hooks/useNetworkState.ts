import { useState, useEffect } from 'react';

interface NetworkState {
  online: boolean;
  downlink: number | null;
  effectiveType: string | null;
  rtt: number | null;
}

export function useNetworkState(): NetworkState {
  const [state, setState] = useState<NetworkState>(() => {
    if (typeof navigator === 'undefined') return { online: true, downlink: null, effectiveType: null, rtt: null };
    const conn = (navigator as Navigator & { connection?: { downlink?: number; effectiveType?: string; rtt?: number } }).connection;
    return {
      online: navigator.onLine,
      downlink: conn?.downlink ?? null,
      effectiveType: conn?.effectiveType ?? null,
      rtt: conn?.rtt ?? null,
    };
  });

  useEffect(() => {
    const update = () => {
      const conn = (navigator as Navigator & { connection?: { downlink?: number; effectiveType?: string; rtt?: number } }).connection;
      setState({
        online: navigator.onLine,
        downlink: conn?.downlink ?? null,
        effectiveType: conn?.effectiveType ?? null,
        rtt: conn?.rtt ?? null,
      });
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    const conn = (navigator as Navigator & { connection?: { addEventListener?: (e: string, fn: () => void) => void; removeEventListener?: (e: string, fn: () => void) => void } }).connection;
    conn?.addEventListener?.('change', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      conn?.removeEventListener?.('change', update);
    };
  }, []);

  return state;
}
