'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/appStore';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { setCommandPaletteOpen, toggleSidebar, toggleTheme } = useAppStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        (e.target as HTMLElement)?.tagName
      );

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }

      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleTheme();
        return;
      }

      if (e.key === 'g') {
        const next = waitForNextKey();
        if (next) return;
      }
    }

    let pendingKey: string | null = null;
    let pendingTimeout: ReturnType<typeof setTimeout> | undefined;

    function waitForNextKey(): boolean {
      if (pendingKey === 'g') {
        return false;
      }
      pendingKey = 'g';
      pendingTimeout = setTimeout(() => { pendingKey = null; }, 500);
      return true;
    }

    function handleSecondKey(e: KeyboardEvent) {
      if (!pendingKey) return;
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        (e.target as HTMLElement)?.tagName
      );
      if (isInput) return;

      if (pendingKey === 'g') {
        clearTimeout(pendingTimeout);
        pendingKey = null;
        switch (e.key) {
          case 'h': router.push('/'); break;
          case 'p': router.push('/portfolio'); break;
          case 's': router.push('/screener'); break;
          case 'c': router.push('/compare'); break;
          case 'a': router.push('/alerts'); break;
          case 'n': router.push('/news'); break;
          case 'm': router.push('/heatmap'); break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleSecondKey);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleSecondKey);
      clearTimeout(pendingTimeout);
    };
  }, [router, setCommandPaletteOpen, toggleSidebar, toggleTheme]);
}
