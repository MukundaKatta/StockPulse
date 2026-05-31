'use client';

import { useCallback, useRef, useState } from 'react';

interface CopyState {
  copied: boolean;
  error: Error | null;
}

export function useCopyToClipboard(resetDelay = 2000): [CopyState, (text: string) => Promise<void>] {
  const [state, setState] = useState<CopyState>({ copied: false, error: null });
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setState({ copied: true, error: null });
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setState({ copied: false, error: null }), resetDelay);
    } catch (err) {
      setState({ copied: false, error: err instanceof Error ? err : new Error('Copy failed') });
    }
  }, [resetDelay]);

  return [state, copy];
}
