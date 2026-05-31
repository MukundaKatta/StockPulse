'use client';

import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface UseKeyPressOptions {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  preventDefault?: boolean;
}

export function useKeyPress(key: string, handler: KeyHandler, options: UseKeyPressOptions = {}) {
  const { ctrl, shift, alt, meta, preventDefault = true } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (ctrl && !event.ctrlKey) return;
    if (shift && !event.shiftKey) return;
    if (alt && !event.altKey) return;
    if (meta && !event.metaKey) return;

    if (event.key.toLowerCase() === key.toLowerCase()) {
      if (preventDefault) event.preventDefault();
      handler(event);
    }
  }, [key, handler, ctrl, shift, alt, meta, preventDefault]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
