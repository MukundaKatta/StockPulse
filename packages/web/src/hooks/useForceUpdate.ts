'use client';

import { useState, useCallback } from 'react';

export function useForceUpdate(): () => void {
  const [, setCount] = useState(0);

  const forceUpdate = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return forceUpdate;
}
