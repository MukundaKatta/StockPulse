import { useState, useEffect } from 'react';

export function useTextSelection(): string {
  const [selection, setSelection] = useState('');

  useEffect(() => {
    const handler = () => {
      const selected = window.getSelection()?.toString() ?? '';
      setSelection(selected);
    };

    document.addEventListener('selectionchange', handler);
    return () => document.removeEventListener('selectionchange', handler);
  }, []);

  return selection;
}
